import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { iGameState } from "~/interfaces/slices";

const initialState : iGameState = {
    gameStarted: false,
    gameOver: false,
    score: 0,
    level: 0,
    lives: 3,  
    fruits: [],  
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        startGame: (state) => {
            state.gameStarted = true;
            state.gameOver = false;
        },
        endGame: (state) => {
            state.gameStarted = false;
            state.gameOver = true;
            state.score = 0;
            state.level = 0;
            state.lives = 3;
            state.fruits = [];
        },
        increaseScore: (state, action: PayloadAction<number>) => {
            state.score += action.payload;
        },
        nextLevel: (state) => {
            state.level += 1;
        },
        loseLife: (state) => {
            state.lives -= 1;
            if (state.lives <= 0) {
                state.gameOver = true;
            }
        },
    },
});

export const GameActions = gameSlice.actions;
export default gameSlice.reducer;