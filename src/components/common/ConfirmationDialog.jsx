import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

const ConfirmationDialog = ({
  open = false,
  handleClose,
  handleConfirm,
  title,
  content,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}) => {
  const dialogTitle = title ? <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle> : ''
  return (
    <Dialog
      fullScreen={false}
      open={open}
      onClose={handleClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogContent>
        {dialogTitle}
        <DialogContentText id="confirmation-dialog-description">
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

export default ConfirmationDialog
