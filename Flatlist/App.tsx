import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SwipeListView } from 'react-native-swipe-list-view'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface Item {
  id: string
  name: string
}

const STORAGE_KEY = 'SHOPPING_LIST_ITEMS' //luodaan muuttuja asyncstoragen datalle

export default function App () {
  const [items, setItems] = useState<Item[]>([])
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')

  //Ladataan tiedot (itemit) AsyncStoragesta kun useEffect ajetaan
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY)
        if (json) setItems(JSON.parse(json))
      } catch (e) {
        console.log("AsyncStorage problem")
      }
    })() //kutsutaan nimetöntä funktiota pelkillä suluilla
  }, [])

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = () => {
    if (input.trim()) {
      setItems(prev => [
        ...prev, { id: Date.now().toString(), name: input.trim() },
      ])
      setInput('') //tehjennetään input tallennuksen jälkeen
    }
  }

  const filteredItems = search.trim()
    ? items.filter(item =>
      item.name.toLowerCase().includes(search.trim().toLowerCase()))
    : items

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={setSearch}
          placeholder="Search items"
        />
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Add item"
        />
        <Button title="Add" onPress={addItem} />
      </View>
    
      <SwipeListView
        data={filteredItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.rowFront}>
            <Text>{item.name}</Text>
          </View>
        )}
        renderHiddenItem={({ item }) => (
          <View style={styles.rowBack} >
            <Button
              title="Delete"
              color="#d11a2a"
              onPress={() => {
                setItems(prev => prev.filter(i => i.id !== item.id))
              }}
            />
          </View>
        )}
        rightOpenValue={-90}
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
