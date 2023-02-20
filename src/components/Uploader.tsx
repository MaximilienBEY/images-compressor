import { Box, Container, LinearProgress, Typography } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { fire, off, on } from "../../functions/events/front"
import { useAlert } from "../contexts/Alert"
import Dropzone from "./Dropzone"

const Uploader = () => {
  const addAlert = useAlert()
  const [percent, setPercent] = useState<number | null>(null)

  const handleChange = useCallback((paths: string[]) => {
    fire("upload", { paths })
  }, [])
  const handleSuccess = useCallback(() => {
    setPercent(null)
    addAlert("Conversion terminée !")
  }, [addAlert])

  useEffect(() => {
    on("upload", setPercent)
    on("done", handleSuccess)
    return () => {
      off("upload")
      off("done")
    }
  }, [handleSuccess])

  return (
    <Container
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      maxWidth="md"
    >
      <Box
        sx={{
          width: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          rowGap: 2,
        }}
      >
        <Dropzone onChange={handleChange} disabled={percent !== null} />
        {percent !== null && (
          <Box
            sx={{
              position: "absolute",
              top: "calc(100% + 24px)",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <LinearProgress
                variant={percent !== -1 ? "determinate" : "indeterminate"}
                color={"primary"}
                value={percent}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                minWidth: 80,
                columnGap: 0.5,
              }}
            >
              <Typography>{percent !== -1 ? `${percent}%` : "-.-%"}</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  )
}
export default Uploader
