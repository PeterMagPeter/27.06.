import { createSlice } from "@reduxjs/toolkit";

export interface hostSettings {
  roomId: string | null;
  privateMatch: boolean;
  gameMap: string;
  password?: string;
  maxPlayers: number; // former playerCount
  gameMode: string;
  hostName: string;
  players: string[];
  superWeapons: boolean;
  shotTimer: number;
}
interface Lobby {
  roomId: string;
  privateMatch: boolean;
  initPlayer: string;
  hostName: string;
  aiDifficulty: number;
  vsAi: boolean;
}

// Initialer Zustand des Reducers
const initialState: Lobby = {
  roomId: "",
  privateMatch: false,
  initPlayer: "",
  hostName: "",
  aiDifficulty: 0.5,
  vsAi: false,
  // später noch aiDifficulty und ships hinzufügen
};

// Erstelle ein Slice mit einem Reducer und Aktionen
const lobbyReducer = createSlice({
  name: "lobbyReducer",
  initialState,
  reducers: {
    setLobby: (state, action) => {
      state.roomId = action.payload.roomId;
      state.initPlayer = action.payload.initPlayer;
      state.privateMatch = action.payload.privateMatch;
      state.hostName = action.payload.hostName;
    },
    setAiDifficulty: (state, action) => {
      state.vsAi = action.payload.vsAi;
      state.aiDifficulty = action.payload.aiDifficulty;
    },
    setHostName: (state, action) => {
      state.hostName = action.payload.hostName;
    },
    deleteLobby: (state) => {
      state.roomId = "";
      state.initPlayer = "";
      state.hostName = "";
      state.privateMatch = false;
    },
  },
});

// Exportiere Reducer und Aktionen
export const { setLobby, setAiDifficulty, deleteLobby, setHostName } =
  lobbyReducer.actions;
export default lobbyReducer.reducer;
