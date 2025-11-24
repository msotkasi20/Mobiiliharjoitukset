import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Row } from './components/Row'
import dummyData from './data/dummydata'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>ScrollView Example</Text>
      <ScrollView>
        {
        dummyData.map(item => (
          <Row key={item.id} title={item.title} description={item.description} image={item.image}/>
        ))
        }
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    paddingTop: 38,
    paddingBottom: 20,
    textAlign: 'center'
  }
  
});
