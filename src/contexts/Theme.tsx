import { createContext, useContext, useEffect, useState } from "react"
import { waitEvent } from "../../functions/events/front"

export const ThemeContext = createContext<[boolean, (dark: boolean) => void]>([
  true,
  () => {},
])

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = (props: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(true)

  useEffect(() => {
    waitEvent("getTheme").then(setTheme)
  }, [])
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {props.children}
    </ThemeContext.Provider>
  )
}
