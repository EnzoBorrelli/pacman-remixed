import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iGhost } from "~/interfaces/slices"


const createGhostSlice = (name: string,spawn_x:number,spawn_y:number,spawn_direction:string) => {
    const initialState: iGhost = {
        x: spawn_x,
        y: spawn_y,
        state: "IDLE",
        direction: spawn_direction,
        name: name,
    };
    return createSlice({
        name: name,
        initialState,
        reducers: {
            reset: (state) => {
                state.x = spawn_x;
                state.y = spawn_y;
                state.state = "IDLE";
                state.direction = spawn_direction;
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
        },
    });
};

export default createGhostSlice;