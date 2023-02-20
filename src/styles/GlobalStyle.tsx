import { Global, css } from "@emotion/react"

const getUrl = (url: string) => {
  return window.location.hostname === "localhost" || !url.startsWith("/assets")
    ? url
    : `static:/${url}`
}

export const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: Roboto, sans-serif;
        }

        .material-icons {
          font-family: "Material Icons";
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          font-feature-settings: "liga";
          -webkit-font-feature-settings: "liga";
          -webkit-font-smoothing: antialiased;
        }

        @font-face {
          font-family: "Material Icons";
          font-style: normal;
          font-weight: 400;
          src: url("${getUrl("/assets/fonts/material-icons.woff2")}")
            format("woff2");
        }

        @font-face {
          font-family: "Roboto";
          font-style: normal;
          font-weight: 400;
          src: local(""),
            url("${getUrl("/assets/fonts/roboto-v29-latin-regular.woff2")}")
              format("woff2"),
            url("${getUrl("/assets/fonts/roboto-v29-latin-regular.woff")}")
              format("woff");
        }

        @font-face {
          font-family: "Roboto";
          font-style: italic;
          font-weight: 400;
          src: local(""),
            url("${getUrl("/assets/fonts/roboto-v29-latin-italic.woff2")}")
              format("woff2"),
            url("${getUrl("/assets/fonts/roboto-v29-latin-italic.woff")}")
              format("woff");
        }

        @font-face {
          font-family: "Roboto";
          font-style: normal;
          font-weight: 700;
          src: local(""),
            url("${getUrl("/assets/fonts/roboto-v29-latin-700.woff2")}")
              format("woff2"),
            url("${getUrl("/assets/fonts/roboto-v29-latin-700.woff")}")
              format("woff");
        }

        @font-face {
          font-family: "Roboto";
          font-style: italic;
          font-weight: 700;
          src: local(""),
            url("${getUrl("/assets/fonts/roboto-v29-latin-700italic.woff2")}")
              format("woff2"),
            url("${getUrl("/assets/fonts/roboto-v29-latin-700italic.woff")}")
              format("woff");
        }
      `}
    />
  )
}
