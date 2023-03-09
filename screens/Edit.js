import React from "react"
import { StyleSheet, Text, View, Image,ScrollView, TextInput, TouchableOpacity,Dimensions} from 'react-native';
import { FontAwesome5,MaterialIcons,Feather,FontAwesome  } from '@expo/vector-icons';
import firebase from "firebase";
import db from '../config';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';

export default class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           apt_name:'',
           email:'',
           no_of_mon:'',
           unique_id:'',
           
            selectedId_state:this.props.route.params.selectedId,
            selectedId_image:this.props.route.selectedImage,
            checkValidEmail:false,
            modalVisible: false,
            image: 'https://dummyimage.com/600x400/000/fff'

        }
    }
    async saveDetails  ()  {
        if(this.state.apt_name!="" && this.state.email!="")
        {
          var response = await fetch(this.state.image);
      var blob = await response.blob();
      var storageRef = firebase
        .storage()
        .ref()
        .child('Stories/' + uniqueId);

      ref.put(blob).then((response) => {
        // var storageRef = firebase
        // .storage()
        // .ref()
        // .child('Stories/' + uniqueId);
      storageRef
        .getDownloadURL()
        .then((url) => {
          this.setState({ image: url });
      });
    
            db.collection('rowEntry').doc(this.state.selectedId_state).update({
                apt_name: this.state.apt_name,
                email: this.state.email,
                no_of_mon: this.state.no_of_mon,
                image:this.state.image,
                unique_id:this.state.unique_id
            });
            alert('Updated');
                this.props.navigation.navigate('Home');
          });


            // db.collection('stories').doc(this.state.selectedId_image).update({
              
            // image:this.image
    
            // });


           
            
        }
        
      
    }
    getData=async()=>
    {
var response=await db.collection('rowEntry').doc(this.state.selectedId_state).get();
//var response_image=await db.collection('stories').doc(this.state.selectedId_image).get();
//alert(response_image.data());
console.log(response.data());
this.setState({
    apt_name: response.data().apt_name,
    email: response.data().email,
    no_of_mon:response.data().no_of_mon,
    image:response.data().image,
    unique_id:response.data().unique_id
})


    }
    componentDidMount(){
this.getData();
    }

    selectPicture = async () => {
        alert("Take pict")
         const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
           mediaTypes: ImagePicker.MediaTypeOptions.All,
           allowsEditing: true,
           aspect: [4, 3],
           quality: 1,
         });
         this.setState({
           modalVisible: false,
         });
         if (!cancelled) {
           this.setState({ image: uri });
           console.log('Worked' + this.state.image);
           this.setState({
             modalVisible: false,
           });
         }
       };

    

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    {/* <Text style={{ fontSize: '28', fontWeight: 'bold', alignSelf: 'center', color: 'brown', marginTop: '20%' }}>Register with us! </Text> */}

                    <Image source={require('../assets/register.png')} style={{ width: "100%", height: 200, marginTop: '10%', alignSelf: 'center', resizeMode: 'contain' }}></Image>

                    <Text style={{ fontSize: 22, fontWeight: 'bold', alignItems: 'center', marginTop: '5%', color: '#cd5b45', marginLeft: '2%' }}>Edit details</Text>

                    <Avatar size="large"
                      
                      source={{
                        uri: this.state.image
                      }}
                      onPress={() => {
                        this.setState({ modalVisible: true });
                      }}
                      containerStyle={{ alignSelf: 'center', margin: 20 }} rounded
                      
                    />

<View>
                     
                     <Modal
                       style={styles.modalView}
                       isVisible={this.state.modalVisible}
                       backdropOpacity={0.4}
                       deviceWidth={Dimensions.get('window').width}
                       deviceHeight={Dimensions.get('window').height}
                       onBackdropPress={() => this.setState({ modalVisible: false })}>
                       <View style={styles.modalMainView}>
                         <TouchableOpacity
                           style={{
                             position: 'absolute',
                             top: -13,
                             right: -10,
                             margin: 10,
                             padding: 10,
                           }}
                           onPress={() => this.setState({ modalVisible: false })}>
                           <MaterialIcons
                             name="cancel"
                             size={24}
                             color="#2460a7ff"
                           />
                         </TouchableOpacity>
                         <Text style={{ textAlign: 'center', margin: 5, padding: 5 }}>
                           Choose An Option
                         </Text>
                         <View
                           style={{
                             flexDirection: 'row',
                             alignItems: 'center',
                             alignSelf: 'center',
                           }}>
                           {/* <TouchableOpacity
                             onPress={() => {
                               this.takePhotoFromCamera();
                             }}
                             style={{
                               justifyContent: 'center',
                               alignItems: 'center',
                               padding: 10,
                             }}>
                             <Feather
                               name="camera"
                               size={24}
                               color="#2460a7ff"
                               onPress={() => this.setState({ modalVisible: false })}
                             />
                             <Text style={{ textAlign: 'center' }}>Camera</Text>
                           </TouchableOpacity> */}
                           <TouchableOpacity
                             onPress={() => {
                               this.selectPicture();
                             }}
                             style={{
                               justifyContent: 'center',
                               alignItems: 'center',
                               padding: 10,
                             }}>
                             <FontAwesome
                               name="photo"
                               size={24}
                               color="#2460a7ff"
                               onPress={() => this.setState({ modalVisible: false })}
                             />
                             <Text style={{ textAlign: 'center' }}>Photos</Text>
                           </TouchableOpacity>
                         </View>
                       </View>
                     </Modal>
                   </View>
                    <View style={{ flexDirection: 'row', marginTop: '5%', alignSelf: 'center', width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesome5 name="at" size={24} color="brown" />

                        <TextInput style={{ width: '90%', height: 30, borderBottomWidth: 2, borderBottomColor: 'brown', border: 2, paddingLeft: 20 }} value={this.state.email} placeholder='Enter Email Id' onChangeText={(val) => { this.setState({ email: val }); }}   keyboardType={"email-address"}/>
                    </View>

                    

                    <View style={{ flexDirection: 'row', marginTop: '5%', alignSelf: 'center', width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesome5 name="at" size={24} color="brown" />
                        <TextInput style={{ width: '90%', height: 30, borderBottomWidth: 2, borderBottomColor: 'brown', border: 2, paddingLeft: 20 }} placeholder='Name of the apartment' value={this.state.apt_name} onChangeText={(val) => { this.setState({ apt_name: val }); }} />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: '5%', alignSelf: 'center', width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesome5 name="at" size={24} color="brown" />
                        <TextInput style={{ width: '90%', height: 30, borderBottomWidth: 2, borderBottomColor: 'brown', border: 2, paddingLeft: 20 }} placeholder="Review every??(in months)"value={this.state.no_of_mon}  onChangeText={(val) => { this.setState({ no_of_mon: val }); }} />
                    </View>


                    <TouchableOpacity style={{ width: '90%', height: 40, backgroundColor: '#922724', justifyContent: 'center', alignItems: 'center', borderRadius: '10%', alignSelf: 'center', marginTop: '10%' }} onPress={() => { this.saveDetails() }}>
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }} >Save changes</Text>
                    </TouchableOpacity>








                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#d9b48fff',
    },
    modalView: {
      alignSelf: 'center',
      borderColor: '#bbbb',
      width: '60%',
      height: '60%',
    },
    modalMainView: {
      backgroundColor: '#ffff',
      borderRadius: 10,
      shadowOffset: {
        width: 2,
        height: 10,
      },
      shadowColor: '#bbbb',
    },
  });
  