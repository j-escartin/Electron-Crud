const db = require('./db')

function insertStudent(name, email) {
  const stmt = db.prepare('INSERT INTO students (name, email) VALUES (?, ?)')
  stmt.run(name, email)
  stmt.finalize()
}

const getAllStudents = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM students', (err, rows) => {
      if(err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}

module.exports = {
  insertStudent,
  getAllStudents
}