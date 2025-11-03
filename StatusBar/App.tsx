import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MyStatusBar from './components/MyStatusBar';

export default function App() {
  return (
    <>
      <MyStatusBar backgroundColor='brown' barStyle='light-content' hidden={false} translucent={true}/>
      <SafeAreaView style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
      </SafeAreaView>
    </>
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
