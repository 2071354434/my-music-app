const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    close: () => ipcRenderer.send('closed'),
    maximize: () => ipcRenderer.send('maximize'),
    minimize: () => ipcRenderer.send('minimize')



})