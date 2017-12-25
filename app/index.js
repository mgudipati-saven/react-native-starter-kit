import { StackNavigator } from 'react-navigation'
import Login from './screens/login'

const RouteConfigs = {
  Login: { screen: Login },
}

const StackNavigatorConfig = {
  headerMode: 'none',
}

export default StackNavigator(RouteConfigs, StackNavigatorConfig)
