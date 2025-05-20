export interface iGameState {
    gameStarted: boolean;
    gameOver: boolean;
    score: number;
    level: number;
    lives: number;    
    }

export interface iPacman {
    x: number;
    y: number;
    state: string;
    direction: string;
}


export interface iGhost {
    x: number;
    y: number;
    state: string;
    direction: string;
    name?: string;
}