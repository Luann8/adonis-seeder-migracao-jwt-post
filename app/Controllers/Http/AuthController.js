'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class AuthController {
  async login({ request, auth, response }) {
    const { email, password, numbers } = request.post()

    try {
      const user = await User.findBy('email', email)
      if (!user) {
        return response.status(401).send({
          message: 'Credenciais inválidas.',
          error: 'Usuário não encontrado',
        })
      }

      const passwordValid = await Hash.verify(password, user.password)
      if (!passwordValid) {
        return response.status(401).send({
          message: 'Credenciais inválidas.',
          error: 'Senha incorreta',
        })
      }

      const token = await auth.generate(user, { expiresIn: '1h' })

      // Cálculo da média, se os números forem enviados
      if (numbers) {
        // Validação: Verifica se o array tem exatamente 10 números
        if (!Array.isArray(numbers) || numbers.length !== 10) {
          return response.status(400).send({
            message: 'O array deve conter exatamente 10 números.',
          })
        }

        // Validação: Verifica se todos os números são inteiros
        if (!numbers.every(Number.isInteger)) {
          return response.status(400).send({
            message: 'Todos os elementos devem ser números inteiros.',
          })
        }

        // Calcula a soma dos números
        const total = numbers.reduce((acc, num) => acc + num, 0)
        const average = total / numbers.length

        return response.send({
          message: 'Login realizado e média calculada com sucesso!',
          token: token.token,
          user: { id: user.id, email: user.email, username: user.username },
          average,
        })
      }

      // Caso apenas o login seja necessário
      return response.send({
        message: 'Login realizado com sucesso!',
        token: token.token,
        user: { id: user.id, email: user.email, username: user.username },
      })
    } catch (error) {
      return response.status(500).send({
        message: 'Erro ao realizar login.',
        error: error.message,
      })
    }
  }

  async register({ request, response }) {
    const { username, email, password } = request.post()

    try {
      const userExists = await User.findBy('email', email)
      if (userExists) {
        return response.status(400).send({ message: 'Email já cadastrado' })
      }

      const user = await User.create({
        username,
        email,
        password: await Hash.make(password),
      })

      return response.status(201).send({
        message: 'Usuário registrado com sucesso!',
        user: { id: user.id, email: user.email, username: user.username },
      })
    } catch (error) {
      return response.status(500).send({
        message: 'Erro ao registrar usuário.',
        error: error.message,
      })
    }
  }
}

module.exports = AuthController
