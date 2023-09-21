document.addEventListener("DOMContentLoaded", () => {
    listarEstoques();
    listarCategoria();
});

function listarEstoques(nome = "") {
    const tabela = document.getElementById("tabela");
    tabela.innerHTML = `
                              <tr class="header-tabela">
                                  <th>NOME</th>
                                  <th>CATEGORIA</th>
                                  <th>PREÇO</th>
                                  <th>QUANTIDADE TOTAL</th>
                                  <th>QUANTIDADE MÍNIMA</th>
                                  <th></th>
                              </tr>
                          `;

    fetch(`http://localhost:8080/estoques?nome=${nome}`, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((retorno) => {
            retorno.forEach((produto) => {
                tabela.innerHTML += montarLinhaTabelaEstoque(
                    produto.nome,
                    produto.id,
                    produto.categoria.nome,
                    produto.preco.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    }),
                    produto.quantidade,
                    produto.quantidadeMinima
                );
            });
        })
        .catch((error) => {
            console.error(error);
        });
}

function montarLinhaTabelaEstoque(
    nome,
    id,
    categoria,
    preco,
    quantidade,
    quantidadeMinima
) {
    return `
                  <tr>
                      <td class="esqueda">${nome}</td>
                      <td class="categoria">${categoria}</td>
                      <td class="preco"> ${preco}</td>
                      <td class="quantidade"><input type="number" id="quantidade" name="quantidade" value=${quantidade} ></td>
                      <td class="quantidade"><input type="number" id="quantidadeMinima" name="quantidadeMinima" value=${quantidadeMinima} ></td>
                      <td> <button type="button" class="btn btn-primary" onclick="processarDadosProduto(${id})"> Alterar </button></td>
                  </tr>
             `;
}

function processarDadosProduto(id) {
    return obterEstoque(id);
}

function obterEstoque(id) {
    fetch(`http://localhost:8080/estoques/obter/?id=${id}`, {
        method: "GET",
    })
        .then((response) => response.json())
        .then(async (produto) => {
            prencherDadosEEnviar(produto);
        })
        .catch((error) => {
            console.error(error);
        });
}

function listarCategoria() {
    fetch(`http://localhost:8080/categoria`, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((categoria) => {
            processarCategoria(categoria);
        })
        .catch((error) => {
            console.error(error);
        });
}

function prencherDadosEEnviar(produto) {
    const produtoId = produto.id;
    const produtoNome = produto.nome;
    const produtoCategoriaNome = produto.categoria.nome;
    const produtoCategoriaId = produto.categoria.id;
    const produtoPreco = produto.preco;

    const produtoQuantidade = document.getElementById("quantidade").value;
    const produtoQuantidadeMinima =
        document.getElementById("quantidadeMinima").value;

    const dados = {
        id: produtoId,
        categoria: {
            nome: produtoCategoriaNome,
            id: produtoCategoriaId,
        },
        nome: produtoNome,
        preco: produtoPreco,
        quantidade: produtoQuantidade,
        quantidadeMinima: produtoQuantidadeMinima,
    };

    return editarEstoque(dados);
}

function processarCategoria(categoria) {
    const select = document.getElementById("categoria");

    categoria.forEach((categoria) => {
        var opcao = document.createElement("option");
        opcao.value = categoria.id;
        opcao.text = categoria.nome;
        select.appendChild(opcao);
    });
}

function editarEstoque(dados) {
    fetch(`http://localhost:8080/estoques/editarQuantidade/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
    })
        .then((response) => response.json())
        .then(async () => {
            await window.alert("Atualizado com sucesso");
        })
        .catch((error) => {
            console.error(error);
        });
}

const pesquisa = document.getElementById("nome-produtos");
const lupaCategoria = document.getElementById("lupa-categoria");
const lupaNome = document.getElementById("lupa-nome");
const categoria = document.getElementById("categoria");

lupaNome.addEventListener("click", () => {
    let nome = document.getElementById("nome-produtos").value;
    let categoria = document.getElementById("categoria").value;

    listaProdutoPorNomeECategoria(nome, categoria);
});

lupaCategoria.addEventListener("click", () => {
    let nome = document.getElementById("nome-produtos").value;
    let categoria = document.getElementById("categoria").value;

    listaProdutoPorNomeECategoria(nome, categoria);
});

pesquisa.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();

        let nome = document.getElementById("nome-produtos").value;
        listarEstoques(nome);
    }
});

function listaProdutoPorNomeECategoria(nome = '', id = '') {
    const tabela = document.getElementById('tabela');

    tabela.innerHTML = `
                            <tr class="header-tabela">
                              <th>NOME</th>
                              <th>CATEGORIA</th>
                              <th>PREÇO</th>
                              <th>QUANTIDADE TOTAL</th>
                              <th>QUANTIDADE MÍNIMA</th>
                             
                          </tr>
                        `;
    fetch(`http://localhost:8080/estoques/listar-filtro/?nome=${nome}&categoriaId=${id}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(retorno => {
            retorno.forEach(produto => {
                tabela.innerHTML += montarLinhaTabelaEstoque(
                    produto.nome,
                    produto.id,
                    produto.categoria.nome,
                    produto.preco.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    }),
                    produto.quantidade,
                    produto.quantidadeMinima);
            });
        })
        .catch(error => {
            console.error(error);
        });
}