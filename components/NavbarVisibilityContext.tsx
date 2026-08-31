'use client'

import { createContext, useContext } from 'react'

export const NavbarVisibilityContext = createContext(true)

export function useNavbarVisible() {
  return useContext(NavbarVisibilityContext)
}
