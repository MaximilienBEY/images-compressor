import { Alert, Portal, Snackbar } from "@mui/material"
import React, { createContext, useCallback, useContext, useState } from "react"

type SnackbarType = {
  type: "success" | "error"
  message: string
}

const AlertContext = createContext<
  (content: string, type?: SnackbarType["type"]) => void
>(() => {})

export const useAlert = () => useContext(AlertContext)

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [snackbar, setSnackbar] = useState<SnackbarType | undefined>(undefined)
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const addSnackbar = useCallback(
    (content: string, type?: SnackbarType["type"]) => {
      setSnackbarOpen(false)
      setTimeout(() => {
        setSnackbar({ message: content, type: type || "success" })
        setSnackbarOpen(true)
      }, 0)
    },
    []
  )
  const alertClose = useCallback((_?: any, reason?: string) => {
    if (reason === "clickaway") return
    setSnackbarOpen(false)
  }, [])
  return (
    <AlertContext.Provider value={addSnackbar}>
      <Portal>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={alertClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          {snackbar && (
            <Alert
              onClose={alertClose}
              severity={snackbar.type}
              variant="filled"
            >
              {snackbar.message}
            </Alert>
          )}
        </Snackbar>
      </Portal>
      {children}
    </AlertContext.Provider>
  )
}
