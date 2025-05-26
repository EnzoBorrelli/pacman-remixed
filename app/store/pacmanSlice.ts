import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { CHAR_SPAWNS, DIRECTIONS, PACMAN_STATES } from "~/consts/game";
import { iPacman } from "~/interfaces/slices";

const initialState: iPacman = {
    x: CHAR_SPAWNS.PACMAN.x,
    y: CHAR_SPAWNS.PACMAN.y,
    state: PACMAN_STATES.IDLE,
    direction: DIRECTIONS.LEFT,
    eatenCombo: [],
    eatenPellets: 0,
}

const pacmanSlice = createSlice({
    name: "pacman",
    initialState,
    reducers: {
        reset: (state) => {
            state.x = CHAR_SPAWNS.PACMAN.x;
            state.y = CHAR_SPAWNS.PACMAN.y;
            state.state = PACMAN_STATES.IDLE;
            state.direction = DIRECTIONS.LEFT;
            state.eatenCombo = [];
            state.eatenPellets = 0;
        },
        setCoordinates: (state, action: PayloadAction<{ x: number; y: number }>) => {
            state.x = action.payload.x;
            state.y = action.payload.y;
        },
        setState: (state, action: PayloadAction<string>) => {
            state.state = action.payload;
        },
        setDirection: (state, action: PayloadAction<string>) => {
            state.direction = action.payload;
        },
        setEatenCombo: (state, action: PayloadAction<string[]>) => {
            state.eatenCombo = action.payload;
        },
        setEatenPellets: (state) => {
            state.eatenPellets = state.eatenPellets! + 1;
        },
        
    },
});

export const PacmanActions = pacmanSlice.actions;
export default pacmanSlice.reducer;