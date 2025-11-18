import * as React from 'react'
import { Appbar } from 'react-native-paper'

const MyAppBar = () => (
    <Appbar.Header>
        <Appbar.Content title="Theming..." />
        <Appbar.Action icon="magnify" onPress={() => {}} />
    </Appbar.Header>
)

export default MyAppBar