import React, { useState } from 'react'
import * as eva from '@eva-design/eva'
import {
  ApplicationProvider,
<<<<<<< Updated upstream
  Layout,
  Text,
  Divider,
  Drawer,
  DrawerItem
} from '@ui-kitten/components'
import { default as theme } from './theme.json'

export default () => (
  <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
    <Layout
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
      }}
    >
      <Layout
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 10,
          width: '100%'
        }}
      >
        <Text category='h5' status='primary'>
          Bienvenue sur Harry Potfleur
        </Text>
        <Text category='s1' status='primary'>
          Une application de gestion de potfleurs
        </Text>
      </Layout> 
      <Divider style={{ width: '100%' }} />
      <Layout
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          padding: 10,
          width: '100%'
        }}
      >
        <Text category='h5' status='success'>
          Liste de vos plantes
        </Text>
        <Drawer
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <DrawerItem title='Roses' />
          <DrawerItem title='Pivoines' />
          <DrawerItem title='Tulipes' />
          <DrawerItem title='Orchidées' />
        </Drawer>
      </Layout>
    </Layout>
  </ApplicationProvider>
)
=======
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
>>>>>>> Stashed changes
