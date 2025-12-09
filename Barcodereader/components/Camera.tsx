// Kameran screen

import React, { FC } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { CameraView, BarcodeScanningResult, PermissionResponse } from 'expo-camera'

type PermissionProps = {
    permission: PermissionResponse | null | undefined
    requestPermission: () => void
    onCodeScanned: (result: BarcodeScanningResult) => void
    isScanning: boolean
}

export const CameraScreen: FC<PermissionProps> = ({
    permission,
    requestPermission,
    onCodeScanned,
    isScanning,
}) => {
    // Jos luvan tila ei ole vielä ladattuna, näytetään tyhjä ruutu
    if (!permission) {
        return <View style={styles.container} />       
    }

    // Lupaa ei myönnetä, näytetään viesti ja nappi luvan pyyntöön
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>
                    We need your permission to use the camera
                </Text>
                <Button onPress={requestPermission} title="Grant permission" />
            </View>
        )
    }

    // Jos lupa on saatu, näytetään kameran kuva
    return (
        <View style={styles.container} >
            <CameraView
                style={styles.camera}
                facing="back"
                onBarcodeScanned={isScanning ? onCodeScanned : undefined}
            />
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10
    },
    camera: {
        flex: 1
    },
})