import { DarkMode, LightMode } from "@mui/icons-material"
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material"
import { useCallback } from "react"
import { waitEvent } from "../../functions/events/front"
import { useTheme } from "../contexts/Theme"

const Navbar = () => {
  const [theme, setTheme] = useTheme()

  const handleTheme = useCallback(async () => {
    await waitEvent("setTheme", !theme)
    setTheme(!theme)
  }, [setTheme, theme])

  return (
    <AppBar
      sx={{
        backgroundColor: "background.default",
        backgroundImage: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "background.default",
          color: "text.primary",
          "& img": {
            height: 24,
          },
        }}
      >
        <Typography variant="h6">Image compressor</Typography>
        <Box
          sx={{
            display: "flex",
            columnGap: 1,
            alignItems: "center",
          }}
        >
          <IconButton
            sx={{ padding: 1, "& svg": { width: 16, height: 16 } }}
            onClick={handleTheme}
          >
            {!theme ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
