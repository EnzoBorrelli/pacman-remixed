import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GAME_STATUS } from "~/consts/game";
import { PELLETS_MAP } from "~/consts/map";
import { iGameState } from "~/interfaces/slices";

const initialState: iGameState = {
  status: GAME_STATUS.STARTED,
  score: 0,
  highScore: 0,
  level: 0,
  lives: 3,
  fruits: [],
  pelletsArray: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame: (state) => {
      state.status = GAME_STATUS.STARTED;
    },
    play: (state) => {
      state.status = GAME_STATUS.PLAYING;
    },
    levelEnded: (state) => {
      state.status = GAME_STATUS.LEVEL_WON;
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
      state.pelletsArray = []; // Reset pellets to initial state
    },
    increaseScore: (state, action: PayloadAction<number>) => {
      state.score += action.payload;
    },
    setHighScore: (state) => {
      if (state.score > state.highScore) {
        state.highScore = state.score;
      }
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
    },
    removePellet: (state, action: PayloadAction<{ x: number; y: number }>) => {
      const { x, y } = action.payload;
      state.pelletsArray = state.pelletsArray.map((pellet) => {
        if (pellet.x === x && pellet.y === y) {
          return { ...pellet, isEaten: true };
        }
        return pellet;
      });
    },
  },
});

export const GameActions = gameSlice.actions;
export default gameSlice.reducer;
