import React, { useEffect, useState } from 'react'
import { useMqtt } from './MqttContext'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomePage from './pages/HomePage'
import { LoadingScreen } from './pages/LoadingPage'
import PlantPage from './pages/PlantPage'

const Stack = createNativeStackNavigator()

export interface Plant {
  name: string
  waterLevel: number
  temperature: number
  sunlight: number
  mood?: 'happy' | 'neutral' | 'sad'
}

export default function MainApp() {
  const [isLoading, setIsLoading] = useState(true)
  const [plants, setPlants] = useState<Plant[]>([])
  const { lastMessage } = useMqtt()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (lastMessage?.topic === 'plante/stats') {
    const data = lastMessage.payload
    if (Array.isArray(data)) {
      const newPlants = data.map((plant: any, index: number) => ({
        name: `Plant ${index + 1}`,
        waterLevel: data[2],
        temperature: data[0],
        sunlight: data[3],
        mood: 'neutral' as const
      }))
      setPlants(newPlants)
    }
    }
    console.log('Plantes reçues:', plants)
  }, [lastMessage])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='Home'
          component={(props: any) =>
            isLoading ? (
              <LoadingScreen {...props} />
            ) : (
              <HomePage {...props} plants={plants} />
            )
          }
        />
        <Stack.Screen
          name='PlantPage'
          component={(props: any) => {
            const { index } = props.route.params
            return <PlantPage index={index} plants={plants} />
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
