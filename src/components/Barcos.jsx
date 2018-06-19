import React, { Component } from 'react'
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import HighlightOff from '@material-ui/icons/HighlightOff'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import withMobileDialog from '@material-ui/core/withMobileDialog';


import EnhancedTable from './common/EnhancedTable'

function createData(id, type, weightClass, color, detail, maintenance) {
  return {
    id,
    type,
    weightClass,
    color,
    detail,
    maintenance,
  }
}

let id = 1
class Barcos extends Component {
  state = {
    dialogOpened: false,
    barcoToDelete: undefined,
    metaData: [
      {
        id: 'type',
        numeric: false,
        disablePadding: false,
        label: 'Tipo',
      },
      {
        id: 'weightClass',
        numeric: false,
        disablePadding: false,
        label: 'Peso',
      },
      {
        id: 'color',
        numeric: false,
        disablePadding: false,
        label: 'Cor principal',
      },
      {
        id: 'detail',
        numeric: false,
        disablePadding: false,
        label: 'Detalhe',
      },
      {
        id: 'maintenance',
        numeric: false,
        disablePadding: false,
        label: 'Em manutenção?',
        valueAdapter: value => value ? 'Sim' : 'Não',
      },
    ],
    data: [
      createData(id++, '4x/4-', 'leve', 'azul', 'china', true),
      createData(id++, '2x/2-', 'leve', 'azul', undefined, true),
      createData(id++, '2x/2-', 'pesado', 'azul', 'china', false),
      createData(id++, '1x', 'leve', 'amarelo', 'fibra', false),
      createData(id++, '8+', 'pesado', 'marrom', 'madeira', false),
    ],
    actions: [
      {
        id: 'maintenance',
        label: 'Em manutenção?',
        icon: <HighlightOff />,
        onClick: (data) => { this.enableBarco(data) },
      },
      {
        id: 'edit',
        label: 'Editar',
        icon: <Edit />,
        onClick: (data) => { this.editBarco(data) },
      },
      {
        id: 'delete',
        label: 'Apagar',
        icon: <Delete />,
        onClick: (data) => { this.openDeleteDialog(data) },
      },
    ],
  }

  openDeleteDialog = (data) => { this.setState({ dialogOpened: true, barcoToDelete: data }) }
  closeDeleteDialog = () => { this.setState({ dialogOpened: false }) }

  editBarco = (data) => {
    console.log(`edit id ${data.id}, barco ${data.type} ${data.color}`)
  }

  enableBarco = (data) => {
    console.log(`enable id ${data.id}, barco ${data.type} ${data.color}`)
  }

  deleteBarco = () => {
    const { data, barcoToDelete } = this.state
    const newData = [...data].filter(item => item.id !== barcoToDelete.id)
    this.setState({ data: newData })
    this.closeDeleteDialog()
  }

  render() {
    const {
      dialogOpened,
      barcoToDelete,
      data,
      metaData,
      actions,
    } = this.state

    const { fullScreen } = this.props
    const content = !barcoToDelete ? '' : `${barcoToDelete.type} ${barcoToDelete.weightClass} ${barcoToDelete.color}`
    const confirmText = 'Confirmar'
    const cancelText = 'Cancelar'

    return (
      <div>
        <EnhancedTable
          metaData={metaData}
          initialData={data}
          actions={actions}
        />
        <Dialog
          fullScreen={fullScreen}
          open={dialogOpened}
          onClose={this.closeDeleteDialog}
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja deletar o barco <b>{content}</b>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDeleteDialog} variant="outlined" color="primary">
              {cancelText}
            </Button>
            <Button onClick={this.deleteBarco} variant="raised" color="primary" autoFocus>
              {confirmText}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withMobileDialog()(Barcos)
