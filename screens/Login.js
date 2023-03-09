import React from "react"
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import firebase from "firebase";
import db from '../config';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }
    login = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((userCredential) => {
                if (this.state.email != "" && this.state.password != "") {
                    alert('Welcome back!');
                    this.props.navigation.navigate('Home');
                }
                else {
                    alert("Please fill in both email and password fields!")
                }

            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
            });
    }

    signInGoogle = () => {
        // const auth = getAuth(db);

        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {


                alert('Successfully logged in');
                this.props.navigation.replace('Home');

            }).catch((error) => {

                var errorMessage = error.message;
                alert(errorMessage);
            });


       
    }


    sendEmail = () => {
        if (this.state.email != "") {
            firebase.auth().sendPasswordResetEmail(this.state.email)
                .then(() => {
                    alert('Email sent')
                })

                .catch((error) => {
                   
                    var errorMessage = error.message;
                    alert(errorMessage)
                    // ..
                });
        }
        else {
            alert("Please enter the email id")
        }

    }
    render() {
        return (
            <View style={{ flex: 1}}>
             {/* <ImageBackground source={require('../assets/1.png')} style={{ flex: 1}}> */}
                <ScrollView>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', alignSelf: 'center', color: 'brown', marginTop: '20%' }}>Apartment Services </Text>

                    <Image source={require('../assets/Logo.png')} style={{ width: "100%", height: 200, marginTop: '2%', alignSelf: 'center', resizeMode: 'contain' }}></Image>

                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: '5%', marginTop: '10%', color: '#cd5b45' }}>Login</Text>
                    <View style={{ flexDirection: 'row', marginTop: '5%', alignSelf: 'center', width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesome5 name="at" size={24} color="brown" />

                        <TextInput style={{ width: '90%', height: 30, borderBottomWidth: '2px', borderBottomColor: 'brown', border: 2, marginLeft: '5%', paddingLeft: 20 }} placeholder='Enter Email Id' onChangeText={(val) => { this.setState({ email: val }); }} />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: '5%', alignSelf: 'center', width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name="lock-open" size={24} color="brown" />

                        <TextInput style={{ width: '85%', height: 30, borderBottomWidth: 2, borderBottomColor: 'brown', border: 2, marginLeft: '5%', paddingLeft: 20 }} secureTextEntry='true' placeholder='Password' onChangeText={(val) => { this.setState({ password: val }); }} />


                        <Ionicons name="ios-eye-off-sharp" size={24} color="grey" />
                    </View>

                    <Text style={{ fontSize: 10, fontWeight: 'bold', alignSelf: 'flex-end', marginRight: '5%', marginTop: '5%', color: '#cd5b45' }} onPress={() => { this.sendEmail() }}>Forgot password?</Text>

                    <TouchableOpacity style={{ width: '90%', height: 40, backgroundColor: '#922724', justifyContent: 'center', alignItems: 'center', borderRadius: '10%', alignSelf: 'center', marginTop: '10%' }} onPress={() => { this.login() }}>
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }} >Login</Text>
                    </TouchableOpacity>

                    <Text style={{ color: '#deaa88', fontSize: 15, fontWeight: 'bold', marginTop: '10%', alignSelf: 'center' }}>
                        OR
                    </Text>

                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', height: '20%', width: '50%', marginTop: '8%', backgroundColor: '#ffebcd', borderRadius: 10, alignItems: 'center' }}>
                            <Fontisto name="google" size={20} color="red" />
                            <Text style={{ marginLeft: '10%', fontSize: 15, color: '#c95a49' }} onPress={() => { this.signInGoogle() }} >Login with you email id</Text>
                        </View>
                        <Text style={{ fontSize: 20, color: '#8b4513', alignSelf: 'center', backgroundColor: '#ffebcd', marginTop: '10%', borderRadius: 10 }} onPress={() => { this.props.navigation.navigate('SignUp') }}>New User?Register here</Text>
                    </TouchableOpacity>






                </ScrollView>
            </View>
        )
    }
}