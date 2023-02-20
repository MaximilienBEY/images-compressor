import { dialog } from "electron"
import settings from "electron-settings"

export interface Events {
  upload: {
    paths: string[]
  }
}

export interface FireEvents {
  upload: number
  done: undefined
}

export const eventsPromise = {
  openDialog: async () => {
    const { filePaths } = await dialog.showOpenDialog({
      properties: ["openFile", "multiSelections"],
      filters: [{ name: "Images", extensions: ["png"] }],
    })
    return filePaths
  },
  getTheme: async () => {
    return settings.get("theme").then(theme => (theme ? !!theme : true))
  },
  setTheme: async (theme: boolean) => {
    await settings.set("theme", theme)
  },
} as const
