'use strict'

const User = use('App/Models/User')

class DatabaseSeeder {
  async run() {
    const userExists = await User.findBy('email', 'usuario@example.com')

    if (!userExists) {
      const user = await User.create({
        username: 'usuario_exemplo',
        email: 'usuario@example.com',
        password: 'senha123', // A senha será criptografada automaticamente
      })

      console.log('Usuário criado:', user.toJSON())
    } else {
      console.log('Usuário com esse email já existe.')
    }
  }
}

module.exports = DatabaseSeeder
