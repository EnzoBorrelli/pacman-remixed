export interface iGameState {
    status:string
    score: number;
    highScore:number;
    level: number;
    lives: number; 
    fruits:number[];   
    }

export interface iPacman {
    x: number;
    y: number;
    state: string;
    direction: string;
    eatenCombo?: string[];
    eatenPellets?: number;
}


export interface iGhost {
    x: number;
    y: number;
    state: string;
    direction: string;
    name?: string;
}