var acao = '';

function obterColaborador(id) {
    fetch(`http://localhost:8080/colaboradores/obter/?id=${id}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(colaborador => {
            preencherCampos(colaborador);
        })
        .catch(error => {
            console.error(error);
        });
}

function preencherCampos(colaborador) {
    const nome = document.getElementById('nome-colaborador');
    const cpf = document.getElementById('cpf');
    const email = document.getElementById('email');
    const cargo = document.getElementById('cargo');
    const dataNascimento = document.getElementById('data-nascimento');
    const dataAdmissao = document.getElementById('data-admissao');

    nome.value = colaborador.nome;
    cpf.value = colaborador.cpf;
    email.value = colaborador.email;
    cargo.value = colaborador.cargo.descricao;
    dataNascimento.value = formatarData(colaborador.dataNascimento);
    dataAdmissao.value = formatarData(colaborador.dataAdmissao);

    if (acao == 'visualizar') {
        desabilitarCampos([nome, cpf, email, cargo, dataNascimento, dataAdmissao]);
    }
}

function formatarData(dataTexto) {
    const data = new Date(dataTexto);

    const ano = data.getFullYear();
    const mes = ('0' + (data.getMonth() + 1)).slice(-2);
    const dia = ('0' + data.getDate()).slice(-2);

    return ano + '-' + mes + '-' + dia;
}

function desabilitarCampos(campos) {
    campos.forEach(campo => {
        campo.disabled = true;
    });
}

document.getElementById('btn-voltar').addEventListener('click', () => {
    redirecionarParaHome();
})

function redirecionarParaHome() {
    window.location.href = '../home/home.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const url = window.location.search;
    const parametros = new URLSearchParams(url);

    processarAcoes(parametros);
    processarDados(parametros);
});

function processarAcoes(parametros) {
    acao = parametros.get('acao');
    let titulo = document.getElementById('titulo');

    switch (acao) {
        case 'visualizar':
            processarVisualizar();
            titulo.innerText = 'Visualizar colaborador'
            break;
        case 'adicionar':
            titulo.innerText = 'Adicionar colaborador'
            processarAcaoPadrao();
            break;
        case 'editar':
            titulo.innerText = 'Editar colaborador'
            processarAcaoPadrao();
            break;
        default:
            processarAcaoPadrao();
    }
}

function processarVisualizar() {
    const btnSalvar = document.getElementById('btn-salvar');
    const btnCancelar = document.getElementById('btn-cancelar');

    btnSalvar.style.display = 'none';
    btnCancelar.style.display = 'none';
}

function processarAcaoPadrao() {
    const btnVoltar = document.getElementById('btn-voltar');

    btnVoltar.style.display = 'none';
}

function processarDados(parametros) {
    const id = parametros.get('id');

    obterColaborador(id);
}