const {app, BrowserWindow, ipcMain} = require('electron')
const db = require('./functions/db')
const { insertStudent, getAllStudents } = require('./functions/query.js')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
  win.loadFile('src/view/index.html')
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if(BrowserWindow.getAllWindows() === 0) createWindow();
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
  console.log('Hello')
  getAllStudents()
  .then((students) => {
    event.reply('receiveStudents', students)
  })
  .catch((err) => {
    console.error(err)
  })
})