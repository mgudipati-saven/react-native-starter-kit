import Expo from 'expo'
import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native'
import { Button, Icon, Text } from 'native-base'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fbButton: {
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#3B5998',
  },
  googleButton: {
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#DD4B39',
  },
  twitterButton: {
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#55ACEE',
  },
  githubButton: {
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#444444',
  },
  linkedinButton: {
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#007BB6',
  },
  tumblrButton: {
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#CB2027',
  },
})

export default class Login extends Component {
  state = {
    showSpinner: false,
  }

  googleLogin = async () => {
    const IOS_CLIENT_ID = '919524104425-t8edm6bn9ovn735iu169u67j07fnvi0u.apps.googleusercontent.com'
    const ANDROID_CLIENT_ID =
      '919524104425-193njd3n48vt5dss6oaejd0lml686gp4.apps.googleusercontent.com'

    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        scopes: ['profile', 'email'],
      })

      if (result.type === 'success') {
        console.log(result.accessToken)
        const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: { Authorization: `Bearer ${result.accessToken}` },
        })

        console.log(await response.json())
      } else {
        console.log({ cancelled: true })
      }
    } catch (e) {
      console.log({ error: true })
    }
  }

  fbLogin = async () => {
    // this.setState({ showSpinner: true })
    const APP_ID = '246347972570206'
    const options = {
      permissions: ['public_profile', 'user_birthday', 'user_work_history', 'email'],
    }
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(APP_ID, options)
    if (type === 'success') {
      console.log(token)
      // const fields = ['id', 'first_name', 'last_name', 'gender', 'birthday', 'work']
      // const response = await fetch(`https://graph.facebook.com/me?fields=${fields.toString()}&access_token=${token}`)
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`)
      console.log(await response.json())
    } else {
      console.log(type)
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          {this.state.showSpinner ? (
            <ActivityIndicator animating={this.state.showSpinner} />
          ) : (
            <View>
              <Button style={styles.fbButton} iconLeft onPress={this.fbLogin}>
                <Icon name="logo-facebook" />
                <Text>Sign in with Facebook</Text>
              </Button>
              <Button style={styles.googleButton} iconLeft onPress={this.googleLogin}>
                <Icon name="logo-googleplus" />
                <Text>Sign in with Google</Text>
              </Button>
              <Button style={styles.twitterButton} iconLeft onPress={this.twitterLogin}>
                <Icon name="logo-twitter" />
                <Text>Sign in with Twitter</Text>
              </Button>
              <Button style={styles.githubButton} iconLeft onPress={this.githubLogin}>
                <Icon name="logo-github" />
                <Text>Sign in with GitHub</Text>
              </Button>
              <Button style={styles.linkedinButton} iconLeft onPress={this.linkedinLogin}>
                <Icon name="logo-linkedin" />
                <Text>Sign in with LinkedIn</Text>
              </Button>
              <Button style={styles.tumblrButton} iconLeft onPress={this.tumblrLogin}>
                <Icon name="logo-tumblr" />
                <Text>Sign in with Tumblr</Text>
              </Button>
            </View>
          )}
        </View>
      </SafeAreaView>
    )
  }
}
