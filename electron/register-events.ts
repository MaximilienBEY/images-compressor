import { exec } from "child_process"
import { on, registerEventsPromise } from "../functions/events/back"
import { app, Notification, shell } from "electron"
import { mkdirSync } from "original-fs"

const registerEvents = () => {
  on("upload", async (event, { paths }) => {
    // const window = getWindow()
    const pngquant = "/opt/homebrew/bin/pngquant"
    const date = new Date().getTime().toString()
    const tempPath = `${app.getPath("temp")}images-compressor/${date}`
    event.fire("upload", -1)

    mkdirSync(tempPath, { recursive: true })
    for (let i = 0; i < paths.length; i++) {
      const percent = Math.round((i / paths.length) * 100)
      const path = paths[i]

      const fileName = path.split("/").pop()
      const newPath = `${tempPath}/${fileName}`
      event.fire("upload", percent)
      await new Promise<void>(resolve =>
        exec(`${pngquant} -o ${newPath} ${path}`, () => resolve())
      )
    }
    event.fire("upload", 100)

    new Notification({ title: "Images Compressor", body: "Done!" }).show()
    await shell.openPath(tempPath)
    event.fire("done", undefined)
  })
  registerEventsPromise()
}

export default registerEvents
