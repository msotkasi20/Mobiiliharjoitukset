import React, { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, Platform } from 'react-native'
import Constants from 'expo-constants'

type Props = {        //propertyt tyypitetään AINA ensin
  defaultValue?: string
  onSearch: (term: string) => void
}

export default function Search({ defaultValue = '', onSearch }: Props) { //kutsuu App-komponentissa olevaa funktiota
  const [value, setValue] = useState<string>(defaultValue) //tämä on hakutermi, joka kirjoitetaan hakukenttään

  useEffect(() => {
    onSearch(value)     //Reactissa on sääntö, jos kutsuu useEffectissä funtiota, niin se pitää laittaa riippuvuustaulukkoon myös
  }, [value, onSearch]) //useEffect riippuu valuesta, eli jos textInputiin muutetaan tilamuuttujaa, se laukaisee onSearc-funktion, joka kutsuu App-komponentissa olevaa funktiota 

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search cocktails (e.g. margarita)"
        value={value}
        onChangeText={setValue}
        style={styles.input}
        returnKeyType="search"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 8,
    marginRight: 8,
    height: 40,
  },
})
