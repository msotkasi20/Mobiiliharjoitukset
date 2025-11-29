import { View, Text, Button } from 'react-native'
import React from 'react'
import useCounterStore from '../counterStore'

export default function Counter() {
  const increase = useCounterStore((state) => state.increase)
  const decrease = useCounterStore((state) => state.decrease)
  const reset = useCounterStore((state) => state.reset)

  return (
    <View>
      <Text>Counter</Text>
      <Button title="Increase" onPress={increase} />
      <Button title="Decrease" onPress={decrease} />
      <Button title="Reset" onPress={() => reset(10)} />
    </View>
  )
}