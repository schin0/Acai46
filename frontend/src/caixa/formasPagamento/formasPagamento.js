document.getElementById('cancelarVenda').addEventListener('click', () => {
    window.location.href = '../caixa.html';
});

let dadosCaixa = [];

function obterDados() {
    dadosCaixa = JSON.parse(localStorage.getItem('dadosCaixa'));

    definirValor('subtotal', dadosCaixa.subtotal);
    definirValor('descontoNosItens', dadosCaixa.descontoNosItens);
    definirValor('descontoGeral', dadosCaixa.descontoGeral);
    definirValor('acrescimo', dadosCaixa.acrescimo);

    definirValor('total', calcularTotal());
}

function definirValor(campo, valor) {
    document.getElementById(campo).textContent = `R$ ${valor.toFixed(2)}`
}

function calcularTotal() {
    return dadosCaixa.subtotal + dadosCaixa.acrescimo - dadosCaixa.descontoGeral - dadosCaixa.descontoNosItens;
}

obterDados();

let opcaoDinheiro = document.getElementById('dinheiro');
let opcaoCartao = document.getElementById('cartao');
let divDinheiro = document.getElementById('divDinheiro');
let divCartao = document.getElementById('divCartao');
let formaSelecionada = document.getElementById('formaSelecionada');
let parcelasSelecionadas = document.getElementById('parcelasSelecionadas');

opcaoDinheiro.addEventListener('click', () => {
    if (divCartao.classList.contains('opcaoSelecionada'))
        divCartao.classList.remove('opcaoSelecionada');

    divDinheiro.classList.add('opcaoSelecionada');
    formaSelecionada.textContent = 'Dinheiro';
    parcelasSelecionadas.textContent = '1';
});

opcaoCartao.addEventListener('click', () => {
    if (divDinheiro.classList.contains('opcaoSelecionada'))
        divDinheiro.classList.remove('opcaoSelecionada');

    divCartao.classList.add('opcaoSelecionada')
    formaSelecionada.textContent = 'Cartão de Crédito';
    parcelasSelecionadas.textContent = '3';
});

document.getElementById('finalizarVenda').addEventListener('click', () => {
    if (confirm("Deseja finalizar a venda e confirmar o recebimento da mesma?"))
        window.location.href = '../caixa.html';
});

document.getElementById('calcular').addEventListener('click', () => {
    calcularValores();
});

function calcularValores() {
    let valorRecebido = parseFloat(prompt("Insira o valor recebido (em R$): "));

    let total = calcularTotal();

    definirValor('totalFinal', total);
    definirValor('valorPagoFinal', valorRecebido);

    let diferenca = total - valorRecebido;

    if (diferenca < 0)
        definirValor('trocoFinal', diferenca * - 1);
}