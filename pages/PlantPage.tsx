import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import {
  CircularProgressBar,
  Icon,
  IconElement,
  Layout,
  Text,
  Button,
  IconProps,
  Spinner
} from '@ui-kitten/components'
import { useMqtt } from '../MqttContext' // ✅ Import du contexte MQTT
import { useNavigation } from '@react-navigation/native'

enum Mood {
  Happy = 'happy',
  Neutral = 'neutral',
  Sad = 'sad'
}

interface PlantProps {
  name: string
  waterLevel: number
  temperature: number
  sunlight: number
  mood: Mood
}

const getSmiley = (mood: Mood): string => {
  switch (mood) {
    case Mood.Happy:
      return '😊'
    case Mood.Neutral:
      return '😐'
    case Mood.Sad:
      return '😢'
    default:
      return '😐'
  }
}

const waterIcon = (props: IconProps): IconElement => (
  <Icon
    {...props}
    name='droplet-outline'
    style={[props.style, { tintColor: '#2196F3' }]}
  />
)

const temperatureIcon = (props: IconProps): IconElement => (
  <Icon
    {...props}
    name='thermometer-outline'
    style={[props.style, { tintColor: '#FF5722' }]}
  />
)

const sunlightIcon = (props: IconProps): IconElement => (
  <Icon
    {...props}
    name='sun-outline'
    style={[props.style, { tintColor: '#FFC107' }]}
  />
)

const fetchPlantData = async (): Promise<PlantProps> => {
  try {
    const response = await fetch('')
    if (!response.ok)
      throw new Error('Erreur lors de la récupération des données')

    const data = await response.json()
    const { name, type, temperature, sunlight, waterLevel } = data

    const computedMood: Mood =
      waterLevel > 50 && temperature >= 22 && temperature <= 28
        ? Mood.Happy
        : waterLevel < 30 || temperature < 22 || temperature > 28
        ? Mood.Sad
        : Mood.Neutral

    return { name, temperature, sunlight, waterLevel, mood: computedMood }
  } catch (error) {
    console.error(error)
    return {
      name: 'Plante introuvable',
      temperature: 0,
      sunlight: 0,
      waterLevel: 0,
      mood: Mood.Neutral
    }
  }
}

const PlantPage: React.FC = () => {
  const mqttClient = useMqtt()
  const { client } = mqttClient

  const [plantData, setPlantData] = useState<PlantProps | null>(null)
  const [isValveActive, setIsValveActive] = useState<boolean>(false)
  const navigation = useNavigation()

  useEffect(() => {
    const getData = async () => {
      const data = await fetchPlantData()
      setPlantData(data)
    }

    getData()
    const interval = setInterval(getData, 5 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (!plantData) {
    return (
      <Layout style={styles.container}>
        <Spinner size='giant' />
      </Layout>
    )
  }

  const computedMood =
    plantData.waterLevel > 50 &&
    plantData.temperature >= 22 &&
    plantData.temperature <= 28
      ? Mood.Happy
      : plantData.waterLevel < 30 ||
        plantData.temperature < 22 ||
        plantData.temperature > 28
      ? Mood.Sad
      : Mood.Neutral

  const handleValveActivation = async () => {
    setIsValveActive(true)
    client?.send('plante/valve', 'ON')
    setTimeout(() => client?.send('plante/valve', 'OFF'), 2000)
  }

  return (
    <Layout style={styles.container}>
      <Text category='h2' style={styles.plantName}>
        {plantData.name}
      </Text>
      <Text category='h1' style={styles.smiley}>
        {getSmiley(computedMood)}
      </Text>
      <Layout style={styles.infoContainer}>
        <Layout style={styles.infoRow}>
          <CircularProgressBar
            progress={plantData.temperature / 50}
            size='small'
            status='danger'
            renderIcon={temperatureIcon}
          />
          <Text category='s1' style={styles.infoText}>
            Température ► {plantData.temperature} °C
          </Text>
        </Layout>
        <Layout style={styles.infoRow}>
          <CircularProgressBar
            progress={plantData.sunlight / 100}
            size='small'
            status='warning'
            renderIcon={sunlightIcon}
          />
          <Text category='s1' style={styles.infoText}>
            Luminosité ► {plantData.sunlight} Lux
          </Text>
        </Layout>
        <Layout style={styles.infoRow}>
          <CircularProgressBar
            progress={plantData.waterLevel / 100}
            size='small'
            status='info'
            renderIcon={waterIcon}
          />
          <Text category='s1' style={styles.infoText}>
            Niveau d'eau ► {plantData.waterLevel} %
          </Text>
        </Layout>
      </Layout>
      <Button
        onPress={handleValveActivation}
        disabled={isValveActive}
        style={styles.button}
        accessoryLeft={
          isValveActive
            ? props => <Spinner {...props} size='small' />
            : undefined
        }
      >
        {isValveActive ? 'Activation en cours...' : "Activer l'eau"}
      </Button>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Revenir à la page précédente</Text>
      </TouchableOpacity>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  plantName: {
    fontSize: 30,
    marginBottom: 10
  },
  smiley: {
    fontSize: 100,
    marginBottom: 30
  },
  infoContainer: {
    width: '100%',
    marginBottom: 30
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  infoText: {
    fontSize: 24,
    marginLeft: 10
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginTop: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4
  },
  backText: {
    marginTop: 15,
    fontSize: 16,
    color: '#1E90FF',
    textDecorationLine: 'underline'
  }
})

export default PlantPage
