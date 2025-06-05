import { Howl } from "howler";

interface iSoundPlayer {
  folder: string;
  audio: string;
  volume?: number;
  loop?: boolean;
  useCache?: boolean;
}

const soundCache: Record<string, Howl> = {};

function PreloadSound({ folder, audio }: { folder: string; audio: string }) {
  const path = `/assets/sounds/${folder}/${audio}.wav`;
  if (!soundCache[path]) {
    soundCache[path] = new Howl({
      src: [path],
      preload: true,
    });
  }
}

function PlaySound({
  folder,
  audio,
  volume = 0.3,//return to 1 later
  loop = false,
  useCache = loop, // only looped sounds are cached by default
}: iSoundPlayer): Howl {
  const path = `/assets/sounds/${folder}/${audio}.wav`;

  if (useCache && soundCache[path]) {
    const cachedSound = soundCache[path];
    cachedSound.loop(loop)
    cachedSound.volume(volume)
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

export default { PreloadSound,PlaySound, StopAllSounds };