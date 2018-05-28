import BarcosApi from '../api/BarcosApi'
import { ApiCallBeginAction, ApiCallErrorAction } from './ApiAction'

export const getBarcosAction = () => (dispatch) => {
  dispatch(ApiCallBeginAction())

  return BarcosApi.getAllBarcos()
    .then((barcos) => {
      dispatch({
        type: 'GET_BARCOS_RESPONSE',
        payload: { barcos },
      })
    }).catch((error) => {
      console.log(error)
      throw error
    })
}

export const saveBarcoAction = barco => (dispatch) => {
  dispatch(ApiCallBeginAction())

  // if barco.id exists,
  // it means that the user is being edited, therefore update it.
  // else,
  // it must therefore be new user that is being added, therefore add it
  return BarcosApi.saveBarco(barco)
    .then(() => {
      if (barco.id) {
        dispatch({ type: 'UPDATE_EXISTING_BARCO_RESPONSE' })
      } else {
        dispatch({ type: 'ADD_NEW_BARCO_RESPONSE' })
      }
    }).then(() => {
      dispatch(getBarcosAction())
    }).catch((error) => {
      dispatch(ApiCallErrorAction())
      throw (error)
    })
}

export const getBarcoAction = barcoId => (dispatch) => {
  dispatch(ApiCallBeginAction())

  return BarcosApi.getBarco(barcoId)
    .then((barco) => {
      dispatch({
        type: 'GET_BARCO_RESPONSE',
        payload: { barco },
      })
    }).catch((error) => {
      throw error
    })
}

export function deleteBarcoAction(userId) {
  return (dispatch) => {
    dispatch(ApiCallBeginAction())

    return BarcosApi.deleteBarco(userId)
      .then(() => {
        dispatch({ type: 'DELETE_BARCO_RESPONSE' })
      }).then(() => {
        dispatch(getBarcosAction())
      }).catch((error) => {
        throw error
      })
  }
}
