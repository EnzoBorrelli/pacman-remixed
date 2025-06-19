import { gameFuntion } from "~/interfaces/components";
import fraidManager from "../ghosts/fraidManager";
import { PreloadLevelSounds, SwitchGameStatus } from "../level/levelUtils";
import { updateFruits } from "../objects/fruitUtils";
import { updatePacmanPosition } from "../pacman/updatePacmanPosition";
import { useGameloop } from "../useGameLoop";
import { Direction } from "~/interfaces/slices";

export function useSetup({ pacman, ghosts, game, dispatch }: gameFuntion) {
  PreloadLevelSounds();
  SwitchGameStatus(game.status);
  fraidManager.Attach({
    pacman: pacman,
    ghosts: ghosts,
    dispatch: dispatch,
    gameStatus: game.status,
  });
}

export function useLoop(
  { pacman, ghosts, game, dispatch }: gameFuntion,
  inputDirection: Direction | undefined
) {
  useGameloop(() => {
    updateFruits({ game: game, pacman: pacman, dispatch: dispatch });
    fraidManager.Update({ pacman: pacman, ghosts: ghosts, dispatch: dispatch });
    updatePacmanPosition({
      gameStatus: game.status,
      pacman: pacman,
      dispatch: dispatch,
      inputDirection: inputDirection,
    });
  });
}
