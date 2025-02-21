'use strict'

const User = use('App/Models/User')

class UserController {
  async store({ request, response }) {
    const data = request.only(['email', 'password', 'username'])

    try {
      // Cria um novo usuário com os dados fornecidos
      const user = await User.create(data)

      return response.status(201).send({
        message: 'Usuário criado com sucesso!',
        user: user
      })
    } catch (error) {
      return response.status(500).send({
        message: 'Erro ao criar o usuário.',
        error: error.message
      })
    }
  }
}

module.exports = UserController
