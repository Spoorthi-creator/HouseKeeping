import { StyleSheet, Text, View,ScrollView,Image,TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import React from 'react'
import firebase from 'firebase';
import db from '../config';


export default class Home extends React.Component {
    constructor() {
        super();
        this.state={
             registeredEntry:[]
        }
        
    }
    getData=async()=>
    {
        // this.setState({registeredEntry:[]});
         var response = await db.collection('rowEntry').get();//.onSnapshot() 
         var tempArr=[];

         response.docs.map((d)=>
         {
           //console.log(d.data());
           //var tempArr=this.state.registeredEntry;
           var data=d.data();
           data.id=d.id;
           tempArr.push(data)
          // this.setState({registeredEntry:tempArr});
         })
         this.setState({registeredEntry:tempArr});
    }

    componentDidMount(){
        this.getData();

        this._unsubcribe=this.props.navigation.addListener('focus',()=>{
          this.getData();
        }); 

    }

    componentWillUnmount()
    {
      this._unsubcribe()
    }
    logout=()=>{
        firebase.auth().signOut().then(() => {
           alert("Logged out")
           this.props.navigation.replace('Login');
          }).catch((error) => {
            alert("Something went wrong!Try Again")
          });
    }

    addUser=()=>
    {
        this.props.navigation.navigate('AddData')
    }
    deleteUser=(id)=>{
      db.collection("rowEntry").doc(id).delete().then(() => {
        alert("Document successfully deleted!");
       
    }).catch((error) => {
        alert("Something went wrong!Try later");
    });
    this.getData();
    }
   render() {
    if(this.state.registeredEntry.length===0){
      return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text>Loading..</Text></View>
      );
    }
    else{
       return (
           <View style={{ flex: 1 }}>

               <ScrollView>
               <TouchableOpacity style={{ width: '15%', height: 25, backgroundColor: '#922724', justifyContent: 'center', alignItems: 'center', borderRadius: '5%', alignSelf:'flex-end', marginTop: '5%' }} onPress={() => { this.logout() }}>
                       <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 10 }}>Logout</Text>
                   </TouchableOpacity>


                   <Image source={require('../assets/SignUpLogo.png')} style={{ width: "100%", height: 100, marginTop:'2%', alignSelf: 'center', resizeMode: 'center' }}></Image>


                   <TouchableOpacity style={{ width: '35%', height: 30, backgroundColor: '#922724', justifyContent: 'center', alignItems: 'center', borderRadius: '5%', alignSelf:'center', marginTop: '5%' }} onPress={() => { this.addUser() }}>
                       <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }}>Add User</Text>
                   </TouchableOpacity>

                   {this.state.registeredEntry.map((a,i)=>{
                  return(
                  <View style={{backgroundColor:'#C04000',marginTop:'5%',width:'90%',alignItems:'center',paddingLeft:'5%',marginLeft:'5%', borderRadius:'30px'}} key={i}>
                    <Text style={{color:'white', fontSize:20,fontWeight:'bold'}}>
                     Name: {a.apt_name}
                    </Text>
                    <Text style={{color:'#B0B0B0'}}>
                      Email:{a.email}
                    </Text>
                    <Text style={{color:'#DCDCDC'}}>
                     No. of Months: {a.no_of_mon}
                    </Text>

                    <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={{width: 30, height: 30,marginTop:'3%',marginRight:'5%'}} onPress={() => { this.deleteUser(a.id) }}>
                    <AntDesign name="delete" size={25} color="white" />
                   </TouchableOpacity>

                   <TouchableOpacity style={{width: 30, height: 30,marginTop:'3%'}} onPress={() => { this.props.navigation.navigate('Edit',{selectedId:a.id}) }}>
                   <Feather name="edit" size={24} color="white" />
                   </TouchableOpacity>

                   </View>
                    </View>)
                })}



                   
               </ScrollView>
           </View>
       )
                }
   }
}


const styles = StyleSheet.create({})