import { app, BrowserWindow, Menu, protocol } from 'electron';
import 'reflect-metadata';
import 'source-map-support/register';
import * as _ from 'lodash';
import initBE from './be/be';
import { menuTemplate } from './app/app';
import { logErrors } from './be/logging';
import { IpcEvent } from './common/enums/commonEnums';
import * as path from "path";
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
const START_UP_TIMEOUT = 30 * 1000;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) app.quit();
app.setName('Ops Credential Sharing');

require('@electron/remote/main').initialize()

const initWindows = (): void => {
    const startUpTimeOut = setTimeout(() => {
        app.quit();
    }, START_UP_TIMEOUT);

    const splashWindow = new BrowserWindow({
        height: 300,
        width: 600,
        frame: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    });
    splashWindow.loadFile(path.resolve(__dirname, './splash.html')).then(r => r != undefined ? console.log(r) :console.log(""));

    const mainWindow = new BrowserWindow({
        height: 768,
        width: 1024,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            contextIsolation: false,
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
        }
    });
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY).then(r => r != undefined ? console.log(r) :console.log(""));

    mainWindow.once('ready-to-show', async () => {
        await initApp();
        splashWindow.destroy();
        mainWindow.maximize();
        mainWindow.show();
        clearTimeout(startUpTimeOut);
        mainWindow.webContents.send(IpcEvent.OnStartupExport);
    });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    customizeProtocol();
    initWindows();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', async () => {
    app.quit();
});

app.on('activate', () => {
    if (_.isEmpty(BrowserWindow.getAllWindows())) {
        initWindows();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
const initApp = async () => {
    await initBE();
    Menu.setApplicationMenu(menuTemplate);
};

/**
 * To make electron allows loading local files.
 */
const customizeProtocol = () => {
    protocol.registerFileProtocol('file', (request, callback) => {
        let pathname = request.url;
        try {
            pathname = decodeURI(request.url.replace('file:///', ''));
        } catch (error) {
            // There are some odd cases like special characters (ex: %)
            // do not get encoded automatically (wtf?) so decodeURI fails
            // because % is supposed to be %25 which it's not, or images with #
            // in name does not load on production (another wtf).
            // And many more undiscovered bugs...
            logErrors(error.message, error.stack);
        } finally {
            callback(pathname);
        }
    });
};
