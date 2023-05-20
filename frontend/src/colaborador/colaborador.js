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

    nome.name = colaborador.id;
    cargo.name = `${colaborador.cargo.descricao}-${colaborador.cargo.id}`;

    if (acao == 'visualizar')
        desabilitarCampos([nome, cpf, email, cargo, dataNascimento, dataAdmissao]);
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

document.getElementById('btn-salvar').addEventListener('click', () => {
    processarDadosColaborador();
});

function processarDadosColaborador() {
    const id = document.getElementById('nome-colaborador').name;
    const nome = document.getElementById('nome-colaborador').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const cargo = document.getElementById('cargo').value;
    const cargoId = parseInt(document.getElementById('cargo').name.split("-")[1]);;
    const dataNascimento = document.getElementById('data-nascimento').value;
    const dataAdmissao = document.getElementById('data-admissao').value;

    const cpfSemMascara = cpf.replace(/[^\d]/g, "");

    const dados = {
        id: id,
        cargo: {
            descricao: cargo,
            id: cargoId
        },
        cpf: cpfSemMascara,
        nome: nome,
        email: email,
        dataNascimento: dataNascimento,
        dataAdmissao: dataAdmissao
    };

    if (id != null && id != '') {
        editarColaborador(dados);
        return;
    }

    dados.senha = document.getElementById('senha').value;
    dados.cargo.id = 2;
    adicionarColaborador(dados);
}

function editarColaborador(dados) {
    fetch(`http://localhost:8080/colaboradores/editar/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(response => response.json())
        .then(colaborador => {
            console.log(colaborador);
            preencherCampos(colaborador);
        })
        .catch(error => {
            console.error(error);
        });
}

function adicionarColaborador(dados) {
    fetch(`http://localhost:8080/colaboradores/adicionar/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(response => response.json())
        .then(colaborador => {
            preencherCampos(colaborador);
        })
        .catch(error => {
            console.error(error);
        });
}

document.getElementById('btn-voltar').addEventListener('click', () => {
    redirecionarParaHome();
});

document.getElementById('btn-cancelar').addEventListener('click', () => {
    redirecionarParaHome();
});

function redirecionarParaHome() {
    window.location.href = '../home/home.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const url = window.location.search;
    const parametros = new URLSearchParams(url);

    processarAcoes(parametros);
    debugger
    let oi = parametros.get('id');
    if (parametros.get('id') != "null")
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
            processarAdicionar();
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

function processarAdicionar() {
    processarAcaoPadrao();

    const senha = document.getElementById('linha-senha');
    senha.style.display = 'block';
}

function processarAcaoPadrao() {
    const btnVoltar = document.getElementById('btn-voltar');

    btnVoltar.style.display = 'none';
}

function processarDados(parametros) {
    const id = parametros.get('id');

    obterColaborador(id);
}