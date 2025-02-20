'use strict'

const { validate } = use('Validator')

class CalculateAverage {
  async metodo({ request, response }) {
    try {
      const numbers = request.input('numbers')

      // Verifica se o array contém exatamente 10 números
      if (!Array.isArray(numbers) || numbers.length !== 10) {
        return response.status(400).send({
          error: 'O corpo da requisição deve conter um array de exatamente 10 números inteiros.',
        })
      }

      // Verifica se todos os números são inteiros
      if (!numbers.every(Number.isInteger)) {
        return response.status(400).send({
          error: 'Todos os elementos do array devem ser números inteiros.',
        })
      }

      // Calcula a soma e a média
      const sum = numbers.reduce((acc, num) => acc + num, 0)
      const average = sum / numbers.length

      // Retorna a resposta com a média
      return response.send({
        message: 'Média calculada com sucesso.',
        average,
      })
    } catch (error) {
      return response.status(500).send({
        error: 'Erro interno no servidor.',
        details: error.message,
      })
    }
  }
}

module.exports = CalculateAverage
