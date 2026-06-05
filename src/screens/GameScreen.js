import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Board from '../components/Board';

export default function GameScreen() {

  const [board, setBoard] = useState(Array(9).fill(''));
  const [turn, setTurn] = useState('X');

  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

  const [games, setGames] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const winnerLines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  function restartGame() {
    setBoard(Array(9).fill(''));
    setTurn('X');
    setGames(1);
    setScoreX(0);
    setScoreO(0);
    setGameOver(false);
  }

  function finishSeries(message:string) {
    Alert.alert(
      '🏆 Fin de la Serie',
      message,
      [
        {
          text: 'Nueva Serie',
          onPress: restartGame
        }
      ]
    );
  }

  function nextRound() {

    if (games >= 5) {

      if (scoreX > scoreO) {
        finishSeries('Jugador 1 (X) ganó la serie');
      }
      else if (scoreO > scoreX) {
        finishSeries('Jugador 2 (O) ganó la serie');
      }
      else {
        finishSeries('La serie terminó empatada');
      }

      return;
    }

    setBoard(Array(9).fill(''));
    setTurn('X');
    setGameOver(false);
    setGames(prev => prev + 1);
  }

  function checkWinner(newBoard) {

    for (let line of winnerLines) {

      const [a,b,c] = line;

      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {

        setGameOver(true);

        if (newBoard[a] === 'X') {

          setScoreX(prev => prev + 1);

          Alert.alert(
            'Jugador 1',
            'Ganó esta partida '
          );

        } else {

          setScoreO(prev => prev + 1);

          Alert.alert(
            'Jugador 2',
            'Ganó esta partida '
          );
        }

        setTimeout(() => {
          nextRound();
        }, 1000);

        return true;
      }
    }

    if (!newBoard.includes('')) {

      setGameOver(true);

      setScoreX(prev => prev + 1);
      setScoreO(prev => prev + 1);

      Alert.alert(
        'Empate',
        '1 punto para cada jugador'
      );

      setTimeout(() => {
        nextRound();
      }, 1000);

      return true;
    }

    return false;
  }

  function handlePress(index) {

    if (gameOver) return;

    if (board[index] !== '') return;

    const newBoard = [...board];

    newBoard[index] = turn;

    setBoard(newBoard);

    const winnerFound = checkWinner(newBoard);

    if (winnerFound) return;

    setTurn(
      turn === 'X'
        ? 'O'
        : 'X'
    );
  }

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Tres en Raya
      </Text>

      <Text style={styles.score}>
        Partida {games} de 5
      </Text>

      <Text style={styles.score}>
        Jugador 1 (X): {scoreX}
      </Text>

      <Text style={styles.score}>
        Jugador 2 (O): {scoreO}
      </Text>

      <Text style={styles.turn}>
        Turno: {turn}
      </Text>

<View style={styles.boardContainer}>
  <Board
    board={board}
    onPress={handlePress}
  />
</View>

      <TouchableOpacity
        style={styles.button}
        onPress={restartGame}
      >
        <Text style={styles.buttonText}>
          Reiniciar Juego
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center'
  },

  boardContainer:{
  marginTop:20,
  alignItems:'center'
},

  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15
  },

  score: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 5
  },

  turn: {
    color: '#E50914',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 15
  },

  button: {
    backgroundColor: '#E50914',
    padding: 15,
    borderRadius: 10,
    marginTop: 25
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }

});