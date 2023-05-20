const pesquisa = document.getElementById('nome-colaborador');

pesquisa.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        // TODO: limpar dados ao buscar

        let nome = document.getElementById('nome-colaborador').value;
        listarColaboradores(nome);
    }
});


function listarColaboradores(nome = '') {
    fetch(`http://localhost:8080/colaboradores?nome=${nome}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(retorno => {
            const tabela = document.getElementById('tabela');

            retorno.forEach(colaborador => {
                tabela.innerHTML += montarLinhaTabela(colaborador.nome);
            });
        })
        .catch(error => {
            console.error(error);
        });
}

function montarLinhaTabela(nome) {
    return `<tr>
        <td class="icone-usuario">
            <i class="material-icons">person</i>
        </td>
        <td class="nome">${nome}</td>
        <td class="acoes">
            <i class="material-icons excluir">delete</i>
            <i class="material-icons editar">edit</i>
            <i class="material-icons visualizar">visibility</i>
        </td>
    </tr>`;
}

listarColaboradores();