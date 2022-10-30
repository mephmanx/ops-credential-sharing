import path from 'path';
import { app, BrowserWindow, Menu, protocol } from 'electron';
import { menuTemplate } from './app/app';
import { IpcEvent } from './common/enums/commonEnums';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
app.setName('Ops Credential Sharing');

const initWindows = (): void => {
    const splashWindow = new BrowserWindow({
        height: 300,
        width: 600,
        frame: false,
        webPreferences: {
            contextIsolation: false
        }
    });
    splashWindow.loadFile(path.resolve(__dirname, './splash.html')).then(r => r != undefined ? console.log(r) :console.log("end"));

    const mainWindow = new BrowserWindow({
        height: 768,
        width: 1024,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            contextIsolation: false
        }
    });
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY).then(r => r != undefined ? console.log(r) :console.log("end"));

    mainWindow.once('ready-to-show', async () => {
        try {
            await initApp();
        } catch {
            //do Nothing
        } finally {
            //do Nothing
        }
        splashWindow.destroy();
        mainWindow.maximize();
        mainWindow.show();
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
    //do nothing
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
const initApp = async () => {
    try {
        //do nothing
    } catch {
        //Do nothing
    } finally {
        //Do nothing
    }
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
            // logErrors(error.message, error.stack);
            console.log(error.message, error.stack);
        } finally {
            callback(pathname);
        }
    });
};
