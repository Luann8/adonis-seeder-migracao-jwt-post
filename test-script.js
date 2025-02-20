const { Ignitor } = require('@adonisjs/ignitor')

async function run() {
  try {
    await new Ignitor(require('@adonisjs/fold')).appRoot(__dirname).fire()

    const User = use('App/Models/User')  // Agora você pode usar o User do Adonis
    const users = await User.all()
    console.log(users.toJSON())
  } catch (error) {
    console.error('Erro ao executar o script:', error)
  }
}

run()
