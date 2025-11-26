import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import type { Task } from '../types/Types'

type RowProps = {
    task: Task
    onToggle: (id: string) => void
}

const Row: React.FC<RowProps> = ({ task, onToggle }) => {
    return (
        <Pressable onPress={() => onToggle(task.id)}>
            <View style={styles.row}>
                <Text style={[styles.text, task.done && styles.textDone]} >
                    {task.name}
                </Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    row: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
    textDone: {
        textDecorationLine: 'line-through',
        color: '#555'
    },
})

export default Row