import { BrowserWindow, ipcMain, IpcMainEvent } from "electron"
import { Events, eventsPromise, FireEvents } from "./types"

export const getWindow = () => BrowserWindow.getAllWindows()[0]

export const on = <T extends keyof Events>(
  type: T,
  callback: (event: IpcMainEvent, data: Events[T]) => void
) => {
  ipcMain.on("message", (event, message) => {
    event.fire = (type, data) => event.reply(type, data)
    if (message.type === type) callback(event, message.data)
  })
}
export const fire = <T extends keyof FireEvents>(
  event: IpcMainEvent,
  type: T,
  data: FireEvents[T]
) => {
  event.reply(type, data)
}

export const registerEventsPromise = () => {
  Object.keys(eventsPromise).map(key =>
    ipcMain.handle(key, (_: any, ...args: any[]) => {
      // @ts-ignore
      return eventsPromise[key](...args)
    })
  )
}
