import React, { useState, useEffect } from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';

enum Mood {
  Happy = 'happy',
  Neutral = 'neutral',
  Sad = 'sad'
}

interface PlantProps {
  name: string
  type: string
  waterLevel: number
  temperature: number
  sunlight: number
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

interface PlantPageProps {
  plantData: PlantProps
  onValveActivation: () => void
}

const PlantPage: React.FC<PlantPageProps> = ({
  plantData,
  onValveActivation
}) => {
  const [isValveActive, setIsValveActive] = useState<boolean>(false)

  const handleValveActivation = () => {
    setIsValveActive(true)
    onValveActivation()

    setTimeout(() => {
      setIsValveActive(false)
    }, 2000)
  }
  let mood: Mood
  if (plantData.waterLevel > 50 && plantData.temperature >= 22 && plantData.temperature <= 28)
    mood = Mood.Happy
  else if (plantData.waterLevel < 30 || plantData.temperature < 22 || plantData.temperature > 28)
    mood = Mood.Sad
  else mood = Mood.Neutral
  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center',
        padding: '20px'
      }}
    >
      <h1 style={{ fontSize: '80px' }}>{getSmiley(mood)}</h1>

      <div style={{ margin: '20px 0', fontSize: '18px' }}>
        <p>Température détectée : {plantData.temperature} °C</p>
        <p>Photorésistance : {plantData.sunlight}</p>
        <p>Niveau d'eau / humidité : {plantData.waterLevel} %</p>
      </div>

      <Button onPress={handleValveActivation} disabled={isValveActive}>
        {isValveActive ? 'Activation en cours...' : "Activer l'eau"}
      </Button>
    </Layout>
  );
};

export default PlantPage
