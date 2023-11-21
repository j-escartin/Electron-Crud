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

const getStudent = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM students WHERE id = ?', [id], (err, row) => {
      if(err) {
        reject(err)
      } else {
        resolve(row)
      }
    })
  })
}

const deleteStudent = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM students WHERE id = ?', [id], (err) => {
      if(err) {
        reject(err)
      } else {
        resolve({message: 'Student was successfully deleted'})
      }
    })
  })
}

const updateStudent = (id, name, email) => {
  return new Promise((resolve, reject) => {
    db.run('UPDATE students SET name = ?, email = ? WHERE id = ?', [name, email, id], (err) => {
      if(err){
        reject(err)
      } else {
        resolve({message : 'Student was successfully updated!'})
      }
    })
  })
}

module.exports = {
  insertStudent,
  getAllStudents,
  getStudent,
  deleteStudent,
  updateStudent
}