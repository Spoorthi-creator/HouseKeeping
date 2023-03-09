import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login'
import MyStack from './navigation/navigate'
import SignUp from './screens/SignUp'

import { NavigationContainer } from '@react-navigation/native';

export default class App extends React.Component{
 render(){
  return(
<NavigationContainer>
    <MyStack/>
    </NavigationContainer>
  );
 }
}

const styles = StyleSheet.create({
 
});
