import Expo from 'expo'
import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native'
import { Button, Icon, Text } from 'native-base'
import axios from 'axios'
import firebase from 'firebase'
import { NavigationActions } from 'react-navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookButton: {
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
    showSpinner: true,
  }

  componentDidMount() {
    // firebase.auth().signOut()
    firebase.auth().onAuthStateChanged((auth) => {
      if (auth) {
        this.firebaseRef = firebase.database().ref('users')
        this.firebaseRef.child(auth.uid).on('value', (snap) => {
          const user = snap.val()
          if (user != null) {
            this.firebaseRef.child(auth.uid).off('value')
            this.showProfile(user)
          }
        })
      } else {
        this.setState({ showSpinner: false })
      }
    })
  }

  showProfile = (user) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Profile', params: { user } })],
    })
    this.props.navigation.dispatch(resetAction)
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

  facebookLogin = async () => {
    this.setState({ showSpinner: true })

    try {
      // facebook auth
      const APP_ID = '246347972570206'
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(APP_ID, {
        permissions: ['public_profile', 'user_birthday', 'user_work_history', 'email'],
      })

      if (type === 'success') {
        const { data } = await axios.get('https://graph.facebook.com/me', {
          params: {
            fields: 'id,first_name,last_name,gender,birthday,work',
            access_token: token,
          },
        })

        // firebase auth
        const credential = firebase.auth.FacebookAuthProvider.credential(token)
        const { uid } = await firebase.auth().signInWithCredential(credential)

        // create firebase user
        const defaults = {
          uid,
        }
        firebase
          .database()
          .ref('users')
          .child(uid)
          .update({ ...data, ...defaults })
      } else {
        console.log('cancelled')
      }
    } catch (error) {
      console.log(error)
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
              <Button style={styles.facebookButton} iconLeft onPress={this.facebookLogin}>
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
