const { ipcRenderer } = require('electron')

const updateForm = document.getElementById('updateForm')

ipcRenderer.on('receiveStudentData', (event, student) => {
    document.getElementById('id').value = student.id
    document.getElementById('name').value = student.name
    document.getElementById('email').value = student.email
})

function backToIndex() {
    ipcRenderer.send('navigateToIndex')
}

updateForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const id = document.getElementById('id').value
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value

    ipcRenderer.send('updateStudentData', {id, name, email})
})



