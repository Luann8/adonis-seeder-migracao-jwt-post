'use strict'
const Server = use('Server')

// Middlewares globais
const globalMiddleware = [
  'Adonis/Middleware/BodyParser',
]

// Middlewares nomeados
const namedMiddleware = {
  auth: 'Adonis/Middleware/Auth',
}

// Middlewares do servidor
const serverMiddleware = [
  'Adonis/Middleware/Static', // Serve arquivos estáticos da pasta public
]

Server
  .registerGlobal(globalMiddleware)
  .registerNamed(namedMiddleware)
  .use(serverMiddleware) // Adicione o middleware de arquivos estáticos aqui
