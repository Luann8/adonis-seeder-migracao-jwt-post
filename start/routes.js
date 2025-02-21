'use strict'

const Route = use('Route')

// Rota GET simples para a raiz
Route.get('/', 'MainController.index')

// Rotas de autenticação
Route.post('/login', 'AuthController.login')
Route.post('/register', 'AuthController.register')

// Rota para cálculo de média protegida com middleware auth
Route.post('/calculate-average', 'CalculateAverageController.calcularMedia').middleware(['auth'])
