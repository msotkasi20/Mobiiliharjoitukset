import { MD3DarkTheme, MD3LightTheme, MD3Theme } from 'react-native-paper'
import { Colors } from '../constants/colors'

const customDarkTheme: MD3Theme = { ...MD3DarkTheme, roundness: 2, colors: Colors.dark}
const customLightTheme: MD3Theme = { ...MD3LightTheme, roundness: 2, colors: Colors.light}

export {
    customDarkTheme,
    customLightTheme
}