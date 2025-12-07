import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import Map from './components/Map'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import { Region } from 'react-native-maps'
import * as Location from 'expo-location'

export default function App() {

  const [location, setLocation ] = useState<Region>({
    latitude: 65.0800,
    longitude: 25.4800,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  useEffect(() => {
    getCurrentLocation()
  }, [])
  

  const getCurrentLocation = async(): Promise<void> =>{
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !=='granted') {
        console.log("Permission denied for location.")
        return
      }

      const currentLocation = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      })

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Map region={location}/>
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
