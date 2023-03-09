import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import Home from '../screens/Home';
import LoadingScreen from '../screens/LoadingScreen';
import Edit from '../screens/Edit';
import AboutUs from '../screens/AboutUs';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AddData from '../screens/AddData';



const Stack = createStackNavigator();
// const Stack1 = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack()
{
    return (

        <Stack.Navigator>

            <Stack.Screen
                name="Home"
                component={Home}

                options={{ headerShown: true }}
            />

            <Stack.Screen
                name="AddData"
                component={AddData}
                
                

            />

<Stack.Screen
                name="Edit"
                component={Edit}
                


            />

        </Stack.Navigator>

    

    );
}


function MyBottonTab()
{
return(
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: ''},
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: 'brown',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({route}) => ({
          tabBarStyle: {
           
            backgroundColor: '',
          },
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" color='brown' size={size} />
          ),
        })}
      />
        <Tab.Screen
        name="AboutUs"
        component={AboutUs}
        options={({route}) => ({
          tabBarStyle: {
           
            backgroundColor: '',
          },
          tabBarIcon: ({color, size}) => (
            <AntDesign name="infocirlceo" size={size} color='brown' />
            
          ),headerShown:false
        })}
      />
      </Tab.Navigator>
)
}




function MyStack() {
    return (

        <Stack.Navigator>

<Stack.Screen
                name="LoadingScreen"
                component={LoadingScreen}


            />


            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}


            />

            <Stack.Screen
                name="SignUp"
                component={SignUp}


            />

<Stack.Screen
               name="Home"
                component={MyBottonTab}
                options={{ headerShown: false }}

            />

           

        </Stack.Navigator>

    

    );
}






export default MyStack;
