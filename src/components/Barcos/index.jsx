import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'

import BarcoForm from './form'
import ConfirmationDialog from '../common/ConfirmationDialog'
import EnhancedTable from '../common/EnhancedTable'
import * as actions from '../../actions'
import * as helpers from '../../helpers'

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
  bottomRest: {
    minHeight: `${theme.spacing.unit * 16}px`,
    [theme.breakpoints.down('sm')]: {
      minHeight: `${theme.spacing.unit * 11}px`,
    },
  },
})

class Barcos extends Component {
  state = {
    metaData: [
      {
        id: 'tipos',
        numeric: false,
        disablePadding: false,
        label: 'Tipo',
        valueAdapter: value => helpers.tiposBarcoToString(value),
      },
      {
        id: 'detalhe',
        numeric: false,
        disablePadding: false,
        label: 'Detalhe',
      },
      {
        id: 'peso',
        numeric: false,
        disablePadding: false,
        label: 'Peso',
      },
      {
        id: 'cores',
        numeric: false,
        disablePadding: false,
        label: 'Cores',
      },
    ],
    metaActions: [
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
    const {
      deleteDialogController: {
        target: deleteTarget,
      },
    } = this.props

    this.props.deleteBarco(deleteTarget)
    this.props.closeBarcoDeletion()
  }

  render() {
    const { metaData, metaActions } = this.state

    const {
      classes,
      data,
      snackbarOpen,
      deleteDialogController: {
        open: deleteDialogOpened,
        target: deleteTarget,
        lastTarget: deleteLastTarget,
      },
    } = this.props

    const fabClassName = classNames(
      classes.fab,
      snackbarOpen ? classes.fabMoveUp : classes.fabMoveDown,
    )

    const deleteDialogContent = (
      <span>{'Tem certeza que deseja deletar o barco '}
        <b>{helpers.barcoToString(deleteLastTarget || deleteTarget)}</b>?
      </span>
    )

    return (
      <div>
        <EnhancedTable
          metaData={metaData}
          initialSort="tipos"
          data={data}
          actions={metaActions}
        />
        <div className={classes.bottomRest} />
        <ConfirmationDialog
          open={deleteDialogOpened}
          confirmText="Apagar"
          handleClose={this.props.closeBarcoDeletion}
          handleConfirm={this.deleteBarco}
          content={deleteDialogContent}
        />
        <BarcoForm />
        <Button
          variant="fab"
          aria-label="Adicionar"
          color="primary"
          className={fabClassName}
          onClick={() => this.props.openBarcoForm()}
        >
          <AddIcon />
        </Button>
      </div>
    )
  }
}

const mapStateToProps = ({ data, controller }) => ({
  data: data.barcos,
  snackbarOpen: controller.snackbar.open,
  deleteDialogController: controller.barcos.deleteDialog,
})

export default connect(mapStateToProps, actions)(withStyles(styles, { withTheme: true })(Barcos))
