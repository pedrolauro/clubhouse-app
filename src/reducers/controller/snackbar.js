const defaultConfig = {
  duration: 4000,
  anchor: {
    vertical: 'bottom',
    horizontal: 'left',
  },
}

const initialState = {
  open: false,
  data: {
    key: undefined,
    message: undefined,
  },
  queue: [],
}

const snackbarReducer = (state = initialState, { type: _type, payload }) => {
  let type = _type
  const [prefix] = type.split('_')
  if (['SUCCESS', 'ERROR'].indexOf(prefix) !== -1) {
    type = 'QUEUE_SNACKBAR'
  }

  switch (type) {
    case 'QUEUE_SNACKBAR':
      return {
        ...state,
        queue: [
          ...state.queue,
          {
            key: new Date().getTime(),
            ...defaultConfig,
            ...payload,
          },
        ],
      }

    case 'SHOW_SNACKBAR':
      return {
        ...state,
        open: true,
        data: payload,
      }

    case 'HIDE_SNACKBAR':
      return {
        ...state,
        open: false,
      }

    default:
      return state
  }
}

export default snackbarReducer
