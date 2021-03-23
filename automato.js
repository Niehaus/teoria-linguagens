/*
* Autor: Bárbara Boechat
* Data: 20/03/2021
* */


/* Construtor do Automato */
class Automato {
    constructor(estados, transicoes, alfabeto) {
        this.estados = estados; //array
        this.transicoes = transicoes; //dict
        this.alfabeto = alfabeto; //array
        this.inicial = this.ini_final(">")
        this.final = this.ini_final("*")
    }

    ini_final(marker) {
        let finais = []
        this.estados.forEach(estado => {
            if (estado.includes(marker)) {
                if (marker === ">") {
                    finais = estado.split(marker).join('')
                } else {
                    finais.push(estado.split(marker).join(''))
                }
            }
        })
        return finais
    }

    le_transicao(estado, leitura) {
        let prox_estado = this.transicoes[estado][leitura]
        if (prox_estado === undefined) {
            return 'Indefinido'
        } else {
            return prox_estado
        }
    }

    estado_final(leitura) {
        return this.final.includes(leitura)
    }

    exists_in_alf(leitura) {
        return this.alfabeto.includes(leitura)
    }
}


/* Controlador dos prints de leitura das
* transições do automato */
let output_count = 0

class HandleUI {
    static out_transicao(comando, estado, leitura, prox_estado) {
        let output = $('#sub-saida' + output_count);
        let css_pill = 'afd-pill-' + comando

        output.append(
            `<div class="afd-item">
                <span class="badge rounded-pill afd-pill-t afd-pill">${estado}, ${leitura}</span>
                <img src="icons/arrow.png" alt="" style="width: 25px;display: inline-block;">
                <span class="badge rounded-pill ${css_pill} afd-pill">${prox_estado}</span>
            </div>`
        )
    }

    static output_inicial(estado_inicial) {
        let output = $('#saida-afd');
        output.append(
            `<div class="col-lg-3 afd-trans mt-2">
                <div id="sub-saida${output_count}" class="output-area" style="margin-left: 0; margin-right: 0;">
                    <div class="afd-item">
                        <span class="badge rounded-pill afd-pill-t afd-pill">${estado_inicial}</span>
                    </div>
                </div>
            </div>`
        )
    }

    static log_final(comando, entrada, mensagem, element) {
        let icon = "";
        let output = $(element);

        (comando) ? icon = 'icon-aceita.png' : icon = 'icon-naceita.png'
        output.append(
            `<div class="output-item">
                <p class="entrada-out">${entrada}</p>
                <img class="output-icon" src="icons/${icon}" alt="">
                <p class="description">${mensagem}</p>
            </div>`
        )
        output_count += 1
    }
}

/* Funções assincronas p/ animar o automato */
async function wait_for_me(time) {
    await new Promise(done => setTimeout(() => done(), time));
}

async function paint_afd(historico) {
    let curr_node, curr_edge, next_node

    $('#qi').addClass('active');
    $('#edgeqi').addClass('active');

    for (let i = 0; i < historico.length - 1; i++) {
        curr_node = '#' + historico[i]
        curr_edge = '#' + historico[i] + '-' + historico[i + 1]
        next_node = '#' + historico[i + 1]

        $(curr_node).addClass('active');
        // await new Promise(done => setTimeout(() => done(), 1000));
        await wait_for_me(1000)
        $(curr_edge).addClass('active');
        // await new Promise(done => setTimeout(() => done(), 1000));
        await wait_for_me(1000)
        $(next_node).addClass('active');
    }
}

async function clear_afd_output() {
    await wait_for_me(500)

    let nodes = $('.node'), edges = $('.edge'),
        active_n, active_e

    for (let i = 0; i < nodes.length; i++) {
        active_n = $(nodes[i]).hasClass('active')
        if (active_n)
            $(nodes[i]).removeClass('active')
    }

    for (let i = 0; i < edges.length; i++) {
        active_e = $(edges[i]).hasClass('active')
        if (active_e)
            $(edges[i]).removeClass('active')
    }
}

function afd_action(afd, entrada) {

    let fita = entrada.match(/[^,\s?]+/g),
        estado_atual, estado_anterior, fim_fita = fita.length - 1,
        i, mensagem = '', comando = false

    estado_atual = afd.inicial
    HandleUI.output_inicial(estado_atual)
    let historico = [estado_atual]
    for (i = 0; i < fita.length; i++) {
        if (afd.exists_in_alf(fita[i])) {
            estado_anterior = estado_atual
            estado_atual = afd.le_transicao(estado_atual, fita[i])

            historico.push(estado_atual)
            if (estado_atual === 'Indefinido') {
                //jquery indefine algo na ui
                HandleUI.out_transicao('i', estado_anterior, fita[i], estado_atual)
                mensagem = 'Simbolo Indf. no estado ' + estado_anterior
                comando = false
                break
            } else if (!afd.estado_final(estado_atual) && i === fim_fita) {
                //jquery nao-final warning na ui
                HandleUI.out_transicao('nf', estado_anterior, fita[i], estado_atual)
                mensagem = 'Fim da Fita em Estado Não Final'
                comando = false
                break
            }

            if (afd.estado_final(estado_atual) && i === fim_fita) {
                //jquery palavra aceita na ui
                HandleUI.out_transicao('f', estado_anterior, fita[i], estado_atual)
                mensagem = 'Palavra Aceita!'
                comando = true
                break
            }
            HandleUI.out_transicao('next', estado_anterior, fita[i], estado_atual)
        } else {
            mensagem = 'Indf. - Simbolo ∉ Alfabeto.'
            comando = false
            break
        }
    }

    return {historico: historico, comando: comando, mensagem: mensagem}
}


/* Leitura do conteudo do arquivo
* qd ele é carregado na interface */
let file_content = ""
$('#inputfile').change(function () {
    let fr = new FileReader();
    fr.onload = function () {
        file_content = fr.result.split(/\r?\n/);
    }
    fr.readAsText(this.files[0]);
})

function inicia_afd(comando) {
    const afd = new Automato(
        ['>q0', 'q1', 'q2', 'q1q2', 'qf*'],
        {
            'q0': {'7': 'q1'},
            'q1': {'0b': 'q2', '9a': 'q2'},
            'q2': {'0b': 'q1q2', '9a': 'q1q2', '7': 'qf'},
            'q1q2': {'0b': 'q1q2', '9a': 'q1q2', '7': 'qf'},
            'qf': {}
        },
        ['7', '9a', '0b']
    );

    let data = {}, btn
    switch (comando) {
        case 'arquivo':
            if (!file_content) {
                console.log('insert valid file')
                return 0
            }
            btn = $('#file-btn');
            btn.addClass("disabled")

            const forLoop = async _ => {
                for (let i = 0; i < file_content.length; i++) {
                    data = afd_action(afd, file_content[i])
                    await paint_afd(data.historico)
                    await wait_for_me(1000)
                    HandleUI.log_final(data.comando, file_content[i],
                        data.mensagem, '#file-output')
                    await clear_afd_output()
                }
                btn.removeClass("disabled");
            }
            forLoop()
            break
        case 'input':
            let user_input = $('#inputEntrada'),
                fita = user_input.val()
            if (!fita) {
                console.log('insert valid input')
                return 0
            }
            btn = $('#input-btn');
            btn.addClass("disabled");

            data = afd_action(afd, fita)
            user_input.val('')
            const paint_clear = async _ => {
                await paint_afd(data.historico)
                await wait_for_me(1000)
                HandleUI.log_final(data.comando, fita,
                    data.mensagem, '#single-output')
                await clear_afd_output()
                btn.removeClass("disabled");
            }
            paint_clear()
            break
    }

}

