function efetuarLogin(usuario, senha) {
    const dados = {
        usuario: usuario,
        senha: senha
    };

    // Faz a requisição POST para o endpoint de login
    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(response => response.json())
        .then(sucesso => {
            if (sucesso) {
                window.location.href = 'home/home.html';
                return;
            }

            alert('Usuário e/ou senha incorreto(s)!');
        })
        .catch(error => {
            console.error(error);
        });
}

function processarLogin() {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    efetuarLogin(usuario, senha);
}

document.getElementById('btn-entrar').addEventListener('click', processarLogin);