'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class UserSeeder {
  async run() {
    // Verifica se o usuário já existe
    const userExists = await User.findBy('email', 'usuario@example.com')

    if (!userExists) {
      await User.create({
        username: 'usuario_exemplo',
        email: 'usuario@example.com',
        password: await Hash.make('senha123') // Criptografando a senha
      })

      console.log('Usuário criado com sucesso!')
    } else {
      console.log('Usuário com esse email já existe.')
    }
  }
}

module.exports = UserSeeder
