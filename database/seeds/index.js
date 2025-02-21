// database/seeds/index.js
const UserSeeder = require('./UserSeeder')

class DatabaseSeeder {
  async run() {
    await UserSeeder.run()
  }
}

module.exports = DatabaseSeeder
