import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BEHAVIOR_STATES, GHOST_STATES } from "~/consts/game";
import { iGhost } from "~/interfaces/slices"



const createGhostSlice = (name: string,spawn_x:number,spawn_y:number,spawn_direction:string) => {
    const initialState: iGhost = {
        x: spawn_x,
        y: spawn_y,
        state: GHOST_STATES.IDLE,
        direction: spawn_direction,
        name: name,
        behavior: BEHAVIOR_STATES.SCATTER
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
                state.behavior= BEHAVIOR_STATES.SCATTER
            },
            setGCoordinates: (state, action) => {
                state.x = action.payload.x;
                state.y = action.payload.y;
            },
            setState: (state, action:PayloadAction<string>) => {
                state.state = action.payload;
            },
            setDirection: (state, action:PayloadAction<string>) => {
                state.direction = action.payload;
            },
            setBehavior: (state, action:PayloadAction<string>) => {
                state.behavior = action.payload;
            },
        },
    });
};

export default createGhostSlice;