const { ipcRenderer } = require('electron')

const form = document.getElementById('enrollmentForm')

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value
  const email = document.getElementById('email').value

  console.log(name + ' ' + email)

  ipcRenderer.send('submitStudent', {name, email})

  ipcRenderer.send('getStudents');

  alert('New Student has been enrolled')

  document.getElementById('name').value = ''
  document.getElementById('email').value = ''
})

ipcRenderer.send('getStudents');

ipcRenderer.on('receiveStudents', (event, students) => {
  const studentList = document.getElementById('studentList')
  studentList.innerHTML = ""

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

    const actionCell = document.createElement('td')
    actionCell.innerHTML = `<button class="btn btn-primary" onclick="editStudent(${student.id})">Edit</button>
     <button class="btn btn-warning" onclick="deleteStudent(${student.id})">Delete</button>`
    row.appendChild(actionCell)

    studentList.appendChild(row)
  })
})

function deleteStudent(id) {
  ipcRenderer.send('deleteStudent', {id})
  alert('Student was successfully deleted')
  ipcRenderer.send('getStudents');
  
}

function editStudent(id) {
  ipcRenderer.send('updateStudent', {id})
}
