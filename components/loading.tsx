import Backdrop from "@material-ui/core/Backdrop"
import CircularProgress from "@material-ui/core/CircularProgress"

export const Loading = ({ visible }: { visible: boolean }) => (
  <Backdrop open={visible}>
    <CircularProgress color="inherit" />
  </Backdrop>
)
