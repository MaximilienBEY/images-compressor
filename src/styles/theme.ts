import { ThemeOptions } from "@mui/material"

export const getThemeOption = (dark: boolean): ThemeOptions => {
  return {
    palette: {
      mode: dark ? "dark" : "light",
      primary: { main: "#00B6AD" },
      text: {
        primary: dark ? "#ffffff" : "#000000",
        secondary: dark ? "#9d9d9d" : "#616161",
      },
      background: { default: dark ? "#292929" : "#ffffff" },
      divider: dark ? "#313131" : "#f5f5f5",
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
      },
    },
  }
}
