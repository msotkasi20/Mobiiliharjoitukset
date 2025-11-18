import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import globalStyles from './global'

export default function App() {
  return (
    <View style={[globalStyles.container, {backgroundColor: 'brown', padding: 20}]}>
      <Text style={globalStyles.text}>Testing my global style file!</Text>
      <StatusBar style="auto" />
    </View>
  )
}