'use strict'
const Route = use('Route')

// Rota GET simples para a raiz (teste inicial)
Route.get('/', async ({ response }) => {
  return response.send({
    message: 'Servidor funcionando! Use POST /login ou POST /calculate-average.'
  })
})

// Rota de login com JWT
Route.post('/login', async ({ request, auth, response }) => {
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

// Rota protegida para cálculo de média
Route.post('/calculate-average', async ({ request, response, auth }) => {
  try {
    await auth.check()
    const { numbers } = request.post()
    if (!Array.isArray(numbers) || numbers.length !== 10) {
      return response.status(400).send({
        message: 'O array deve conter exatamente 10 números.'
      })
    }
    if (!numbers.every(num => typeof num === 'number')) {
      return response.status(400).send({
        message: 'Todos os elementos devem ser números.'
      })
    }
    const total = numbers.reduce((acc, num) => acc + num, 0)
    const average = total / numbers.length
    return response.send({
      message: 'A média foi calculada com sucesso!',
      average
    })
  } catch (error) {
    return response.status(401).send({
      message: 'Token inválido ou ausente.',
      error: error.message
    })
  }
}).middleware('auth')