function enviarDados() {
    var nome = document.getElementById('postNome').value;
    var sobrenome = document.getElementById('postSobrenome').value;
    var username = document.getElementById('postUsername').value;
    var cpf = document.getElementById('postCpf').value;
    var email = document.getElementById('postEmail').value;
    var senha = document.getElementById('postSenha').value;
    var rua = document.getElementById('postRua').value;
    var cep = document.getElementById('postCep').value;
    var cidade = document.getElementById('postCidade').value;
    var estado = document.getElementById('postEstado').value;
    var telefone = document.getElementById('postTelefone').value;

    fetch('http://localhost:3000/pessoas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            sobrenome: sobrenome,
            username: username,
            cpf: cpf,
            email: email,
            senha: senha,
            rua: rua,
            cep: cep,
            cidade: cidade,
            estado: estado,
            telefone: telefone
        })
    })
    .then(resposta => {
        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar: " + resposta.statusText);
        }
        return resposta.json();
    })
    .then(dados => {
        alert("Usuário cadastrado com sucesso!");
        location.reload(); // Atualiza a tabela automaticamente
    })
    .catch(erro => {
        console.error("Erro no POST:", erro);
        alert("Erro ao cadastrar: " + erro.message);
    });
}