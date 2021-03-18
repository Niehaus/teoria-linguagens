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
            console.log('trans. indf para ', estado)
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


/* handler da UI */
class HandleUI {
    static out_transicao(comando, estado, leitura, prox_estado) {
        let output = $('#saida-afd');
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
            `<div class="afd-item">
                <span class="badge rounded-pill afd-pill-t afd-pill">${estado_inicial}</span>
            </div>`
        )
    }

    static log_final(comando, entrada, mensagem, element) {
        let icon = "";
        let output = $(element);

        (comando) ? icon = 'icon-aceita.png': icon = 'icon-naceita.png'
        output.append(
            `<div class="output-item">
                <p class="entrada-out">${entrada}</p>
                <img class="output-icon" src="icons/${icon}" alt="">
                <p class="description">${mensagem}</p>
            </div>`
        )
    }

    static clear_afd_output() {
    }
}


let file_content = ""
document.getElementById('inputfile')
    .addEventListener('change', function () {
        let fr = new FileReader();
        fr.onload = function () {
            // document.getElementById('output')
            //     .textContent = fr.result;
            file_content = fr.result
        }
        fr.readAsText(this.files[0]);
    })


function load_file_afd() {
    if (!file_content) {
        console.log('please insert file')
    } else {
        console.log(file_content)
    }
}

function single_entry() {
    let user_input = $('#inputEntrada'), element = '#single-output'
    if (!user_input.val()) {
        console.log('insert valid input')
        return 0
    }
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

    let fita = user_input.val().match(/[^,\s?]+/g),
        estado_atual = "", estado_anterior,
        fim_fita = fita.length - 1, i = 0

    estado_atual = afd.inicial
    HandleUI.output_inicial(estado_atual)
    for (i = 0; i < fita.length; i++) {
        if (afd.exists_in_alf(fita[i])) {
            estado_anterior = estado_atual
            estado_atual = afd.le_transicao(estado_atual, fita[i])

            //faz transição na ui
            if (estado_atual === 'Indefinido') {
                //jquery indefine algo na ui
                HandleUI.out_transicao(
                    'i', estado_anterior,
                    fita[i], estado_atual
                )
                HandleUI.log_final(false, fita.join(''),
                    'Simbolo Indf. no estado ' + estado_anterior, element)
                break
            } else if (!afd.estado_final(estado_atual) && i === fim_fita) {
                //jquery nao-final warning na ui
                HandleUI.out_transicao(
                    'nf', estado_anterior,
                    fita[i], estado_atual
                )
                HandleUI.log_final(false, fita.join(''),
                    'Fim da Fita em Estado Não Final', element)
                break
            }

            if (afd.estado_final(estado_atual) && i === fim_fita) {
                //jquery palavra aceita na ui
                HandleUI.out_transicao(
                    'f', estado_anterior,
                    fita[i], estado_atual
                )
                HandleUI.log_final(true, fita.join(''),
                    'Palavra Aceita!', element)
                break
            }

            HandleUI.out_transicao(
                'next', estado_anterior,
                fita[i], estado_atual
            )

        } else {
            HandleUI.log_final(false, fita.join(''),
                'Indf. - Simbolo ∉ Alfabeto.', element)
            break
        }
    }
    // automato.transicoes['q1']['0b'] q1 lendo 0b -> q2

    user_input.val('')
}

