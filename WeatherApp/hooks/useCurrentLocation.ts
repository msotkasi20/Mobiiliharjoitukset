// hooks/useCurrentLocation.ts
import { useEffect, useState } from 'react'
import * as Location from 'expo-location'

type Coords = {
  lat: number
  lon: number
}

export function useCurrentLocation() {
  const [coords, setCoords] = useState<Coords | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      setLoading(true)
      setError(null)
      try {
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== Location.PermissionStatus.GRANTED) {
          setError(
            'Sijaintilupaa ei myönnetty. Voit muuttaa sijaintiasetuksia laitteen asetuksista.'
          )
          return
        }

        const location = await Location.getCurrentPositionAsync({})
        setCoords({
          lat: location.coords.latitude,
          lon: location.coords.longitude,
        })
      } catch (e: any) {
        setError(e?.message ?? 'Tuntematon virhe sijainnin haussa.')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return { coords, loading, error } as const
}
