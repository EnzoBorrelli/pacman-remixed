import { iPellet } from "./components";

export interface iGameState {
    status:string
    score: number;
    highScore:number;
    level: number;
    lives: number; 
    fruits:number[];   
    pelletsArray: iPellet[];
    }

export interface iPacman {
    x: number;
    y: number;
    state: string;
    direction: string;
    eatenCombo?: string[];
    eatenPellets?: number;
    powerPelletTimeout?: number;
}


export interface iGhost {
    x: number;
    y: number;
    state: string;
    direction: string;
    name?: string;
}