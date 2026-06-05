import React from 'react';
import { View, StyleSheet } from 'react-native';
import Square from './Square';

export default function Board({ board, onPress }) {

  return (
    <View style={styles.board}>
      {board.map((item, index) => (
        <Square
          key={index}
          value={item}
          onPress={() => onPress(index)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});