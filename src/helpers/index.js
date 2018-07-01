import { parse, addMinutes, format, differenceInMilliseconds } from 'date-fns'

export const tiposBarcoToString = (tiposBarcos = []) => tiposBarcos.sort().join('/')

export const barcoToString = (barco = {}) => `${tiposBarcoToString(barco.tipos) || ''} ${barco.peso || ''}`

export const barcoToStringDetails = (barco = {}) => `${barco.detalhe || ''} ${barco.cores || ''}`

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
  let step = parse(iniTime, 'HH:mm', new Date())
  const end = parse(endTime, 'HH:mm', new Date())
  let nextTime = addMinutes(step, timeInterval)
  const timings = [{ key: format(step, 'HH:mm'), time: true }]

  while (differenceInMilliseconds(end, step) > 0) {
    step = addMinutes(step, markerInterval)
    let time = false
    if (differenceInMilliseconds(step, nextTime) === 0) {
      time = true
      nextTime = addMinutes(step, timeInterval)
    }
    timings.push({ key: format(step, 'HH:mm'), time })
  }

  return timings
}

export const orderData = ({ data, order, orderBy }) => {
  if (!data || data.length === 0) {
    return []
  }
  if (!orderBy) {
    return data
  }

  return order === 'desc'
    ? [...data].sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
    : [...data].sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1))
}
