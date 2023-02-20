import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material"
import { getThemeOption } from "../styles/theme"
import { useTheme } from "./Theme"

const MuiTheme = ({ children }: { children: React.ReactNode }) => {
  const [theme] = useTheme()
  return (
    <MuiThemeProvider theme={createTheme(getThemeOption(theme))}>
      {children}
    </MuiThemeProvider>
  )
}

export default MuiTheme
