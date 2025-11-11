import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform } from 'react-native';
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import RNPickerSelect from 'react-native-picker-select'
import { months } from './months'

export default function App() {

  const [selectedMonth, setSelectedMonth] = useState<string>(months[0])

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select a month:</Text>
      {Platform.OS ==='android' ? (
        <Picker
          selectedValue={selectedMonth}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
        >
          {months.map((month) => (
            <Picker.Item label={month} value={month} key={month} />
          ))}
        </Picker>
      ) : (
        <RNPickerSelect
          onValueChange={(value) => setSelectedMonth(value)}
          items={months.map((month) => ({ label: month, value: month }))}
          value={selectedMonth}
          style={{
            inputIOS: styles.picker
          }}
        />
      )}
      <Text style={styles.selected}>Selected month: {selectedMonth}</Text>
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
  label: {
    fontSize: 18,
    marginBottom: 10
  },
  picker: {
    height: 50,
    width: 200,
    marginBottom: 20,
  },
  selected: {
    fontSize: 16,
    marginTop: 10,
  },
});
