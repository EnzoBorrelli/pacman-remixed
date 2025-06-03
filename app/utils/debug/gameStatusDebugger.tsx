import { useDispatch, useSelector } from "react-redux";
import { GAME_STATUS } from "~/consts/game";
import { RootState } from "~/store";
import { GameActions } from "~/store/gameSlice";

export default function GameStatusDebugger() {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.game.status);

  function handleStateChange(status: string) {
    dispatch(GameActions.setStatus(status));
  }
  

  return (
    <article className="absolute flex flex-col gap-4 p-4 max-w-[370px] rounded-lg top-[65%] left-10 bg-green-800">
      <h2 className="text-center text-yellow-400 uppercase">Game Status Debugger</h2>
      <h3 className="text-sm">Current status: {status}</h3>
      <ul className="grid grid-cols-2 gap-2 text-xs text-center">
        <li
          onClick={() => handleStateChange(GAME_STATUS.STARTED)}
          className="py-1 bg-green-600 ring-1 ring-green-400 hover:bg-green-300 hover:ring-green-50 hover:text-black hover:cursor-pointer"
        >
          {GAME_STATUS.STARTED}
        </li>
        <li
          onClick={() => handleStateChange(GAME_STATUS.LOSE_LIFE)}
          className="py-1 bg-green-600 ring-1 ring-green-400 hover:bg-green-300 hover:ring-green-50 hover:text-black hover:cursor-pointer"
        >
          {GAME_STATUS.LOSE_LIFE}
        </li>
        <li
          onClick={() => handleStateChange(GAME_STATUS.LEVEL_WON)}
          className="py-1 bg-green-600 ring-1 ring-green-400 hover:bg-green-300 hover:ring-green-50 hover:text-black hover:cursor-pointer"
        >
          {GAME_STATUS.LEVEL_WON}
        </li>
        <li
          onClick={() => handleStateChange(GAME_STATUS.OVER)}
          className="py-1 bg-green-600 ring-1 ring-green-400 hover:bg-green-300 hover:ring-green-50 hover:text-black hover:cursor-pointer"
        >
          {GAME_STATUS.OVER}
        </li>
        <li
          onClick={() => handleStateChange(GAME_STATUS.CONTINUE)}
          className="py-1 bg-green-600 ring-1 ring-green-400 hover:bg-green-300 hover:ring-green-50 hover:text-black hover:cursor-pointer"
        >
          {GAME_STATUS.CONTINUE}
        </li>
        <li
          onClick={() => handleStateChange(GAME_STATUS.CINEMATIC)}
          className="py-1 bg-green-600 ring-1 ring-green-400 hover:bg-green-300 hover:ring-green-50 hover:text-black hover:cursor-pointer"
        >
          {GAME_STATUS.CINEMATIC}
        </li>
      </ul>
    
    </article>
  );
}
