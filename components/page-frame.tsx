import React from "react"
import Container from "@material-ui/core/Container"
import { Typography } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"

export const PageFrame: React.FC<{ title: string }> = ({ children, title }) => {
  return (
    <Container style={{ marginTop: 25 }}>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <Paper>{children}</Paper>
    </Container>
  )
}
