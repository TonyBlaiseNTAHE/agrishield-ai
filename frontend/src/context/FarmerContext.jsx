import React, { createContext, useContext, useEffect, useState } from 'react'

const FarmerContext = createContext()

export const FarmerProvider = ({ children }) => {
  const [farmer, setFarmer] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('farmer'))
      return stored || null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (farmer) {
      localStorage.setItem('farmer', JSON.stringify(farmer))
      localStorage.setItem('farmerId', farmer._id || farmer.farmerId || '')
    } else {
      localStorage.removeItem('farmer')
      localStorage.removeItem('farmerId')
    }
  }, [farmer])

  const logout = () => setFarmer(null)

  return (
    <FarmerContext.Provider
      value={{
        farmer,
        farmerId: farmer?._id || farmer?.farmerId || localStorage.getItem('farmerId') || null,
        setFarmer,
        logout
      }}
    >
      {children}
    </FarmerContext.Provider>
  )
}

export const useFarmer = () => useContext(FarmerContext)
