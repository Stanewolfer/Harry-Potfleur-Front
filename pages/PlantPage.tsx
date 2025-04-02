import React, { useState, useEffect } from 'react'

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
