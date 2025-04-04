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
import { useMqtt } from '../MqttContext' // Import du contexte MQTT
import { useNavigation } from '@react-navigation/native'
import LoadingScreen from './LoadingPage'
import { Plant } from '../MainApp' // Importer l'interface Plant depuis App.js

enum Mood {
  Happy = 'happy',
  Neutral = 'neutral',
  Sad = 'sad'
}

// Interface pour les props du composant
interface PlantPageProps {
  index: number
  plants: Plant[]
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

const PlantPage: React.FC<PlantPageProps> = ({ index, plants }) => {
  const mqttClient = useMqtt()
  const { client } = mqttClient

  const [plantData, setPlantData] = useState<Plant | null>(null)
  const [isValveActive, setIsValveActive] = useState<boolean>(false)
  const navigation = useNavigation()

  useEffect(() => {
    // Vérifie que index est valide et que plants existe et contient l'élément à cet index
    if (plants && index >= 0 && index < plants.length) {
      setPlantData(plants[index])
      console.log("Données de la plante séléctionnée :", plants[index])
    } else {
      console.error("Index invalide ou plantes non disponibles:", { index, plantsLength: plants?.length })
    }
  }, [index, plants])

  if (!plantData) {
    return <LoadingScreen />
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
    client?.send('plante/eau', 'true')
    setTimeout(() => {
      client?.send('plante/eau', 'false')
      setIsValveActive(false)
    }, 2000)
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
            ? props => <Spinner {...props} size='tiny' />
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