import { View, StyleSheet, FlatList, TextInput, Button, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MainAppbar from '../components/ApplicationBar'
import Row from '../components/Row'
import type { Task } from '../types/Types'

const STORAGE_KEY = 'TODO_LIST_ITEMS'

const HomeScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState('')

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY)
        if (json) {
          const saved: Task[] = JSON.parse(json)
          setTasks(saved)
        }
      } catch (e) {
        console.warn('Failed to load Todos')
      }
    }
    loadTasks()
  }, [])

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
      } catch (e) {
        console.warn('Failed to save tasks', e)
      }
    }
    saveTasks()
  }, [tasks])

  const addItem = () => {
    const trimmed = input.trim()
    if (trimmed) {
      setTasks(prev => [
        ...prev,
        { id: Date.now().toString(), name: trimmed, done: false },
      ])
      setInput('')
    }
  }

  const handleToggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    )
  }

  return (
    <View style={styles.container}>
      <MainAppbar />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter task"
          placeholderTextColor="#ccc"
          value={input}
          onChangeText={setInput}
        />
        <Button title="Save" onPress={addItem} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Row task={item} onToggle={handleToggleTask} />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 4,
    marginRight: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
})

export default HomeScreen
