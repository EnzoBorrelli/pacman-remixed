import { CAGE_TILES, CHAR_SPAWNS, DIRECTIONS } from "~/consts/game";
import createGhostSlice from "./ghostSliceFactory";

//slices
const blinkySlice = createGhostSlice("blinky", CHAR_SPAWNS.BLINKY.x, CHAR_SPAWNS.BLINKY.y,DIRECTIONS.LEFT,CAGE_TILES["blinky"]);
const pinkySlice = createGhostSlice("pinky", CHAR_SPAWNS.PINKY.x, CHAR_SPAWNS.PINKY.y,DIRECTIONS.DOWN,CAGE_TILES["pinky"]);
const inkySlice = createGhostSlice("inky", CHAR_SPAWNS.INKY.x, CHAR_SPAWNS.INKY.y,DIRECTIONS.UP,CAGE_TILES["inky"]);
const clydeSlice = createGhostSlice("clyde", CHAR_SPAWNS.CLYDE.x, CHAR_SPAWNS.CLYDE.y,DIRECTIONS.UP,CAGE_TILES["clyde"]);

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