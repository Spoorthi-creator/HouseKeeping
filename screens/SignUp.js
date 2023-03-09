import React from "react"
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import db from "../config"
import firebase from "firebase";


export default class SignUp extends React.Component {
     constructor() {
         super();
         this.state = {
             email: '',
             password: ''
         }
     }
     signUp=()=>{
        if(this.state.email!="" && this.state.password!="")
        {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
  .then((userCredential) => {
    
   db.collection('users').add({email:this.state.email,password:this.state.password})
    alert("Welcome to APT");
    this.props.navigation.replace("Home")
    
  })
  .catch((error) => {
    var errorMessage = error.message;
    alert(errorMessage);
    
  });
}
else{
    alert("Please fill in both the fields");//FormValidator
}
}

     

     
    
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <Image source={require('../assets/SignUpLogo.png')} style={{ width: "100%", height: 200, marginTop: '1%', alignSelf: 'center', resizeMode: 'center' }}></Image>

                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: '5%', marginTop: '5%', color: '#cd5b45' }}>SignUp</Text>
                    <View style={{ flexDirection: 'row', marginTop: '5%', alignSelf: 'center', width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesome5 name="at" size={24} color="brown" />

                        <TextInput style={{ width: '90%', height: 30, borderBottomWidth: 2, borderBottomColor: 'brown', border: 2, marginLeft: '5%', paddingLeft: 20 }} placeholder='Enter Email Id' onChangeText={(val) => { this.setState({ email: val }); }} />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: '5%', alignSelf: 'center', width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name="lock-open" size={24} color="brown" />

                        <TextInput style={{ width: '85%', height: 30, borderBottomWidth: 2, borderBottomColor: 'brown', border: 2, marginLeft: '5%', paddingLeft: 20 }} secureTextEntry='true' placeholder='Password' onChangeText={(val) => { this.setState({ password: val }); }}/>
                        

                        <Ionicons name="ios-eye-off-sharp" size={24} color="grey" />
                    </View>



                    <TouchableOpacity style={{ width: '90%', height: 40, backgroundColor: '#922724', justifyContent: 'center', alignItems: 'center', borderRadius: '10%', alignSelf: 'center', marginTop: '10%' }} onPress={() => { this.signUp() }}>
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }}>SignUp</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        )
    }
}