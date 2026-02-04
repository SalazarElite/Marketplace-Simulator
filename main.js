const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: false,
    webPreferences: {
      nodeIntegration: true,   // permite usar require no renderer
      contextIsolation: false  // desativa isolamento
    }
  });

  win.loadFile('index.html');
}

const { ipcMain } = require('electron');

ipcMain.on('quit-app', () => {
  app.quit();
});

app.whenReady().then(createWindow);