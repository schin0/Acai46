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
            <a href="../colaborador/listagem/listagem.html">
                <img src="../../assets/img/cadastro-colaborador.png" />
                <p>CADASTRAR COLABORADORES</p>
            </a>
        </div>
        <div class="modulo">
            <img src="../../assets/img/relatorios.png" />
            <p>RELATÓRIOS</p>
        </div>
        <div class="modulo">
            <a href="../produto/listagem/listagem.html">
                <img src="../../assets/img/produtos.png" />
                <p>CADASTRAR PRODUTOS</p>
            </a>
        </div>
        <div class="modulo">
            <img src="../../assets/img/estoque.png" />
            <p>EDITAR ESTOQUE</p>
        </div>
        <div class="modulo">
            <a href="../colaborador/listagem/listagem.html">
                <img src="../../assets/img/colaboradores.png" />
                <p>DADOS DOS COLABORADORES</p>
            </a>
        </div>
        <div class="modulo">
            <img src="../../assets/img/fornecedores.png" />
            <p>CADASTRAR FORNECEDORES</p>
        </div>
        <div class="modulo">
            <img src="../../assets/img/caixa.png" />
            <p>CAIXA</p>
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
            <img src="../../assets/img/relatorios.png" />
            <p>RELATÓRIOS</p>
        </div>
        <div class="modulo">
            <img src="../../assets/img/vendas.png" />
            <p>VENDAS</p>
        </div>
        <div class="modulo">
            <img src="../../assets/img/caixa.png" />
            <p>CAIXA</p>
        </div>
    `;

    div.innerHTML = divsFuncionario;
}

processarDadosUsuario();