import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {SafeAreaProvider,SafeAreaView} from 'react-native-safe-area-context'
import { useFonts } from '@use-expo/font'
import Home from './components/home'
import {AppLoading} from 'expo'

export default function App() {
   const [loaded] = useFonts({
      Raleway: require('./assets/Raleway-Regular.ttf'),
    })
    if(!loaded)
      return (<AppLoading/>)
    else{
    return (
      <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Home/>
      </SafeAreaView>
    </SafeAreaProvider>
  )}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c5945',
    fontFamily:'Raleway'
  }
})
