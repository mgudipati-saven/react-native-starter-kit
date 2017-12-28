import React, { Component } from 'react'
import { StyleSheet, View, Text, PixelRatio } from 'react-native'
import { Avatar } from 'react-native-elements'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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

class Profile extends Component {
  static propTypes = {
    user: PropTypes.object,
  }

  render() {
    const { name, picture } = this.props.user

    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <Avatar xlarge rounded source={{ uri: picture }} />
          <Text style={{ fontSize: 20 }}>{name}</Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
})

export default connect(mapStateToProps)(Profile)
