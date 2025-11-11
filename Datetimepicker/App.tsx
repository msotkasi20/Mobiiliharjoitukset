import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-ui-datepicker';
import dayjs, { Dayjs } from 'dayjs'
import React, { useState } from 'react'

export default function App() {

  const [date, setDate] = useState<Dayjs | null>(dayjs())

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Date</Text>
      <DatePicker
        date={date}
        onChange={({ date: newDate }) => setDate(newDate ? dayjs(newDate) : null)}
        mode="single"
      />
      <Text style={styles.selectedDate}>
        Selected: { date ? date.format('YYYY-MM-DD') : 'None'}
      </Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  selectedDate: {
    marginTop: 24,
    fontSize: 18,
    color: '#333'
  }
});
