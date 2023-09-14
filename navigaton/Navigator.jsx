// import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../pages/Home';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
         <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home} />
         </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator

// const styles = StyleSheet.create({})