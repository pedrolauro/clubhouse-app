import { barcosRef } from '../config/firebase'

export const fetchBarcos = () => async (dispatch) => {
  barcosRef.on('value', (snapshot) => {
    dispatch({
      type: 'FETCH_BARCOS',
      payload: snapshot.val(),
    })
  })
}

// TODO: unsubscribe barcosRef

export const addBarco = newBarco => async () => {
  barcosRef.push().set(newBarco)
}
