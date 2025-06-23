import { Stage } from "@pixi/react";
import Level from "./level";
import { GAME_STATUS, SIZES } from "~/consts/game";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store";
import Ghost from "./ghost";
import Pacman from "./pacman";
import { usePelletCollision } from "~/scripts/objects/pelletUtils";
import CinematicStart from "~/ui/level_ui/cinematicStart";
import { PhaseSwitch, useLoop, useSetup } from "~/scripts/game/gameManager";
import { useControls } from "~/scripts/pacman/useControls";
import { useLocation, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { GameActions } from "~/store/gameSlice";

export default function Game() {
  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  //selectors
  const game = useSelector((state: RootState) => state.game);
  const pacman = useSelector((state: RootState) => state.pacman);
  const blinky = useSelector((state: RootState) => state.blinky);
  const inky = useSelector((state: RootState) => state.inky);
  const pinky = useSelector((state: RootState) => state.pinky);
  const clyde = useSelector((state: RootState) => state.clyde);
  //for scripts
  const ghosts = [blinky, inky, pinky, clyde];
  const { getControlsDirection } = useControls();
  const inputDirection = getControlsDirection();

  useEffect(() => {
    if (location.pathname === "/play") {
      const timeout = setTimeout(() => {
        if (game.status !== GAME_STATUS.CINEMATIC)
          dispatch(GameActions.setStatus(GAME_STATUS.CINEMATIC));
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [location.pathname]);

  //setup
  useSetup(
    {
      pacman: pacman,
      ghosts: ghosts,
      game: game,
      dispatch: dispatch,
    },
    navigate
  );

  //pellets
  const currentPellets = usePelletCollision(
    pacman.x,
    pacman.y,
    game.pelletsArray,
    game.status,
    ghosts
  );

  PhaseSwitch({
    ghosts: ghosts,
    pacman: pacman,
    game: game,
    dispatch: dispatch,
  });

  //loop
  useLoop(
    {
      pacman: pacman,
      ghosts: ghosts,
      game: game,
      dispatch: dispatch,
    },
    inputDirection
  );

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
