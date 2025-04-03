import React from 'react';
import {
  Layout,
  Text,
  Divider,
  Drawer,
  DrawerItem,
  Button
} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import EditButton from './components/EditButton';
import PlantsInfos from './components/PlantsInfos';

type RootStackParamList = {
  PlantPage: { plant: PlantProps };
};

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
  const [plants, setPlants] = React.useState<PlantProps[]>(initialPlants);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Function to update the name of a plant
  const updatePlantName = (index: number, newName: string) => {
    setPlants((prevPlants: PlantProps[]) => {
      const updatedPlants = [...prevPlants];
      updatedPlants[index] = { ...updatedPlants[index], name: newName };
      return updatedPlants;
    });
  };

  return (
    <Layout style={styles.container}>
      <Layout style={styles.header}>
        <Text category="h5" status="primary">
          Bienvenue sur Harry Potfleur
        </Text>
        <Text category="s1" status="primary">
          Une application de gestion de potfleurs
        </Text>
      </Layout>
      <Divider style={styles.divider} />
      <Layout style={styles.content}>
        <Text category="h5" status="success">
          Liste de vos plantes
        </Text>
        <Button appearance="outline" style={styles.syncButton}>
          Synchroniser vos nouveaux potfleurs
        </Button>
        <Drawer style={styles.drawer}>
          {plants.map((plant, index) => (
            <DrawerItem
              key={index}
              title={`${plant.name} (${plant.type})`}
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
  );
});

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