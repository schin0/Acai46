fetch('http://localhost:8080/teste')
    .then(response => response.json())
    .then(data => {
        const lista = document.getElementById('lista');
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.id} - ${item.gabriel}`;
            lista.appendChild(li);
        });
    })
    .catch(error => console.error(error));