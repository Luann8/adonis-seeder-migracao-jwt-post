'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')
const { validate } = use('Validator')

class AuthController {
  // Função de login
  async login({ request, response, auth }) {
    const { email, password } = request.all()

    // Validação do email e senha
    const rules = {
      email: 'required|email',
      password: 'required|min:6'
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      return response.status(400).send(validation.messages())
    }

    try {
      // Tenta encontrar o usuário pelo email
      const user = await User.findByOrFail('email', email)

      // Verifica se a senha fornecida corresponde ao hash armazenado no banco
      const isValid = await Hash.verify(password, user.password)

      if (!isValid) {
        return response.status(401).json({ message: 'Credenciais inválidas.' })
      }

      // Gera o token de autenticação para o usuário
      const token = await auth.generate(user)

      return response.json({ user, token })

    } catch (error) {
      return response.status(401).json({ message: 'Credenciais inválidas.' })
    }
  }
}

module.exports = AuthController
