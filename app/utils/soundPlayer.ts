import { Howl } from "howler";

interface iSoundPlayer {
  folder: string;
  audio: string;
  volume?: number;
  loop?: boolean;
  useCache?: boolean;
}

const soundCache: Record<string, Howl> = {};

function PlaySound({
  folder,
  audio,
  volume = 1,
  loop = false,
  useCache = loop, // only looped sounds are cached by default
}: iSoundPlayer): Howl {
  const path = `/assets/sounds/${folder}/${audio}.wav`;

  if (useCache && soundCache[path]) {
    const cachedSound = soundCache[path];
    cachedSound.play();
    return cachedSound;
  }

  const howl = new Howl({
    src: [path],
    volume,
    loop,
    html5: !loop, // html5 = true for short sounds to avoid context conflicts
  });

  if (useCache) soundCache[path] = howl;

  howl.play();
  return howl;
}


function StopAllSounds(){
  Howler.stop();
}

export default { PlaySound, StopAllSounds };