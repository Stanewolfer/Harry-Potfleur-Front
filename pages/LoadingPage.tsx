import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Spinner, Text } from '@ui-kitten/components';

export const LoadingScreen = (): React.ReactElement => (
  <Layout style={styles.container} level="1">
    <Image
      source={require('../assets/images/harry-potfleur-logo.png')}
      style={styles.logo}
      resizeMode='contain'
    />
    <Text category='h5' status='primary'>
      Bienvenue sur Harry Potfleur
    </Text>
    <Text category='s1' status='primary'>
      Une application de gestion de potfleurs
    </Text>
    <Text category='s1' status='primary'>
      Chargement de vos potfleurs en cours...
    </Text>
    <Layout style={styles.spinnerContainer}>
      <Spinner size='giant' />
    </Layout>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginVertical: 20,
  },
  spinnerContainer: {
    marginTop: 20,
  },
});

export default LoadingScreen;
