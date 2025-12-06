import { Accelerometer } from 'expo-sensors'
import { useState, useEffect } from 'react'

export interface AccelerometerData {
  x: number
  y: number
  z: number
}

export interface UseAccelerometerReturnType {
    data: AccelerometerData
    accelerometerAvailable: boolean | null
}

export const useAccelerometer = (updateInterval: number = 100) : UseAccelerometerReturnType => {
    const [data, setData] = useState<AccelerometerData> ({ x:0, y:0, z:0 })
    const [accelerometerAvailable, setAccelerometerAvailable] = useState<boolean | null>(null)

    useEffect(() => {
        const checkAvailability = async () => {
          const available = await Accelerometer.isAvailableAsync()
          setAccelerometerAvailable(available)
    
          if (available) {
            Accelerometer.setUpdateInterval(100)
            const subscription = Accelerometer.addListener(({x,y,z}) => {
                setData({x,y,z})
            })
    
            return () => {
                subscription.remove()
            }
          }
        }
        checkAvailability() 
      }, [updateInterval])

      return {
        data,
        accelerometerAvailable
      }
}

