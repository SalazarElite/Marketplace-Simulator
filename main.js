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

ipcMain.handle('set-resolution', (event, resolution) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win || !resolution) {
    return;
  }
  win.setSize(Number(resolution.width), Number(resolution.height));
});

ipcMain.handle('set-fullscreen', (event, payload) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win || !payload) {
    return;
  }
  win.setFullScreen(Boolean(payload.fullscreen));
});

app.whenReady().then(createWindow);
