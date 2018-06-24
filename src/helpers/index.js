export const barcoToString = (barco = {}) => `${barco.tipo || ''} ${barco.classePeso || ''} ${barco.cor || ''}`

export const tiposBarcoToString = (tiposBarcos = []) => tiposBarcos.sort().join('/')

export const manutencaoBarcoToString = (manutencao = false) => manutencao ? 'Sim' : 'Não'

export const convertFirebaseMacro = (macro) => {
  const list = []
  if (macro) {
    Object.keys(macro).forEach((key) => {
      list.push({ ...macro[key], $id: key })
    })
  }
  return list
}

export const isValueInArray = (value, array) => !array || array.indexOf(value) > -1
