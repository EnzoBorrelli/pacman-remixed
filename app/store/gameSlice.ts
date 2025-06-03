import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GAME_STATUS } from "~/consts/game";
import { iPellet } from "~/interfaces/components";
import { iGameState } from "~/interfaces/slices";

const initialState: iGameState = {
  status: GAME_STATUS.STARTED,
  score: 0,
  highScore: 0,
  level: 0,
  lives: 3,
  fruits: [],
  fruitSpawnsCount: 0,
  fruitSpawned: false,
  pelletsArray: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    gameReset: (state) => {
      if (state.score > state.highScore) {
        state.highScore = state.score;
      }
      state.score = 0;
      state.level = 0;
      state.lives = 3;
      state.fruits = [];
      state.fruitSpawnsCount = 0;
      state.fruitSpawned = false;
      state.pelletsArray = [];
    },
    levelReset: (state) => {
      if (state.score > state.highScore) {
        state.highScore = state.score;
      }
      state.fruitSpawnsCount = 0;
      state.fruitSpawned = false;
      state.pelletsArray = [];
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
    increaseFruitSpawnsCount: (state) => {
      state.fruitSpawnsCount += 1;
      state.fruitSpawned = state.fruitSpawnsCount % 2 !== 0;
    },
    toggleFruitEaten: (state) => {
      state.fruitSpawnsCount = 6; // Reset fruit spawns count after eating
      state.fruitSpawned = false;
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
    setPellets: (state, action: PayloadAction<iPellet[]>) => {
      state.pelletsArray = action.payload;
    },
  },
});

export const GameActions = gameSlice.actions;
export default gameSlice.reducer;
