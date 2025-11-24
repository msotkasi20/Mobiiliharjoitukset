import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native'
import * as SQLite from 'expo-sqlite'
import { useState, useEffect } from 'react'

type Task = {
  id: number
  text: string
}

export default function App() {

  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null)
  const [newTask, setNewTask ] = useState<string>("")
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const initDb = async() => { // Luodaan tietokanta async funktiolla initDb, jota pitää muistaa kutsua lopuksi!
      const database = await SQLite.openDatabaseAsync('todos.db')
      setDb(database)
      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS todos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          text TEXT NOT NULL
        )
      `)
      loadTodos(database)
    }
    initDb()
  }, [])

  const loadTodos = async (database: SQLite.SQLiteDatabase) => {
    const result = await database.getAllAsync<Task>('SELECT * FROM todos ORDER BY id DESC')
    setTasks(result)
  }
  
  const addTask = async() => {
    if (!newTask.trim() || !db) return

    await db.runAsync('INSERT INTO todos (text) values (?)', newTask)
    setNewTask("")
    loadTodos(db)
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter task"
        value={newTask}
        onChangeText={setNewTask}
        style={styles.input}
        onSubmitEditing={addTask}
      />
      <FlatList
        data = { tasks }
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <Text>{item.text}</Text>
        )}
      />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 32,
    padding: 8
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#333'
  }
})
