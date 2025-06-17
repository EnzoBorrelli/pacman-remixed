import { iGhost } from "~/interfaces/slices";
import {
  isAlignedToTile,
  isIntersection,
  isWalkableTile,
  pixelToTile,
} from "./travelUtils";
import { chooseDirection, DIRS, getValidDirections } from "./chooseDirection";
import { Dispatch } from "@reduxjs/toolkit";
import { ghostActions } from "~/interfaces/components";
import { MAP_TP_COORDS } from "~/consts/game";

export function moveToTarget(
  ghost: iGhost,
  actions: ghostActions,
  dispatch: Dispatch
) {
  //get tile coordinates
  const { x: tileX, y: tileY } = pixelToTile(ghost.x, ghost.y);
  let ghostDirection = ghost.direction;

  //check if aligned
  if (isAlignedToTile(ghost.x, ghost.y)) {
    //check if intersction
    if (isIntersection(tileX, tileY)) {
      const validDirs = getValidDirections(tileX, tileY, ghostDirection); //get valid directions

      //if at least a direction is valid
      //if target tile exist
      if (validDirs.length > 0 && ghost.targetTile) {
        const newDir = chooseDirection(
          tileX,
          tileY,
          validDirs,
          ghost.targetTile?.x,
          ghost.targetTile?.y
        );

        const dx = DIRS[newDir].x;
        const dy = DIRS[newDir].y;
        const nexTile = { x: tileX + dx, y: tileY + dy };
        if (isWalkableTile(nexTile.x, nexTile.y)) ghostDirection = newDir;
      }
    }
  }
  //predict next position

  const speed = 2;
  const nextX = ghost.x + DIRS[ghostDirection].x * speed;
  const nextY = ghost.y + DIRS[ghostDirection].y * speed;

  //next position

  const { x: nextTileX, y: nextTileY } = pixelToTile(nextX, nextY);

  //only if is walkable

  if (isWalkableTile(nextTileX, nextTileY)) {
    if (nextX > MAP_TP_COORDS.RIGHT_IN) {
      dispatch(actions.setGCoordinates({ x: MAP_TP_COORDS.LEFT_OUT, nextY }));
    }
    if (nextTileY < MAP_TP_COORDS.LEFT_IN) {
      dispatch(actions.setGCoordinates({ x: MAP_TP_COORDS.RIGHT_OUT, nextY }));
    }
      dispatch(actions.setGCoordinates({ x: nextX, y: nextY }));
      dispatch(actions.setDirection(ghostDirection));
  } else {
    console.log("im blocked in:", nextTileX, nextTileY);
  }
}
