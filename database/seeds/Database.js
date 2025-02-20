'use strict'
const Env = use('Env')

module.exports = {
  connection: Env.get('DB_CONNECTION', 'sqlite'),
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite'
    },
    useNullAsDefault: true,
    debug: false
  }
}