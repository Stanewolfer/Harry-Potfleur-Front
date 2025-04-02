import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
  CircularProgressBar,
  Icon,
  IconElement,
  Layout,
  Text,
  Button,
  IconProps,
  Spinner
} from '@ui-kitten/components';

// Definition of the plant's possible moods
enum Mood {
  Happy = 'happy',
  Neutral = 'neutral',
  Sad = 'sad'
}

// Interface describing the properties of a plant
interface PlantProps {
  name: string;
  type: string;
  waterLevel: number;
  temperature: number;
  sunlight: number;
  mood: Mood;
}

// Function that returns an emoji (smiley) based on the previous mood
const getSmiley = (mood: Mood): string => {
  switch (mood) {
    case Mood.Happy:
      return '😊';
    case Mood.Neutral:
      return '😐';
    case Mood.Sad:
      return '😢';
    default:
      return '😐';
  }
};

// Interface of the props of the PlantPage component
interface PlantPageProps {
  plantData: PlantProps;
  onValveActivation: () => void;
}

// Function that returns the water icon with its custom color
const waterIcon = (props: IconProps): IconElement => (
  <Icon
    {...props}
    name='droplet-outline'
    style={[props.style, { tintColor: '#2196F3' }]}
  />
);

// Function that returns the temperature icon with its custom color
const temperatureIcon = (props: IconProps): IconElement => (
  <Icon
    {...props}
    name='thermometer-outline'
    style={[props.style, { tintColor: '#FF5722' }]}
  />
);

// Function that returns the light icon with its custom color
const sunlightIcon = (props: IconProps): IconElement => (
  <Icon
    {...props}
    name='sun-outline'
    style={[props.style, { tintColor: '#FFC107' }]}
  />
);

// Asynchronous function that fetches the plant data from the backend
const fetchPlantData = async (): Promise<PlantProps> => {
  try {
    const response = await fetch('');
    if (!response.ok)
      throw new Error('Erreur lors de la récupération des données');

    const data = await response.json();
    const { name, type, temperature, sunlight, waterLevel } = data;
    let mood: Mood;

    if (waterLevel > 50 && temperature >= 22 && temperature <= 28)
      mood = Mood.Happy;
    else if (waterLevel < 30 || temperature < 22 || temperature > 28)
      mood = Mood.Sad;
    else mood = Mood.Neutral;

    return { name, type, temperature, sunlight, waterLevel, mood };
  } catch (error) {
    console.error(error);
    
    return {
      name: 'Plante introuvable',
      type: '',
      temperature: 22,
      sunlight: 60,
      waterLevel: 51,
      mood: Mood.Neutral
    };
  }
};

// Asynchronous function that activates the water valve from the backend
const activateWaterValve = async (): Promise<void> => {
  try {
    const response = await fetch('', {
      method: 'POST'
    });
    if (!response.ok) throw new Error("Erreur lors de l'activation de la valve");
  } catch (error) {
    console.error(error);
  }
};

// Main component displaying the plant information
const PlantPage: React.FC<PlantPageProps> = ({
  plantData: initialPlantData,
  onValveActivation
}) => {
  const [plantData, setPlantData] = useState<PlantProps>(initialPlantData);
  const [isValveActive, setIsValveActive] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchPlantData();
      setPlantData(data);
    };

    getData();
    const interval = setInterval(getData, 5 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Function that handles the valve activation
  const handleValveActivation = async () => {
    setIsValveActive(true);
    await activateWaterValve();
    onValveActivation();
    setTimeout(() => {
      setIsValveActive(false);
    }, 2 * 1000);
  };

  // Mood calculation based on the current data
  const computedMood: Mood =
    plantData.waterLevel > 50 &&
    plantData.temperature >= 22 &&
    plantData.temperature <= 28
      ? Mood.Happy
      : plantData.waterLevel < 30 ||
        plantData.temperature < 22 ||
        plantData.temperature > 28
      ? Mood.Sad
      : Mood.Neutral;

  return (
    <Layout style={styles.container}>
      <Text category='h2' style={styles.plantName}>
        {plantData.name} {plantData.type && plantData.type.trim() !== '' ? `(${plantData.type})` : ''}
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
            Luminosité ► {plantData.sunlight}
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
            ? (props: IconProps) => <Spinner {...props} size='small' />
            : undefined
        }
      >
        {isValveActive ? 'Activation en cours...' : "Activer l'eau"}
      </Button>
    </Layout>
  );
};

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
  }
});

export default PlantPage;
