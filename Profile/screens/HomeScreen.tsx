import { useProfile } from '../hooks/useProfile'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'

const HomeScreen: React.FC = () => {
    const [email, setEmail] = useState('')
    const {getProfile} = useProfile()

    useEffect(() => {
        (async () => {
            const profile = await getProfile()
            if (profile?.email) setEmail(profile.email)
        })()
    }, [getProfile])

    return (
        <View style={styles.container}>
            <Text>Welcome to the Home Screen!</Text>
            {email ? <Text>Email: {email}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})

export default HomeScreen