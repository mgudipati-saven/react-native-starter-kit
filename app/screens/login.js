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

  googleLogin = () => {
    console.log('googleLogin')
  }

  fbLogin = () => {
    console.log('fbLogin')
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
