import React, { Component } from 'react'
import { StyleSheet, View, Text, PixelRatio } from 'react-native'
import { Thumbnail } from 'native-base'

const size = 120

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: size,
    height: size,
    borderRadius: size / 2,
  },
})

export default class Profile extends Component {
  state = {
    user: this.props.navigation.state.params.user,
  }

  render() {
    const { name, picture } = this.state.user

    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <Thumbnail style={styles.thumbnail} large source={{ uri: picture }} />
          <Text style={{ fontSize: 20 }}>{name}</Text>
        </View>
      </View>
    )
  }
}
