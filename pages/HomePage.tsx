import React from 'react'
import {
  Layout,
  Text,
  Divider,
  Drawer,
  DrawerItem
} from '@ui-kitten/components'
import EditButton from './components/EditButton'
import PlantsInfos from './components/PlantsInfos'
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface PlantProps {
  name: string
  type: string
  waterLevel: number
  temperature: number
  sunlight: number
}

type RootStackParamList = {
  PlantPage: { plant: PlantProps };
};

interface HomePageProps {
  plants: PlantProps[]
}

const HomePage = React.memo(({ plants: initialPlants }: HomePageProps) => {
  const [plants, setPlants] = React.useState<PlantProps[]>(initialPlants)
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

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
    <ScrollView style={{ flex: 1, width: '100%' }}>
      <Layout
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        <Layout
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
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
          <Divider style={{ width: '100%', marginVertical: 10 }} />
          <Text category='h5' status='success'>
            Liste de vos plantes
          </Text>
          <Divider style={{ width: '60%', margin: 10 }} />
        </Layout>
        <Layout
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: 10,
            width: '100%'
          }}
        >
          <Drawer
            style={{
              width: '100%',
              height: '100vh'
            }}
          >
            {plants.map((plant, index) => (
              <DrawerItem
                key={index}
                title={plant.name}
                accessoryLeft={() => (
                  <EditButton id={index} onSave={updatePlantName} />
                )}
                accessoryRight={() => <PlantsInfos {...plant} />}
                onPress={() =>{
                  console.log(plants[index]);
                  navigation.navigate('PlantPage', { plant: plants[index] })}
                }
              />
            ))}
          </Drawer>
        </Layout>
      </Layout>
    </ScrollView>
  )
})

export default HomePage
