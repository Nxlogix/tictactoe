import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

export default function Square({
  value,
  onPress
}) {

  return (
    <TouchableOpacity
      style={styles.square}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {value}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  square: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: '#E50914',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E'
  },

  text: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold'
  }
});