import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Switch } from 'react-native';
import React, { useState } from 'react'

export default function App() {
  const [isEnabled, setIsEnabled] = useState<boolean>(false)

  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  return (
    <View style={styles.container}>
      <Text>Switch demo</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
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
});
