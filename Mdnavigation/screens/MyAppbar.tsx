import * as React from 'react'
import { Appbar } from 'react-native-paper'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'

type MyAppbarProps = NativeStackHeaderProps

const MyAppbar: React.FC<MyAppbarProps> = ({ navigation, back, options }) => {

    const title = options.title ?? 'MV Nav Demo'

    return (
        <Appbar.Header
            elevated={true}
            style={{backgroundColor: '#fff'}}
            >
            <Appbar.Content title={title} />
            {back ? (
                //toisessa ruudussa näytetään back-nuoli
                <Appbar.BackAction 
                    color="#333"
                    onPress={navigation.goBack}/>
            ) : (
                //Home-ruudussa ei mennä takaisin päin, näytetään arrow-right
                <Appbar.Action
                    icon="arrow-right"
                    color="#333"
                    onPress={() => navigation.navigate('SecondScreen')}
                />
            )}
            
        </Appbar.Header>
    )
}

export default MyAppbar