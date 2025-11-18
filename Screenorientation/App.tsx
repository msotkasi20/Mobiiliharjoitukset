import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation'

type OrientationType = 'portrait' | 'landscape'

export default function App() {

  const [screenOrientation, setScreenOrientation] = useState<OrientationType>('portrait')
  const [isPortrait, setIsPortrait] = useState<boolean>(true)

  const lockToPortrait = async (): Promise<void> => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    setScreenOrientation('portrait')
    setIsPortrait(true)
  }

  useEffect(() => {
    const subscription = ScreenOrientation.addOrientationChangeListener(
      (event: ScreenOrientation.OrientationChangeEvent) => {
        const orientationInfo = event.orientationInfo.orientation
        if (
          orientationInfo === ScreenOrientation.Orientation.PORTRAIT_UP ||
          orientationInfo === ScreenOrientation.Orientation.PORTRAIT_DOWN
        ) {
          setScreenOrientation('portrait')
          setIsPortrait(true)
        } else if (
          orientationInfo === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
          orientationInfo === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
        ) {
          setScreenOrientation('landscape')
          setIsPortrait(false)
        }
      })
      return () => {
        ScreenOrientation.removeOrientationChangeListener(subscription)
      }
  }, [])

  return (
    <View style={[styles.container, isPortrait ? styles.portrait : styles.landscape]}>
      <Text>Current orientation: {screenOrientation}</Text>
      {
        isPortrait ?
          <Text>The device is in Portrait mode.</Text>
          :
          <Text>The devide is in Landscape mode.</Text>
      }
      <View style={styles.buttons}>
        <Button title="Lock to Portrait" onPress={lockToPortrait}/>
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    marginTop: 20,
  },
  portrait: {
    backgroundColor: 'lightblue'
  },
  landscape: {
    backgroundColor: 'lightgreen'
  },
})
