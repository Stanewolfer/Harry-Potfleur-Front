import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { Layout, Spinner, Text } from '@ui-kitten/components'

export const LoadingScreen = (): React.ReactElement => (
  <Layout
    style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 20,
      paddingTop: 50,
      flexWrap: 'wrap',
    }}
    level='1'
  >

    <Text category='h5' status='primary'>
      Bienvenue sur Harry Potfleur
    </Text>
    <Text category='s1' status='primary'>
      Une application de gestion de potfleurs
    </Text>

    <Text category='s1' status='primary'>
      Chargement de vos potfleurs en cours...
    </Text>

    <Image
      source={require('../assets/images/harry-potfleur-logo.png')}
      style={{ width: 50, height: 50 }}
      resizeMode='contain'
    />

    <Spinner size='giant' />
  </Layout>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  }
})
