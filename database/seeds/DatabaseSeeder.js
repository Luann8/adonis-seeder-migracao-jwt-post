/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User') // Importando o modelo de usuário

class DatabaseSeeder {
  async run() {
    // Criar um usuário manualmente
    const user = await User.create({
      username: 'usuario_exemplo',
      email: 'usuario@example.com',
      password: 'senha123', // Certifique-se de que o modelo User tem um hook para hash da senha
    })

    console.log('Usuário criado:', user.toJSON())
  }
}

module.exports = DatabaseSeeder
