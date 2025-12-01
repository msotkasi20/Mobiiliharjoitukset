import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { formatTime } from '../utils'

type TimeDisplayProps = {
    time: number
}

const TimeDisplay = ({ time }: TimeDisplayProps) => {
    return (
        <Text style={styles.time}>{formatTime(time)}</Text>
    )
}

const styles = StyleSheet.create({
    time: {
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#f2196F3',
        fontFamily: 'monospace',
    },
})

export default TimeDisplay