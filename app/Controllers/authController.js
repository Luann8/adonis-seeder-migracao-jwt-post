const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    // Crie o payload com as informações do usuário
    const payload = { id: user.id, username: user.username };
    
    // Gera o token com a chave secreta e um tempo de expiração
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return token;
};

module.exports = generateToken;
