import { StatusBar } from 'expo-status-bar'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState, useRef } from 'react'
import type { Drink, CocktailResponse } from './types/cocktailTypes'
import Header from './components/Header'
import Row from './components/Row'
import Search from './components/Search'

export default function App() {

  const [drinks, setDrinks] = useState<Drink[] | null>(null)
  const [query, setQuery] = useState<string>('margarita') //tehdään tilamuuttuja hakutermille, se välitetään Searchiin (on initialValue) ja sen set alkuinen funktio onSearchiin (päivittää tilamuuttujan) 
  const controllerRef = useRef<AbortController | null>(null)

  //async function fetchCocktails(): Promise<void> {
  const fetchCocktails = useCallback(async(term: string) => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + encodeURIComponent(term)
      
      controllerRef.current?.abort()
      const controller = new AbortController()
      controllerRef.current = controller
      
      try {
        const res = await fetch(url,{signal: controller.signal})
        if (!res.ok) {
          console.error(
            `Network response was not ok: ${res.status} ${res.statusText}`)
          return;
        }
        const data: CocktailResponse = await res.json()
        // normalize and filter unexpected nulls in the API response. 
        const list = Array.isArray(data.drinks) ?
          data.drinks.filter(Boolean) : null;
        setDrinks(list);
      } catch (err) {
        console.error('Failed to fetch cocktails:', err)
      }
  },[])

  useEffect(() => {
    fetchCocktails(query)
  }, [fetchCocktails, query])

  //Searchissa onSearch saa parametrin t ja setQuery käyttää sitä
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Search defaultValue={query} onSearch={(t) => setQuery(t)} /> 
      {drinks && drinks.length > 0 ? ( 
        <>
          <Header /> 
          <FlatList 
            data={drinks} 
            keyExtractor={(d, index) =>  
            (d?.idDrink ? String (d.idDrink) : String(index))} 
            renderItem={({ item }) => <Row item={item} />} 
            contentContainerStyle={styles.list} 
          />
        </>
      ) : (
        <View style={styles.centered}>
          <Text>No drinks found.</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({ 
 container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    alignItems: 'stretch', 
    justifyContent: 'flex-start', 
    paddingTop: 8, 
  }, 
  list: { 
    flexGrow: 1, 
    paddingHorizontal: 12, 
    paddingVertical: 12, 
  }, 
  centered: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 12, 
  },
})
