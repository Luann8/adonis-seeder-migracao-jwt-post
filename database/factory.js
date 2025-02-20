// database/factory.js

const Factory = use('Factory')

Factory.blueprint('App/Models/User', faker => {
  return {
    email: faker.email(),
    password: faker.password(),
    username: faker.userName()
  }
})
