import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { SwipeListView } from 'react-native-swipe-list-view'

interface Item {
  id: string
  name: string
}

export default function App () {
  const [items, setItems] = useState<Item[]>([])
  const [input, setInput] = useState('')

  const addItem = () => {
    if (input.trim()) {
      setItems(prev => [
        ...prev, { id: Date.now().toString(), name: input.trim() },
      ])
      setInput('') //tehjennetään input tallennuksen jälkeen
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Add item"
        />
        <Button title="Add" onPress={addItem} />
      </View>
    
      <SwipeListView
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.rowFront}>
            <Text>{item.name}</Text>
          </View>
        )}
        renderHiddenItem={() => <View style={styles.rowBack} />}
        rightOpenValue={-75}
        disableRightSwipe
      
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  rowFront: {
    backgroundColor:'#f9f9f9',
    borderBottomWidth: 1,
    borderColor: '#333',
    padding: 16,
  },
  rowBack: {
    backgroundColor: '#ddd',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
})
