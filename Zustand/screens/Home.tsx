import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import Counter from '../components/Counter'
import useCounterStore from '../counterStore'

export default function Home({ navigation}: any) {
  const count = useCounterStore((state) => state.count)

  return (
    <View>
      <Text>Home, count is {count}</Text>
        <Button title="Go to second" onPress={() => navigation.navigate('Second')} />
      <Counter />
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