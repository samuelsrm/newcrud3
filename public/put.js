let idPessoaAtualizar = null;
let dadosOriginaisPessoa = {}; // Guarda o registro completo para não perder campos (como CEP)

function buscarDados() {
    var cpfDigitado = document.getElementById('identificador').value.replace(/\D/g, '');

    if (!cpfDigitado) {
        alert("Por favor, digite um CPF para buscar.");
        return;
    }

    fetch('http://localhost:3000/pessoas')
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error("Erro ao conectar com o servidor.");
            }
            return resposta.json();
        })
        .then(dados => {
            let pessoaEncontrada = dados.find(pessoa => {
                let cpfBanco = String(pessoa.cpf || '').replace(/\D/g, '');
                return cpfBanco === cpfDigitado;
            });

            if (pessoaEncontrada) {
                idPessoaAtualizar = pessoaEncontrada.id;
                dadosOriginaisPessoa = pessoaEncontrada; // Salva os dados atuais

                const preencher = (idCampo, valor) => {
                    const elemento = document.getElementById(idCampo);
                    if (elemento) elemento.value = valor ?? '';
                };

                preencher('identificador', pessoaEncontrada.cpf);
                preencher('nomeAtualizar', pessoaEncontrada.nome);
                preencher('sobrenome', pessoaEncontrada.sobrenome);
                preencher('username', pessoaEncontrada.username);
                preencher('senha', pessoaEncontrada.senha);
                preencher('rg', pessoaEncontrada.rg);
                preencher('cpf', pessoaEncontrada.cpf);
                preencher('rua', pessoaEncontrada.rua);
                preencher('casa', pessoaEncontrada.casa);
                preencher('cidade', pessoaEncontrada.cidade);
                preencher('bairro', pessoaEncontrada.bairro);
                preencher('estado', pessoaEncontrada.estado);
                preencher('email', pessoaEncontrada.email);
                preencher('telefone', pessoaEncontrada.telefone);

                alert("Dados encontrados! Pode alterar e clicar em Atualizar.");
            } else {
                idPessoaAtualizar = null;
                dadosOriginaisPessoa = {};
                alert("Pessoa não encontrada!");
            }
        })
        .catch(erro => {
            console.error("Erro ao buscar dados:", erro);
            alert("Erro ao buscar dados: " + erro.message);
        });
}

function atualizarDados() {
    // Obriga a ter buscado antes para ter o ID verdadeiro do db.json
    if (!idPessoaAtualizar) {
        alert("Por favor, busque o CPF primeiro antes de clicar em Atualizar!");
        return;
    }

    const pegarValor = (idCampo, valorAntigo) => {
        const elemento = document.getElementById(idCampo);
        return elemento ? elemento.value : (valorAntigo ?? '');
    };

    // Mantém os dados antigos (como id e cep) e sobrescreve com os editados
    const dadosAtualizados = {
        ...dadosOriginaisPessoa,
        id: idPessoaAtualizar,
        nome: pegarValor('nomeAtualizar', dadosOriginaisPessoa.nome),
        sobrenome: pegarValor('sobrenome', dadosOriginaisPessoa.sobrenome),
        username: pegarValor('username', dadosOriginaisPessoa.username),
        senha: pegarValor('senha', dadosOriginaisPessoa.senha),
        rg: pegarValor('rg', dadosOriginaisPessoa.rg),
        cpf: pegarValor('cpf', dadosOriginaisPessoa.cpf),
        rua: pegarValor('rua', dadosOriginaisPessoa.rua),
        casa: pegarValor('casa', dadosOriginaisPessoa.casa),
        cidade: pegarValor('cidade', dadosOriginaisPessoa.cidade),
        bairro: pegarValor('bairro', dadosOriginaisPessoa.bairro),
        estado: pegarValor('estado', dadosOriginaisPessoa.estado),
        email: pegarValor('email', dadosOriginaisPessoa.email),
        telefone: pegarValor('telefone', dadosOriginaisPessoa.telefone)
    };

    fetch(`http://localhost:3000/pessoas/${idPessoaAtualizar}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosAtualizados)
    })
    .then(resposta => {
        if (!resposta.ok) {
            throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`);
        }
        return resposta.json();
    })
    .then(dados => {
        alert("Dados atualizados com sucesso!");
        location.reload(); // Atualiza a tabela na tela imediatamente
    })
    .catch(erro => {
        console.error("Erro no PUT:", erro);
        alert("Falha ao atualizar dados: " + erro.message);
    });
}