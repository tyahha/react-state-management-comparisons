import "../styles/globals.css"
import type { AppProps /*, AppContext */ } from "next/app"
import AppBar from "@material-ui/core/AppBar"
import { Typography } from "@material-ui/core"
import Link from "next/link"
import Container from "@material-ui/core/Container"
import { RecoilRoot } from "recoil"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AppBar position={"static"}>
        <Typography variant={"h6"}>
          <Link href={"/"}>
            <a>React State Management Comparison</a>
          </Link>
        </Typography>
      </AppBar>
      <Container style={{ marginTop: 25 }}>
        <Component {...pageProps} />
      </Container>
    </RecoilRoot>
  )
}

export default MyApp
