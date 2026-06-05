import { useEffect, useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import Board from '../components/Board';

import {
    createRoom,
    joinRoom,
    listenRoom,
    makeMove
} from '../firebase/gameService';

export default function MultiplayerScreen() {

  const [board, setBoard] = useState(Array(9).fill(''));
  const [turn, setTurn] = useState('X');

  const [roomId, setRoomId] = useState('');
  const [inputRoom, setInputRoom] = useState('');

  const [player, setPlayer] = useState('X');
  const [gameOver, setGameOver] = useState(false);

  const winnerLines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  useEffect(() => {
    if (!roomId) return;

    const unsub = listenRoom(roomId, (data) => {
      if (!data) return;

      setBoard(data.board);
      setTurn(data.turn);
    });

    return () => unsub();
  }, [roomId]);

  async function handleCreateRoom() {
    const id = Math.random().toString(36).substring(2, 7);

    await createRoom(id);

    setRoomId(id);
    setPlayer('X');

    Alert.alert('Sala creada', `Código: ${id}`);
  }

  async function handleJoinRoom() {
    try {
      if (!inputRoom) return;

      await joinRoom(inputRoom);

      setRoomId(inputRoom);
      setPlayer('O');

      Alert.alert('Conectado', 'Te uniste a la sala');
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  }

  async function handlePress(index) {

    if (gameOver) return;
    if (board[index] !== '') return;
    if (turn !== player) return;
    if (!roomId) return;

    await makeMove(roomId, index, player);
  }

  function restartLocal() {
    setBoard(Array(9).fill(''));
    setTurn('X');
    setGameOver(false);
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Tres en Raya Online</Text>

      {}
      {!roomId ? (
        <>
          <TextInput
            placeholder="Código de sala"
            placeholderTextColor="#999"
            value={inputRoom}
            onChangeText={setInputRoom}
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={handleJoinRoom}>
            <Text style={styles.buttonText}>Unirse a Sala</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleCreateRoom}>
            <Text style={styles.buttonText}>Crear Sala</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.info}>Sala: {roomId}</Text>
          <Text style={styles.info}>Jugador: {player}</Text>
          <Text style={styles.turn}>Turno: {turn}</Text>

          <View style={styles.boardContainer}>
            <Board board={board} onPress={handlePress} />
          </View>

          <TouchableOpacity style={styles.button} onPress={restartLocal}>
            <Text style={styles.buttonText}>Reiniciar local</Text>
          </TouchableOpacity>
        </>
      )}

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

  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20
  },

  input: {
    width: '80%',
    backgroundColor: '#222',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15
  },

  boardContainer: {
    marginTop: 20
  },

  info: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5
  },

  turn: {
    color: '#E50914',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10
  },

  button: {
    backgroundColor: '#E50914',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: '80%',
    alignItems: 'center'
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});