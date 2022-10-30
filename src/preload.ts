import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("electron", {
    notificationApi: {
        sendNotification(message: any) {
            ipcRenderer.send("notify", message);
        },
    },
    batteryApi: {},
    fileApi: {},
});