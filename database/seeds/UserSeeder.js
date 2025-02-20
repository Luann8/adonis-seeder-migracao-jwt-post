'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')  // Importando o Hash

class UserSeeder {
  async run () {
    // Verifica se o usuário já existe
    const userExists = await User.findBy('email', 'usuario@example.com')

    if (!userExists) {
      // Cria um novo usuário se o email não existir
      const hashedPassword = await Hash.make('senha123')  // Criptografa a senha

      await User.create({
        email: 'usuario@example.com',
        password: hashedPassword,  // Usando a senha criptografada
        username: 'usuario_exemplo'
      })

      console.log('Usuário criado com sucesso!')
    } else {
      console.log('Usuário com esse email já existe.')
    }
  }
}

module.exports = UserSeeder
