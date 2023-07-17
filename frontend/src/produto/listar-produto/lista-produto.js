const pesquisa = document.getElementById('nome-produtos');
const lupaNome = document.getElementById('lupa-nome');

lupaNome.addEventListener('click', ()=>{
    let nome = document.getElementById('nome-produtos').value;
    listarProdutos(nome);
    
} );

pesquisa.addEventListener('keydown', (e) => {
    if (e.keyCode === 13 ) {
        e.preventDefault();

        let nome = document.getElementById('nome-produtos').value;
        listarProdutos(nome);
        
    }
});


async function prencherCampoCategoria(categoria){
    const nomeCategoria = document.getElementById('')
}

function listarProdutos(nome = '') {
    const tabela = document.getElementById('tabela');
    tabela.innerHTML = `<thead>
                            <tr>
                                <th>id</th>
                                <th>produto</th>
                                <th>descrição</th>
                                <th>categoria</th>
                                <th>R$ valor</th>
                                <th></th>
                            </tr>
                        </thead>`;

    fetch(`http://localhost:8080/produtos?nome=${nome}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(retorno => {

            retorno.forEach(produto => {
                tabela.innerHTML += montarLinhaTabela(produto.nome, produto.id, produto.descricao, produto.categoria.nome, produto.preco);
            });
        })
        .catch(error => {
            console.error(error);
            window.alert("fudeu")
        });
    
    listarCategoria();
}

function montarLinhaTabela(nome, id, descricao, categoria, preco) {
    return `<tbody>
                <tr>
                    <td class="icone-usuario">
                     <p>${id}</p>
                    </td>
                    <td class="nome">${nome}</td>
                    <td class="descricao">${descricao}</td>
                    <td class="categoria">${categoria}</td>
                    <td class="valor">R$ ${preco}</td>

                    <td class="acoes">
                        <i class="material-icons excluir" onclick="excluirProduto('${nome}', ${id})">delete</i>
                        <i class="material-icons editar" onclick="processarAcaoProduto('editar', ${id})">edit</i>
                    </td>
                </tr>
            </tbody>`;
}

function processarAcaoProduto(acao, id = null) {
    const url = new URLSearchParams();
    url.set('acao', acao);
    url.set('id', id);

    const paginaProduto = `../crud-produto/produto.html?${url.toString()}`;
    window.location.href = paginaProduto;
}

document.getElementById('btn-adicionar').addEventListener('click', () => {
    processarAcaoProduto('adicionar');
});

function excluirProduto(nome, id) {
    const confirmacao = window.confirm(`Deseja mesmo excluir o produto ${nome}?`);

    if (confirmacao) {
        fetch(`http://localhost:8080/produtos/excluir/?id=${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(sucesso => {
                if (sucesso)
                    console.log('produto excluído com sucesso!');

                let nome = document.getElementById('nome-produtos').value;
                listarProdutos(nome);
            })
            .catch(error => {
                console.error(error);
            });
    }
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

listarProdutos();