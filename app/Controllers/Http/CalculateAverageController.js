'use strict'

class CalculateAverageController {
  async calculateAverage({ request, view }) {
    const numbersInput = request.input('numbers');
    const numbers = numbersInput.split(',').map(Number);

    // Validação
    if (numbers.length !== 10 || numbers.some(isNaN)) {
      return view.render('calculate-average', {
        error: 'Por favor, insira exatamente 10 números válidos.',
      });
    }

    // Calcula a média
    const total = numbers.reduce((sum, num) => sum + num, 0);
    const average = total / numbers.length;

    return view.render('calculate-average', {
      success: `A média calculada é: ${average}`,
    });
  }
}

module.exports = CalculateAverageController;
