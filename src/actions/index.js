import { barcosRef } from '../config/firebase'

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

export const deleteBarco = barcoId => async () => {
  barcosRef.child(barcoId).remove()
}

export const enableBarco = (barcoId, enable) => async () => {
  barcosRef.child(`${barcoId}/manutencao`).set(enable)
}
