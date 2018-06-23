export const barcoToString = (barco = {}) => `${barco.tipo || ''} ${barco.classePeso || ''} ${barco.cor || ''}`

export const convertFirebaseMacro = (macro) => {
  const list = []
  if (macro) {
    Object.keys(macro).forEach((key) => {
      list.push({ ...macro[key], $id: key })
    })
  }
  return list
}
