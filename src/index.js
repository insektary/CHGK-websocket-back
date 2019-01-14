import http from 'http';
import WebSocketServer from 'websocket';
import fs from 'fs';
import path from 'path';
// import {contentTypeDetector} from './utils/content-type-detector';
import {app, BrowserWindow} from 'electron';

let mainWindow = null;

function createWindow () {
    mainWindow = new BrowserWindow({width: 800, height: 600});

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
