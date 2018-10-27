import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyAYDcag19mTwH7wAeKU9z-N3i_7Xy6bsfU',
  authDomain: 'coderhouse-e0d52.firebaseapp.com',
  databaseURL: 'https://coderhouse-e0d52.firebaseio.com',
  projectId: 'coderhouse-e0d52',
  storageBucket: 'coderhouse-e0d52.appspot.com',
  messagingSenderId: '229713051342',
}

firebase.initializeApp(config)

// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore()
export const auth = firebase.auth()

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true,
})

export const getCurrentUser = () => {
  if (auth.currentUser) {
    return Promise.resolve(auth.currentUser)
  }

  return auth
    .signInAnonymously()
    .then(() => auth.currentUser)
    .catch(error => console.error(error))
}

export default firebase
