import { View, Text, StyleSheet } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'

type Props = NativeStackScreenProps<RootStackParamList, "Home">

export default function SecondScreen({navigation,route}: any) {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: 'red' },
            headerTitleStyle: { color: 'white' },
            headerTintcolor: "#fff",
        })
    }, [])

  return (
    <View style={styles.container}>
      <Text>SecondScreen {route.params.message}</Text>
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
});
