import { PacmanActions } from "~/store/pacmanSlice";
import { useControls } from "./useControls";
import { useDispatch } from "react-redux";
import {
  GAME_STATUS,
  MAP_TP_COORDS,
  PACMAN_STATES,
} from "~/consts/game";
import { useGameloop } from "../useGameLoop";
import { isCollidingWithMap } from "~/utils/isColliding";
import { Direction } from "~/interfaces/slices";

export function useMovement({
  gameStatus,
  state,
  x,
  y,
  currentDirection,
}: {
  gameStatus: string;
  state: string;
  x: number;
  y: number;
  currentDirection: Direction;
}) {
  const speed = state === PACMAN_STATES.EATING_POWER_PELLET ? 4 : 2;
  const dispatch = useDispatch();
  const { getControlsDirection } = useControls();

  const move = (inputDirection: Direction, previousDirection: Direction) => {
    const tryMove = (direction: Direction) => {
      let newX = x;
      let newY = y;
      let collisionY = 0;
      let collisionX = 0;
      switch (direction) {
        case "UP":
          newY -= speed;
          collisionY = -4;
          break;
        case "DOWN":
          newY += speed;
          collisionY = 8 + 4;
          break;
        case "LEFT":
          newX -= speed;
          collisionX = -4;
          break;
        case "RIGHT":
          newX += speed;
          collisionX = 8 + 4;
          break;
        default:
          break;
      }
      if (!isCollidingWithMap(newX + collisionX, newY + collisionY)) {
        dispatch(PacmanActions.setCoordinates({ x: newX, y: newY }));
        dispatch(PacmanActions.setDirection(direction));
        return true;
      }
      return false;
    };
    if (inputDirection && tryMove(inputDirection)) return;

    if (previousDirection) tryMove(previousDirection);
  };

  useGameloop(() => {
    const inputDirection = getControlsDirection();
    if (
      [GAME_STATUS.STARTED, GAME_STATUS.CONTINUE, GAME_STATUS.PLAYING].includes(
        gameStatus
      ) &&
      state !== PACMAN_STATES.DYING
    ) {
      if (inputDirection && state) {
        if (state !== PACMAN_STATES.EATING_POWER_PELLET)
          dispatch(PacmanActions.setState(PACMAN_STATES.MOVING));
        move(inputDirection, currentDirection);
      } else {
        dispatch(PacmanActions.setState(PACMAN_STATES.IDLE));
      }
    }
    if (x > MAP_TP_COORDS.RIGHT_IN) {
      dispatch(PacmanActions.setCoordinates({ x: MAP_TP_COORDS.LEFT_OUT, y }));
    }
    if (x < MAP_TP_COORDS.LEFT_IN) {
      dispatch(PacmanActions.setCoordinates({ x: MAP_TP_COORDS.RIGHT_OUT, y }));
    }
    if (state === PACMAN_STATES.EATING_POWER_PELLET) {
      dispatch(PacmanActions.decreasePowerPelletTimeout());
    }
  });
}
