import { create } from 'zustand'

type CounterState = {
    count: number
    increase: () => void
    decrease: () => void
    reset: (n: number) => void
}

const useCounterStore = create<CounterState>((set) => ({
    count: 0,
    increase: () => set((state) => ({count: state.count + 1})),
    decrease: () => set((state) => ({count: state.count - 1})),
    reset: (n: number) => set({count: n})
}))

export default useCounterStore