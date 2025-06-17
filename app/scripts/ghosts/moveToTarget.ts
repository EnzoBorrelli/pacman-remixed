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
    console.log("im aligned to tile");
    //check if intersction
    if (isIntersection(tileX, tileY)) {
      console.log("im intersected");
      const validDirs = getValidDirections(tileX, tileY, ghostDirection); //get valid directions

      //if at least a direction is valid
      if (validDirs.length > 0 && ghost.targetTile) {
        console.log("i have", validDirs.length, "directions available");
        //if target tile exist
        console.log("i have a target");

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
    console.log("im dispatching");
  } else {
    console.log("im blocked in:", nextTileX, nextTileY);
  }
}
