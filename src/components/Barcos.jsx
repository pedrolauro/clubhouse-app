import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import Build from '@material-ui/icons/Build'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'

import FormDialog from './common/FormDialog'
import ConfirmationDialog from './common/ConfirmationDialog'
import EnhancedTable from './common/EnhancedTable'
import * as actions from '../actions'
import { barcoToString } from '../helpers'

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 6,
    right: theme.spacing.unit * 6,
    [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    },
  },
  fabMoveUp: {
    [theme.breakpoints.down('sm')]: {
      transform: 'translate3d(0, -46px, 0)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.easeOut,
      }),
    },
  },
  fabMoveDown: {
    [theme.breakpoints.down('sm')]: {
      transform: 'translate3d(0, 0, 0)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp,
      }),
    },
  },
})

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
        onClick: (data) => { this.props.changeServiceBarco(data) },
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
      classes,
      data,
      snackbarController: {
        open: snackbarOpen,
      },
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

    const fabClassName = classNames(
      classes.fab,
      snackbarOpen ? classes.fabMoveUp : classes.fabMoveDown,
    )

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
        <Tooltip id="tooltip-fab" title="Adicionar">
          <Button
            variant="fab"
            aria-label="Adicionar"
            color="primary"
            className={fabClassName}
            onClick={this.props.addBarco}
          >
            <AddIcon />
          </Button>
        </Tooltip>
      </div>
    )
  }
}

const mapStateToProps = ({ data, controller }) => ({
  data: data.barcos,
  controller: controller.barcos,
  snackbarController: controller.snackbar,
})

export default connect(mapStateToProps, actions)(withStyles(styles, { withTheme: true })(Barcos))
