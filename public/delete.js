function deletarDados() {
    let cpf = document.getElementById('identificadorDelete').value.replace(/\D/g, '');

    fetch('http://localhost:3000/pessoas')
        .then(resposta => resposta.json())
        .then(dados => {
            let pessoa = dados.find(p => String(p.cpf || '').replace(/\D/g, '') === cpf);

            if (!pessoa) {
                alert("CPF não encontrado!");
                return;
            }

            return fetch(`http://localhost:3000/pessoas/${pessoa.id}`, {
                method: 'DELETE'
            });
        })
        .then(resposta => {
            if (resposta && resposta.ok) {
                alert("Deletado com sucesso!");
                location.reload();
            }
        });
}