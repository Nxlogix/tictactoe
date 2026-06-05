import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import { useRouter } from 'expo-router';

export default function HomeScreen() {

  const router = useRouter();

  return (
    <View style={styles.container}>

      <Image
        source={require('../assets/logo.png')}
        resizeMode="contain"
        style={styles.logo}
      />

      <Text style={styles.title}>
        TIC TAC TOE
      </Text>

      <Text style={styles.subtitle}>
        Selecciona un modo de juego
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/bot')}
      >
        <Text style={styles.buttonText}>
        Contra Bot
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/game')}
      >
        <Text style={styles.buttonText}>
        Dos Jugadores
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/multiplayer')}
      >
        <Text style={styles.buttonText}>
        Multijugador
        </Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Proyecto React Native
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  logo: {
    width: 150,
    height: 150,
    marginBottom: 20
  },

  title: {
    color: '#E50914',
    fontSize: 42,
    fontWeight: 'bold'
  },

  subtitle: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 40
  },

  button: {
    backgroundColor: '#E50914',
    width: '90%',
    padding: 18,
    borderRadius: 15,
    marginVertical: 10
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  footer: {
    color: '#888',
    marginTop: 40
  }

});