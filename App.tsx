import React from 'react'
import * as eva from '@eva-design/eva'
import {
  ApplicationProvider,
  Layout,
  Text,
  Divider,
  Drawer,
  DrawerItem
} from '@ui-kitten/components'
import { default as theme } from './theme.json'

export default () => (
  <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
    <Layout
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
      }}
    >
      <Layout
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 10,
          width: '100%'
        }}
      >
        <Text category='h5' status='primary'>
          Bienvenue sur Harry Potfleur
        </Text>
        <Text category='s1' status='primary'>
          Une application de gestion de potfleurs
        </Text>
      </Layout> 
      <Divider style={{ width: '100%' }} />
      <Layout
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          padding: 10,
          width: '100%'
        }}
      >
        <Text category='h5' status='success'>
          Liste de vos plantes
        </Text>
        <Drawer
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <DrawerItem title='Roses' />
          <DrawerItem title='Pivoines' />
          <DrawerItem title='Tulipes' />
          <DrawerItem title='Orchidées' />
        </Drawer>
      </Layout>
    </Layout>
  </ApplicationProvider>
)
