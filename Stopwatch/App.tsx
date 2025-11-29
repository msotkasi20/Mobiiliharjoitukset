//Sekuntikellon käyttöliittymä

import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useStopwatch } from './hooks/useStopwatch'
import StopwatchButton from './components/StopwatchButton'

export default function App() {

  const { state, handleStart, handleStop, handleReset } =useStopwatch() //tuodaan custom-hookista tarvittava

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stopwatch</Text>
      <Text style={styles.time}>{state.time}</Text>
      <View style= {styles.buttons}>
        <StopwatchButton title="Start" onPress={handleStart} disabled={state.isRunning} />
        <StopwatchButton title="Stop" onPress={handleStop} disabled={!state.isRunning} />
        <StopwatchButton title="Reset" onPress={handleReset} />
      </View>
      <Text style={styles.status}>{state.isRunning ? 'Running' : 'Stopped'}</Text>
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
  title: {
    fontSize: 32,
    marginBottom: 24
  },
  time: {
    fontSize: 24,
    marginBottom: 24,
  },
  status: {
    fontSize: 24,
    marginTop: 24,
  },
  buttons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly'
  }
})
