import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles'
import withMobileDialog from '@material-ui/core/withMobileDialog'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import FormDialog from '../common/FormDialog'
import * as actions from '../../actions'
import { tiposBarcoToString, isValueInArray } from '../../helpers'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: `0 ${theme.spacing.unit * 4}px ${theme.spacing.unit * 4}px`,
    [theme.breakpoints.down('sm')]: {
      margin: `${theme.spacing.unit * 2}px`,
    },
  },
  formControl: {
    margin: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing.unit * 2,
    },
  },
  sm: {
    minWidth: 150,
  },
  lg: {
    minWidth: 250,
  },
})

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const TiposBarcosMenuProps = {
  PaperProps: {
    style: {
      maxHeight: (ITEM_HEIGHT * 4.5) + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

class BarcosForm extends Component {
  state = {
    formData: this.props.controller.target,
  }

  static getDerivedStateFromProps(props, state) {
    const { controller: { target } } = props
    const { formData } = state
    if (formData !== target) {
      return { formData: target }
    }
    return null
  }

  handleChange = inputId => (event) => {
    const formData = { ...this.state.formData }
    formData[inputId] = event.target.value
    this.setState({ formData })
  }

  handleCheck = inputId => (event) => {
    const formData = { ...this.state.formData }
    formData[inputId] = event.target.checked
    this.setState({ formData })
  }

  handleConfirm = () => {
    const formData = { ...this.state.formData }
    this.props.saveBarco(formData)
    this.props.closeBarcoForm()
  }

  renderForm = () => {
    const { formData } = this.state
    const { fullScreen, classes, tiposBarcos } = this.props

    return (
      <div className={classes.root}>
        <FormControl
          fullWidth={fullScreen}
          marging="normal"
          className={classNames(classes.formControl, classes.sm)}
        >
          <InputLabel htmlFor="select-multiple-checkbox">Tipo</InputLabel>
          <Select
            multiple
            value={formData.tipos}
            onChange={this.handleChange('tipos')}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => tiposBarcoToString(selected)}
            MenuProps={TiposBarcosMenuProps}
          >
            {tiposBarcos.map(tipo => (
              <MenuItem key={tipo} value={tipo}>
                <Checkbox checked={isValueInArray(tipo, formData.tipos)} />
                <ListItemText primary={tipo} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Peso"
          marging="normal"
          fullWidth={fullScreen}
          className={classNames(classes.formControl, classes.lg)}
          value={formData.peso}
          onChange={this.handleChange('peso')}
        />
        <TextField
          label="Cores"
          marging="normal"
          fullWidth={fullScreen}
          className={classNames(classes.formControl, classes.lg)}
          value={formData.cores}
          onChange={this.handleChange('cores')}
        />
        <TextField
          label="Detalhes"
          marging="normal"
          fullWidth={fullScreen}
          className={classNames(classes.formControl, classes.lg)}
          value={formData.detalhe}
          onChange={this.handleChange('detalhe')}
        />
        <FormControl
          fullWidth={fullScreen}
          marging="normal"
          className={classNames(classes.formControl, classes.sm)}
        >
          <FormControlLabel
            label={
              <Typography variant="subheading" color="textSecondary">
                Em manutenção?
              </Typography>
            }
            checked={formData.manutencao}
            onChange={this.handleCheck('manutencao')}
            control={<Switch />}
          />
        </FormControl>
      </div>
    )
  }

  render() {
    const {
      fullScreen,
      controller: {
        open,
        target,
      },
    } = this.props

    return (
      <FormDialog
        open={open}
        fullScreen={fullScreen}
        handleClose={this.props.closeBarcoForm}
        handleConfirm={this.handleConfirm}
        title={target.$id ? 'Editar barco' : 'Novo barco'}
        content={this.renderForm()}
      />
    )
  }
}

const mapStateToProps = ({ data, controller }) => ({
  tiposBarcos: data.immutable.tiposBarcos,
  controller: controller.barcos.formDialog,
})

const EnhancedBarcoForm = withStyles(styles, { withTheme: true })(BarcosForm)
export default connect(mapStateToProps, actions)(withMobileDialog()(EnhancedBarcoForm))
