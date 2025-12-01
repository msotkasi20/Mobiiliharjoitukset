import { useReducer, useState} from 'react'
import { Task } from '../types/Types'

type TaskState = Task[]

type TaskAction =
  | { type: 'ADD', name: string }
  | { type: 'TOGGLE', id: string }

const initialTasks: TaskState = []

const taskReducer = ( state: TaskState, action: TaskAction): TaskState => {
    switch(action.type) {
      case 'ADD':
        const newTask: Task = {
          id: Date.now().toString(),
          name: action.name,
          done: false
        }
        return [...state, newTask]
      case 'TOGGLE':
        return state.map(task =>
          task.id === action.id ? {...task, done: !task.done} : task
        )
      default:
        return state
    }
  }

  export const useTasks = () => {
    const [state, dispatch] = useReducer(taskReducer, initialTasks)
    const [input, setInput] = useState("")
    
    const addTask = () => {
      const trimmed = input.trim()
      if (!trimmed) return
      dispatch({ type: 'ADD', name: trimmed })
      setInput('')
    }

    const toggleTask = (id: string) => {
      dispatch({ type: 'TOGGLE', id })
    }

    return {
      state,
      input,
      setInput,
      addTask,
      toggleTask
    }
  }