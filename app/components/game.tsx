import { Stage } from "@pixi/react";
import Level from "./level";
import { GAME_STATUS, SIZES } from "~/consts/game";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import Ghost from "./ghost";
import Pacman from "./pacman";
import { useMovement } from "~/scripts/pacman/useMovement";
import { usePelletCollision } from "~/scripts/objects/pelletUtils";
import { useFruitCollision } from "~/scripts/objects/fruitUtils";
import {
  useGameStatus,
  usePreloadLevelSounds,
} from "~/scripts/level/levelUtils";
import CinematicStart from "~/ui/level_ui/cinematicStart";
import { fraidCollisions, fraidManager } from "~/scripts/ghosts/fraidManager";

export default function Game() {
  const game = useSelector((state: RootState) => state.game);
  const pacman = useSelector((state: RootState) => state.pacman);
  const blinky = useSelector((state: RootState) => state.blinky);
  const inky = useSelector((state: RootState) => state.inky);
  const pinky = useSelector((state: RootState) => state.pinky);
  const clyde = useSelector((state: RootState) => state.clyde);
  const ghosts = [blinky, inky, pinky, clyde];

  //level
  usePreloadLevelSounds();
  useGameStatus(game.status);

  //objects
  const currentPellets = usePelletCollision(
    pacman.x,
    pacman.y,
    game.pelletsArray,
    game.status,
    ghosts
  );
  useFruitCollision(game, pacman.x, pacman.y, pacman.eatenPellets!);

  //characters
  fraidCollisions(ghosts, pacman);
  fraidManager({ state: pacman.state, ghosts: ghosts });
  useMovement({
    gameStatus: game.status,
    state: pacman.state,
    x: pacman.x,
    y: pacman.y,
    currentDirection: pacman.direction,
  });


  return (
    <Stage
      width={SIZES.MAP.WIDTH}
      height={SIZES.MAP.HEIGHT}
      options={{
        backgroundColor: 0x000000,
        antialias: false,
        autoDensity: true,
      }}
    >
      <Level
        level={game.level}
        pellets={currentPellets}
        isFruitVisible={game.fruitSpawned}
      />
      <Pacman
        x={pacman.x}
        y={pacman.y}
        state={pacman.state}
        direction={pacman.direction}
        isPlaying={game.status === GAME_STATUS.PLAYING}
      />
      {ghosts.map((ghost) => (
        <Ghost
          key={ghost.name}
          x={ghost.x}
          y={ghost.y}
          state={ghost.state}
          direction={ghost.direction}
          name={ghost.name}
        />
      ))}
      <CinematicStart level={game.level} status={game.status} />
    </Stage>
  );
}
