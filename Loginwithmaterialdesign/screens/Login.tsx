import { View, StyleSheet } from 'react-native'
import MainAppbar from '../components.tsx/MainAppbarProps'
import { TextInput, Button } from 'react-native-paper'
import React, { useState } from 'react'

type LoginFormState = {
    username: string
    password: string
}

const LoginScreen = () => {

    const [ form, setForm ] = useState<LoginFormState>({ username: '', password: ''})
    const [ showError, setShowError ] = useState(false)

    const handleSubmit = () => {
        setShowError(true)
        if (form.username.trim().length > 0 || form.password.trim().length > 0) {
            //Submission not implemented
            console.log('Form submitted: ', form)
            setForm({ username: '', password: '' })
            setShowError(false)
        }
    }

    return (
        <>
            <MainAppbar title="Login" />
            <View style={styles.container}>
                <TextInput
                    label="Username"
                    style={styles.field}
                    keyboardType='email-address'
                    value={form.username}
                    onChangeText={text => setForm(prev => ({ ...prev, username: text }))}
                    error={form.username.trim() === '' && showError}
                />
                <TextInput
                    label="Password"
                    secureTextEntry
                    style={styles.field}
                    value={form.password}
                    onChangeText={text => setForm(prev => ({ ...prev, password: text}))}
                    error={form.password.trim() === '' && showError}
                />
                <Button mode="contained" onPress={handleSubmit}>
                    Submit
                </Button>
            </View>
        </>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    field: {
        backgroundColor: '#fcfcfc',
        marginTop: 16,
        marginRight: 8,
        marginBottom: 16,
        marginLeft: 8,
    }
})

export default LoginScreen