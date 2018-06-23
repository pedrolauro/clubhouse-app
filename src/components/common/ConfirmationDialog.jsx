import React from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

const Barcos = ({
  open = false,
  handleClose,
  handleConfirm,
  title,
  content,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}) => {
  const dialogTitle = title ? <DialogTitle id="alert-dialog-title">{title}</DialogTitle> : ''
  return (
    <Dialog
      fullScreen={false}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        {dialogTitle}
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="primary">
          {cancelText}
        </Button>
        <Button onClick={handleConfirm} variant="raised" color="primary" autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Barcos
