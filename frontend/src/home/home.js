const cargoEnum = {
    gerente: 1,
    funcionario: 2
}

async function processarDadosUsuario() {
    let dadosUsuario = obterDadosUsuario();

    let usuarioCargoId = dadosUsuario.usuarioCargoId;

    if (verificarPermissaoGerente(usuarioCargoId)) {
        await listarModulosGerente();
        return;
    }

    await listarModulosFuncionario();
}

function obterDadosUsuario() {
    return JSON.parse(localStorage.getItem('usuario'));
}

function verificarPermissaoGerente(usuarioCargoId) {
    return cargoEnum.gerente == usuarioCargoId;
}

async function listarModulosGerente() {
    const div = document.getElementById('conjunto-modulos');

    const divsGerente = `
        <div class="modulo">
            <img src="https://via.placeholder.com/80x80" />
            <p>CADASTRAR COLABORADORES</p>
        </div>
        <div class="modulo">
            <img src="https://via.placeholder.com/80x80" />
            <p>RELATÓRIOS</p>
        </div>
        <div class="modulo">
            <img src="https://via.placeholder.com/80x80" />
            <p>CADASTRAR PRODUTOS</p>
        </div>
        <div class="modulo">
            <img src="https://via.placeholder.com/80x80" />
            <p>EDITAR ESTOQUE</p>
        </div>
        <div class="modulo">
            <img src="https://via.placeholder.com/80x80" />
            <p>DADOS DOS COLABORADORES</p>
        </div>
        <div class="modulo">
            <img src="https://via.placeholder.com/80x80" />
            <p>CADASTRAR FORNECEDORES</p>
        </div>
        <div class="modulo">
            <img src="https://via.placeholder.com/80x80" />
            <p>CAIXA</p>
        </div>
    `;

    div.innerHTML = divsGerente;
}

async function listarModulosFuncionario() {
    const div = document.getElementById('conjunto-modulos');

    const divsFuncionario = `
        <div class="modulo">
            <img src="https://via.placeholder.com/80x80" />
            <p>PRODUTOS</p>
        </div>
        <div class="modulo">
            <img src="https://via.placeholder.com/80x80" />
            <p>RELATÓRIOS</p>
        </div>
        <div class="modulo">
            <img src="https://via.placeholder.com/80x80" />
            <p>VENDAS</p>
        </div>
        <div class="modulo">
            <img src="https://via.placeholder.com/80x80" />
            <p>CAIXA</p>
        </div>
    `;

    div.innerHTML = divsFuncionario;
}

processarDadosUsuario();