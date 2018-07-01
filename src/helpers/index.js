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

export const getTimingInterval = (iniTime, endTime, markerInterval, timeInterval) => {
  let step = moment(iniTime, 'HH:mm')
  const end = moment(endTime, 'HH:mm')
  let nextTime = step.clone().add(timeInterval, 'minutes')
  const timings = [{ key: step.format('HH:mm'), time: true }]
  while (end.diff(step) > 0) {
    step = step.clone().add(markerInterval, 'minutes')
    let time = false
    if (step.diff(nextTime) === 0) {
      time = true
      nextTime = step.clone().add(timeInterval, 'minutes')
    }
    timings.push({ key: step.format('HH:mm'), time })
  }

  return timings
}
