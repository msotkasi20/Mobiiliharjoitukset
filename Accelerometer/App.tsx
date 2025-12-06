import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { useAccelerometer } from './hooks/useAccelerometer'


export default function App() {
  const { data, accelerometerAvailable } = useAccelerometer(100)

  return (
    <View style={styles.container}>
      {accelerometerAvailable === null ? (
        <Text>Checking accelerometer availability...</Text>
      ) : accelerometerAvailable ? (
        <>
        <Text style={styles.data}>X: {data.x.toFixed(2)}</Text>
        <Text style={styles.data}>Y: {data.y.toFixed(2)}</Text>
        <Text style={styles.data}>Z: {data.z.toFixed(2)}</Text>
        </>
      ) : (
        <Text>Accelerometer not available on this device</Text>
      )}
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
  data: {
    fontSize: 24,
    marginVertical: 4,
  }
})
