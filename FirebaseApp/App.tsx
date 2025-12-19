import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { firestore, collection, addDoc, serverTimestamp, MESSAGES, getDocs, query, orderBy, onSnapshot } from './firebase/Config'
import { useState, useEffect } from 'react';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  const [newMessage, setNewMessage] = useState<string>('')
  const [messages, setMessages] = useState<string[]>([])
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    const colRef = collection(firestore,MESSAGES)
    const messageq = query(colRef,orderBy('createdAt','desc'))
    const unsubscribe = onSnapshot(messageq,(snap) => {
      const rows: string[] = snap.docs.map(d => {
        const data = d.data() as any
        const text = data.text ?? 'Not specified'
        const created = data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt ?? null
        //const created = data.createdAt.toDate()
        const time = new Date(created).toLocaleString('FI-fi')
        return time + ' - ' + text
      })
      setMessages(rows)
    },(err) => {
      console.error('OnSnapshot error!', err)
    })
    return () => { unsubscribe() }
  },[])

  const handleSend = async (): Promise<void> => {
    if (!newMessage.trim()) return
    try {
      const colRef = collection(firestore,MESSAGES)
      await addDoc(colRef, {
        text: newMessage,
        createdAt: serverTimestamp()
      })
      setNewMessage('')
    } catch (err) {
      console.log('Failed to save message to Firebase', err)
    }
  }

  if(!loggedIn) {
    return (
      <View style={styles.container}>
        <LoginScreen setLoggedIn={setLoggedIn}/>
        <StatusBar style="auto" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder = 'Type new message..'
        value = { newMessage }
        onChangeText = { setNewMessage }
        style={styles.textInput}
      />
      <Button title="Send" onPress={handleSend}></Button>
      <Text style={styles.message}>Messages:</Text>
      {
        messages.map((message,index) => (
          <Text key={index}>{message}</Text>
        ))
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    padding:12,
    marginBottom: 18,
  },
  message: {
    marginTop: 12,
    marginBottom: 12,
  }
});
