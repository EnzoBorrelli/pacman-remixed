import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CHAR_SPAWNS, DIRECTIONS, PACMAN_STATES } from "~/consts/game";
import { iPacman, Direction } from "~/interfaces/slices";

const initialState: iPacman = {
  x: CHAR_SPAWNS.PACMAN.x,
  y: CHAR_SPAWNS.PACMAN.y,
  state: PACMAN_STATES.IDLE,
  direction: DIRECTIONS.LEFT,
  eatenPellets: 0,
  powerPelletTimeout: 800,
};

const pacmanSlice = createSlice({
  name: "pacman",
  initialState,
  reducers: {
    reset: (state) => {
      state.x = CHAR_SPAWNS.PACMAN.x;
      state.y = CHAR_SPAWNS.PACMAN.y;
      state.state = PACMAN_STATES.IDLE;
      state.direction = DIRECTIONS.LEFT;
      state.powerPelletTimeout = 800; // Reset power pellet timeout
    },
    setCoordinates: (
      state,
      action: PayloadAction<{ x: number; y: number }>
    ) => {
      state.x = action.payload.x;
      state.y = action.payload.y;
    },
    setState: (state, action: PayloadAction<string>) => {
      state.state = action.payload;
    },
    setDirection: (state, action: PayloadAction<Direction>) => {
      state.direction = action.payload;
    },
    setEatenPellets: (state) => {
      state.eatenPellets = state.eatenPellets! + 1;
    },
    resetPellets: (state) => {
      state.eatenPellets = 0;
    },
    decreasePowerPelletTimeout: (state) => {
      state.powerPelletTimeout! -= 1;
      if (state.powerPelletTimeout! <= 0) {
        state.state = PACMAN_STATES.MOVING; // Reset state when timeout reaches 0
        state.powerPelletTimeout = 800; // Reset to initial value
      }
    },
    resetPowerPelletTimeout: (state) => {
      state.powerPelletTimeout = 800; // Reset to initial value
    },
  },
});

export const PacmanActions = pacmanSlice.actions;
export default pacmanSlice.reducer;
