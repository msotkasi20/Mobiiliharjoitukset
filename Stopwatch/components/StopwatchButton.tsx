// Nappien näyttämiseen
import { View, Text, Button } from 'react-native'
import React from 'react'

type StopwatchButtonProps = {
    title: string
    onPress: () => void
    disabled?: boolean
}

export default function StopwatchButton({title,onPress,disabled = false}:StopwatchButtonProps) {
  return (
    <View>
      <Button
        title={title}
        onPress={onPress}
        disabled={disabled}
      />
    </View>
  )
}