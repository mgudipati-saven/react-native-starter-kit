import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Container, Header, Title, Left, Icon, Right, Button, Body, Text } from 'native-base'

export default class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  onMenuPress = () => {
    this.props.navigation.navigate('DrawerToggle')
  }

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
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
        >
          <Text>Home Screen</Text>
        </View>
      </Container>
    )
  }
}
