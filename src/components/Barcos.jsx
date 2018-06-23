import React, { Component } from 'react'
import { connect } from 'react-redux'

import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import Build from '@material-ui/icons/Build'

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
        label: 'Manutenção',
        icon: <Build />,
        onClick: (data) => { this.props.enableBarco(data) },
      },
      {
        id: 'edit',
        label: 'Editar',
        icon: <Edit />,
        onClick: (data) => { this.props.openBarcoForm(data) },
      },
      {
        id: 'delete',
        label: 'Apagar',
        icon: <Delete />,
        onClick: (data) => { this.props.openBarcoDeletion(data) },
      },
    ],
  }

  componentDidMount = () => { this.props.subscribeFetchBarcos() }

  componentWillUnmount = () => { this.props.unsubscribeFetchBarcos() }

  deleteBarco = () => {
    const { target } = this.props.controller.deleteDialog
    this.props.deleteBarco(target)
    this.props.closeBarcoDeletion()
  }

  render() {
    const { metaData, metaActions } = this.state

    const {
      data,
      controller: {
        deleteDialog: {
          open: deleteDialogOpened,
          target: deleteTarget,
          lastTarget: deleteLastTarget,
        },
        formDialog: {
          open: formDialogOpened,
        },
      },
    } = this.props

    const deleteDialogContent = (
      <span>{'Tem certeza que deseja deletar o barco '}
        <b>{barcoToString(deleteLastTarget || deleteTarget)}</b>?
      </span>
    )

    const formDialogTitle = 'Editar barco'

    const formDialogContent = (
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
          data={data}
          actions={metaActions}
        />
        <ConfirmationDialog
          open={deleteDialogOpened}
          confirmText="Apagar"
          handleClose={this.props.closeBarcoDeletion}
          handleConfirm={this.deleteBarco}
          content={deleteDialogContent}
        />
        <FormDialog
          open={formDialogOpened}
          handleClose={this.props.closeBarcoForm}
          handleConfirm={this.props.closeBarcoForm}
          title={formDialogTitle}
          content={formDialogContent}
        />

      </div>
    )
  }
}

const mapStateToProps = ({ data, controller }) => ({
  data: data.barcos,
  controller: controller.barcos,
})

export default connect(mapStateToProps, actions)(Barcos)
