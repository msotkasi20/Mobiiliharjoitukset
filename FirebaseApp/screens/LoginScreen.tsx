import React, { useState } from 'react'
import { TextInput, Button, Text, View, StyleSheet, Alert } from 'react-native'
import {  getAuth, signInWithEmailAndPassword } from '../firebase/Config'

interface LoginProps {
  setLoggedIn?: (value: boolean) => void
}

export default function LoginScreen({ setLoggedIn }: LoginProps): React.ReactElement {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  async function handleLogin(): Promise<void> {
    if(!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password')
      return
    }

    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(
        auth, email.trim(), password.trim()
      )
      const user = userCredential.user
      if (setLoggedIn) {
        setLoggedIn(true)
      }
    } catch (err) {
      console.log('Login failed. Please try again', err)
    }
  }

  return(
    <View style={styles.container}>
      <Text style={styles.email}>Enter email</Text>
      <TextInput
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        style={styles.emailInput}
      />
      <Text style={styles.password}>Enter password</Text>
      <TextInput
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        style={styles.passwordInput}
      />
      <Button title='LOGIN' onPress={handleLogin}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '100%',
    justifyContent: 'center',
    paddingTop: 48,
  },
  email: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  emailInput: {
    maxWidth: '100%',
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
  },
  password: {
    marginBottom: 10,
    marginTop: 12,
    fontWeight: 'bold',
  },
  passwordInput: {
    maxWidth: '100%',
    borderWidth: 1,
    padding: 12,
    marginBottom: 22,
  },
})