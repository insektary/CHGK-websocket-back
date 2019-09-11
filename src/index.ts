import {app, BrowserWindow} from 'electron';

let mainWindow = null;

const createWindow = () => {
    mainWindow = new BrowserWindow({width: 1200, height: 1000});

    mainWindow.loadFile('src/app/html/main.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};
  
app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    };
});
