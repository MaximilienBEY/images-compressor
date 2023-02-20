import { FireEvents } from "../../functions/events/types"

declare global {
  namespace Electron {
    interface IpcMainEvent {
      fire: <T extends keyof FireEvents>(type: T, data: FireEvents[T]) => void
    }
    interface BrowserWindow {
      upload_pid?: number
      canceling?: boolean
    }
  }
}

export {}
