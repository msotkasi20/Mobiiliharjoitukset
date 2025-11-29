import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import useCounterStore from '../counterStore'

export default function Second({ navigation }:any) {
  const count = useCounterStore((state) => state.count)

  return (
    <View>
      <Text>Second, count is {count}</Text>
      <Button title="Go home" onPress={() => navigation.navigate('Home')} />
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
})