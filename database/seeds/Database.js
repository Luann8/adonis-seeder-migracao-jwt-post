'use strict'

const Env = use('Env')

module.exports = {
  connection: Env.get('DB_CONNECTION', 'sqlite'),

  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: Env.get('DB_DATABASE', 'database.sqlite'),
    },
    useNullAsDefault: true,
    debug: Env.get('DB_DEBUG', false),
  },
}
