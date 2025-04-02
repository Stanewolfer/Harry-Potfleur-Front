import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';

enum Mood {
  Happy = 'happy',
  Neutral = 'neutral',
  Sad = 'sad'
}

interface PlantProps {
  name: string;
  type: string;
  waterLevel: number;
  temperature: number;
  sunlight: number;
  mood: Mood;
}

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

interface PlantPageProps {
  plantData: PlantProps;
  onValveActivation: () => void;
}

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
    else
      mood = Mood.Neutral;

    return { name, type, temperature, sunlight, waterLevel, mood };
  } catch (error) {
    console.error(error);
    return {
      name: "Introuvable",
      type: "",
      temperature: 0,
      sunlight: 0,
      waterLevel: 0,
      mood: Mood.Neutral
    };
  }
};

const activateWaterValve = async (): Promise<void> => {
  try {
    const response = await fetch('', {
      method: 'POST'
    });
    if (!response.ok)
      throw new Error('Erreur lors de l\'activation de la valve');
  } catch (error) {
    console.error(error);
  }
};

const PlantPage: React.FC<PlantPageProps> = ({ plantData: initialPlantData, onValveActivation }) => {
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

  const handleValveActivation = async () => {
    setIsValveActive(true);
    await activateWaterValve();
    onValveActivation();
    setTimeout(() => {
      setIsValveActive(false);
    }, 2 * 1000);
  };

  return (
    <Layout style={styles.container}>
      <Text category="h1" style={styles.smiley}>
        {getSmiley(plantData.mood)}
      </Text>
      <Layout style={styles.infoContainer}>
        <Text category="s1">Température : {plantData.temperature} °C</Text>
        <Text category="s1">Photorésistance : {plantData.sunlight}</Text>
        <Text category="s1">Niveau d'eau / humidité : {plantData.waterLevel} %</Text>
      </Layout>
      <Button onPress={handleValveActivation} disabled={isValveActive}>
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
  smiley: {
    fontSize: 80,
    marginBottom: 20
  },
  infoContainer: {
    marginBottom: 20,
    alignItems: 'center'
  }
});

export default PlantPage;
