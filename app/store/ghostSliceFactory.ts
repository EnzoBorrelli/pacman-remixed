import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BEHAVIOR_STATES, GHOST_STATES } from "~/consts/game";
import { Direction, iGhost } from "~/interfaces/slices";

const createGhostSlice = (
  name: string,
  spawn_x: number,
  spawn_y: number,
  spawn_direction: Direction,
  targetTile: { x: number; y: number }
) => {
  const initialState: iGhost = {
    x: spawn_x,
    y: spawn_y,
    state: GHOST_STATES.IDLE,
    direction: spawn_direction,
    name: name,
    behavior: BEHAVIOR_STATES.SCATTER,
    targetTile: targetTile,
  };
  return createSlice({
    name: name,
    initialState,
    reducers: {
      reset: (state) => {
        state.x = spawn_x;
        state.y = spawn_y;
        state.state = GHOST_STATES.IDLE;
        state.direction = spawn_direction;
        state.behavior = BEHAVIOR_STATES.SCATTER;
        state.targetTile = targetTile;
      },
      setGCoordinates: (state, action) => {
        state.x = action.payload.x;
        state.y = action.payload.y;
      },
      setState: (state, action: PayloadAction<string>) => {
        state.state = action.payload;
      },
      setDirection: (state, action: PayloadAction<Direction>) => {
        state.direction = action.payload;
      },
      setBehavior: (state, action: PayloadAction<string>) => {
        state.behavior = action.payload;
      },
      setTargetTile: (
        state,
        action: PayloadAction<{ x: number; y: number }>
      ) => {
        state.targetTile = action.payload;
      },
    },
  });
};

export default createGhostSlice;
