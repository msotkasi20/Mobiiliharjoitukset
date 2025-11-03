import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function App() {
  const [sek, setSek] = useState<string>("")
  const sekAsNumber: number = !isNaN(Number(sek))===true ? Number(sek) : 0
  const eur: number = sekAsNumber * 0.091

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SEK to EUR</Text>
      <TextInput 
        placeholder='Enter SEK'
        keyboardType='number-pad' 
        style={styles.field}
        value={sek}
        onChangeText={setSek}
        />
      <Text style={styles.field}>{eur.toFixed(2)}</Text>
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
  heading: {
    fontSize: 24
  },
  field: {
    marginVertical: 8
  }
});
