// TODO: Listar do backend:
const produtos = [
    { id: 1, nome: 'Coxinha de frango', categoriaNome: "Salgados", descricao: '111 - Lorem ipsum dolor ', preco: 10.0, quantidade: 1 },
    { id: 2, nome: 'Coca Cola', categoriaNome: "Bebidas", descricao: '222 - Lorem ipsum dolor ', preco: 15.0, quantidade: 2 },
    { id: 3, nome: 'X-Tudo', categoriaNome: "Lanches", descricao: '333 - Lorem ipsum dolor ', preco: 20.0, quantidade: 3 },
];

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
                ${produto.quantidade}
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

function obterSubtotal() {
    return parseFloat(document.getElementById('subtotal').textContent.match(/\d+/)[0]);
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

termoPesquisa.onkeyup = (e) => {
    let pesquisa = e.target.value;

    if (pesquisa) {
        let arrayProdutos = [];

        arrayProdutos = listarProdutosPorNome(pesquisa);

        arrayProdutos = arrayProdutos.map(({ nome }) => `<li>${nome}</li>`);

        divInput.classList.add("active");

        obterOpcoesAutocomplete(arrayProdutos);

        processarItensAutocomplete();

        return;
    }

    divInput.classList.remove("active");
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

document.getElementById('formasPagamento').addEventListener('click', () => {
    window.location.href = '../caixa/formasPagamento/formasPagamento.html';
});