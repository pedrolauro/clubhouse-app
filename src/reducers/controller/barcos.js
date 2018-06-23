const initialState = {
  deleteDialog: {
    open: false,
    target: undefined,
    lastTarget: undefined,
  },
  formDialog: {
    open: false,
    newData: false,
    target: undefined,
  },
}

const barcosReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'OPEN_BARCO_DELETION':
      return {
        ...state,
        deleteDialog: {
          open: true,
          target: payload,
        },
      }

    case 'CLOSE_BARCO_DELETION':
      return {
        ...state,
        deleteDialog: {
          open: false,
          target: undefined,
          lastTarget: state.deleteDialog.target,
        },
      }

    case 'OPEN_BARCO_FORM':
      return {
        ...state,
        formDialog: {
          open: true,
          target: payload,
          newData: !payload.id,
        },
      }

    case 'CLOSE_BARCO_FORM':
      return {
        ...state,
        formDialog: {
          open: false,
          target: undefined,
          lastTarget: state.formDialog.target,
        },
      }

    default:
      return state
  }
}

export default barcosReducer
