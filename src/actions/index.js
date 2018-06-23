import { barcosRef } from '../config/firebase'

/**
 * BARCOS ACTIONS
 */
export const openBarcoDeletion = data => ({
  type: 'OPEN_BARCO_DELETION',
  payload: data,
})

export const closeBarcoDeletion = () => ({
  type: 'CLOSE_BARCO_DELETION',
})

export const openBarcoForm = data => ({
  type: 'OPEN_BARCO_FORM',
  payload: data,
})

export const closeBarcoForm = () => ({
  type: 'CLOSE_BARCO_FORM',
})

export const subscribeFetchBarcos = () => async (dispatch) => {
  const subscriber =
    barcosRef.on('value', (snapshot) => {
      dispatch({
        type: 'FETCH_BARCOS',
        payload: snapshot.val(),
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
    dispatch({
      type: 'UNSUBSCRIBE_FETCH_BARCOS',
    })
  }
}

export const addBarco = newBarco => async () => {
  barcosRef.push().set(newBarco)
}

export const deleteBarco = data => async (dispatch) => {
  barcosRef.child(data.id).remove()
  dispatch({
    type: 'DELETE_BARCO',
    payload: data,
  })
}

export const enableBarco = data => async () => {
  barcosRef.child(`${data.id}/manutencao`).set(!data.manutencao)
}
