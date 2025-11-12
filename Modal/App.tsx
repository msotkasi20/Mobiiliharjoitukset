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
        transparent={true}
        animationType='fade'
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBack}>
          <View style={styles.modalFront}>
            <Text style={styles.modalText}>This is modal</Text>
            <Pressable 
              onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.modalText}>Close</Text>
            </Pressable>
          </View>
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
  modalBack: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalFront: {
    backgroundColor: '#fff',
    width: '95%',
    maxHeight: '30%',
    shadowColor: '#000',
    shadowRadius: 12,
    elevation: 6,
  },
  modalText: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  }
});
