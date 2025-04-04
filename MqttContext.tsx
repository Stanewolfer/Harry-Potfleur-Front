import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Paho from 'paho-mqtt';

// Type d'un message MQTT structuré
interface MqttMessage {
  topic: string;
  payload: any; // Peut être string ou un objet JSON parsé
}

// Type du contexte
interface MqttContextType {
  client: Paho.Client | null;
  lastMessage: MqttMessage | null;
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

// Provider du contexte
export const MqttProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<Paho.Client | null>(null);
  const [lastMessage, setLastMessage] = useState<MqttMessage | null>(null);

  useEffect(() => {
    // Initialisation du client MQTT
    const mqttClient = new Paho.Client(
      'test.mosquitto.org', // Host MQTT
      8081,                  // Port WebSocket sécurisé
      `rn_client_${Math.random()}` // ID unique
    );

    // Gestion de la perte de connexion
    mqttClient.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(`Connexion perdue : ${responseObject.errorMessage}`);
        setTimeout(() => {
          mqttClient.connect({
            onSuccess: () => {
              console.log('Reconnecté à MQTT');
              mqttClient.subscribe('plante/eau');
              mqttClient.subscribe('plante/stats');
            },
            useSSL: true,
            timeout: 10,
            onFailure: (err) => console.log('Erreur de reconnexion MQTT', err),
          });
        }, 1000);
      }
    };

    // Réception de message
    mqttClient.onMessageArrived = (message) => {
      console.log(`Message reçu sur ${message.destinationName}: ${message.payloadString}`);
      try {
        const parsedPayload = JSON.parse(message.payloadString);
        setLastMessage({
          topic: message.destinationName,
          payload: parsedPayload,
        });
      } catch (e) {
        setLastMessage({
          topic: message.destinationName,
          payload: message.payloadString,
        });
      }
    };

    // Connexion
    mqttClient.connect({
      onSuccess: () => {
        console.log('Connecté à MQTT');
        mqttClient.subscribe('plante/eau');
        mqttClient.subscribe('plante/stats');
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

  // Envoi de message
  const sendMessage = (topic: string, msg: string) => {
    if (client) {
      const message = new Paho.Message(msg);
      message.destinationName = topic;
      client.send(message);
      console.log(`Message envoyé sur ${topic}: ${msg}`);
    }
  };

  return (
    <MqttContext.Provider value={{ client, lastMessage, sendMessage }}>
      {children}
    </MqttContext.Provider>
  );
};
