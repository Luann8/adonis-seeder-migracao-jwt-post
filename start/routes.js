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
  console.log("Login solicitado")
  const { email, password } = request.post()

  try {
    const user = await auth.attempt(email, password)
    const token = await auth.generate(user, { expiresIn: '1h' })
    return response.send({
      message: 'Login realizado com sucesso!',
      token: token.token,
      user: { id: user.id, email: user.email }
    })
  } catch (error) {
    return response.status(401).send({
      message: 'Credenciais inválidas.',
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
