import React from 'react';
import {
  Layout,
  Text,
  Divider,
  Drawer,
  DrawerItem
} from '@ui-kitten/components';
import { StyleSheet, SafeAreaView } from 'react-native';
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
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Fonction pour mettre à jour le nom d'une plante
  const updatePlantName = (index: number, newName: string) => {
    setPlants((prevPlants) => {
      const updatedPlants = [...prevPlants];
      updatedPlants[index] = { ...updatedPlants[index], name: newName };
      return updatedPlants;
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={styles.container} level="1">
        <Layout style={styles.header}>
          <Text category="h4" status="primary" style={styles.title}>
            🌱 Harry Potfleur
          </Text>
          <Text category="s1" appearance="hint" style={styles.subtitle}>
            Gérez vos plantes avec amour et simplicité.
          </Text>
          <Text category="s2" appearance="hint" style={styles.description}>
            Sélectionnez une plante pour consulter ses détails et l'éditer.
          </Text>
          <Divider style={styles.fullDivider} />
          <Text category="h5" status="success" style={styles.sectionTitle}>
            Vos plantes
          </Text>
        </Layout>

        <Layout style={styles.drawerContainer}>
          <Drawer style={styles.drawer} contentContainerStyle={styles.drawerContent}>
            {plants.map((plant, index) => (
              <DrawerItem
                key={index}
                title={`${plant.name} (${plant.type && plant.type.trim() !== '' ? plant.type : 'Type non défini'})`}
                accessoryLeft={() => (
                  <Layout style={styles.editButtonContainer}>
                    <EditButton id={index} onSave={updatePlantName} />
                  </Layout>
                )}
                accessoryRight={() => <PlantsInfos {...plant} />}
                onPress={() => navigation.navigate('PlantPage', { plant: plants[index] })}
              />
            ))}
          </Drawer>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
});

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
    paddingHorizontal: 10,
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
});

export default HomePage;