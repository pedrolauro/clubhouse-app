import React, { Component } from 'react'
import { connect } from 'react-redux'

import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import HighlightOff from '@material-ui/icons/HighlightOff'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import withMobileDialog from '@material-ui/core/withMobileDialog'

import EnhancedTable from './common/EnhancedTable'
import * as actions from '../actions'
import { barcoToString } from '../helpers'

class Barcos extends Component {
  state = {
    dialogOpened: false,
    barcoToDelete: undefined,
    metaData: [
      {
        id: 'tipo',
        numeric: false,
        disablePadding: false,
        label: 'Tipo',
      },
      {
        id: 'classePeso',
        numeric: false,
        disablePadding: false,
        label: 'Peso',
      },
      {
        id: 'cor',
        numeric: false,
        disablePadding: false,
        label: 'Cor principal',
      },
      {
        id: 'detalhe',
        numeric: false,
        disablePadding: false,
        label: 'Detalhe',
      },
      {
        id: 'manutencao',
        numeric: false,
        disablePadding: false,
        label: 'Em manutenção?',
        valueAdapter: value => value ? 'Sim' : 'Não',
      },
    ],
    metaActions: [
      {
        id: 'manutencao',
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

  componentDidMount() {
    this.props.subscribeFetchBarcos()
  }

  componentWillUnmount() {
    this.props.unsubscribeFetchBarcos()
  }

  openDeleteDialog = (data) => { this.setState({ dialogOpened: true, barcoToDelete: data }) }
  closeDeleteDialog = () => { this.setState({ dialogOpened: false }) }

  editBarco = (data) => {
    console.log(`edit id ${data.id}, barco ${barcoToString(data)}`)
  }

  enableBarco = (barco) => {
    this.props.enableBarco(barco.id, !barco.manutencao)
  }

  deleteBarco = () => {
    const { barcoToDelete } = this.state
    this.props.deleteBarco(barcoToDelete.id)
    this.setState({ barcoToDelete: undefined })
    this.closeDeleteDialog()
  }

  render() {
    const {
      dialogOpened,
      barcoToDelete,
      metaData,
      metaActions,
    } = this.state

    const { fullScreen, barcos } = this.props

    const content = !barcoToDelete ? '' : barcoToString(barcoToDelete)
    const confirmText = 'Confirmar'
    const cancelText = 'Cancelar'

    return (
      <div>
        <EnhancedTable
          metaData={metaData}
          data={barcos}
          actions={metaActions}
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

const mapStateToProps = ({ data }) => ({ barcos: data.barcos })

export default connect(mapStateToProps, actions)(withMobileDialog()(Barcos))
