import React from 'react'
import { TextField } from '@material-ui/core'

const fullWidth = true
const FieldInput = ({ input, placeholder, meta: { touched, error, warning } }) => (
  <TextField
    {...input}
    hintText={placeholder}
    errorText={touched && (error || warning)}
    floatingLabelText={placeholder}
    fullWidth={fullWidth}
  />
)

export default FieldInput
