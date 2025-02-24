const Route = use('Route')

// Página inicial
Route.get('/', async ({ auth, view }) => {
  let isLoggedIn = false
  try {
    await auth.check()
    isLoggedIn = true
  } catch (error) {
    isLoggedIn = false
  }
  return view.render('index', { isLoggedIn })
})

// Autenticação
Route.get('/login', ({ view }) => view.render('login'))
Route.post('/login', 'AuthController.login')
Route.get('/register', ({ view }) => view.render('register'))
Route.post('/register', 'AuthController.register')

// Página de cálculo (após login)
Route.get('/calculo', ({ view }) => view.render('calculate-average'))

// Processa o cálculo da média
Route.post('/calculate-average', 'CalculateAverageController.calculateAverage')