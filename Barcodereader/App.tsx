import React, { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCameraPermissions, BarcodeScanningResult } from 'expo-camera'
import { CameraScreen } from './components/Camera'

export default function App() {

  const [permission, requestPermission] = useCameraPermissions()
  const [lastCode, setLastCode] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(true)

  const handleCodeScanned = (result: BarcodeScanningResult) => {
    if (!isScanning) return

    setIsScanning(false)
    setLastCode(result.data)
  }

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <CameraScreen
          permission={permission}
          requestPermission={requestPermission}
          onCodeScanned={handleCodeScanned}
          isScanning={isScanning}
        />
        { lastCode && (
          <View style={styles.footer}>
            <View style={styles.footerRow}>
              <Text style={styles.footerTitle}>Barcode: </Text>
              <Text style={styles.footerCode}>{lastCode}</Text>
            </View>
              <View style={styles.scanAgainWrapper}>
                <Button 
                  title="Scan again" 
                  onPress={() => {
                    setLastCode(null)
                    setIsScanning(true)
                    }}  
                />
              </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
  },
  container: {
    flex: 1
  },
  footer: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#333'
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 8,
    marginBottom: 8,
  },
  footerTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  footerCode: {
    fontSize: 18,
    color: '#fff'
  },
  scanAgainWrapper: {
   alignSelf: 'center',
   marginBottom: 12,
  }
});
