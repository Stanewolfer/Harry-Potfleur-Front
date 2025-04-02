import React, { useEffect, useState } from 'react'
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
import * as Paho from 'paho-mqtt'

const MQTT_BROKER = 'wss://test.mosquitto.org:8081' // URL du broker en WebSocket
const TOPIC = 'mon_app/plants'

export default () => {
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')

 // Initialisation du client MQTT
 const client = new Paho.Client(
  'test.mosquitto.org', // Host MQTT
  8081, // Port WebSocket
  `rn_client_${Math.random()}` // ID unique pour le client
)

// Définir les callbacks
client.onConnectionLost = (responseObject) => {
  if (responseObject.errorCode !== 0) {
    console.log(`Connexion perdue : ${responseObject.errorMessage}`)
  }
}

client.onMessageArrived = (message) => {
  console.log(`Message reçu sur ${message.destinationName}: ${message.payloadString}`)
  setMessage(message.payloadString)
}

// Connexion au broker
client.connect({
  onSuccess: () => {
    console.log('Connecté à MQTT')
    client.subscribe('plante/valve')
  },
  useSSL: true,
  timeout: 10,
  onFailure: (err) => console.log('Erreur de connexion MQTT', err)
})


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
