import React from 'react'
import { StatusBar, View, Text } from 'react-native'
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { Header, Left, Body, Right, Icon, Title, Button } from 'native-base'

import Login from '../screens/login'
import Profile from '../screens/profile'
import Home from '../screens/home'

const GenericScreen = ({ title }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>{title}</Text>
  </View>
)

const HomeTabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons name={focused ? 'ios-home' : 'ios-home-outline'} size={26} color={tintColor} />
      ),
    },
  },
  Browse: {
    screen: () => <GenericScreen title="Browse Screen" />,
    navigationOptions: {
      tabBarLabel: 'Browse',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-browsers' : 'ios-browsers-outline'}
          size={26}
          color={tintColor}
        />
      ),
    },
  },
  Search: {
    screen: () => <GenericScreen title="Search Screen" />,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-search' : 'ios-search-outline'}
          size={26}
          color={tintColor}
        />
      ),
    },
  },
  Radio: {
    screen: () => <GenericScreen title="Radio Screen" />,
    navigationOptions: {
      tabBarLabel: 'Radio',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons name={focused ? 'ios-radio' : 'ios-radio-outline'} size={26} color={tintColor} />
      ),
    },
  },
})

const ProfileStack = StackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header>
            <Left>
              <Button transparent onPress={() => navigation.goBack(null)}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>Profile</Title>
            </Body>
            <Right />
          </Header>
        ),
      }),
    },
  },
  {
    headerMode: 'screen',
  },
)

const MenuDrawer = DrawerNavigator({
  Home: {
    screen: HomeTabs,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor, focused }) => (
        <Ionicons name={focused ? 'ios-home' : 'ios-home-outline'} size={26} color={tintColor} />
      ),
    },
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      drawerLabel: 'Profile',
      drawerIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-contact' : 'ios-contact-outline'}
          size={26}
          color={tintColor}
        />
      ),
    },
  },
  Browse: {
    screen: () => <GenericScreen title="Browse Screen" />,
    navigationOptions: {
      drawerLabel: 'Browse',
      drawerIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-browsers' : 'ios-browsers-outline'}
          size={26}
          color={tintColor}
        />
      ),
    },
  },
  Search: {
    screen: () => <GenericScreen title="Search Screen" />,
    navigationOptions: {
      drawerLabel: 'Search',
      drawerIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-search' : 'ios-search-outline'}
          size={26}
          color={tintColor}
        />
      ),
    },
  },
  Radio: {
    screen: () => <GenericScreen title="Radio Screen" />,
    navigationOptions: {
      drawerLabel: 'Radio',
      drawerIcon: ({ tintColor, focused }) => (
        <Ionicons name={focused ? 'ios-radio' : 'ios-radio-outline'} size={26} color={tintColor} />
      ),
    },
  },
})

export default StackNavigator(
  {
    Login: {
      screen: Login,
    },
    Primary: {
      screen: MenuDrawer,
    },
  },
  {
    headerMode: 'none',
    cardStyle: { paddingTop: StatusBar.currentHeight },
  },
)
