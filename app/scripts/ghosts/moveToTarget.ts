import { iGhost } from "~/interfaces/slices";
import { isAlignedToTile, isIntersection, pixelToTile } from "./travelUtils";
import { chooseDirection, DIRS, getValidDirections } from "./chooseDirection";
import { Dispatch } from "@reduxjs/toolkit";
import { ghostActions } from "~/interfaces/components";

export function moveToTarget(
  ghost: iGhost,
  actions: ghostActions,
  pacmanX: number,
  pacmanY: number,
  dispatch: Dispatch
) {
  //get tile coordinates
  const { x: tileX, y: tileY } = pixelToTile(ghost.x, ghost.y);

  //check if aligned
  if (isAlignedToTile(ghost.x, ghost.y)) {
    //check if intersction
    if (isIntersection(tileX, tileY)) {
      const validDirs = getValidDirections(tileX, tileY, ghost.direction); //get valid directions

      //if at least a direction is valid
      if (validDirs.length > 1) {
        //if target tile exist
        if (ghost.targetTile !== undefined) {
          const newDir = chooseDirection(
            tileX,
            tileY,
            validDirs,
            ghost.targetTile?.x,
            ghost.targetTile?.y
          );
          ghost.direction = newDir;
        }
      }
    }

    //move the ghost

    const speed = 2;
    ghost.x += DIRS[ghost.direction].x * speed;
    ghost.y += DIRS[ghost.direction].y * speed;
  }
  dispatch(actions.setGCoordinates({ x: ghost.x, y: ghost.y }));
  dispatch(actions.setDirection(ghost.direction));
}
