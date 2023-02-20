import { app, BrowserWindow, session, screen } from "electron"
import path from "path"
import { spawn } from "child_process"
import registerEvents from "./register-events"

const handleSquirrelEvent = () => {
  if (process.argv.length === 1) {
    return false
  }

  const appFolder = path.resolve(process.execPath, "..")
  const rootAtomFolder = path.resolve(appFolder, "..")
  const updateDotExe = path.resolve(path.join(rootAtomFolder, "Update.exe"))
  const exeName = path.basename(process.execPath)

  const spawnUpdate = (args: string[]) =>
    spawn(updateDotExe, args, { detached: true })

  const squirrelEvent = process.argv[1]
  switch (squirrelEvent) {
    case "--squirrel-install":
    case "--squirrel-updated":
      spawnUpdate(["--createShortcut", exeName])
      setTimeout(app.quit, 1000)
      return true
    case "--squirrel-uninstall":
      spawnUpdate(["--removeShortcut", exeName])
      setTimeout(app.quit, 1000)
      return true
    case "--squirrel-obsolete":
      app.quit()
      return true
  }
}

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

if (require("electron-squirrel-startup")) app.quit()
else if (!handleSquirrelEvent()) {
  const createWindow = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    mainWindow = new BrowserWindow({
      width,
      height,
      backgroundColor: "#191622",
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
      autoHideMenuBar: true,
      title: "Images Compressor",
    })

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

    mainWindow.on("closed", () => {
      mainWindow = null
    })
  }

  const registerStaticProtocol = () =>
    session.defaultSession.protocol.registerFileProtocol(
      "static",
      (request, callback) => {
        const fileUrl = request.url.replace("static://", "")
        const filePath = path.join(
          app.getAppPath(),
          ".webpack/renderer",
          fileUrl
        )
        callback(filePath)
      }
    )

  const gotTheLock = app.requestSingleInstanceLock()
  if (!gotTheLock) app.quit()
  else {
    app.on("second-instance", () => {
      mainWindow?.isMinimized() && mainWindow.restore()
      mainWindow?.focus()
    })
    app
      .on("ready", createWindow)
      .whenReady()
      .then(() => {
        registerEvents()
        registerStaticProtocol()
      })
      .catch(e => console.error(e))
  }

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit()
    }
  })

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
}
