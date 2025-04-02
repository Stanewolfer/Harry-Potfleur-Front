import React, { useState, useEffect } from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';

enum Mood {
  Happy = 'happy',
  Neutral = 'neutral',
  Sad = 'sad'
}

interface PlantData {
  temperature: number;
  photoResistance: number;
  waterLevel: number;
  mood: Mood;
}

const fetchPlantData = async (): Promise<PlantData> => {
  try {
    const response = await fetch('');
    if (!response.ok)
      throw new Error('Erreur lors de la récupération des données');

    const data = await response.json();
    const { temperature, photoResistance, waterLevel } = data;
    let mood: Mood;

    if (waterLevel > 50 && temperature >= 22 && temperature <= 28)
      mood = Mood.Happy;
    else if (waterLevel < 30 || temperature < 22 || temperature > 28)
      mood = Mood.Sad;
    else
      mood = Mood.Neutral;
    
    return { temperature, photoResistance, waterLevel, mood };
  } catch (error) {
    console.error(error);
    const temperature = 0;
    const photoResistance = 0;
    const waterLevel = 0;
    const mood = Mood.Neutral;
    return { temperature, photoResistance, waterLevel, mood };
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

const PlantPage: React.FC = () => {
  const [plantData, setPlantData] = useState<PlantData>({
    temperature: 0,
    photoResistance: 0,
    waterLevel: 0,
    mood: Mood.Neutral
  });
  const [isValveActive, setIsValveActive] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await fetchPlantData();
      setPlantData(data);
    }, 5 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleValveActivation = async () => {
    setIsValveActive(true);
    await activateWaterValve();
    setTimeout(() => {
      setIsValveActive(false);
    }, 2 * 1000);
  };

  return (
    <Layout style={{ flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
      <Text category='h1' style={{ fontSize: 80 }}>
        {getSmiley(plantData.mood)}
      </Text>

      <Layout style={{ marginVertical: 20, alignItems: 'center' }}>
        <Text category='s1'>Température : {plantData.temperature} °C</Text>
        <Text category='s1'>Photorésistance : {plantData.photoResistance}</Text>
        <Text category='s1'>Niveau d'eau / humidité : {plantData.waterLevel} %</Text>
      </Layout>

      <Button onPress={handleValveActivation} disabled={isValveActive}>
        {isValveActive ? 'Activation en cours...' : "Activer l'eau"}
      </Button>
    </Layout>
  );
};

export default PlantPage;