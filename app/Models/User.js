'use strict'

const Model = use('Model')
const Hash = use('Hash')  // Para usar o Hash ao salvar senhas

class User extends Model {
  static get primaryKey() {
    return 'id'  // Definindo 'id' como chave primária
  }

  static get table() {
    return 'users'  // Certificando que estamos usando a tabela 'users'
  }

  static boot() {
    super.boot()

    // Definindo o hook para encriptar a senha antes de salvar
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }
}

module.exports = User
