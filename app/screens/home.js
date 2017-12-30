import Expo from 'expo'
import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import firebase from 'firebase'
import GeoFire from 'geofire'
import { connect } from 'react-redux'
import { Container, Header, Title, Left, Icon, Right, Button, Body } from 'native-base'
import { List, ListItem, SearchBar } from 'react-native-elements'

import { setProfiles } from '../actions/user'

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    profiles: PropTypes.array,
    user: PropTypes.object,
  }

  componentDidMount() {
    this.updateUserLocation()
    firebase
      .database()
      .ref()
      .child('users')
      .once('value', (snap) => {
        const profiles = []
        snap.forEach((profile) => {
          profiles.push(profile.val())
        })
        this.props.dispatch(setProfiles(profiles))
      })
  }

  onMenuPress = () => {
    this.props.navigation.navigate('DrawerToggle')
  }

  updateUserLocation = async () => {
    const { Permissions, Location } = Expo
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: false })
      const { latitude, longitude } = location.coords
      const geoFireRef = new GeoFire(firebase.database().ref('geoData'))
      geoFireRef.set(this.props.user.uid, [latitude, longitude])
    }
  }

  renderItem = ({ item }) => (
    <ListItem
      key={item.id}
      roundAvatar
      avatar={{ uri: item.picture }}
      title={item.name}
      titleStyle={{ fontSize: 18 }}
      subtitle={item.email}
      subtitleStyle={{ fontSize: 12, color: 'darkgrey' }}
      containerStyle={{ borderBottomWidth: 0 }}
    />
  )

  renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: '75%',
        backgroundColor: 'lightgrey',
        marginLeft: '15%',
        marginRight: '10%',
      }}
    />
  )

  renderHeader = () => <SearchBar placeholder="Search..." lightTheme round />

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.onMenuPress}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>
        <List containerStyle={{ marginTop: 0, borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={this.props.profiles}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            keyExtractor={item => item.id}
          />
        </List>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  profiles: state.user.profiles,
  user: state.user.user,
})

export default connect(mapStateToProps)(Home)
