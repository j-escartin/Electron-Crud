const {app, BrowserWindow, ipcMain} = require('electron')
const db = require('./functions/db')
const { insertStudent, 
  getAllStudents, 
  deleteStudent, 
  getStudent,
  updateStudent } = require('./functions/query.js')

let mainWindow
let updateWindow

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  mainWindow.loadFile('src/view/index.html')

  mainWindow.on('closed', function() {
    mainWindow = null
  })
}

const createUpdateWindow = (studentData) => {
  updateWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  updateWindow.webContents.on('did-finish-load', () => {
    updateWindow.webContents.send('receiveStudentData', studentData)
  })
  updateWindow.loadFile('src/view/update.html')

  updateWindow.on('closed', function() {
    updateWindow = null
  })
}


app.whenReady().then(() => {
  createMainWindow();
  app.on('activate', () => {
    if(BrowserWindow.getAllWindows() === 0) createMainWindow();
  })
})

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') app.quit();
})

ipcMain.on('submitStudent', (event, data) => {
  try {
    insertStudent(data.name, data.email)
  } catch(err) {
    console.error(err);
  }
})

ipcMain.on('getStudents', (event, data) => {
  getAllStudents()
  .then((students) => {
    event.reply('receiveStudents', students)
  })
  .catch((err) => {
    console.error(err)
  })
})

ipcMain.on('deleteStudent', (event, data) => {
  deleteStudent(data.id)
  .then((message) => {
    console.log(message)
  })
  .catch((err) => {
    console.error(err)
  })
})

ipcMain.on('updateStudent', (event, data) => {
  getStudent(data.id)
  .then((student) => {
    mainWindow.close()
    createUpdateWindow(student)
  })
  .catch((err) => {
    console.error(err)
  })
})

ipcMain.on('navigateToIndex', () => {
  updateWindow.close()
  createMainWindow()
})

ipcMain.on('updateStudentData', (event, data) => {
  updateStudent(data.id, data.name, data.email)
  .then((message) => {
    console.log(message)
    updateWindow.close()
    createMainWindow()
  })
  .catch((err) => {
    console.error(err)
  })
})