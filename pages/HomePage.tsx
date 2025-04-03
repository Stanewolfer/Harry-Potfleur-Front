import React from 'react';
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
import { ScrollView } from 'react-native'

interface PlantProps {
  name: string;
  type: string;
  waterLevel: number;
  temperature: number;
  sunlight: number;
}

interface HomePageProps {
  plants: PlantProps[];
}

const HomePage = React.memo(({ plants: initialPlants }: HomePageProps) => {
  const [plants, setPlants] = React.useState<PlantProps[]>(initialPlants)
  // Fonction pour mettre à jour une plante
  const updatePlantName = (index: number, newName: string) => {
    setPlants((prevPlants: PlantProps[]) => {
      const updatedPlants = [...prevPlants];
      updatedPlants[index] = { ...updatedPlants[index], name: newName };
      return updatedPlants;
    });
  };

  // Fonction pour synchroniser les plantes
  const fetchPlants = () => {
    // Simulate fetching new plants from an API or database
    const newPlants = [
      {
        name: 'Orchidée',
        type: 'Tropical',
        waterLevel: 80,
        temperature: 24,
        sunlight: 70
      },
      {
        name: 'Lavande',
        type: 'Mediterranean',
        waterLevel: 30,
        temperature: 25,
        sunlight: 75
      }
    ]
    setPlants(prevPlants => [...prevPlants, ...newPlants])
  }

  // Plants list component
  return (
    <ScrollView style={{ flex: 1, width: '100%' }}>
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
            alignItems: 'flex-start',
            padding: 10,
            width: '100%',
            position: 'sticky',
            top: 0,
            zIndex: 1
          }}
        >
          <Text category='h5' status='primary'>
            Bienvenue sur Harry Potfleur
          </Text>
          <Text category='s1' status='primary'>
            Une application de gestion de potfleurs
          </Text>{' '}
          <Divider style={{ width: '100%', marginVertical:10 }} />
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
          <Button appearance='outline' onPress={fetchPlants} style={{ marginVertical: 10 }}>
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
                title={plant.name}
                accessoryLeft={() => (
                  <EditButton id={index} onSave={updatePlantName} />
                )}
                accessoryRight={() => <PlantsInfos {...plant} />}
              />
            ))}
          </Drawer>
        </Layout>
      </Layout>
    </ScrollView>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  header: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 75,
    padding: 10,
    width: '100%'
  },
  divider: {
    width: '100%'
  },
  content: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    width: '100%'
  },
  syncButton: {
    marginVertical: 15
  },
  drawer: {
    width: '100%',
    height: '100%'
  },
  editButtonContainer: {
    marginRight: -10
  }
});

export default HomePage;