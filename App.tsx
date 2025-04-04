import React from 'react'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { default as theme } from './theme.json'
import { MqttProvider } from './MqttContext'
import MainApp from './MainApp'

export default () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <MqttProvider>
          <MainApp />
        </MqttProvider>
      </ApplicationProvider>
    </>
  );
}
