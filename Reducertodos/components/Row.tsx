import React from 'react'
import { StyleSheet, Text, View, Pressable, StyleProp, ViewStyle } from 'react-native'
import type { Task } from '../types/Types'

type RowProps = {
    task: Task
    onToggle: (id: string) => void
    style?: StyleProp<ViewStyle>
}

const Row: React.FC<RowProps> = ({ task, onToggle, style }) => {
    return (
        <Pressable onPress={() => onToggle(task.id)}>
            <View style={[styles.row, style]}>
                <Text style={[styles.text, task.done && styles.textDone]} >
                    {task.name}
                </Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    row: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginVertical: 4,
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