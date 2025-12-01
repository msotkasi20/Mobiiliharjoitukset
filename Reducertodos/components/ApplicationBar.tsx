import * as React from 'react'
import { Appbar } from 'react-native-paper'

const MainAppbar = () => {
    return (
        <Appbar.Header 
            mode='center-aligned'
            elevated={true}
            style={{ backgroundColor: '#0a68b4ff'}}
        >
            <Appbar.Content 
                title="Simple Todo" 
                titleStyle={{ fontWeight: 'bold', color: '#fff'}}
                />
        </Appbar.Header>
    )
}

export default MainAppbar
