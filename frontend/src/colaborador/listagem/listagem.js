const pesquisa = document.getElementById('nome-colaborador');

pesquisa.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();

        let nome = document.getElementById('nome-colaborador').value;
        listarColaboradores(nome);
    }
});

function listarColaboradores(nome = '') {
    const tabela = document.getElementById('tabela');
    tabela.innerHTML = '';

    fetch(`http://localhost:8080/colaboradores?nome=${nome}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(retorno => {

            retorno.forEach(colaborador => {
                tabela.innerHTML += montarLinhaTabela(colaborador.nome, colaborador.id);
            });
        })
        .catch(error => {
            console.error(error);
        });
}

function montarLinhaTabela(nome, id) {
    return `<tr>
                <td class="icone-usuario">
                    <i class="material-icons">person</i>
                </td>
                <td class="nome">${nome}</td>
                <td class="acoes">
                    <i class="material-icons excluir" onclick="excluirColaborador('${nome}', ${id})">delete</i>
                    <i class="material-icons editar" onclick="processarAcaoColaborador('editar', ${id})">edit</i>
                    <i class="material-icons visualizar" onclick="processarAcaoColaborador('visualizar', ${id})">visibility</i>
                </td>
            </tr>`;
}

function processarAcaoColaborador(acao, id = null) {
    const url = new URLSearchParams();
    url.set('acao', acao);
    url.set('id', id);

    const paginaColaborador = `../cadastro/colaborador.html?${url.toString()}`;
    window.location.href = paginaColaborador;
}

document.getElementById('btn-adicionar').addEventListener('click', () => {
    processarAcaoColaborador('adicionar');
});

function excluirColaborador(nome, id) {
    const confirmacao = window.confirm(`Deseja mesmo excluir o colaborador ${nome}?`);

    if (confirmacao) {
        fetch(`http://localhost:8080/colaboradores/excluir/?id=${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(sucesso => {
                if (sucesso)
                    alert('Colaborador excluído com sucesso!');

                let nome = document.getElementById('nome-colaborador').value;
                listarColaboradores(nome);
            })
            .catch(error => {
                console.error(error);
            });
    }
}

listarColaboradores();