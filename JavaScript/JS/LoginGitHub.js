//Puxa dados do HTML
const usuarioInput = document.getElementById('usuario')
const senhaInput = document.getElementById('senha')
const mensagem = document.getElementById('mensagem')
const form = document.getElementById('meuFormulario')

//Variavel para o sistema de bloqueio
let tentativasErradas = 0
const limiteTentativas = 3

// Credenciais corretas, Mudar dependendo do projeto
const credenciais = {
    usuario: "admin",
    senha: "123"
}

// Expressões regulares para validação, Mudar dependendo do projeto
const regexUsuario = /^[a-zA-Z0-9]+$/

// Função para verificar o acesso
function verificarAcesso(event) {
    event.preventDefault()// Ele envia o formulário sem recarregar a página

    // Verifica se o usuário e a senha estão corretos
    if (usuarioInput.value.trim() === "" || senhaInput.value === "") {
        mensagem.style.color = "yellow"// Mudar dependendo do projeto
        mensagem.textContent = "Por favor, preencha todos os campos corretamente!"// Mudar dependendo do projeto
        return
    }//Verifica os campos vazios
    if (!regexUsuario.test(document.getElementById('usuario').value.trim())) {
        mensagem.style.color = "yellow"// Mudar dependendo do projeto
        mensagem.textContent = "O nome de usuário não pode conter caracteres especiais!"// Mudar dependendo do projeto
        return
    }//Verifica caracteres especiais
    if (usuarioInput.value.trim() === credenciais.usuario && senhaInput.value === credenciais.senha) {
        tentativasErradas = 0 // Reseta o contador de tentativas erradas ao fazer login com sucesso
        mensagem.style.color = "white"// Mudar dependendo do projeto
        mensagem.textContent = `Bem vindo ${usuarioInput.value}`// Mudar dependendo do projeto
        setTimeout(() => {
            window.location.replace("/HTML/index.html")
        }, 1000)
        return
    }//Verifica se está tudo certo

    //fim da verificação de credenciais


    //inicio da verificação de credenciais erradas
    tentativasErradas++
    if (tentativasErradas >= limiteTentativas) {
        const botao = form.querySelector('button')
        botao.disabled = true // Desabilita o botão de envio do formulário
        let segundosRestantes = 60
        mensagem.style.color = "red"// Mudar dependendo do projeto

        // Criamos um relogio que roda a cada 1000ms(1 segundo)
        const relogio = setInterval(() => {
            segundosRestantes--
            mensagem.textContent = `Muitas tentativas! Sistema bloquedo por ${segundosRestantes} segundos.`// Mudar dependendo do projeto

            //Se o tempo acabar, paramos o relogio
            if (segundosRestantes <= 0) {
                clearInterval(relogio)// Para o relogio
                botao.disabled = false // Habilita o botão após 1 minuto
                tentativasErradas = 0 // Reseta o contador de tentativas erradas
                mensagem.style.color = "white"// Mudar dependendo do projeto
                mensagem.textContent = "Sistema desbloqueado. Tente novamente."// Mudar dependendo do projeto
            }
        }, 1000)// Atualiza a cada segundo
        return
    } else {
        mensagem.style.color = "yellow"// Mudar dependendo do projeto
        mensagem.textContent = `Usuário ou senha incorreta! (${tentativasErradas}/${limiteTentativas})`// Mudar dependendo do projeto
    }
}
form.addEventListener('submit', verificarAcesso)// Escuta o evento de envio do formulário