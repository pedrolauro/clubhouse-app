import moment from 'moment'

export const tiposBarcoToString = (tiposBarcos = []) => tiposBarcos.sort().join('/')

export const barcoToString = (barco = {}) => `${tiposBarcoToString(barco.tipos) || ''} ${barco.peso || ''}`

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

export const isStrInBetween = (str, min, max) => str && str.length >= min && str.length <= max

export const getTimingInterval = (iniTime, endTime, interval) => {
  let step = moment(iniTime, 'HH:mm')
  const end = moment(endTime, 'HH:mm')
  const timings = [step]
  while (end.diff(step) > 0) {
    step = step.clone().add(interval, 'minutes')
    timings.push(step)
  }

  return timings.map(time => time.format('HH:mm'))
}
