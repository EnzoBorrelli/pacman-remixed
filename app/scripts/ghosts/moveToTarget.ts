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

const forbiddenXTiles = [10, 11, 12, 13, 14, 15, 16];
const forbiddenYTiles = [10, 11, 12, 13];

export function moveToTarget(
  ghost: iGhost,
  actions: ghostActions,
  dispatch: Dispatch
) {
  if (ghost.behavior === "IDLE") return;
  //get tile coordinates
  const { x: tileX, y: tileY } = pixelToTile(ghost.x, ghost.y);
  let ghostDirection = ghost.direction;

  //check if aligned
  if (isAlignedToTile(ghost.x, ghost.y)) {
    //check if intersction
    if (isIntersection(tileX, tileY)) {
      const validDirs = getValidDirections(tileX, tileY, ghostDirection); //get valid directions

      let filteredDirs = validDirs;

      if (ghost.behavior !== "CAGE") {
        filteredDirs = validDirs.filter((dir) => {
          const dx = DIRS[dir].x;
          const dy = DIRS[dir].y;
          const nextTile = { x: tileX + dx, y: tileY + dy };

          const isTryinToEnterCage =
            forbiddenYTiles.includes(nextTile.y) &&
            forbiddenXTiles.includes(nextTile.x) &&
            dir === "DOWN";

          return !isTryinToEnterCage;
        });
      }

      //if at least a direction is valid
      //if target tile exist
      if (filteredDirs.length > 0 && ghost.targetTile) {
        const newDir = chooseDirection(
          tileX,
          tileY,
          filteredDirs,
          ghost.targetTile?.x,
          ghost.targetTile?.y
        );

        ghostDirection = newDir;
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
    dispatch(actions.setGCoordinates({ x: nextX, y: nextY }));
    dispatch(actions.setDirection(ghostDirection));
  } else {
    if (ghost.x > MAP_TP_COORDS.RIGHT_IN) {
      dispatch(
        actions.setGCoordinates({ x: MAP_TP_COORDS.LEFT_OUT, y: ghost.y })
      );
    }
    if (ghost.x < MAP_TP_COORDS.LEFT_IN) {
      dispatch(
        actions.setGCoordinates({ x: MAP_TP_COORDS.RIGHT_OUT, y: ghost.y })
      );
    }
    console.log("im blocked in:", nextTileX, nextTileY);
  }
}
