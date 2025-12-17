// components/WeatherCard.tsx
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = {
  city: string
  temp: number
  feelsLike: number
  humidity: number
  main: string
  description: string
}

function getWeatherEmoji(main: string) {
  const m = main.toLowerCase()
  if (m === 'clear') return '☀️'
  if (m === 'clouds') return '☁️'
  if (m === 'rain') return '🌧️'
  if (m === 'drizzle') return '🌦️'
  if (m === 'thunderstorm') return '⛈️'
  if (m === 'snow') return '❄️'
  return '🌡️'
}

export default function WeatherCard({ city, temp, feelsLike, humidity, main, description}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.city}>{city}</Text>

      <Text style={styles.emoji}>{getWeatherEmoji(main)}</Text>

      <Text style={styles.temp}>{Math.round(temp)}°C</Text>

      <Text style={styles.description}>{description}</Text>

      <Text style={styles.details}>
        Tuntuu kuin {Math.round(feelsLike)}°C   •   Kosteus {humidity}%
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginTop: 24,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    elevation: 3, 
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  city: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 48,
    marginVertical: 8,
  },
  temp: {
    fontSize: 40,
    fontWeight: '700',
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    textTransform: 'capitalize',
  },
  details: {
    marginTop: 18,
    fontSize: 14,
    color: '#555',
  },
})
