import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyB4mk2ac4qlgzNYYl-qHVnI2nKeTr3w1yw',
  authDomain: 'eminent-scanner-370818.firebaseapp.com',
  projectId: 'eminent-scanner-370818',
  storageBucket: 'eminent-scanner-370818.appspot.com',
  messagingSenderId: '415456423398',
  appId: '1:415456423398:web:4bad88cce168cd7e107a27',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
