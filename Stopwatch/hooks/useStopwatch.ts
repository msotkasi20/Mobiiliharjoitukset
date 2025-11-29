//Kaikki sekuntikellon logiikka

import { useReducer, useRef } from 'react'

type StopwatchState = {  //objektin tietotyyppi ja mitä kenttiä se sisältää
  time: number
  isRunning: boolean
}

type StopwatchAction =  // union, (enum), putkioperaattorilla listataan vaihtoehdot
  | { type: 'START' }
  | { type: 'STOP' }
  | { type: 'RESET' }
  | { type: 'TICK' }

const initialState: StopwatchState = {  //alkuobjekti, jonka tietotyyppi on StopwatchState ja sillä on kentät time ja isRunning
  time: 0,
  isRunning: false
}

const stopwatchReducer = (state: StopwatchState, action: StopwatchAction):  //reducer palauttaa aina uuden tilaobjektin,
  StopwatchState => {                                                       //ottaa huomioon vanhan, tekee mahdollisesti
    switch(action.type) {                                                   //jotain muutoksia ja saa actionin (mitä tilalla tehdään)
      case 'START':
        return { ...state, isRunning: true}
      case 'STOP': 
        return { ...state,isRunning:false}
      case 'RESET':
        return { time: 0, isRunning: false}
      case 'TICK':
        return { ...state, time: state.time + 1}
      default:
        return state
    }
  }

  export const useStopwatch = () => {
    const [state, dispatch] = useReducer(stopwatchReducer, initialState)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

      const handleStart = () => {
        dispatch({ type: 'START' })
        timerRef.current = setInterval(() => {
          dispatch({ type: 'TICK'})
        }, 1000)
      }
    
      const handleStop = () => {
        if (timerRef.current) {
          dispatch({ type: 'STOP' })
          clearInterval(timerRef.current)
        }
      }
    
      const handleReset = () => {
        if (timerRef.current) {
          dispatch({ type: 'RESET' })
          clearInterval(timerRef.current)
        }
      }

      return {
        state,
        handleStart,
        handleStop,
        handleReset
      } 
  }
