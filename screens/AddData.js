import React from "react"
import { StyleSheet, Text, View, Image,ScrollView, TextInput, TouchableOpacity,Dimensions} from 'react-native';
import { FontAwesome5,MaterialIcons,Feather,FontAwesome  } from '@expo/vector-icons';
import firebase from "firebase";
import db from '../config';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Modal from 'react-native-modal';


export default class AddData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apt_name: '',
            email: '',
            no_of_mon: '',
            cameraPermissions: '',
            modalVisible: false,
            image: 'https://dummyimage.com/600x400/000/fff',
            unique_id:''
            

        }
    }
   async saveDetails  ()  {

    if (
      this.state.apt_name !=""&&
      this.state.email!="" &&
      this.state.no_of_mon!="" &&
      this.state.image
    ) {
      var uniqueId = this.createUniqueId();
      var response = await fetch(this.state.image);
      var blob = await response.blob();
      var ref = firebase
        .storage()
        .ref()
        .child('Stories/' + uniqueId);
      ref.put(blob).then((response) => {
        this.fetchImage(uniqueId);
      });

      this.props.navigation.navigate('Home')
getData();
    } else {
      alert(
        'All fields are required!!',
        
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    }

        /* if(this.state.apt_name!="" && this.state.email!="")
        {
            /* db.collection('rowEntry').add({
                apt_name: this.state.apt_name, 
                email: this.state.email,
                no_of_mon: this.state.no_of_mon
    
    
            }); 
            
            alert('Thank you for registering with us!')
            this.props.navigation.navigate('Home')
        }
        else
        {
            alert("Please enter all the details")
        } */
       
    }

    takePhotoFromCamera = async () => {
      console.log("Function executed")
      try{
      const { status } = await ImagePicker.getMediaLibraryPermissionsAsync(true)
      console.log(status)
      // this.setState({
      //   cameraPermissions: status === 'granted',
      // }); 
      
      

      
      //  if (this.state.cameraPermissions) {
        await ImagePicker.launchCameraAsync({
          compressImageMaxWidth: 290,
          compressImageMaxHeight: 290,
          cropping: true,
          compressImageQuality: 0.9,
        }).then((image) => {
          this.setState({ image: image.uri });
          this.setState({
            modalVisible: false,
          });
        });
      // }
    
    
      //  else {
      //   return alert('Permissions Not Granted').then(() => {
      //     this.setState({
      //       modalVisible: false,
      //     });
      //   });
      // }
    }
    catch(error){
      alert(error)
    }
    };


  
    selectPicture = async () => {
     // alert("Take pict")
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
  
    fetchImage = (uniqueId) => {
      var storageRef = firebase
        .storage()
        .ref()
        .child('Stories/' + uniqueId);
      storageRef
        .getDownloadURL()
        .then((url) => {
          this.setState({ image: url });
         
          db.collection('rowEntry').add({
            apt_name: this.state.apt_name, 
            email: this.state.email,
            no_of_mon: this.state.no_of_mon,
            image:url,
            unique_id:uniqueId
            


        }); 
        
          
          console.log('Successful');
          alert('Successful');
          Alert.alert('Successful');
          this.setState({
            story: '',
            image: 'https://dummyimage.com/600x400/000/fff',
            title: '',
            description: '',
          });
        })
        .catch((error) => {
          console.log('error' + error);
          Alert.alert('Something went wrong in media uplaod, try again');
          this.setState({ 
            image: 'https://dummyimage.com/600x400/000/fff',
          });
        });
    }
  
    createUniqueId() {
      return Math.random().toString(36).substring(7);
    }
 /*    async addDetails() {
      if (
        this.state.apt_name &&
        this.state.email &&
        this.state.no_of_mon &&
        this.state.image
      ) {
        var uniqueId = this.createUniqueId();
        var response = await fetch(this.state.image); 
        var blob = await response.blob();
        var ref = firebase
          .storage()
          .ref()
          .child('Stories/' + uniqueId);
        ref.put(blob).then((response) => {
          this.fetchImage(uniqueId);
        });
      } else {
        Alert.alert(
          'Error',
          'All fields are required!',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false }
        );
      }
    } */


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
    unique_id:response.daya().unique_id
}) 
    } 




    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>

                    <Image source={require('../assets/register.png')} style={{ width: "100%", height: 200, marginTop: '10%', alignSelf: 'center', resizeMode: 'contain' }}></Image>

                    <Text style={{ fontSize: '22px', fontWeight: 'bold', alignItems: 'center', marginTop: '5%', color: '#cd5b45', marginLeft: '2%' }}>Please fill in the details</Text>

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
                <TouchableOpacity
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
                </TouchableOpacity>
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

                        <TextInput style={{ width: '90%', height: 30, borderBottomWidth: 2, borderBottomColor: 'brown', border: 2, paddingLeft: 20 }} placeholder='Enter Email Id' onChangeText={(val) => { this.setState({ email: val }); }} />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: '5%', alignSelf: 'center', width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesome5 name="at" size={24} color="brown" />
                        <TextInput style={{ width: '90%', height: 30, borderBottomWidth: 2, borderBottomColor: 'brown', border: 2, paddingLeft: 20 }} placeholder='Name of the apartment' onChangeText={(val) => { this.setState({ apt_name: val }); }} />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: '5%', alignSelf: 'center', width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesome5 name="at" size={24} color="brown" />
                        <TextInput style={{ width: '90%', height: 30, borderBottomWidth: 2, borderBottomColor: 'brown', border: 2, paddingLeft: 20 }} placeholder="Review every??(in months)" onChangeText={(val) => { this.setState({ no_of_mon: val }); }} />
                    </View>


                    <TouchableOpacity style={{ width: '90%', height: 40, backgroundColor: '#922724', justifyContent: 'center', alignItems: 'center', borderRadius: '10%', alignSelf: 'center', marginTop: '10%' }} onPress={() => { this.saveDetails() }}>
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }} >Submit</Text>
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
