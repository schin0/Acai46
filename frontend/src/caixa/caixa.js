let produtos = [];

let produtosCarrinho = [];

function adicionarNoCarrinho(produtoId) {
    if (verificarProdutoNoCarrinho(produtoId)) {
        alert('Produto já adicionado!')
        return;
    }

    const produto = obterProdutoPorId(produtoId);

    produtosCarrinho.push(produto);

    calcularSubtotal(true);

    exibirCarrinho();
}

function removerDoCarrinho(produtoId) {
    let produto = produtosCarrinho.find(x => x.id == produtoId);
    let posicao = produtosCarrinho.indexOf(produto);

    produtosCarrinho.splice(posicao, 1);

    calcularSubtotal();

    exibirCarrinho();
}

function exibirCarrinho() {
    const carrinho = document.getElementById('carrinho');
    carrinho.innerHTML = '';

    produtosCarrinho.forEach(produto => {
        let tr = document.createElement('tr');
        tr.classList.add("produtos");

        tr.innerHTML = `
            <td class="txt-center">${produto.nome}</td>
            <td class="txt-center">R$ ${produto.preco}</td>
            <td class="txt-center">
                <button onclick="diminuirQuantidade(${produto.id})">-</button>
                ${produto.quantidade ? produto.quantidade : 1}
                <button onclick="aumentarQuantidade(${produto.id})">+</button>
            </td>
            <td class="txt-center">
                <button onclick="removerDoCarrinho(${produto.id})">
                    <span class="material-symbols-outlined excluir">delete</span>
                </button>
            </td>
        `;

        carrinho.appendChild(tr);
    });
}

function calcularSubtotal(fluxoAdicao = false) {
    let subtotal = 0;

    produtosCarrinho.forEach(async produto => {
        if (fluxoAdicao)
            subtotal += (produto.preco * produto.quantidade);
        else
            subtotal -= (produto.preco * produto.quantidade) * - 1;
    });

    document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
}

function obterValor(campo) {
    return parseFloat(document.getElementById(campo).textContent.match(/\d+/)[0]);
}

function verificarProdutoNoCarrinho(produtoId) {
    return produtosCarrinho.find(x => x.id == produtoId);
}

function obterProdutoPorId(produtoId) {
    return produtos.find(x => x.id == produtoId);
}

function obterProdutoPorNome(produtoNome) {
    return produtos.find(x => x.nome.toLocaleLowerCase() == produtoNome.toLocaleLowerCase());
}

function listarProdutosPorNome(pesquisa) {
    return produtos.filter(x => x.nome.toLocaleLowerCase().includes(pesquisa.toLocaleLowerCase()));
}

function aumentarQuantidade(produtoId) {
    let produto = obterProdutoPorId(produtoId);

    if (!produto.quantidade)
        produto.quantidade = 1;

    produto.quantidade += 1;

    calcularSubtotal(true);

    exibirCarrinho();
}

function diminuirQuantidade(produtoId) {
    let produto = obterProdutoPorId(produtoId);

    if (produto.quantidade > 1)
        produto.quantidade -= 1;
    else
        if (confirm("Deseja mesmo excluir do carrinho?"))
            removerDoCarrinho(produtoId);

    calcularSubtotal();

    exibirCarrinho();
}

const divInput = document.querySelector(".divInput");
const termoPesquisa = divInput.querySelector("input");
const autocomplete = divInput.querySelector(".autocomplete");

termoPesquisa.onkeyup = async (e) => {
    let pesquisa = e.target.value;

    if (pesquisa) {
        await listarProdutos(pesquisa);

        let arrayProdutos = [];

        arrayProdutos = produtos.map(({ nome }) => `<li>${nome}</li>`);

        divInput.classList.add("active");

        obterOpcoesAutocomplete(arrayProdutos);

        processarItensAutocomplete();

        return;
    }

    divInput.classList.remove("active");
}

async function listarProdutos(pesquisa) {
    await fetch(`http://localhost:8080/produtos?nome=${pesquisa}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(retorno => produtos = retorno)
        .catch(error => {
            console.error(error);
        });
}

function selecionarProdutoAutocomplete(produto) {
    let produtoNome = produto.textContent;

    termoPesquisa.value = produtoNome;
    divInput.classList.remove("active");

    produto = obterProdutoPorNome(produtoNome);

    if (produto?.id) {
        adicionarNoCarrinho(produto.id)
        return;
    }

    alert('Não é possível adicionar um produto inexistente ao carrinho!')
}

function obterOpcoesAutocomplete(opcoes) {
    autocomplete.innerHTML = definirOpcoesAutocomplete(opcoes);
}

function definirOpcoesAutocomplete(opcoes) {
    return opcoes.length ? opcoes.join('') : `<li onclick="selecionarProdutoAutocomplete(this)">${termoPesquisa.value}</li>`;
}

function processarItensAutocomplete() {
    let itensAutocomplete = autocomplete.querySelectorAll("li");

    for (let i = 0; i < itensAutocomplete.length; i++)
        itensAutocomplete[i].setAttribute("onclick", "selecionarProdutoAutocomplete(this)");
}

document.getElementById('cancelar').addEventListener('click', () => {
    window.location.href = '../home/home.html';
});

document.getElementById('formasPagamento').addEventListener('click', async () => {
    await inserirDados();

    window.location.href = '../caixa/formasPagamento/formasPagamento.html';
});

async function inserirDados() {
    let subtotal = obterValor('subtotal');
    let descontoNosItens = obterValor('descontoNosItens');
    let descontoGeral = obterValor('descontoGeral');
    let acrescimo = obterValor('acrescimo');

    let produtos = produtosCarrinho.map(({ id, quantidade }) => ({ id, quantidade }));

    let dadosCaixa = {
        subtotal,
        descontoNosItens,
        descontoGeral,
        acrescimo,
        produtos
    };

    localStorage.setItem('dadosCaixa', JSON.stringify(dadosCaixa));
}