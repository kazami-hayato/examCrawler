// Modules to control application life and create native browser window
const {app, ipcMain,BrowserView, BrowserWindow} = require('electron')
const path = require('path')
require('electron-reload')(__dirname);

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    mainWindow.loadFile('index.html').then(() => {
    })

    // browserview
    let view = new BrowserView()
    mainWindow.setBrowserView(view)
    view.setBounds({ x: 0, y: 290, width: 800, height: 500 })
    view.webContents.loadURL('http://passport.ouchn.cn/Account/Login').then(()=>{})

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    let tableData = [{
        username: '1842000000000',
        password: '19830709'
    }, {
        username: '1842000000000',
        password: '19830709'
    }, {
        username: '1842000000000',
        password: '19830709'
    }, {
        username: '1842000000000',
        password: '19830709'
    },
    ]
    mainWindow.webContents.on('dom-ready', () => {
        mainWindow.webContents.send('ping', tableData)
    })
    ipcMain.on('ping', (event, arg) => {
        console.log(arg) // prints "ping"
        event.returnValue = 'pong'
        view.webContents.executeJavaScript("window.location.href='http://passport.ouchn.cn/Account/Login'").then(()=>{})
        //view.webContents.loadURL("http://passport.ouchn.cn/Account/Login").then(()=>{})
    })
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
