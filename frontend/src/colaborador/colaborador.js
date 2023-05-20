
function obterColaborador(id) {
    fetch(`http://localhost:8080/colaboradores/obter/?id=${id}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(colaborador => {
            const section = document.getElementById('dados');

            section.innerHTML = `
                <div>
                    <h1>${colaborador.nome}<h1/>
                </div>
                <div>
                    <p>${colaborador.cargo.descricao}<p/>
                    <p>${colaborador.email}<p/>
                    <p>${colaborador.cpf}<p/>
                    <p>${formatarData(colaborador.dataNascimento)}<p/>
                    <p>${formatarData(colaborador.dataAdmissao)}<p/>
                </div>
            `;
        })
        .catch(error => {
            console.error(error);
        });
}

function formatarData(dataTexto) {
    const data = new Date(dataTexto);
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    const diaFormatado = dia.toString().padStart(2, '0');
    const mesFormatado = mes.toString().padStart(2, '0');

    return `${diaFormatado}/${mesFormatado}/${ano}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const url = window.location.search;
    const parametros = new URLSearchParams(url);
    const id = parametros.get('id');

    obterColaborador(id);
});