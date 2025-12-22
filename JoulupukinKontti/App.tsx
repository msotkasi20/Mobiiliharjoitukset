import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, TextInput, FlatList, Pressable, Alert } from 'react-native'
import { firestore, collection, addDoc, getDocs, serverTimestamp, query, orderBy, onSnapshot, deleteDoc, doc, WISHES } from './firebase/Config'
import Login from './screens/Login'

type Wish = {
  id: string,
  text: string,
  date: string
}

export default function App() {

  const [wishes, setWishes] = useState<Wish[]>([])
  const [newWish, setNewWish] = useState<string>('')

  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    if (!loggedIn) return

    const colRef = collection(firestore, WISHES)
    const wishquery = query(colRef, orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(wishquery, (snap) => {
      const rows: Wish[] = snap.docs.map(d => {
        const data = d.data() as any
        const text = data.text ?? 'Not specified'
        const created = data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt ?? null
        const date = created ? created.toLocaleString('FI-fi') : '(Tallentuu...)'
        return { id: d.id, text, date }
      })
      setWishes(rows)
    }, (err) => {
      console.error('OnSnapShot error', err)
    })
    return () => { unsubscribe() }
  }, [loggedIn])

  const addWish = async (): Promise<void> => {
    if (!newWish.trim()) return
    try {
      const colRef = collection(firestore, WISHES)
      await addDoc(colRef, {
        text: newWish,
        createdAt: serverTimestamp()
      })
      setNewWish('')
    } catch (err) {
      console.log('Failed to save message to Firebase', err)
    }
  }

  const removeWish = async (id: string) => {
    await deleteDoc(doc(firestore, WISHES, id))
  }

  if (!loggedIn) {
    return (
      <View style={styles.container}>
        <Login setLoggedIn={setLoggedIn} />
        <StatusBar style="auto" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Joulupukin kontti</Text>
      <Text style={styles.subtitle}>Kirjoita joululahjatoiveesi tähän:</Text>
      <TextInput
        placeholder='Kirjoita uusï toive..'
        value={newWish}
        onChangeText={setNewWish}
        style={styles.wishInput}
      />
      <Button title='Tallenna' onPress={addWish} color='#e70505ff'></Button>
      
      <Text style={styles.wish}>Lahjatoiveesi:</Text>
      <FlatList
        data={wishes}
        keyExtractor={(item) => item.id}
        style={{ width: '100%' }}
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Pressable
            onLongPress={() =>
              Alert.alert('Poista toive?', item.text, [
                { text: 'Peruuta', style: 'cancel' },
                { text: 'Poista', style: 'destructive', onPress: () => removeWish(item.id) },
              ])
            }
            style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}
          >
            <Text style={styles.wishText}>{item.text}</Text>
            <Text style={styles.metaText}>{item.date}</Text>
            <Text style={styles.hint}>Paina pitkään poistaaksesi</Text>
          </Pressable>
        )}
      />
        <StatusBar style="auto" />
      </View>
  )
}
      
const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    marginTop: 12,
    fontSize: 24,
    fontWeight: '700',
    color: '#e70505ff',
  },
  subtitle: {
    margin: 10,
    fontSize: 18,
  },
  wishInput: {
    alignSelf: 'stretch',
    borderWidth: 1,
    padding: 12,
    marginBottom: 16,
  },
  wish: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '700',
  },
  row: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  wishText: {
  fontSize: 16,
  fontWeight: '700',   // bold
  marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    opacity: 0.6,
  },
    hint: {
      fontSize: 12,
      opacity: 0.6,
  },
})
