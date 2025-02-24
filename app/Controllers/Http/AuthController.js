'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class AuthController {
  async login({ request, auth, response }) {
    const { email, password } = request.post()
  
    try {
      const user = await User.findBy('email', email)
      if (!user) {
        return response.status(401).send({
          message: 'Credenciais inválidas.',
          error: 'Usuário não encontrado',
        })
      }
  
      const passwordValid = await Hash.verify(password, user.password)
      if (!passwordValid) {
        return response.status(401).send({
          message: 'Credenciais inválidas.',
          error: 'Senha incorreta',
        })
      }
  
      await auth.generate(user, { expiresIn: '1h' })
  
      // Redireciona para a página de cálculo
      return response.redirect('/calculo')
    } catch (error) {
      return response.status(500).send({
        message: 'Erro ao realizar login.',
        error: error.message,
      })
    }
  }
  

  async register({ request, response }) {
    const { username, email, password } = request.post()

    try {
      const userExists = await User.findBy('email', email)
      if (userExists) {
        return response.status(400).send({ message: 'Email já cadastrado' })
      }

      const user = await User.create({
        username,
        email,
        password: await Hash.make(password),
      })

      return response.status(201).send({
        message: 'Usuário registrado com sucesso!',
        user: { id: user.id, email: user.email, username: user.username },
      })
    } catch (error) {
      return response.status(500).send({
        message: 'Erro ao registrar usuário.',
        error: error.message,
      })
    }
  }
}

module.exports = AuthController
