import React, { useState } from 'react'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { default as theme } from './theme.json'
import HomePage from './pages/HomePage'
import { LoadingScreen } from './pages/LoadingPage'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PlantPage from './pages/PlantPage'
import { MqttProvider } from './MqttContext'

const Stack = createNativeStackNavigator()

export default () => {
  const [isLoading, setIsLoading] = useState(true)


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
                    <HomePage {...props} />
                  )
                }
              />
              <Stack.Screen
                name='PlantPage'
                component={PlantPage}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </MqttProvider>
      </ApplicationProvider>
    </>
  )
}
