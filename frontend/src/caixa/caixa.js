// TODO: Listar do backend:
const produtos = [
    { id: 1, nome: 'Coxinha de frango', categoriaNome: "Salgados", descricao: '111 - Lorem ipsum dolor ', preco: 10.0, quantidade: 1 },
    { id: 2, nome: 'Coca Cola', categoriaNome: "Bebidas", descricao: '222 - Lorem ipsum dolor ', preco: 15.0, quantidade: 2 },
    { id: 3, nome: 'X-Tudo', categoriaNome: "Lanches", descricao: '333 - Lorem ipsum dolor ', preco: 20.0, quantidade: 3 },
];

let produtosCarrinho = [];

function listarProdutos() {
    const termoPesquisa = document.getElementById('pesquisaProduto').value.toLowerCase();
    // TODO: Filtrar pelo backend:
    const produtosFiltrados = produtos.filter(produto => produto.nome.toLowerCase().includes(termoPesquisa));

    const resultados = document.getElementById('resultados');
    resultados.innerHTML = '';

    produtosFiltrados.forEach(produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.innerHTML = `
            <p>Id: ${produto.id}</p>
            <p>Nome: ${produto.nome}</p>
            <p>Categoria: ${produto.categoriaNome}</p>
            <p>Descrição: ${produto.descricao}</p>
            <p>Preço: ${produto.preco}</p>
            <button onclick="adicionarNoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
        `;

        resultados.appendChild(produtoDiv);
    });
}

function adicionarNoCarrinho(produtoId) {
    if (verificarProdutoNoCarrinho(produtoId)) {
        alert('Produto já adicionado!')
        return;
    }

    const produto = obterProdutoPorId(produtoId);

    produtosCarrinho.push(produto);

    exibirCarrinho();
}

function exibirCarrinho() {
    const carrinho = document.getElementById('carrinho');
    carrinho.innerHTML = '';

    produtosCarrinho.forEach(produto => {
        let li = document.createElement('li');
        li.innerHTML = `<p>Produto com id ${produto.id}! Quantidade: ${produto.quantidade}</p> <button onclick="aumentarQuantidade(${produto.id})"">+</button>`;

        carrinho.appendChild(li);
    })
}

function verificarProdutoNoCarrinho(produtoId) {
    return produtosCarrinho.find(x => x.id == produtoId);
}

function obterProdutoPorId(produtoId) {
    return produtos.find(x => x.id == produtoId);
}

function aumentarQuantidade(produtoId) {
    let produto = obterProdutoPorId(produtoId);
    produto.quantidade += 1;

    exibirCarrinho();
}