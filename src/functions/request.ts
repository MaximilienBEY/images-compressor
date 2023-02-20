import { waitEvent } from "../../functions/events/front"
import { User } from "../@types/api"

export const login = (email: string, password: string) => {
  return waitEvent("login", email, password)
}

export const me = () => {
  return waitEvent("me")
}

export const fetchRounds = (user: User) => {
  return waitEvent("fetchRounds", user)
}

export const successRequest = (id: string, name: string) => {
  return waitEvent("successRequest", id, name)
}
