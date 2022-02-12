import { useEffect, useReducer } from "react"

export default function useReducerWithLocalStorage(reducer, initialState, storageKey) {
  const [storedState, dispatch] = useReducer(reducer, initialState, (initialState) => {
    try {
      const persisted = window.localStorage.getItem(storageKey)
      return persisted ? JSON.parse(persisted) : initialState
    } catch (error) {
      console.log(error)
      return initialState
    }
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(storedState))
  }, [storedState])

  return [storedState, dispatch]
}