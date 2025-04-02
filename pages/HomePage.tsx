import React from 'react'
import {
  Layout,
  Text,
  Divider,
  Drawer,
  DrawerItem,
  Button} from '@ui-kitten/components'
import EditButton from './components/EditButton'
import PlantsInfos from './components/PlantsInfos'


export default function HomePage() {
  // Mock data for plants
const [plants, setPlants] = React.useState([
    { name: 'Monstera', type: 'Tropical', waterLevel: 75, temperature: 23, sunlight: 65 },
    { name: 'Cactus', type: 'Desert', waterLevel: 20, temperature: 28, sunlight: 90 },
    { name: 'Fern', type: 'Tropical', waterLevel: 85, temperature: 21, sunlight: 40 },
    { name: 'Bamboo', type: 'Tropical', waterLevel: 70, temperature: 22, sunlight: 60 },
    { name: 'Succulent', type: 'Desert', waterLevel: 25, temperature: 26, sunlight: 85 }
])

  // Fonction pour mettre à jour une plante
  const updatePlantName = (index: number, newName: string) => {
    setPlants(prevPlants => {
      const updatedPlants = [...prevPlants]
      updatedPlants[index] = { ...updatedPlants[index], name: newName }
      return updatedPlants
    })
  }

  // Plants list component
  return (
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
        <Button appearance='outline'>Synchroniser vos nouveaux potfleurs</Button>
        <Drawer
          style={{
            width: '100%',
            height: '100%'
          }}
        >
          {plants.map((plant, index) => (
            <DrawerItem
              key={index}
              title={`${plant.name} (${plant.type})`}
              accessoryLeft={() => (
                <EditButton id={index} onSave={updatePlantName} />
              )}
              accessoryRight={() => (
                <PlantsInfos {...plant} />
              )}
            />
          ))}
        </Drawer>
      </Layout>
    </Layout>
  )
}

