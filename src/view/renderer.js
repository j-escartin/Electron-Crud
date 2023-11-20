const { ipcRenderer } = require('electron')

const form = document.getElementById('enrollmentForm')

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value
  const email = document.getElementById('email').value

  console.log(name + ' ' + email)

  ipcRenderer.send('submitStudent', {name, email})

  alert('New Student has been enrolled')

  document.getElementById('name').value = ''
  document.getElementById('email').value = ''
})

ipcRenderer.send('getStudents');

ipcRenderer.on('receiveStudents', (event, students) => {
  const studentList = document.getElementById('studentList')

  students.forEach((student) => {
    const row = document.createElement('tr')

    const idCell = document.createElement('td')
    idCell.textContent = student.id
    row.appendChild(idCell)

    const nameCell = document.createElement('td')
    nameCell.textContent = student.name
    row.appendChild(nameCell)

    const emailCell = document.createElement('td')
    emailCell.textContent = student.email
    row.appendChild(emailCell)

    studentList.appendChild(row)
  })

})