import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import React, { useState } from 'react'

export default function App() {

  const [ modalVisible, setModalVisible ] = useState(false)

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} 
        onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Show modal message</Text>
      </Pressable>
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          <Text style={styles.modalText}>This is modal</Text>
          <Pressable 
            onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.modalText}>Close</Text>
          </Pressable>
        </View>
      </Modal>
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
  button: {
    padding: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  }
});
