import { setScene } from "~/store/sceneSlice";
import { Scenes } from "../enums/scene";
import SoundPlayer from "../utils/soundPlayer";
import { useDispatch } from "react-redux";

interface iClickBtn {
  scene: Scenes;
  style: string;
  label: string;
  soundData: {
    folder: string;
    audio: string;
  };
}

export default function Button({
  scene,
  soundData,
  style,
  label,
}: iClickBtn) {
  const dispatch = useDispatch();

  const Click = () => {
    dispatch(setScene(scene));
    SoundPlayer.PlaySound({ folder: soundData.folder, audio: soundData.audio });
    console.log(`i clicked: ${scene}`);
  };
  return (
    <button
      onMouseEnter={() => SoundPlayer.PlaySound({ folder: "ui", audio: "hover" })}
      onClick={Click}
      className={style}
    >
      {label}
    </button>
  );
}
