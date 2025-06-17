import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  BEHAVIOR_STATES,
  CAGE_TILES,
  GAME_STATUS,
  GHOST_STATES,
  PACMAN_STATES,
  SCATTER_TILES,
  SIZES,
} from "~/consts/game";
import { ghostActions } from "~/interfaces/components";
import { iGhost, iPacman } from "~/interfaces/slices";
import { RootState } from "~/store";
import { GameActions } from "~/store/gameSlice";
import { isCollidingWithObject } from "~/utils/isColliding";
import { getRandomTile } from "./travelUtils";

type iState = {
  ghost: iGhost;
  actions: ghostActions;
  dispatch: Dispatch;
};

function chaseState() {}

function cageState({ ghost, actions, dispatch }: iState) {
  dispatch(actions.setTargetTile(CAGE_TILES[ghost.name!]));
  dispatch(actions.setState(GHOST_STATES.MOVING));
  console.log("im in cage state");
  if (
    ghost.x / SIZES.TILE === ghost.targetTile?.x &&
    ghost.y / SIZES.TILE === ghost.targetTile?.y
  ) {
    dispatch(actions.setBehavior(BEHAVIOR_STATES.SCATTER));
  }
}
function scatterState({ ghost, actions, dispatch }: iState) {
  dispatch(actions.setState(GHOST_STATES.MOVING));
  dispatch(actions.setTargetTile(SCATTER_TILES[ghost.name!]));
  console.log("im in scatter state");
}

function frightenedState(
  { ghost, actions, dispatch }: iState,
  powerTime: number
) {
  const randomTile = getRandomTile();
  dispatch(actions.setTargetTile(randomTile));
  if (powerTime > 400) {
    dispatch(actions.setState(GHOST_STATES.FRIGHTENED));
  } else if (powerTime < 400 && powerTime > 0) {
    dispatch(actions.setState(GHOST_STATES.RESTORING));
  }
}

function eatenState({ ghost, actions, dispatch }: iState) {
  dispatch(actions.setState(GHOST_STATES.DEAD));
  dispatch(actions.setTargetTile(CAGE_TILES[ghost.name!]));
  if (
    ghost.x / SIZES.TILE === ghost.targetTile?.x &&
    ghost.y / SIZES.TILE === ghost.targetTile?.y
  ) {
    dispatch(actions.setBehavior(BEHAVIOR_STATES.CAGE));
  }
}

export function useBehaviorManager() {
  const pacman = useSelector((state: RootState) => state.pacman);
  const dispatch = useDispatch();
  return (ghost: iGhost, actions: ghostActions) => {
    if (ghost.behavior === BEHAVIOR_STATES.CAGE) {
      cageState({ ghost: ghost, actions: actions, dispatch: dispatch });
    }
    if (ghost.behavior === BEHAVIOR_STATES.CHASE) {
      chaseState();
    }
    if (ghost.behavior === BEHAVIOR_STATES.SCATTER) {
      scatterState({ ghost: ghost, actions: actions, dispatch: dispatch });
    }
    if (ghost.behavior === BEHAVIOR_STATES.FRIGHTENED) {
      if (pacman.powerPelletTimeout != null)
        frightenedState(
          { ghost: ghost, actions: actions, dispatch: dispatch },
          pacman.powerPelletTimeout
        );
    }
    if (ghost.behavior === BEHAVIOR_STATES.EATEN) {
      eatenState({ ghost: ghost, actions: actions, dispatch: dispatch });
    }
  };
}

export function collisionState(
  pacman: iPacman,
  ghost: iGhost,
  ghostActions: ghostActions,
  dispatch: Dispatch
) {
  const isColliding = isCollidingWithObject(
    pacman.x,
    pacman.y,
    SIZES.TILE,
    ghost.x,
    ghost.y
  );

  if (isColliding && ghost.state !== GHOST_STATES.DEAD) {
    if (pacman.state === PACMAN_STATES.EATING_POWER_PELLET) {
      dispatch(ghostActions.setBehavior(BEHAVIOR_STATES.EATEN));
    } else {
      dispatch(GameActions.setStatus(GAME_STATUS.LOSE_LIFE));
    }
  }
}
