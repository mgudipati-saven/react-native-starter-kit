import { StackNavigator } from 'react-navigation'
import * as firebase from 'firebase'
import Login from './screens/login'

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

const RouteConfigs = {
  Login: { screen: Login },
}

const StackNavigatorConfig = {
  headerMode: 'none',
}

export default StackNavigator(RouteConfigs, StackNavigatorConfig)
