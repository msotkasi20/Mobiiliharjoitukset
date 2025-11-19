import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const SecondScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Second Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    }
})

export default SecondScreen