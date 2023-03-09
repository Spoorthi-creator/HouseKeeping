import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import firebase from 'firebase';

export default class LoadingScreen extends React.Component {
    componentDidMount()
    {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              this.props.navigation.replace('Home')
              var uid = user.uid;
              // ...
            } else {
             
                this.props.navigation.replace('Login')
            }
          });
    }
    render() {
  return (
    <View>
      <Text>LoadingScreen</Text>
    </View>
  )
}
}



const styles = StyleSheet.create({})