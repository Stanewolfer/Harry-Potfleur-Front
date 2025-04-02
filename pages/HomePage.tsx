import React from 'react'
import {
  Layout,
  Text,
  Divider,
  Drawer,
  DrawerItem,
  Button
} from '@ui-kitten/components'
import EditButton from './components/EditButton'
import PlantsInfos from './components/PlantsInfos'

interface PlantProps {
  name: string
  type: string
  waterLevel: number
  temperature: number
  sunlight: number
}

interface HomePageProps {
  plants: PlantProps[]
}

const HomePage = React.memo(({ plants: initialPlants }: HomePageProps) => {
  const [plants, setPlants] = React.useState<PlantProps[]>(initialPlants);
  // Fonction pour mettre à jour une plante
  const updatePlantName = (index: number, newName: string) => {
    setPlants((prevPlants: PlantProps[]) => {
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
        <Button appearance='outline'>
          Synchroniser vos nouveaux potfleurs
        </Button>
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
              accessoryRight={() => <PlantsInfos {...plant} />}
            />
          ))}
        </Drawer>
      </Layout>
    </Layout>
  )
})

export default HomePage
