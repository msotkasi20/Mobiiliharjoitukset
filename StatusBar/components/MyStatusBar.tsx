import { View, StatusBar, StyleSheet, StatusBarProps } from 'react-native'
import Constants from 'expo-constants'
import React from 'react'

type MyStatusBarProps = {
  backgroundColor: string
} & StatusBarProps

export default function MyStatusBar(props: MyStatusBarProps) {
  const { backgroundColor,...statusBarProps } = props 
  const statusBarHeight = Constants.statusBarHeight || StatusBar.currentHeight || 44 //Androidissa vain toimii statusBarHeight,joten muut määrittelyt täytyy olla iOSia varten
  return (
      <View style={[styles.statusbar,{backgroundColor, height: statusBarHeight}]}>
        <StatusBar {...statusBarProps} />
      </View>
  )
}

const styles = StyleSheet.create({
  statusbar: {
    backgroundColor: 'red',
    width: '100%'
  }
});