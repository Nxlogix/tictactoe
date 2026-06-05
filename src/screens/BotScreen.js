import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Board from '../components/Board';

export default function BotScreen() {

  const [board, setBoard] = useState(Array(9).fill(''));

  const [scorePlayer, setScorePlayer] = useState(0);
  const [scoreBot, setScoreBot] = useState(0);

  const [games, setGames] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const [mode, setMode] = useState('easy');

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
    setGames(1);
    setScorePlayer(0);
    setScoreBot(0);
    setGameOver(false);
  }

  function nextRound() {

    if (games >= 5) {

      let winner = '';

      if (scorePlayer > scoreBot) {
        winner = 'Ganaste la serie';
      } else if (scoreBot > scorePlayer) {
        winner = 'La máquina ganó la serie';
      } else {
        winner = 'La serie terminó empatada';
      }

      Alert.alert('Fin de las 5 partidas', winner, [
        { text: 'Nueva Serie', onPress: restartGame }
      ]);

      return;
    }

    setBoard(Array(9).fill(''));
    setGameOver(false);
    setGames(prev => prev + 1);
  }

  function checkWinner(currentBoard) {

    for (let line of winnerLines) {

      const [a,b,c] = line;

      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {

        setGameOver(true);

        if (currentBoard[a] === 'X') {
          setScorePlayer(prev => prev + 1);

          Alert.alert('Ganaste', 'Le ganaste a la máquina');
        } else {
          setScoreBot(prev => prev + 1);

          Alert.alert('Perdiste', 'La máquina ganó esta partida');
        }

        setTimeout(() => {
          nextRound();
        }, 1000);

        return true;
      }
    }

    if (!currentBoard.includes('')) {

      setGameOver(true);

      setScorePlayer(prev => prev + 1);
      setScoreBot(prev => prev + 1);

      Alert.alert('Empate', '1 punto para cada uno');

      setTimeout(() => {
        nextRound();
      }, 1000);

      return true;
    }

    return false;
  }

  function smartMove(board, empty) {

    for (let i of empty) {
      const copy = [...board];
      copy[i] = 'O';
      if (checkWinSim(copy, 'O')) return i;
    }

    for (let i of empty) {
      const copy = [...board];
      copy[i] = 'X';
      if (checkWinSim(copy, 'X')) return i;
    }

    if (empty.includes(4)) return 4;

    return empty[Math.floor(Math.random() * empty.length)];
  }

  function checkWinSim(board, player) {

    for (let line of winnerLines) {

      const [a,b,c] = line;

      if (
        board[a] === player &&
        board[b] === player &&
        board[c] === player
      ) {
        return true;
      }
    }

    return false;
  }

  function botMove(boardAfterPlayer) {

    if (gameOver) return;

    const available = [];

    for (let i = 0; i < boardAfterPlayer.length; i++) {
      if (boardAfterPlayer[i] === '') {
        available.push(i);
      }
    }

    if (available.length === 0) return;

    let move;

    if (mode === 'easy') {
      move = available[Math.floor(Math.random() * available.length)];
    }

    else if (mode === 'medium') {
      if (Math.random() < 0.6) {
        move = available[Math.floor(Math.random() * available.length)];
      } else {
        move = smartMove(boardAfterPlayer, available);
      }
    }

    else {
      move = smartMove(boardAfterPlayer, available);
    }

    const botBoard = [...boardAfterPlayer];
    botBoard[move] = 'O';

    setBoard(botBoard);
    checkWinner(botBoard);
  }

  function handlePress(index) {

    if (gameOver) return;
    if (board[index] !== '') return;

    const newBoard = [...board];
    newBoard[index] = 'X';

    setBoard(newBoard);

    const winnerFound = checkWinner(newBoard);
    if (winnerFound) return;

    setTimeout(() => {
      botMove(newBoard);
    }, 500);
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Contra Bot</Text>

      <Text style={styles.score}>Partida {games} de 5</Text>

      <Text style={styles.score}>Tú (X): {scorePlayer}</Text>

      <Text style={styles.score}>Máquina (O): {scoreBot}</Text>

      <View style={styles.modeContainer}>
        <TouchableOpacity onPress={() => setMode('easy')}>
          <Text style={styles.mode}>Fácil</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setMode('medium')}>
          <Text style={styles.mode}>Medio</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setMode('hard')}>
          <Text style={styles.mode}>Difícil</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.boardContainer}>
        <Board board={board} onPress={handlePress} />
      </View>

      <TouchableOpacity style={styles.button} onPress={restartGame}>
        <Text style={styles.buttonText}>Reiniciar Juego</Text>
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

  boardContainer: {
    marginTop: 20,
    alignItems: 'center'
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

  button: {
    backgroundColor: '#E50914',
    padding: 15,
    borderRadius: 10,
    marginTop: 25
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  modeContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    gap: 10
  },

  mode: {
    color: '#fff',
    marginHorizontal: 10
  }
});

