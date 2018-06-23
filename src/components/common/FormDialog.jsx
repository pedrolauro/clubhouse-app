import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import { withStyles } from '@material-ui/core/styles'
import withMobileDialog from '@material-ui/core/withMobileDialog'

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
}

function Transition(props) {
  return <Slide direction="up" {...props} />
}

const FormDialog = ({
  fullScreen,
  open = false,
  handleClose,
  handleConfirm,
  title,
  content,
  confirmText = 'Salvar',
  classes,
}) => (
  <Dialog
    fullScreen={fullScreen}
    open={open}
    onClose={handleClose}
    TransitionComponent={Transition}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton color="inherit" onClick={handleClose} aria-label="Close">
          <CloseIcon />
        </IconButton>
        <Typography variant="title" color="inherit" className={classes.flex}>
          {title}
        </Typography>
        <Button color="inherit" onClick={handleConfirm}>
          {confirmText}
        </Button>
      </Toolbar>
    </AppBar>
    {content}
  </Dialog>
)

export default withMobileDialog()(withStyles(styles)(FormDialog))
