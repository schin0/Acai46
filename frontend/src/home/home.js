console.log('oi');

fetch('http://localhost:8080/colaboradores', {
    method: 'GET'
})
    .then(response => response.json())
    .then(retorno => {
        console.log(retorno);
        const section = document.getElementById('lista');
        const lista = document.createElement('ul');

        retorno.forEach(colaborador => {
            const li = document.createElement('li');

            li.textContent = `
                Nome: ${colaborador.nome}; 
                CPF: ${colaborador.cpf};
                Email: ${colaborador.email};
                Cargo: ${colaborador.cargo?.descricao};
                Data Nascimento: ${colaborador.dataNascimento};
                Data Admissão: ${colaborador.dataNascimento};
                `;

            lista.append(li);
        });

        section.append(lista);
    })
    .catch(error => {
        console.error(error);
    });