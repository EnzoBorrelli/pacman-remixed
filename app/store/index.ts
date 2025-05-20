import { configureStore } from "@reduxjs/toolkit";
import  gameReducer  from "./gameSlice";
import  pacmanReducer  from "./pacmanSlice";
import { blinkyReducer, clydeReducer, inkyReducer, pinkyReducer } from "./ghostSlices";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    pacman: pacmanReducer,
    blinky:blinkyReducer,
    inky:inkyReducer,
    pinky:pinkyReducer,
    clyde:clydeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
