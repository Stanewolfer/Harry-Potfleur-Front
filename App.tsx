import React, { useState } from 'react'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { default as theme } from './theme.json'
import HomePage from './pages/HomePage'
import LoadingScreen from './pages/LoadingPage'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PlantPage from './pages/PlantPage'
import { MqttProvider } from './MqttContext'

// Interface commune pour les plantes
export interface Plant {
  name: string
  waterLevel: number
  temperature: number
  sunlight: number
  mood?: 'happy' | 'neutral' | 'sad'
}

const Stack = createNativeStackNavigator()

export default () => {
  const [isLoading, setIsLoading] = useState(true)
  const [plants, setPlants] = useState<Plant[]>([
    {
      name: 'Monstera',
      waterLevel: 75,
      temperature: 23,
      sunlight: 65,
    },
    {
      name: 'Cactus',
      waterLevel: 20,
      temperature: 28,
      sunlight: 90,
    },
    {
      name: 'Fern',
      waterLevel: 85,
      temperature: 21,
      sunlight: 40,
    },
    {
      name: 'Bamboo',
      waterLevel: 70,
      temperature: 22,
      sunlight: 60,
    },
    {
      name: 'Succulent',
      waterLevel: 25,
      temperature: 26,
      sunlight: 85,
    }
  ])

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <MqttProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name='Home'
                component={(props: any) =>
                  isLoading ? (
                    <LoadingScreen {...props} />
                  ) : (
                    <HomePage plants={plants} setPlants={setPlants} {...props} />
                  )
                }
              />
              <Stack.Screen
                name='PlantPage'
                component={
                  (props: any) => {
                    // Correction ici: accéder directement à l'index
                    const index = props.route.params.index;
                    return <PlantPage index={index} plants={plants} />;
                  }
                }
              />
            </Stack.Navigator>
          </NavigationContainer>
        </MqttProvider>
      </ApplicationProvider>
    </>
  )
}