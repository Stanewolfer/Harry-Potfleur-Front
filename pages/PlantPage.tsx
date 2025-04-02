import React, { useState, useEffect } from 'react'

enum Mood {
  Happy = 'happy',
  Neutral = 'neutral',
  Sad = 'sad'
}

interface PlantData {
  temperature: number
  photoResistance: number
  waterLevel: number
  mood: Mood
}

const getSmiley = (mood: Mood): string => {
  switch (mood) {
    case Mood.Happy:
      return '😊'
    case Mood.Neutral:
      return '😐'
    case Mood.Sad:
      return '😢'
    default:
      return '😐'
  }
}

const PlantPage: React.FC = () => {
  const [plantData, setPlantData] = useState<PlantData>({
    temperature: 0,
    photoResistance: 0,
    waterLevel: 0,
    mood: Mood.Neutral
  })
  const [isValveActive, setIsValveActive] = useState<boolean>(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const temperature = parseFloat((20 + Math.random() * 10).toFixed(1)) // Between 20 and 30°C
      const photoResistance = parseFloat((Math.random() * 100).toFixed(1)) // Between 0 and 100
      const waterLevel = parseFloat((Math.random() * 100).toFixed(1)) // Between 0 and 100

      let mood: Mood
      if (waterLevel > 50 && temperature >= 22 && temperature <= 28)
        mood = Mood.Happy
      else if (waterLevel < 30 || temperature < 22 || temperature > 28)
        mood = Mood.Sad
      else mood = Mood.Neutral

      setPlantData({
        temperature,
        photoResistance,
        waterLevel,
        mood
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleValveActivation = () => {
    setIsValveActive(true)

    setTimeout(() => {
      setIsValveActive(false)
    }, 2000)
  }

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center',
        padding: '20px'
      }}
    >
      <h1 style={{ fontSize: '80px' }}>{getSmiley(plantData.mood)}</h1>

      <div style={{ margin: '20px 0', fontSize: '18px' }}>
        <p>Température détectée : {plantData.temperature} °C</p>
        <p>Photorésistance : {plantData.photoResistance}</p>
        <p>Niveau d'eau / humidité : {plantData.waterLevel} %</p>
      </div>

      <button
        onClick={handleValveActivation}
        disabled={isValveActive}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: isValveActive ? 'not-allowed' : 'pointer'
        }}
      >
        {isValveActive ? 'Activation en cours...' : "Activer la valve d'eau"}
      </button>
    </div>
  )
}

export default PlantPage