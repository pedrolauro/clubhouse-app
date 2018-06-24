import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import { withStyles } from '@material-ui/core/styles'
// import withMobileDialog from '@material-ui/core/withMobileDialog'

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
}

const dialogTransition = props => <Slide direction="up" {...props} />

const FormDialog = ({
  fullScreen,
  open = false,
  handleClose,
  handleConfirm,
  title,
  content,
  confirmText = 'Salvar',
  cancelText = 'Cancelar',
  classes,
}) => {
  const topCloseButton = !fullScreen ? '' : (
    <IconButton color="inherit" onClick={handleClose} aria-label="Close">
      <CloseIcon />
    </IconButton>
  )
  const topConfirmButton = !fullScreen ? '' : (
    <Button color="inherit" onClick={handleConfirm}>
      {confirmText}
    </Button>
  )
  const bottomButtons = fullScreen ? '' : (
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        {cancelText}
      </Button>
      <Button onClick={handleConfirm} color="primary" variant="raised" autoFocus>
        {confirmText}
      </Button>
    </DialogActions>
  )
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      TransitionComponent={dialogTransition}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          {topCloseButton}
          <Typography variant="title" color="inherit" className={classes.flex}>
            {title}
          </Typography>
          {topConfirmButton}
        </Toolbar>
      </AppBar>
      {content}
      {bottomButtons}
    </Dialog>
  )
}

// export default withMobileDialog()(withStyles(styles)(FormDialog))
export default withStyles(styles)(FormDialog)
