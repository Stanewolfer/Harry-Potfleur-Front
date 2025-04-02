import React from 'react'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { default as theme } from './theme.json'
import HomePage from './pages/HomePage'

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <Layout style={{ flex: 1 }} level='1'>
        <HomePage />
      </Layout>
    </ApplicationProvider>
  </>
)
