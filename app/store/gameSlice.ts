import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GAME_STATUS } from "~/consts/game";
import { iGameState } from "~/interfaces/slices";

const initialState: iGameState = {
  status:GAME_STATUS.STARTED,
  score: 0,
  highScore: 0,
  level: 0,
  lives: 3,
  fruits: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame: (state) => {
      state.status = GAME_STATUS.STARTED;
    },
    endGame: (state) => {
      state.status = GAME_STATUS.OVER;
      if (state.score > state.highScore) {
        state.highScore = state.score;
      }
      state.score = 0;
      state.level = 0;
      state.lives = 3;
      state.fruits = [];
    },
    increaseScore: (state, action: PayloadAction<number>) => {
      state.score += action.payload;
    },
    setHighScore: (state, action: PayloadAction<number>) => {
      state.score += action.payload;
    },
    nextLevel: (state) => {
      state.level += 1;
    },
    loseLife: (state) => {
      state.lives -= 1;
      if (state.lives <= 0) {
        state.status = GAME_STATUS.OVER;
      }
    },
    setFruits: (state, action: PayloadAction<number[]>) => {
      state.fruits = action.payload;
    }
  },
});

export const GameActions = gameSlice.actions;
export default gameSlice.reducer;
