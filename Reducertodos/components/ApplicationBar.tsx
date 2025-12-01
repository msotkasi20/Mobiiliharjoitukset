import * as React from 'react'
import { Appbar } from 'react-native-paper'

const MainAppbar = () => {
    return (
        <Appbar.Header 
            mode='center-aligned'
            elevated={true}
            style={{ backgroundColor:' #fff'}}
        >
            <Appbar.Content 
                title="Todo List" 
                titleStyle={{ color: '#333', fontWeight: 'bold'}}
                />
        </Appbar.Header>
    )
}

export default MainAppbar
