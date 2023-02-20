import { alpha, Box, Typography } from "@mui/material"
import { useCallback, useState } from "react"
import { waitEvent } from "../../functions/events/front"

interface Props {
  onChange: (value: string[]) => void
  disabled?: boolean
  disabledText?: string
}

const Dropzone = ({ onChange, disabled, disabledText }: Props) => {
  const [dragOver, setDragOver] = useState(false)

  const onClick = useCallback(async () => {
    if (disabled) return

    const paths = await waitEvent("openDialog")
    if (!paths.length) return

    onChange(paths)
  }, [disabled, onChange])
  const onDragEnter = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (e.dataTransfer.items[0]?.type !== "" || disabled) return
      setDragOver(true)
    },
    [disabled]
  )
  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (disabled) return

      e.preventDefault()
      e.stopPropagation()
      setDragOver(false)

      const paths = Array.from(e.dataTransfer.files)
        .map(file => file.path)
        .filter(path => path.endsWith(".png"))
      onChange(paths)
    },
    [disabled, onChange]
  )
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "default" : "pointer",
        height: 256,
        border: "2px dashed",
        borderColor: theme =>
          dragOver && !disabled
            ? theme.palette.primary.main
            : alpha(theme.palette.text.primary, 0.25),
        background: theme =>
          dragOver && !disabled
            ? alpha(theme.palette.primary.main, 0.1)
            : "transparent",
        transition: "all .3s",
        "&:hover": {
          borderColor: theme =>
            dragOver && !disabled
              ? theme.palette.primary.main
              : disabled
              ? alpha(theme.palette.text.primary, 0.25)
              : alpha(theme.palette.text.primary, 0.5),
          "& p": {
            color: theme =>
              dragOver && !disabled
                ? theme.palette.primary.main
                : disabled
                ? alpha(theme.palette.text.primary, 0.25)
                : alpha(theme.palette.text.primary, 0.5),
          },
        },
      }}
      onClick={onClick}
      onDragOver={e => e.preventDefault()}
      onDragEnter={onDragEnter}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
    >
      <Typography
        sx={{
          zIndex: -1,
          color: theme =>
            dragOver
              ? theme.palette.primary.main
              : alpha(theme.palette.text.primary, 0.25),
          transition: "all .3s",
          userSelect: "none",
        }}
      >
        {disabled && disabledText
          ? disabledText
          : "Glissez le(s) fichier(s) ou cliquez ici"}
      </Typography>
    </Box>
  )
}

export default Dropzone
