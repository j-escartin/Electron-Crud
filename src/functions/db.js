const sqlite3 = require('sqlite3').verbose()
const path = require('node:path')

const dbPath = path.resolve(__dirname, '..', 'enrollment.db')
const db = new sqlite3.Database(dbPath)

db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)'
  )
})

module.exports = db;