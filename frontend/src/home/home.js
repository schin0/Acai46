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
                    <i class="material-icons excluir">delete</i>
                    <i class="material-icons editar">edit</i>
                    <i class="material-icons visualizar" onclick="visualizarColaborador(${id})">visibility</i>
                </td>
            </tr>`;
}

function visualizarColaborador(id) {
    const url = new URLSearchParams();
    url.set('id', id);
    url.set('acao', 'visualizar');

    const paginaColaborador = `../colaborador/colaborador.html?${url.toString()}`;
    window.location.href = paginaColaborador;
}

listarColaboradores();