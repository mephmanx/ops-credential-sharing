import * as electron from "electron";
import * as fs from "fs";

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");
console.log(db.version);
import contextBridge = Electron.contextBridge;
import ipcRenderer = Electron.ipcRenderer;

contextBridge.exposeInMainWorld("electron", {
    notificationApi: {
        sendNotification(message: any) {
            ipcRenderer.send("notify", message);
        },
    },
    batteryApi: {},
    fileApi: {},
});

contextBridge.exposeInMainWorld("fs", {
    notificationApi: {
        sendNotification(message: any) {
            ipcRenderer.send("notify", message);
        },
    },
    batteryApi: {},
    fileApi: {},
});

contextBridge.exposeInMainWorld("sqlite3", {
    notificationApi: {
        sendNotification(message: any) {
            ipcRenderer.send("notify", message);
        },
    },
    batteryApi: {},
    fileApi: {},
});