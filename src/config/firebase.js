import * as firebase from 'firebase'
import FirebaseConfig from './../config/keys'

firebase.initializeApp(FirebaseConfig)

export const rootRef = firebase.database().ref()
export const barcosRef = rootRef.child('barcos')
export const categoriasRef = rootRef.child('categorias')
