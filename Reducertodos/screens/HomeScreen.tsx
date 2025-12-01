import { View, StyleSheet, FlatList, TextInput } from 'react-native'
import { Button } from 'react-native-paper'
import React, { useState } from 'react'
import MainAppbar from '../components/ApplicationBar'
import Row from '../components/Row'
import { useTasks } from '../hooks/useTasks'

const HomeScreen = () => {

  const { state, input, setInput, addTask, toggleTask } = useTasks()

  return (
    <View style={styles.container}>
      <MainAppbar />

      <View style={styles.inputRow}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Add a new task"
            placeholderTextColor="#ccc"
            value={input}
            onChangeText={setInput}
          />
        </View>
        <Button 
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={addTask} 
        > Add 
        </Button>
      </View>

      <FlatList
        data={state}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <Row 
            task={item} 
            onToggle={toggleTask} 
            style={{
              backgroundColor: index % 2 === 0 ? '#e3f2fd' : '#faf8f8ff'
            }}              
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecebebff',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: '#faf8f8ff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
  },
  input: {
    fontSize: 16,
    paddingVertical: 4,
  },
  button: {
    backgroundColor: '#3da367ff',
    borderRadius: 8,
  },
  buttonLabel: {
    color: '#fff'
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
})

export default HomeScreen
