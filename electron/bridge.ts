import { contextBridge, ipcRenderer } from "electron"

export const api = {
  fire: (message: { type: string; data: any }) => {
    ipcRenderer.send("message", message)
  },
  on: (channel: string, callback: any) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  },
  off: (channel: string) => {
    ipcRenderer.removeAllListeners(channel)
    // ipcRenderer.off(channel, (_, data) => callback(data))
    // ipcRenderer.off
  },
  sendEvent: (channel: string, ...args: any[]) => {
    return ipcRenderer.invoke(channel, ...args)
  },
}

contextBridge.exposeInMainWorld("Main", api)
