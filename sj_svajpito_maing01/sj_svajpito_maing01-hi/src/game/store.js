import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import axios from "axios";
import regeneratorRuntime from "regenerator-runtime";

const initState = { players: [], score: 0, gameOver: false };

//ACTION TYPES
const GET_PLAYERS = "GET_PLAYERS";
const ADD_PLAYER = "ADD_PLAYER";
export const UPDATE_SCORE = "UPDATE_SCORE";
const GAME_OVER = "GAME_OVER";

export const SET_PLAYER_LIST = "SET_PLAYER_LIST";
export const ADD_TO_PLAYER_LIST = "ADD_TO_PLAYER_LIST";
export const REMOVE_FROM_PLAYER_LIST = "REMOVE_FROM_PLAYER_LIST";
export const UPDATE_PLAYER_LIST = "UPDATE_PLAYER_LIST";

//ACTION CREATORS
const receivedPlayers = (players) => ({
  type: GET_PLAYERS,
  players,
});

const playerAdded = (player) => ({
  type: ADD_PLAYER,
  player,
});

export const updateScore = (score) => ({
  type: UPDATE_SCORE,
  score,
});

export const updatePlayerList = (playerList) => ({
  type: UPDATE_PLAYER_LIST,
  playerList,
});

export const setPlayerList = (playerList) => ({
  type: SET_PLAYER_LIST,
  playerList,
});

export const addToPlayerList = (playerList) => ({
  type: ADD_TO_PLAYER_LIST,
  playerList,
});

export const removeFromPlayerList = (playerList) => ({
  type: REMOVE_FROM_PLAYER_LIST,
  playerList,
});

export const gameIsOver = () => ({
  type: GAME_OVER,
});

//THUNKS
export const fetchPlayers = () => {
  return async (dispatch) => {
    try {
      const { data: players } = await axios.get("/api/players");
      dispatch(receivedPlayers(players));
    } catch (error) {
      console.error("Error fetching players");
    }
  };
};

export const addPlayer = (playerInfo) => {
  return async (dispatch) => {
    try {
      const { data: player } = await axios.post("/api/players", playerInfo);
      dispatch(playerAdded(player));
    } catch (error) {
      console.error("Error adding player");
    }
  };
};

//REDUCER
const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_PLAYERS:
      return { ...state, players: action.players };
    case ADD_PLAYER:
      return { ...state, players: [...state.players, action.player] };
    case UPDATE_SCORE:
      return { ...state, score: action.score };
    case SET_PLAYER_LIST:
      return { ...state, playerList: action.playerList };
    case ADD_TO_PLAYER_LIST:
      return { ...state, playerList: [...state.playerList, action.player] };
    case REMOVE_FROM_PLAYER_LIST:
      return { ...state, playerList: [...state.playerList.filter((p) => p.uuIdentity !== action.player.uuIdentity)] };
    case UPDATE_PLAYER_LIST:
      return { ...state, playerList: [...[], ...action.playerList] };
    case GAME_OVER:
      return { ...state, gameOver: true };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()));

export default store;
