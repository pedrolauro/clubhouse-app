const initialFormData = {
  tipos: [],
  peso: '',
  cores: '',
  detalhe: '',
  manutencao: false,
}

const initialState = {
  deleteDialog: {
    open: false,
    target: undefined,
    lastTarget: undefined,
  },
  formDialog: {
    open: false,
    target: initialFormData,
    lastTarget: undefined,
  },
}
const barcosReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'OPEN_BARCO_DELETION':
      return {
        ...state,
        deleteDialog: {
          ...state.deleteDialog,
          open: true,
          target: payload,
        },
      }

    case 'CLOSE_BARCO_DELETION':
      return {
        ...state,
        deleteDialog: {
          ...state.deleteDialog,
          open: false,
          target: undefined,
          lastTarget: state.deleteDialog.target,
        },
      }

    case 'OPEN_BARCO_FORM':
      return {
        ...state,
        formDialog: {
          ...state.formDialog,
          open: true,
          target: payload || { ...initialFormData },
        },
      }

    case 'CLOSE_BARCO_FORM':
      return {
        ...state,
        formDialog: {
          ...state.formDialog,
          open: false,
          target: { ...initialFormData },
          lastTarget: state.formDialog.target,
        },
      }

    default:
      return state
  }
}

export default barcosReducer
