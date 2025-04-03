import React, { useEffect, useState } from 'react'
import {
  Layout,
  Text,
  Divider,
  Drawer,
  DrawerItem
} from '@ui-kitten/components'
import EditButton from './components/EditButton'
import PlantsInfos from './components/PlantsInfos'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useMqtt } from '../MqttContext' // ✅ Import du contexte MQTT

interface PlantProps {
  name: string
  waterLevel: number
  temperature: number
  sunlight: number
}

type RootStackParamList = {
  PlantPage: { plant: PlantProps }
}

const HomePage = React.memo(() => {
  const [plants, setPlants] = useState<PlantProps[]>([
    {
      name: 'Monstera',
      waterLevel: 75,
      temperature: 23,
      sunlight: 65
    },
    {
      name: 'Cactus',
      waterLevel: 20,
      temperature: 28,
      sunlight: 90
    },
    {
      name: 'Fern',
      waterLevel: 85,
      temperature: 21,
      sunlight: 40
    },
    {
      name: 'Bamboo',
      waterLevel: 70,
      temperature: 22,
      sunlight: 60
    },
    {
      name: 'Succulent',
      waterLevel: 25,
      temperature: 26,
      sunlight: 85
    }
  ])
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { message } = useMqtt()

  // 🔥 Mettre à jour le nom de la plante
  const updatePlantName = (id: number, newName: string) => {
    setPlants((prevPlants) =>
      prevPlants.map((plant, index) =>
        index === id ? { ...plant, name: newName } : plant
      )
    )
  }

  // 🔥 Mettre à jour les plantes lorsqu'un message MQTT est reçu
  useEffect(() => {
    if (message) {
      try {
        const plantData: PlantProps = JSON.parse(message)
      } catch (error) {
        console.error('Erreur lors de la mise à jour des données MQTT:', error)
      }
    }
  }, [message])

  // 📜 Affichage de la liste des plantes
  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={styles.container}>
        <Layout style={styles.header}>
          <Text category='h5' status='primary'>
            Bienvenue sur Harry Potfleur
          </Text>
          <Text category='s1' appearance='hint' style={styles.subtitle}>
            Gérez vos plantes avec amour et simplicité.
          </Text>
          <Text category='s2' appearance='hint' style={styles.description}>
            Sélectionnez une plante pour consulter ses détails et l'éditer.
          </Text>
          <Divider style={styles.fullDivider} />
          <Text category='h5' status='success' style={styles.sectionTitle}>
            Vos plantes
          </Text>
        </Layout>

        <Layout style={styles.drawerContainer}>
          <Drawer
            style={styles.drawer}
            contentContainerStyle={styles.drawerContent}
          >
            {plants.map((plant, index) => (
              <DrawerItem
                key={index}
                title={plant.name}
                accessoryLeft={() => (
                  <Layout style={styles.editButtonContainer}>
                    <EditButton id={index} onSave={updatePlantName} />
                  </Layout>
                )}
                accessoryRight={() => <PlantsInfos {...plant} />}
                onPress={() =>
                  navigation.navigate('PlantPage', { plant: plants[index] })
                }
              />
            ))}
          </Drawer>
        </Layout>
      </Layout>
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1C2541'
  },
  container: {
    flex: 1,
    backgroundColor: '#1C2541'
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#1C2541'
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#B07B3E'
  },
  subtitle: {
    marginBottom: 5,
    color: '#B0B8C1'
  },
  description: {
    marginBottom: 15,
    color: '#B0B8C1'
  },
  fullDivider: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#2E3A59'
  },
  sectionTitle: {
    marginTop: 10,
    color: '#00C67F'
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#1C2541'
  },
  drawer: {
    flex: 1,
    backgroundColor: '#1C2541'
  },
  drawerContent: {
    paddingBottom: 30
  },
  editButtonContainer: {
    marginRight: -10
  }
})

export default HomePage
