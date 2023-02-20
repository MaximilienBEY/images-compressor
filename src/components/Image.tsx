interface ImageProps {
  src: string
  alt?: string
}

const Image = (props: ImageProps) => {
  const src =
    window.location.hostname === "localhost" || !props.src.startsWith("/assets")
      ? props.src
      : `static:/${props.src}`
  return <img src={src} alt={props.alt ?? ""} />
}

export default Image
