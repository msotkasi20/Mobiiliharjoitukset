import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import { Button, PaperProvider } from 'react-native-paper'
import MyAppbar from './components/MyAppbar'
import { customLightTheme, customDarkTheme } from './themes/MyThemes'

export default function App() {

  const colorScheme = useColorScheme()
  const theme = colorScheme === 'dark' ? customDarkTheme : customLightTheme

  console.log(colorScheme)

  return (
    <PaperProvider theme={theme}>
      <MyAppbar />
      <View style={styles.container}>
        <Text style={styles.text}>This is test text...</Text>
        <Button mode='elevated' onPress={() => console.log('Pressed')}>
          Press me
        </Button>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 48,
  }
});
