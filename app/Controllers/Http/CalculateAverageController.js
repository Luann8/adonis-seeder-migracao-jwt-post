'use strict'

const { validate } = use('Validator')

class CalculateAverageController {
  async calcularMedia({ request, response, auth }) {
    try {
      // Verifica se o token é válido
      await auth.check()

      // Obtém os números do corpo da requisição
      const numbers = request.input('numbers')

      // Validação: Verifica se o array tem exatamente 10 números
      if (!Array.isArray(numbers) || numbers.length !== 10) {
        return response.status(400).send({
          message: 'O array deve conter exatamente 10 números.'
        })
      }

      // Validação: Verifica se todos os números são inteiros
      if (!numbers.every(Number.isInteger)) {
        return response.status(400).send({
          message: 'Todos os elementos devem ser números inteiros.'
        })
      }

      // Calcula a soma dos números
      const total = numbers.reduce((acc, num) => acc + num, 0)
      const average = total / numbers.length  // Calcula a média

      // Retorna a resposta com a média
      return response.send({
        message: 'A média foi calculada com sucesso!',
        average
      })
      
    } catch (error) {
      // Retorna erro 401 se o token for inválido ou ausente
      return response.status(401).send({
        message: 'Token inválido ou ausente.',
        error: error.message
      })
    }
  }
}

module.exports = CalculateAverageController
