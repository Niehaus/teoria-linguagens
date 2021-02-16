<h1 style="text-align:center">Exercício Aula 1 - Conceitos Básicos</h1>
<p style="text-align:center">
<span style="font-weight: bold">Bárbara Boechat</span><br>
Teoria de Linguagens <br> Universidade Federal de São João del-Rei<br>
</p>

## 1 - Complete abaixo com a definição de cada um dos conceitos apresentados.

- Autômato: ...
- Estado: ...
- Transição: ...
- Função Programa: ...

## 2 -  O que significa cada elemento da quintúpla necessária para definir um autômato M = (Q, Σ, δ, q0, F )?

- Q: ...
- Σ: ...
- δ: ...
- q0: ...
- F: ...

## 3 - Elabore um autômato cada uma das seguintes linguagens

### a) Conjunto de todas as palavras sobre o alfabeto Σ = {a,b,c} que não possui o símbolo 'a' como prefixo e não possui o símbolo 'c' como sufixo

    V = { X }
    T = {a, b, c}
    S = { S0 }
    P = { S0 -> bX | cX 
          X -> a | b | c
          X -> aX | bX | cX
          X -> ε
        }


### b) Conjunto de todas as palavras sobre o alfabeto Σ = {a,b,c} que possuem aab ou bba como subpalavra.

    V = { X }
    T = {a, b}
    S = { S0 }
    P = { S0 -> cX 
          X -> a | b 
          X -> aX | bX 
          X -> ε
        }

### c) Conjunto de todas as palavras w sobre o alfabeto Σ = {0,1,2,3,...,9} tal que w é par.

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

### c) Conjunto de todas as palavras w sobre o alfabeto Σ = {0,1} tal que o número de ocorrências de 0 é par e o número de ocorrências de 1 é ímpar.
