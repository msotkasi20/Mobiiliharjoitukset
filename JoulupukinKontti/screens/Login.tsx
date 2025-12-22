import { View, Text, StyleSheet, TextInput, Alert, Button } from 'react-native'
import React, { useState } from 'react'
import {  getAuth, signInWithEmailAndPassword } from '../firebase/Config'

interface LoginProps {
  setLoggedIn: (value: boolean) => void
}

export default function Login({setLoggedIn}:LoginProps) {

const [email, setEmail] = useState<string>('')
const [password, setPassword] = useState<string>('')

const handleLogin = async () => {
  if(!email.trim() || !password.trim()) {
    Alert.alert('HUOMIO! Syötä sähköposti ja salasana')
    return
  }
  
  try{
    const auth = getAuth()
    await signInWithEmailAndPassword(auth, email.trim(), password)
    setLoggedIn(true)
  } catch (err) {
    Alert.alert('Kirjautuminen epäonnistui. Tarkista tunnukset ja yritä uudelleen')
  }
}

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.login}>Kirjaudu tästä JoulupukinKonttiin</Text>
        <Text style={styles.littleTitle}>Sähköposti</Text>
        <TextInput
          placeholder='Sähköposti'
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <Text style={styles.littleTitle}>Salasana</Text>
        <TextInput
          placeholder='Salasana'
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <View style={styles.button}>
          <Button title='Kirjaudu' onPress={handleLogin} color='#e70505ff'></Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  form: {
    width: '100%',
    alignSelf: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee'
  },
  login: {
    fontSize: 24,
    fontWeight: '700',
    color: '#e70505ff',
    textAlign: 'center',
    marginBottom: 12,
  },
  littleTitle: {
    fontSize: 18,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  input: {
      alignSelf: 'stretch',
      borderWidth: 1,
      padding: 12,
      marginBottom: 12,
  },
  button: {
    alignItems: 'center',
    marginTop: 8,
  }
})