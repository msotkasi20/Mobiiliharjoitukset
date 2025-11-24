import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useReducer, useRef } from 'react'

type StopwatchState = {  //objektin tietotyyppi, mitä kenttieä sisältää
  time: number
  isRunning: boolean
}

type StopwatchAction = 
| {type: 'START'}
| {type: 'STOP'}
| {type: 'RESET'}
| {type: 'TICK'}

const intialState: StopwatchState = {
  time: 0,
  isRunning: false
}

const stopwatchReducer = (state: StopwatchState, action: StopwatchAction):
  StopwatchState => {
    switch(action.type) {
      case 'START':
        return { ...state, isRunning: true}
      case 'STOP': 
        return { ...state,isRunning:false}
      case 'RESET':
        return { time: 0, isRunning: false}
      case 'TICK':
        return { ...state, time: state.time + 1}
      return state
    }
  }

export default function App() {
  const [state, dispatch] = useReducer(stopwatchReducer, intialState)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stopwatch</Text>
      <Text></Text>
      <View style= {styles.buttons}>
        <Button
          title="Start"
        />
        <Button
          title="Stop"
        />
        <Button
          title="Reset"
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32
  },
  buttons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly'
  } 
});
