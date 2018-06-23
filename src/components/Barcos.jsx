import React, { Component } from 'react'
import { connect } from 'react-redux'

import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import HighlightOff from '@material-ui/icons/HighlightOff'

import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'

import FormDialog from './common/FormDialog'
import ConfirmationDialog from './common/ConfirmationDialog'
import EnhancedTable from './common/EnhancedTable'
import * as actions from '../actions'
import { barcoToString } from '../helpers'

class Barcos extends Component {
  state = {
    deleteDialogOpened: false,
    editDialogOpened: false,
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

  openDeleteDialog = (data) => { this.setState({ deleteDialogOpened: true, barcoToDelete: data }) }
  closeDeleteDialog = () => { this.setState({ deleteDialogOpened: false }) }

  closeEditDialog = () => { this.setState({ editDialogOpened: false }) }

  editBarco = (data) => {
    console.log(`edit id ${data.id}, barco ${barcoToString(data)}`)
    this.setState({ editDialogOpened: true })
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
      deleteDialogOpened,
      editDialogOpened,
      barcoToDelete,
      metaData,
      metaActions,
    } = this.state

    const { barcos } = this.props

    const deleteDialogContent = (
      <span>{'Tem certeza que deseja deletar o barco '}
        <b>{!barcoToDelete ? '' : barcoToString(barcoToDelete)}</b>?
      </span>
    )

    const editDialogContent = (
      <List>
        <ListItem button>
          <ListItemText primary="Phone ringtone" secondary="Titania" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Default notification ringtone" secondary="Tethys" />
        </ListItem>
      </List>
    )

    return (
      <div>
        <EnhancedTable
          metaData={metaData}
          data={barcos}
          actions={metaActions}
        />
        <ConfirmationDialog
          open={deleteDialogOpened}
          handleClose={this.closeDeleteDialog}
          handleConfirm={this.deleteBarco}
          content={deleteDialogContent}
        />
        <FormDialog
          open={editDialogOpened}
          handleClose={this.closeEditDialog}
          handleConfirm={this.closeEditDialog}
          content={editDialogContent}
        />

      </div>
    )
  }
}

const mapStateToProps = ({ data }) => ({ barcos: data.barcos })

export default connect(mapStateToProps, actions)(Barcos)
