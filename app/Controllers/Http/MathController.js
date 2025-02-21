'use strict'

class MathController {
  async calculateAverage({ request, response }) {
    const { numbers } = request.post()

    if (!Array.isArray(numbers) || numbers.length !== 10) {
      return response.status(400).send({
        message: 'Você deve enviar exatamente 10 números.',
        error: 'Quantidade inválida de números',
      })
    }

    if (!numbers.every((num) => typeof num === 'number')) {
      return response.status(400).send({
        message: 'Todos os valores devem ser números.',
        error: 'Valores inválidos na lista',
      })
    }

    const sum = numbers.reduce((total, num) => total + num, 0)
    const average = sum / numbers.length

    return response.status(200).send({
      message: 'Cálculo realizado com sucesso!',
      average,
    })
  }
}

module.exports = MathController
