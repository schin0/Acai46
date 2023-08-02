const cargoEnum = {
    gerente: 1,
    funcionario: 2
}

async function processarDadosUsuario() {
    let dadosUsuario = obterDadosUsuario();

    let usuarioCargoId = dadosUsuario.usuarioCargoId;

    if (verificarPermissaoGerente(usuarioCargoId)) {
        await listarModulosGerente();
        preencherUsuario(dadosUsuario);

        return;
    }

    await listarModulosFuncionario();
    preencherUsuario(dadosUsuario);
}

function obterDadosUsuario() {
    return JSON.parse(localStorage.getItem('usuario'));
}

function verificarPermissaoGerente(usuarioCargoId) {
    return cargoEnum.gerente == usuarioCargoId;
}

function preencherUsuario(dadosUsuario) {
    document.getElementById('nome-colaborador').textContent  = dadosUsuario.usuario;
    document.getElementById('cargo-colaborador').textContent  = obterTextoCargo(dadosUsuario.usuarioCargoId);
}

function obterTextoCargo(usuarioCargoId) {
    return usuarioCargoId == cargoEnum.funcionario ? "Funcionário" : "Gerente";
}

async function listarModulosGerente() {
    const div = document.getElementById('conjunto-modulos');

    const divsGerente = `
        <div class="modulo">
            <a href="../colaborador/listagem/listagem.html">
                <img src="../../assets/img/cadastro-colaborador.png" />
                <p>CADASTRAR COLABORADORES</p>
            </a>
        </div>
        <div class="modulo">
            <img src="../../assets/img/relatorios.png" class="desabilitado" />
            <p class="desabilitado">RELATÓRIOS</p>
        </div>
        <div class="modulo">
            <a href="../produto/listagem/listagem.html">
                <img src="../../assets/img/produtos.png" />
                <p>CADASTRAR PRODUTOS</p>
            </a>
        </div>
        <div class="modulo">
            <img src="../../assets/img/estoque.png" class="desabilitado"/>
            <p class="desabilitado">EDITAR ESTOQUE</p>
        </div>
        <div class="modulo">
            <a href="../colaborador/listagem/listagem.html">
                <img src="../../assets/img/colaboradores.png" />
                <p>DADOS DOS COLABORADORES</p>
            </a>
        </div>
        <div class="modulo">
            <img src="../../assets/img/fornecedores.png" class="desabilitado"/>
            <p class="desabilitado">CADASTRAR FORNECEDORES</p>
        </div>
        <div class="modulo-caixa">
            <img src="../../assets/img/caixa.png" class="desabilitado"/>
            <p class="desabilitado">CAIXA</p>
        </div>
    `;

    div.innerHTML = divsGerente;
}

async function listarModulosFuncionario() {
    const div = document.getElementById('conjunto-modulos');

    const divsFuncionario = `
        <div class="modulo">
            <a href="../produto/listagem/listagem.html">
                <img src="../../assets/img/produtos.png" />
                <p>PRODUTOS</p>
            </a>
        </div>
        <div class="modulo">
            <img src="../../assets/img/relatorios.png" class="desabilitado" />
            <p class="desabilitado">RELATÓRIOS</p>
        </div>
        <div class="modulo">
            <img src="../../assets/img/vendas.png" class="desabilitado"/>
            <p class="desabilitado">VENDAS</p>
        </div>
        <div class="modulo-caixa">
            <img src="../../assets/img/caixa.png" class="desabilitado" />
            <p class="desabilitado">CAIXA</p>
        </div>
    `;

    div.innerHTML = divsFuncionario;
}

processarDadosUsuario();