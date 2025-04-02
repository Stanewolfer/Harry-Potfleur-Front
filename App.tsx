import React, { useState } from 'react'
import * as eva from '@eva-design/eva'
import {
  ApplicationProvider,
  IconRegistry,
  Layout
} from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { default as theme } from './theme.json'
import HomePage from './pages/HomePage'
import { LoadingScreen } from './pages/LoadingPage'

export default () => {
  const [isLoading, setIsLoading] = useState(true)
  // Mock data for plants
  const plants = [
    {
      name: 'Monstera',
      type: 'Tropical',
      waterLevel: 75,
      temperature: 23,
      sunlight: 65
    },
    {
      name: 'Cactus',
      type: 'Desert',
      waterLevel: 20,
      temperature: 28,
      sunlight: 90
    },
    {
      name: 'Fern',
      type: 'Tropical',
      waterLevel: 85,
      temperature: 21,
      sunlight: 40
    },
    {
      name: 'Bamboo',
      type: 'Tropical',
      waterLevel: 70,
      temperature: 22,
      sunlight: 60
    },
    {
      name: 'Succulent',
      type: 'Desert',
      waterLevel: 25,
      temperature: 26,
      sunlight: 85
    }
  ]

  // Simulate loading time
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 2 seconds loading time

    return () => clearTimeout(timer) // Cleanup the timer on unmount
  }, [])

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <Layout style={{ flex: 1 }} level='1'>
          {isLoading ? <LoadingScreen /> : <HomePage plants={plants} />}
        </Layout>
      </ApplicationProvider>
    </>
  )
}
