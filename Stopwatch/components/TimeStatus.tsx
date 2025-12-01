import React from 'react'
import { Text, StyleSheet } from 'react-native'

type TimeStatusProps = {
  isRunning: boolean
}

const TimeStatus =({ isRunning }: TimeStatusProps) => {
    return (
        <Text style={styles.status}>{isRunning ? 'Running' : 'Stopped'}</Text>
    )
}

const styles = StyleSheet.create({
  status: {
    fontSize: 24,
    marginTop: 24,
  },
})

export default TimeStatus
