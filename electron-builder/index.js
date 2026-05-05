const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;
let currentFilePath = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 650,
    minWidth: 500,
    minHeight: 350,
    frame: false,
    titleBarStyle: 'hidden',
    backgroundColor: '#1a1a1a',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    show: false,
  });

  mainWindow.loadFile('index.html');

 
  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.show();

    const args = process.argv.slice(2);
    const filePath = args.find(a => !a.startsWith('--'));

    if (filePath) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        currentFilePath = filePath;
        mainWindow.webContents.send('open-file', { content, filePath });
      } catch (e) {
        console.error('failed to open file:', e.message);
      }
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('window-state-change', 'maximized');
  });

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('window-state-change', 'normal');
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.on('window-minimize', () => mainWindow.minimize());
ipcMain.on('window-maximize', () => {
  if (mainWindow.isMaximized()) mainWindow.unmaximize();
  else mainWindow.maximize();
});
ipcMain.on('window-close', () => mainWindow.close());

ipcMain.handle('file-new', async (event, hasChanges) => {
  if (hasChanges) {
    const result = await dialog.showMessageBox(mainWindow, {
      type: 'question',
      buttons: ['Save', "Don't Save", 'Cancel'],
      defaultId: 0,
      title: 'KiriGraph',
      message: 'Do you want to save changes?',
    });
    if (result.response === 2) return { action: 'cancel' };
    if (result.response === 0) {
      if (currentFilePath) {
        return { action: 'cancel' };
      }
    }
  }
  currentFilePath = null;
  return { action: 'new' };
});

ipcMain.handle('file-open', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    filters: [
      { name: 'Text Files', extensions: ['txt', 'md', 'js', 'json', 'html', 'css', 'log', 'env'] },
      { name: 'All Files', extensions: ['*'] }
    ],
  });
  if (result.canceled || !result.filePaths[0]) return null;
  const filePath = result.filePaths[0];
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    currentFilePath = filePath;
    return { content, filePath };
  } catch (e) {
    dialog.showErrorBox('enceladus.editor', 'Could not read file: ' + e.message);
    return null;
  }
});

ipcMain.handle('file-save', async (event, content) => {
  if (currentFilePath) {
    try {
      fs.writeFileSync(currentFilePath, content, 'utf8');
      return { filePath: currentFilePath };
    } catch (e) {
      dialog.showErrorBox('enceladus.editor', 'Could not save file: ' + e.message);
      return null;
    }
  }
  return await doSaveAs(content);
});

ipcMain.handle('file-save-as', async (event, content) => {
  return await doSaveAs(content);
});

async function doSaveAs(content) {
  const result = await dialog.showSaveDialog(mainWindow, {
    filters: [
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'All Files', extensions: ['*'] }
    ],
  });
  if (result.canceled || !result.filePath) return null;
  try {
    fs.writeFileSync(result.filePath, content, 'utf8');
    currentFilePath = result.filePath;
    return { filePath: result.filePath };
  } catch (e) {
    dialog.showErrorBox('enceladus.editor', 'Could not save file: ' + e.message);
    return null;
  }
}
