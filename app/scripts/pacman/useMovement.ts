import { PacmanActions } from "~/store/pacmanSlice";
import { useControls } from "./useControls";
import { useDispatch } from "react-redux";
import { GAME_STATUS, PACMAN_STATES } from "~/consts/game";
import { useGameloop } from "../useGameLoop";
import { isCollidingWithMap } from "~/utils/isColliding";

export function useMovement({
  gameStatus,
  state,
  x,
  y,
}: {
  gameStatus: string;
  state: string;
  x: number;
  y: number;
}) {
  const speed = state === PACMAN_STATES.EATING_POWER_PELLET ? 4 : 2;
  const dispatch = useDispatch();
  const { getControlsDirection } = useControls();

  const move = (direction: string) => {
    let newX = x;
    let newY = y;
    let collisionY = 0;
    let collisionX = 0;
    switch (direction) {
      case "UP":
        newY -= speed;
        collisionY = 0;
        break;
      case "DOWN":
        newY += speed;
        collisionY = 8;
        break;
      case "LEFT":
        newX -= speed;
        collisionX = 0;
        break;
      case "RIGHT":
        newX += speed;
        collisionX = 8;
        break;
      default:
        break;
    }
    if (!isCollidingWithMap(newX + collisionX, newY + collisionY)) {
      dispatch(PacmanActions.setCoordinates({ x: newX, y: newY }));
    }
  };

  useGameloop(() => {
    const direction = getControlsDirection();
    if ((gameStatus === GAME_STATUS.STARTED|| gameStatus === GAME_STATUS.CONTINUE || GAME_STATUS.PLAYING)&& state !== PACMAN_STATES.DYING) {
      if (direction && direction !== undefined && state) {
        dispatch(PacmanActions.setDirection(direction));
        if (state !== PACMAN_STATES.EATING_POWER_PELLET)
          dispatch(PacmanActions.setState(PACMAN_STATES.MOVING));
        move(direction);
      } else {
        dispatch(PacmanActions.setState(PACMAN_STATES.IDLE));
      }
    }
    if (x > 432) {
      dispatch(PacmanActions.setCoordinates({ x: 4, y }));
    }
    if (x < 2) {
      dispatch(PacmanActions.setCoordinates({ x: 426, y }));
    }
    if (state === PACMAN_STATES.EATING_POWER_PELLET) {
      dispatch(PacmanActions.decreasePowerPelletTimeout());
    }
  });
}
