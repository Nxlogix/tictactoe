import { db } from './firebase';
import { doc, setDoc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';

// Crear sala
export const createRoom = async (roomId) => {
  await setDoc(doc(db, "rooms", roomId), {
    board: Array(9).fill(null),
    turn: "X",
    playerCount: 1
  });
};

// enjoin 
export const joinRoom = async (roomId) => {
  const roomRef = doc(db, "rooms", roomId);
  const roomSnap = await getDoc(roomRef);

  if (roomSnap.exists()) {
    const data = roomSnap.data();

    if (data.playerCount >= 2) {
      throw new Error("La sala está llena");
    }

    await updateDoc(roomRef, {
      playerCount: 2
    });
  } else {
    throw new Error("La sala no existe");
  }
};


export const listenRoom = (roomId, callback) => {
  return onSnapshot(doc(db, "rooms", roomId), (docSnap) => {
    callback(docSnap.data());
  });
};


export const makeMove = async (roomId, index, player) => {
  const roomRef = doc(db, "rooms", roomId);
  const roomSnap = await getDoc(roomRef);

  const data = roomSnap.data();
  const board = data.board;

  if (board[index]) return;

  board[index] = player;

  await updateDoc(roomRef, {
    board,
    turn: player === "X" ? "O" : "X"
  });
};