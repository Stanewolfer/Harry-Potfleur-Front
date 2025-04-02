import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from '@react-navigation/native-stack'
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
import PlantPage from './pages/PlantPage'

export default () => {
  const Stack = createNativeStackNavigator()
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
    console.log('Loading...')
    console.log('Plants:', plants)
    return () => clearTimeout(timer) // Cleanup the timer on unmount
  }, [])

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name='Home'
              component={(props: React.JSX.IntrinsicAttributes) =>
                isLoading ? (
                  <LoadingScreen {...props} />
                ) : (
                  <HomePage plants={plants} {...props} />
                )
              }
            />
            <Stack.Screen
              name='PlantPage'
              component={(props: NativeStackScreenProps<any, 'PlantPage'>) => (
                <PlantPage
                  plantData={props.route.params?.plant || {}}
                  onValveActivation={function (): void {
                    throw new Error('Function not implemented.')
                  }}
                  {...props}
                />
              )}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  )
}
