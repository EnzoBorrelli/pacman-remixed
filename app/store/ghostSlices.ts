import { CHAR_SPAWNS, DIRECTIONS, SCATTER_TILES } from "~/consts/game";
import createGhostSlice from "./ghostSliceFactory";

//slices
const blinkySlice = createGhostSlice("blinky", CHAR_SPAWNS.BLINKY.x, CHAR_SPAWNS.BLINKY.y,DIRECTIONS.LEFT,SCATTER_TILES.BLINKY);
const pinkySlice = createGhostSlice("pinky", CHAR_SPAWNS.PINKY.x, CHAR_SPAWNS.PINKY.y,DIRECTIONS.DOWN,SCATTER_TILES.PINKY);
const inkySlice = createGhostSlice("inky", CHAR_SPAWNS.INKY.x, CHAR_SPAWNS.INKY.y,DIRECTIONS.UP,SCATTER_TILES.INKY);
const clydeSlice = createGhostSlice("clyde", CHAR_SPAWNS.CLYDE.x, CHAR_SPAWNS.CLYDE.y,DIRECTIONS.UP,SCATTER_TILES.CLYDE);

//actions
export const BlinkyActions = blinkySlice.actions;
export const PinkyActions = pinkySlice.actions;
export const InkyActions = inkySlice.actions;
export const ClydeActions = clydeSlice.actions;

//reducders
export const blinkyReducer = blinkySlice.reducer;
export const pinkyReducer = pinkySlice.reducer;
export const inkyReducer = inkySlice.reducer;
export const clydeReducer = clydeSlice.reducer;