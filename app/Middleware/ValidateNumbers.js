'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

class ValidateNumber {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response }, next) {
    const numbers = request.input('numbers')

    // Validação: Verifica se é um array de 10 números inteiros
    if (!Array.isArray(numbers) || numbers.length !== 10) {
      return response.status(400).send({
        error: 'O corpo da requisição deve conter um array de exatamente 10 números inteiros.',
      })
    }

    if (!numbers.every(Number.isInteger)) {
      return response.status(400).send({
        error: 'Todos os elementos do array devem ser números inteiros.',
      })
    }

    // Se a validação passar, continua para a próxima etapa (rota)
    await next()
  }
}

module.exports = ValidateNumber
