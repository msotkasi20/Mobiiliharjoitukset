// screens/HomeScreen.tsx
import React from 'react'
import { ActivityIndicator , StyleSheet , Text , View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useFetch } from '@local/use-fetch'
import WeatherCard from '../components/WeatherCard'
import { useCurrentLocation } from '../hooks/useCurrentLocation'

const OPENWEATHER_API_KEY='OMA_AVAIN' // Tähän oma API-key!! Ei gittiin!!!

type WeatherResponse = {
  name: string
  main: {
    temp: number
    feels_like: number
    humidity: number
  }
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
}

export default function HomeScreen() {
  const { coords: coords, loading: locationLoading, error: locationError } = useCurrentLocation()

  const weatherUrl =
    coords
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&lang=fi&appid=${OPENWEATHER_API_KEY}`
      : null

  const { data , loading: weatherLoading, error: weatherError } = useFetch<WeatherResponse>(weatherUrl)

  const weather = data?.weather?.[0]

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.appTitle}>SääAssari</Text>

      {locationLoading && (
        <View style={styles.center}>
          <ActivityIndicator />
          <Text>Haetaan sijaintia...</Text>
        </View>
      )}

      {locationError && (
        <View style={styles.center}>
          <Text style={styles.errorText}>{locationError}</Text>
        </View>
      )}

      {coords && !locationError && (
        <>
          {weatherLoading && (
            <View style={styles.center}>
              <ActivityIndicator />
              <Text>Haetaan säätietoja...</Text>
            </View>
          )}

          {weatherError && (
            <View style={styles.center}>
              <Text style={styles.errorText}> Virhe säätietojen haussa.</Text>
              <Text>
                {String(
                  (weatherError as any)?.message ?? weatherError
                )}
              </Text>
            </View>
          )}

          {data && weather && !weatherLoading && !weatherError && (
            <WeatherCard
              city={data.name}
              temp={data.main.temp}
              feelsLike={data.main.feels_like}
              humidity={data.main.humidity}
              main={weather.main}
              description={weather.description}
            />
          )}

          {!weatherLoading && !weatherError && !data && (
            <View style={styles.center}>
              <Text>Ei säätietoja saatavilla.</Text>
            </View>
          )}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f2fd',
    paddingTop: 68,
    paddingHorizontal: 16,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  center: {
    marginTop: 24,
    alignItems: 'center',
  },
  errorText: {
    color: '#b00020',
    textAlign: 'center',
  },
})

