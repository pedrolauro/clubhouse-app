import delay from './delay'
import barcos from './mock-data/barcos.json'

// This file mocks Barcos web API

const replaceAll = (str, find, replace) => str.replace(new RegExp(find, 'g'), replace)

const generateId = barco => replaceAll(`${barco.firstName}-${barco.lastName}`, ' ', '-')

class BarcoApi {
  static getAllBarcos() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...barcos])
      }, delay)
    })
  }

  static saveBarco(_barco) {
    const barco = { ..._barco } // keep passed in object immutable
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minBarcoNameLength = 3
        if (barco.firstName.length < minBarcoNameLength) {
          reject(`Barco name must be at least ${minBarcoNameLength} characters.`)
        }

        if (barco.lastName.length < minBarcoNameLength) {
          reject(`Barco name must be at least ${minBarcoNameLength} characters.`)
        }

        if (barco.id) {
          const existingBarcoIndex = barcos.findIndex(a => a.id === barco.id)
          barcos.splice(existingBarcoIndex, 1, barco)
        } else {
          // Simulating creation here.
          barco.id = generateId(barco)
          barcos.unshift(barco)
        }

        resolve(barco)
      }, delay)
    })
  }

  static deleteBarco(barcoId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const indexOfBarcoToDelete = barcos.findIndex(barco => barco.id === barcoId)
        barcos.splice(indexOfBarcoToDelete, 1)
        resolve()
      }, delay)
    })
  }

  static getBarco(barcoId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingBarco = barcos.find(barco => barco.id === barcoId)
        resolve({ ...existingBarco })
      }, delay)
    })
  }
}

export default BarcoApi
