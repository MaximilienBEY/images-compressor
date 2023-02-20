import { Events, eventsPromise, FireEvents } from "./types"

export const fire = <T extends keyof Events>(type: T, data: Events[T]) => {
  window.Main.fire({
    type,
    data,
  })
}

export const on = <T extends keyof FireEvents>(
  type: T,
  callback: (data: FireEvents[T]) => void
) => {
  window.Main.on(type, callback)
}
export const off = <T extends keyof FireEvents>(type: T) => {
  window.Main.off(type)
}

type EventsPromise = typeof eventsPromise
export const waitEvent = <
  T extends keyof EventsPromise,
  P extends Parameters<EventsPromise[T]>
>(
  name: T,
  ...parameters: P
): ReturnType<EventsPromise[T]> => {
  return window.Main.sendEvent(name, ...parameters) as any
}
