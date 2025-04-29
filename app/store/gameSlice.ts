import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { iGameState } from "~/interfaces/slices";

const initialState : iGameState = {
    gameStarted: false,
    gameOver: false,
    score: 0,
    level: 1,
    lives: 3,    
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        startGame: (state) => {
            state.gameStarted = true;
            state.gameOver = false;
            state.score = 0;
            state.level = 1;
            state.lives = 3;
        },
        endGame: (state) => {
            state.gameStarted = false;
            state.gameOver = true;
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