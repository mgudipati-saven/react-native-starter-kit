import { StatusBar } from 'react-native'
import { StackNavigator } from 'react-navigation'

import Login from '../screens/login'
import Profile from '../screens/profile'

export default StackNavigator(
  {
    Login: {
      screen: Login,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    cardStyle: { paddingTop: StatusBar.currentHeight },
  },
)
