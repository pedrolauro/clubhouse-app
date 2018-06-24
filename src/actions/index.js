import React from 'react'
import { push } from 'react-router-redux'

import { barcosRef } from '../config/firebase'
import * as helpers from '../helpers'

/**
 * GLOBAL ACTIONS
 */
export const processSnackbarQueue = () => (dispatch, getState) => {
  const { queue, open } = getState().controller.snackbar
  if (open) {
    dispatch({ type: 'HIDE_SNACKBAR' })
  }
  if (queue.length > 0) {
    dispatch({
      type: 'SHOW_SNACKBAR',
      payload: queue.shift(),
    })
  }
}

export const hideSnackbar = (event, reason) => (dispatch) => {
  if (reason !== 'clickaway') {
    dispatch({ type: 'HIDE_SNACKBAR' })
  }
}

export const showSnackbar = message => (dispatch) => {
  dispatch({
    type: 'QUEUE_SNACKBAR',
    payload: { message },
  })
}

export const changeRoute = route => (dispatch) => {
  dispatch(push(route.path))
}


/**
 * BARCOS ACTIONS
 */
export const openBarcoDeletion = data => ({
  type: 'OPEN_BARCO_DELETION',
  payload: data,
})

export const closeBarcoDeletion = () => ({ type: 'CLOSE_BARCO_DELETION' })

export const openBarcoForm = data => ({
  type: 'OPEN_BARCO_FORM',
  payload: data,
})

export const closeBarcoForm = () => ({ type: 'CLOSE_BARCO_FORM' })

export const subscribeFetchBarcos = () => async (dispatch) => {
  const subscriber =
    barcosRef.on('value', (snapshot) => {
      dispatch({
        type: 'FETCH_BARCOS',
        payload: helpers.convertFirebaseMacro(snapshot.val()),
      })
    })

  dispatch({
    type: 'SUBSCRIBE_FETCH_BARCOS',
    payload: subscriber,
  })
}

export const unsubscribeFetchBarcos = () => (dispatch, getState) => {
  const { FETCH_BARCOS_SUBSCRIBER } = getState().controller.subscribers
  if (FETCH_BARCOS_SUBSCRIBER) {
    barcosRef.off('value', FETCH_BARCOS_SUBSCRIBER)
    dispatch({ type: 'UNSUBSCRIBE_FETCH_BARCOS' })
  }
}

export const addBarco = () => async (dispatch) => {
  const data = {
    tipo: ['4x', '4-'],
    classePeso: 'leve',
    cor: 'azul',
    detalhe: 'china',
    manutencao: true,
  }
  dispatch({
    type: 'REQUEST_ADD_BARCO',
    payload: data,
  })
  barcosRef.push(data)
    .then(() => {
      const message = <span>{helpers.barcoToString(data)}<b> adicionado</b></span>
      dispatch({
        type: 'SUCCESS_ADD_BARCO',
        payload: { message },
      })
    })
    .catch((err) => {
      dispatch({
        type: 'ERROR_ADD_BARCO',
        payload: err,
      })
    })
}

export const deleteBarco = data => async (dispatch) => {
  dispatch({
    type: 'REQUEST_DELETE_BARCO',
    payload: data,
  })
  barcosRef.child(data.$id).remove()
    .then(() => {
      const message = <span>{helpers.barcoToString(data)}<b> apagado</b></span>
      dispatch({
        type: 'SUCCESS_DELETE_BARCO',
        payload: { message },
      })
    })
    .catch((err) => {
      dispatch({
        type: 'ERROR_DELETE_BARCO',
        payload: err,
      })
    })
}

export const changeServiceBarco = data => async (dispatch) => {
  dispatch({
    type: 'REQUEST_CHANGE_SERVICE_BARCO',
    payload: data,
  })
  barcosRef.child(`${data.$id}/manutencao`).set(!data.manutencao)
    .then(() => {
      const message = (
        <span>
          {helpers.barcoToString(data)}
          <b>{!data.manutencao ? ' em' : ' fora de'} manutenção</b>
        </span>
      )
      dispatch({
        type: 'SUCCESS_CHANGE_SERVICE_BARCO',
        payload: { message },
      })
    })
    .catch((err) => {
      dispatch({
        type: 'ERROR_CHANGE_SERVICE_BARCO',
        payload: err,
      })
    })
}
