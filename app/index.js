import React from 'react'
import * as firebase from 'firebase'
import { Provider } from 'react-redux'

import Navigator from './config/routes'

import store from './config/store'

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyC8CRT8nIwzO_8dmvqIDS8P1JgQZj1tXi4',
  authDomain: 'react-native-starter-kit-ee3c1.firebaseapp.com',
  databaseURL: 'https://react-native-starter-kit-ee3c1.firebaseio.com',
  projectId: 'react-native-starter-kit-ee3c1',
  storageBucket: '',
  messagingSenderId: '439520587796',
}
firebase.initializeApp(firebaseConfig)

export default () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
)
