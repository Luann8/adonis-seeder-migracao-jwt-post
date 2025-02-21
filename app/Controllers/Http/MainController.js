'use strict'

class MainController {
  async index({ response }) {
    return response.send({
      message: 'Servidor funcionando! Use POST /login ou POST /calculate-average.',
    })
  }
}

module.exports = MainController
