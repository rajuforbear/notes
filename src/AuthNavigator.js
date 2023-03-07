import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Register from './Register'
import ShowData from './showData'
import UpdateData from './Update'
 const  Stack=createStackNavigator()
const AuthNavigator = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator  screenOptions={{headerShown:false}} initialRouteName='getData'>
        <Stack.Screen name='Register' component={Register}/>
        <Stack.Screen name='getData' component={ShowData}/>
        <Stack.Screen name='updateData' component={UpdateData}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default AuthNavigator