'use strict'

const Model = use('Model')

class User extends Model {
  static get primaryKey() {
    return 'id'
  }

  static get table() {
    return 'users'
  }

  static boot() {
    super.boot()

    // Remova ou comente este hook para evitar a criptografia de senhas
    // this.addHook('beforeSave', async (userInstance) => {
    //   if (userInstance.dirty.password) {
    //     userInstance.password = await Hash.make(userInstance.password)
    //   }
    // })
  }
}

module.exports = User
