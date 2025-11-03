import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState } from 'react'

export default function App() {

  const [age, setAge] = useState<string>("")
  const ageAsNumber: number = Number(age)

  const lowerLimit: number = !isNaN(ageAsNumber) ? (220-ageAsNumber) * 0.65 : 0
  const upperLimit: number = !isNaN(ageAsNumber) ? (220-ageAsNumber) * 0.85 : 0

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Heart Rate Limits Calculator</Text>
      <Text>Enter your age:</Text>
      <TextInput
        keyboardType='number-pad'
        value={age}
        onChangeText={setAge}
      />
      <Text>{lowerLimit.toFixed(2)}</Text>
      <Text>{upperLimit.toFixed(2)}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 100,
    marginLeft: 20
  },
  heading: {
    fontSize: 24
  }

});
