import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Paho from 'paho-mqtt';

// Définition du type du contexte
interface MqttContextType {
  client: Paho.Client | null;
  message: string;
  sendMessage: (topic: string, msg: string) => void;
}

// Création du contexte MQTT
const MqttContext = createContext<MqttContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte
export const useMqtt = () => {
  const context = useContext(MqttContext);
  if (!context) {
    throw new Error("useMqtt must be used within an MqttProvider");
  }
  return context;
};

// Composant fournisseur du contexte MQTT
export const MqttProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<Paho.Client | null>(null);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // Initialisation du client MQTT
    const mqttClient = new Paho.Client(
      'test.mosquitto.org', // Host MQTT
      8081, // Port WebSocket
      `rn_client_${Math.random()}` // ID unique pour le client
    );

    // Callback pour gérer la perte de connexion
    mqttClient.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(`Connexion perdue : ${responseObject.errorMessage}`);
      }
    };

    // Callback pour la réception de messages
    mqttClient.onMessageArrived = (message) => {
      console.log(`Message reçu sur ${message.destinationName}: ${message.payloadString}`);
      setMessage(message.payloadString);
    };

    // Connexion au broker MQTT
    mqttClient.connect({
      onSuccess: () => {
        console.log('Connecté à MQTT');
        mqttClient.subscribe('plante/eau');
        mqttClient.subscribe('plante/data');
      },
      useSSL: true,
      timeout: 10,
      onFailure: (err) => console.log('Erreur de connexion MQTT', err),
    });

    setClient(mqttClient);

    return () => {
      mqttClient.disconnect();
    };
  }, []);

  // Fonction pour envoyer un message MQTT
  const sendMessage = (topic: string, msg: string) => {
    if (client) {
      const message = new Paho.Message(msg);
      message.destinationName = topic;
      client.send(message);
      console.log(`Message envoyé sur ${topic}: ${msg}`);
    }
  };

  return (
    <MqttContext.Provider value={{ client, message, sendMessage }}>
      {children}
    </MqttContext.Provider>
  );
};
