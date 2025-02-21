'use strict'

const Route = use('Route') // Importando o Route corretamente
const User = use('App/Models/User') // Importando o modelo User
const Hash = use('Hash') // Importando o Hash para criptografar as senhas

// Rota GET simples para a raiz (teste inicial)
Route.get('/', async ({ response }) => {
  console.log("Raiz acessada")
  return response.send({
    message: 'Servidor funcionando! Use POST /login ou POST /calculate-average.'
  })
})

// Rota de login com JWT
Route.post('/login', async ({ request, auth, response }) => {
  const { email, password } = request.post()

  try {
    // Verifica se o usuário existe
    const user = await User.findBy('email', email)
    if (!user) {
      return response.status(401).send({
        message: 'Credenciais inválidas.',
        error: 'Usuário não encontrado'
      })
    }

    // Verifica a senha usando Hash.verify
    const passwordValid = await Hash.verify(password, user.password)
    if (!passwordValid) {
      return response.status(401).send({
        message: 'Credenciais inválidas.',
        error: 'Senha incorreta'
      })
    }

    // Gera o token
    const token = await auth.generate(user, { expiresIn: '1h' })
    return response.send({
      message: 'Login realizado com sucesso!',
      token: token.token,
      user: { id: user.id, email: user.email, username: user.username }
    })
  } catch (error) {
    return response.status(500).send({
      message: 'Erro ao realizar login.',
      error: error.message
    })
  }
})

// Rota de registro de usuário
Route.post('/register', async ({ request, response }) => {
  console.log("Registro solicitado")
  const { username, email, password } = request.post()

  try {
    // Verifica se o email já está cadastrado
    const userExists = await User.findBy('email', email)
    if (userExists) {
      return response.status(400).send({ message: 'Email já cadastrado' })
    }

    // Cria o novo usuário
    const user = await User.create({
      username,
      email,
      password: await Hash.make(password) // Criptografa a senha antes de salvar
    })

    // Retorna a resposta de sucesso
    return response.status(201).send({
      message: 'Usuário registrado com sucesso!',
      user: { id: user.id, email: user.email, username: user.username }
    })
  } catch (error) {
    return response.status(500).send({
      message: 'Erro ao registrar usuário.',
      error: error.message
    })
  }
})

// Rota para calcular a média de 10 números
Route.post('/calculate-average', async ({ request, response }) => {
  const { numbers } = request.post()

  // Verifica se foram enviados exatamente 10 números
  if (!Array.isArray(numbers) || numbers.length !== 10) {
    return response.status(400).send({
      message: 'Você deve enviar exatamente 10 números.',
      error: 'Quantidade inválida de números'
    })
  }

  // Verifica se todos os elementos são números
  if (!numbers.every(num => typeof num === 'number')) {
    return response.status(400).send({
      message: 'Todos os valores devem ser números.',
      error: 'Valores inválidos na lista'
    })
  }

  // Calcula a média
  const sum = numbers.reduce((total, num) => total + num, 0)
  const average = sum / numbers.length

  // Retorna a resposta com a média
  return response.status(200).send({
    message: 'Cálculo realizado com sucesso!',
    average: average
  })
})
