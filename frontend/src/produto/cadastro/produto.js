let acao = '';

async function preencherCampos(produto) {
    const nome = document.getElementById('nome-produto');
    const categoria = document.getElementById('categoria');
    const descricao = document.getElementById('descricao');
    const preco = document.getElementById('preco');

    nome.value = produto.nome;
    nome.name = produto.id;
    categoria.value = produto.categoria.id;
    descricao.value = produto.descricao;
    preco.value = produto.preco;
}
function processarDadosProduto() {
    const id = document.getElementById("nome-produto").name;
    const nome = document.getElementById("nome-produto").value;
    const preco = document.getElementById("preco").value;
    const descricao = document.getElementById("descricao").value;
  
    const categoria = document.getElementById("categoria");
    const categoriaDescricao =
      categoria.options[categoria.selectedIndex].textContent;
    const categoriaId = categoria.value;
  
    const dados = {
      id: id,
      categoria: {
        nome: categoriaDescricao,
        id: categoriaId,
      },
      nome: nome,
      descricao: descricao,
      preco: preco,
    };
  
    const addDados = {
      id: id,
      categoria: {
        nome: categoriaDescricao,
        id: categoriaId,
      },
      nome: nome,
      descricao: descricao,
      preco: preco,
      quantidade: 0,
      quantidadeMinima: 0,
    };
  
    if (id != null && id != "") {
      editarProduto(dados);
      return;
    }
  
    adicionarProduto(addDados);
  }

function adicionarProduto(dados) {
    fetch(`http://localhost:8080/produtos/adicionar/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(response => response.json())
        .then(async produto => {
            await preencherCampos(produto);
        })
        .catch(error => {
            console.error(error);
        });
    redirecionarParaListagem();
}

function obterProduto(id) {
    fetch(`http://localhost:8080/produtos/obter/?id=${id}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(async produto => {
            await preencherCampos(produto);
        })
        .catch(error => {
            console.error(error);
        });
}

function editarProduto(dados) {
    fetch(`http://localhost:8080/produtos/editar/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(response => response.json())
        .then(async produto => {
            await preencherCampos(produto);
        })
        .catch(error => {
            console.error(error);
        });
}

function listarCategoria() {
    fetch(`http://localhost:8080/categoria`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(categoria => {
            processarCategoria(categoria);
        })
        .catch(error => {
            console.error(error);
        });
}

function processarCategoria(categoria) {
    const select = document.getElementById('categoria');

    categoria.forEach(categoria => {
        var opcao = document.createElement("option");
        opcao.value = categoria.id;
        opcao.text = categoria.nome;
        select.appendChild(opcao);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const url = window.location.search;
    const parametros = new URLSearchParams(url);

    processarAcoes(parametros);

    listarCategoria();

    if (parametros.get('id') != "null")
        processarDados(parametros);

});

function processarAcoes(parametros) {
    acao = parametros.get('acao');
    let titulo = document.getElementById('titulo');

    switch (acao) {
        case 'visualizar':
            processarVisualizar();
            titulo.innerText = 'Visualizar Produto'
            break;
        case 'adicionar':
            titulo.innerText = 'Adicionar Produto'
            processarAdicionar();
            break;
        case 'editar':
            titulo.innerText = 'Editar Produto'
            processarAcaoPadrao();
            break;
        default:
            processarAcaoPadrao();
    }
}

function desabilitarCampos(campos) {
    campos.forEach(campo => {
        campo.disabled = true;
    });
}

function processarDados(parametros) {
    const id = parametros.get('id');

    obterProduto(id);
}

function processarVisualizar() {
    const btnSalvar = document.getElementById('btn-salvar');
    const btnCancelar = document.getElementById('btn-cancelar');

    btnSalvar.style.display = 'none';
    btnCancelar.style.display = 'none';
}

function processarAdicionar() {
    processarAcaoPadrao();
}

function processarAcaoPadrao() {
    const btnVoltar = document.getElementById('btn-voltar');

    btnVoltar.style.display = 'none';
}

document.getElementById('btn-voltar').addEventListener('click', () => {
    redirecionarParaListagem();
});

document.getElementById('btn-cancelar').addEventListener('click', () => {
    redirecionarParaListagem();
});

document.getElementById('btn-salvar').addEventListener('click', () => {
    processarDadosProduto();
});

function redirecionarParaListagem() {
    window.location.href = '../listagem/listagem.html';
}