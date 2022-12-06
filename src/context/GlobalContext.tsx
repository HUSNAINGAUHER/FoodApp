import React, { useState, createContext } from 'react'

export type Globals = {
  Cart: [any[], (val: any[]) => void]
}

export const _GlobalContext = createContext<Globals>({
  Cart: [[], (val: any[]) => val],
})

export const useGlobalsContenxt = () => {
  return React.useContext(_GlobalContext)
}

interface StateContextProps {
  children: React.ReactNode
}

export const GlobalsContext = (props: StateContextProps) => {
  const { children } = props
  
 
  const [Cart, setCart] = useState<any>([])

 
  const state: Globals = {
    Cart: [Cart, setCart],
  }

  return <_GlobalContext.Provider value={state}>{children}</_GlobalContext.Provider>
}
