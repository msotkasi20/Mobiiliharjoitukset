import { View, Text, StyleSheet, ImageBackgroundComponent } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { RootStackParamList } from '../types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<RootStackParamList, "Home">

export default function HomeScreen({navigation}: Props) {

  useLayoutEffect(() => {
    navigation.setOptions({
        headerStyle: {backgroundColor: 'red'},
        headerTitleStyle: {color: 'white'},
        headerRight: () => (
            <Ionicons
                name="arrow-forward"
                size={24}
                color="white"
                style={{ marginRight: 0, padding: 0 }}
                onPress={() => navigation.navigate('SecondScreen', {message: 'Test'})}
            />
        )
    })
  }, [])


  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
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
