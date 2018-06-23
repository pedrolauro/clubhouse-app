import React, { Component } from 'react'
import { connect } from 'react-redux'

import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import HighlightOff from '@material-ui/icons/HighlightOff'

// import ListItemText from '@material-ui/core/ListItemText'
// import ListItem from '@material-ui/core/ListItem'
// import List from '@material-ui/core/List'
// import Divider from '@material-ui/core/Divider'
// import AppBar from '@material-ui/core/AppBar'
// import Toolbar from '@material-ui/core/Toolbar'
// import IconButton from '@material-ui/core/IconButton'
// import Typography from '@material-ui/core/Typography'
// import CloseIcon from '@material-ui/icons/Close'
// import Slide from '@material-ui/core/Slide'

import ConfirmationDialog from './common/ConfirmationDialog'
import EnhancedTable from './common/EnhancedTable'
import * as actions from '../actions'
import { barcoToString } from '../helpers'

// const styles = {
//   appBar: {
//     position: 'relative',
//   },
//   flex: {
//     flex: 1,
//   },
// }

// function Transition(props) {
//   return <Slide direction="up" {...props} />
// }

class Barcos extends Component {
  state = {
    deleteDialogOpened: false,
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
      deleteDialogOpened,
      barcoToDelete,
      metaData,
      metaActions,
    } = this.state

    const { barcos } = this.props

    const deleteDialogcontent = (
      <span>{'Tem certeza que deseja deletar o barco '}
        <b>{!barcoToDelete ? '' : barcoToString(barcoToDelete)}</b>?
      </span>
    )

    // let classes = {}

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
          content={deleteDialogcontent}
        />

        {/* <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Sound
              </Typography>
              <Button color="inherit" onClick={this.handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button>
              <ListItemText primary="Phone ringtone" secondary="Titania" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Default notification ringtone" secondary="Tethys" />
            </ListItem>
          </List>
        </Dialog> */}

      </div>
    )
  }
}

const mapStateToProps = ({ data }) => ({ barcos: data.barcos })

export default connect(mapStateToProps, actions)(Barcos)
