import { Stage } from "@pixi/react";
import Level from "./level";
import { GAME_STATUS, SIZES } from "~/consts/game";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store";
import { useEffect } from "react";
import { PacmanActions } from "~/store/pacmanSlice";
import Ghost from "./ghost";
import EatScoreDisplay from "~/ui/level_ui/eatScoreDisplay";
import {
  BlinkyActions,
  ClydeActions,
  InkyActions,
  PinkyActions,
} from "~/store/ghostSlices";
import Pacman from "./pacman";
import { useMovement } from "~/scripts/pacman/useMovement";
import { usePelletCollision } from "~/scripts/objects/pelletUtils";

export default function Game() {
  const game = useSelector((state: RootState) => state.game);
  const pacman = useSelector((state: RootState) => state.pacman);
  const blinky = useSelector((state: RootState) => state.blinky);
  const inky = useSelector((state: RootState) => state.inky);
  const pinky = useSelector((state: RootState) => state.pinky);
  const clyde = useSelector((state: RootState) => state.clyde);
  const ghosts = [blinky, inky, pinky, clyde];
  const dispatch = useDispatch();

  useEffect(() => {
    if (game.status === GAME_STATUS.STARTED) {
      dispatch(PacmanActions.reset());
      dispatch(BlinkyActions.reset());
      dispatch(PinkyActions.reset());
      dispatch(InkyActions.reset());
      dispatch(ClydeActions.reset());
    }
  }, [game.status, dispatch]);

  const currentPellets = usePelletCollision(pacman.x, pacman.y);
  useMovement({ state: pacman.state, x: pacman.x, y: pacman.y });

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
      <Level level={game.level} pellets={currentPellets} />
      <Pacman
        x={pacman.x}
        y={pacman.y}
        state={pacman.state}
        direction={pacman.direction}
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
      <EatScoreDisplay x={pacman.x} y={pacman.y} score={0} isVisible={false} />
    </Stage>
  );
}
