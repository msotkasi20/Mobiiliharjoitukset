import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font'

export default function App() {
  const [fontsLoaded] = useFonts({
    LatoLightItalic: require('./assets/fonts/Lato-LightItalic.ttf')
  })

  if (!fontsLoaded) return <Text>Loading fonts..</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Testing Lato font</Text>
      <Text>Open up App.tsx to start working on your app!</Text>
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
    fontFamily: 'LatoLightItalic',
    fontSize: 24
  }
});
