import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles'
import withMobileDialog from '@material-ui/core/withMobileDialog'

import SaveIcon from '@material-ui/icons/Save'
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
import { tiposBarcoToString, isValueInArray, isStrInBetween } from '../../helpers'

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
    formData: { ...this.props.controller.target },
    invalidInputIds: [],
    isValidated: !!this.props.controller.target,
    /* eslint-disable react/no-unused-state */
    targetRef: this.props.controller.target,
  }

  static getDerivedStateFromProps(props, state) {
    const { controller: { target } } = props
    const { targetRef } = state
    if (targetRef !== target) {
      return {
        formData: { ...target },
        invalidInputIds: [],
        isValidated: !!target.$id,
        targetRef: target,
      }
    }
    return null
  }

  validateForm = () => {
    const {
      formData: {
        tipos,
        peso,
        cores,
        detalhe,
      },
    } = this.state
    const invalidInputIds = []
    if (tipos.length <= 0) {
      invalidInputIds.push('tipos')
    }
    if (!isStrInBetween(peso, 1, 15)) {
      invalidInputIds.push('peso')
    }
    if (!isStrInBetween(cores, 1, 25)) {
      invalidInputIds.push('cores')
    }
    if (!isStrInBetween(detalhe, 1, 30)) {
      invalidInputIds.push('detalhe')
    }
    return invalidInputIds
  }

  handleChange = (inputId, check = false) => (event) => {
    const { formData, isValidated } = this.state
    if (check) {
      formData[inputId] = event.target.checked
    } else {
      formData[inputId] = event.target.value
    }

    if (isValidated) {
      const invalidInputIds = this.validateForm()
      this.setState({ formData, invalidInputIds })
    } else {
      this.setState({ formData })
    }
  }

  handleConfirm = () => {
    const { formData } = this.state
    const invalidInputIds = this.validateForm()

    if (invalidInputIds.length === 0) {
      const newFormData = { ...formData }
      this.props.saveBarco(newFormData)
      this.props.closeBarcoForm()
    } else {
      this.setState({ invalidInputIds, isValidated: true })
    }
  }

  renderForm = () => {
    const { formData, invalidInputIds } = this.state
    const { fullScreen, classes, tiposBarcos } = this.props

    return (
      <div className={classes.root}>
        <FormControl
          error={isValueInArray('tipos', invalidInputIds)}
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
          error={isValueInArray('peso', invalidInputIds)}
        />
        <TextField
          label="Cores"
          marging="normal"
          fullWidth={fullScreen}
          className={classNames(classes.formControl, classes.lg)}
          value={formData.cores}
          onChange={this.handleChange('cores')}
          error={isValueInArray('cores', invalidInputIds)}
        />
        <TextField
          label="Detalhes"
          marging="normal"
          fullWidth={fullScreen}
          className={classNames(classes.formControl, classes.lg)}
          value={formData.detalhe}
          onChange={this.handleChange('detalhe')}
          error={isValueInArray('detalhe', invalidInputIds)}
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
            onChange={this.handleChange('manutencao', true)}
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

    const confirmIcon = <SaveIcon />

    return (
      <FormDialog
        open={open}
        fullScreen={fullScreen}
        handleClose={this.props.closeBarcoForm}
        handleConfirm={this.handleConfirm}
        title={target.$id ? 'Editar barco' : 'Novo barco'}
        content={this.renderForm()}
        confirmIcon={confirmIcon}
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
