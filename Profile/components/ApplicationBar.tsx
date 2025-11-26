import * as React from 'react'
import { Appbar } from 'react-native-paper'

interface MyAppBarProps {
  navigation: any
  route: any
  back?: any
}

const MyAppBar: React.FC<MyAppBarProps> = ({ navigation, route, back }) => {
  return (
    <Appbar.Header>
      {back && <Appbar.BackAction onPress={navigation.goBack} />}
      <Appbar.Content title={route.name} />
      <Appbar.Action
        icon="account"
        onPress={() => navigation.navigate('Profile')}
      />
    </Appbar.Header>
  )
}

export default MyAppBar