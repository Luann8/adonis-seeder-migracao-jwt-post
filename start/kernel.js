'use strict'
const Server = use('Server')

const globalMiddleware = ['Adonis/Middleware/BodyParser']
const namedMiddleware = {
  auth: 'Adonis/Middleware/Auth'
}
const serverMiddleware = []

Server
  .registerGlobal(globalMiddleware)
  .registerNamed(namedMiddleware)
  .use(serverMiddleware)