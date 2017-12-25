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
    const { first_name, work, id } = this.state.user
    const bio = work && work[0] && work[0].position ? work[0].position.name : null
    const imageSize = PixelRatio.getPixelSizeForLayoutSize(size)
    const fbImage = `https://graph.facebook.com/${id}/picture?height=${imageSize}`

    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <Thumbnail style={styles.thumbnail} large source={{ uri: fbImage }} />
          <Text style={{ fontSize: 20 }}>{first_name}</Text>
          <Text style={{ fontSize: 15, color: 'darkgrey' }}>{bio}</Text>
        </View>
      </View>
    )
  }
}
