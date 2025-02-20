const jwt = require('jsonwebtoken')

// Middleware para verificar o token JWT
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '') // Extrai o token do cabeçalho

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) // Verifica e decodifica o token com a chave secreta
    req.user = decoded // Salva o usuário decodificado na requisição
    next() // Passa para a próxima função ou rota
  } catch (err) {
    res.status(400).json({ message: 'Token inválido.' })
  }
}

module.exports = {
  verifyToken
}
