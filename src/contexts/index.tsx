import MuiTheme from "./MuiTheme"
import { AlertProvider } from "./Alert"
import { ThemeProvider } from "./Theme"

const Providers = (props: { children: React.ReactNode }) => {
  return (
    <AlertProvider>
      <ThemeProvider>
        <MuiTheme>{props.children}</MuiTheme>
      </ThemeProvider>
    </AlertProvider>
  )
}

export default Providers
