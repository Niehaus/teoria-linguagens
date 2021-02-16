<h1 style="text-align:center">Exercício Aula 2 - Autômatos Finitos</h1>
<p style="text-align:center">
<span style="font-weight: bold">Bárbara Boechat</span><br>
Teoria de Linguagens <br> Universidade Federal de São João del-Rei<br>
</p>

## 1 - Complete abaixo com a definição de cada um dos conceitos apresentados.

- Autômato: máquina ou robô que se opera de maneira automática
- Estado: possíveis casos que um autômato pode assumir
- Transição: salto para outro estado a partir de uma entrada
- Função Programa: comanda as leituras; define o estado da máquina

## 2 -  O que significa cada elemento da quintúpla necessária para definir um autômato M = (Q, Σ, δ, q0, F )?

- Q: conjunto de estados possíveis do autômato (finito)
- Σ: alfabetos de símbolos de entrada
- δ: função programa ou função de transição
- q0: estado inicial
- F: conjunto de estados finais

## 3 - Elabore um autômato cada uma das seguintes linguagens

### a) Conjunto de todas as palavras sobre o alfabeto Σ = {a,b,c} que não possui o símbolo 'a' como prefixo e não possui o símbolo 'c' como sufixo

<div style="text-align:center"><img src="../exercicios/aut_finito/exerc3a.png"/></div>


### b) Conjunto de todas as palavras sobre o alfabeto Σ = {a,b,c} que possuem aab ou bba como subpalavra.

<div style="text-align:center"><img src="../exercicios/aut_finito/exerc3b.png"/></div>

### c) Conjunto de todas as palavras w sobre o alfabeto Σ = {0,1,2,3,...,9} tal que w é par.

<div style="text-align:center"><img src="../exercicios/aut_finito/exerc3c.png"/></div>

### d) Conjunto de todas as palavras w sobre o alfabeto Σ = {0,1} tal que o número de ocorrências de 0 é par e o número de ocorrências de 1 é ímpar.

<div style="text-align:center"><img src="../exercicios/aut_finito/exerc3d.png"/></div>