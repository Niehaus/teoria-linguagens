<h1 style="text-align:center">Exercício Aula 1 - Conceitos Básicos</h1>
<p style="text-align:center">
<span style="font-weight: bold">Bárbara Boechat</span><br>
Teoria de Linguagens <br> Universidade Federal de São João del-Rei<br>
</p>

## 1 - Complete abaixo com a definição de cada um dos conceitos apresentados.

- Alfabeto: Conjunto finito de símbolos ou caracteres;
- Palavra: Sequência finita de símbolos justapostos;
- Linguagem Formal: Conjunto de todos as palavras da linguagem L sobre um alfabeto

## 2 - O que é uma gramática e o significa cada elemento da quádrupla necessária para definir uma G= (V, T, P, S)?

- V: Conjunto finito de símbolos variáveis ou não-terminais
- T: Conjunto finito de símbolos terminais disjunto de V
- P: Regra de produção ou produção
- S: Elemento distinguido de V: símbolo inicial ou variável inicial

## 3 - Elabore uma gramática para cada uma das seguintes linguagens

### a) Conjunto de todas as palavras sobre o alfabeto Σ = {a,b,c} que não possui o símbolo ‘a’ como prefixo.

    V = { X }
    T = {a, b, c}
    S = { S0 }
    P = { S0 -> bX | cX 
          X -> a | b | c
          X -> aX | bX | cX
          X -> ε
        }


### b) Conjunto de todas as palavras sobre o alfabeto Σ = {a,b,c} que não o símbolo ‘c’ como sufixo.

    V = { X }
    T = {a, b}
    S = { S0 }
    P = { S0 -> cX 
          X -> a | b 
          X -> aX | bX 
          X -> ε
        }

### c) Conjunto de todas as palavras sobre o alfabeto Σ = {a,b,c} que possuem w = aab como subpalavra

    V = { X, Y }
    T = {a, b, c}
    S = { S0 }
    P = { S0 -> XaabY 
          X -> Xa | Xb | Xc
          Y -> aY | bY | cY
          X -> a | b | c
          Y -> a | b | c
          X -> ε
          Y -> ε
        }


### d) Conjunto de todas as palavras w sobre o alfabeto Σ = {0,1,2,3,...,9} tal que w é par.

    V = { X, Y, B, A }
    T = {0, 2, 4, 6, 8}
    S = { S0 }
    P = { S0 -> XY
          X -> XB
          B -> 0 | ... | 9
          Y -> YA
          A -> 0 | 2 | 4 | 6 | 8
          X -> ε
          Y -> ε
          A -> ε
          B -> ε
        }
