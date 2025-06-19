import { PacmanActions } from "~/store/pacmanSlice";
import { GAME_STATUS, MAP_TP_COORDS, PACMAN_STATES } from "~/consts/game";
import { isCollidingWithMap } from "~/utils/isColliding";
import { Direction, iPacman } from "~/interfaces/slices";
import { Dispatch } from "@reduxjs/toolkit";

const move = (
  inputDirection: Direction,
  dispatch: Dispatch,
  pacman: iPacman
) => {
  const speed = pacman.state === PACMAN_STATES.EATING_POWER_PELLET ? 4 : 2;
  const tryMove = (direction: Direction) => {
    let newX = pacman.x;
    let newY = pacman.y;
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

  if (pacman.direction) tryMove(pacman.direction);
};

export function updatePacmanPosition({
  gameStatus,
  pacman,
  dispatch,
  inputDirection,
}: {
  gameStatus: string;
  pacman: iPacman;
  dispatch: Dispatch;
  inputDirection: Direction | undefined;
}) {
  if (
    [GAME_STATUS.STARTED, GAME_STATUS.CONTINUE, GAME_STATUS.PLAYING].includes(
      gameStatus
    ) &&
    pacman.state !== PACMAN_STATES.DYING
  ) {
    if (inputDirection && pacman.state) {
      if (pacman.state !== PACMAN_STATES.EATING_POWER_PELLET)
        dispatch(PacmanActions.setState(PACMAN_STATES.MOVING));
      move(inputDirection, dispatch, pacman);
    } else {
      dispatch(PacmanActions.setState(PACMAN_STATES.IDLE));
    }
  }
  if (pacman.x > MAP_TP_COORDS.RIGHT_IN) {
    dispatch(
      PacmanActions.setCoordinates({ x: MAP_TP_COORDS.LEFT_OUT, y: pacman.y })
    );
  }
  if (pacman.x < MAP_TP_COORDS.LEFT_IN) {
    dispatch(
      PacmanActions.setCoordinates({ x: MAP_TP_COORDS.RIGHT_OUT, y: pacman.y })
    );
  }
  if (pacman.state === PACMAN_STATES.EATING_POWER_PELLET) {
    dispatch(PacmanActions.decreasePowerPelletTimeout());
  }
}
