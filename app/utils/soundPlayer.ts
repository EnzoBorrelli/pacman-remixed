import { Howl, Howler } from "howler";

interface iSoundPlayer {
  folder: string;
  audio: string;
  volume?: number;
  loop?: boolean;
  useCache?: boolean;
}

const soundCache: Record<string, Howl> = {};
const activeSounds: Record<string, number> = {}; // path -> soundId

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
  volume = 0.3,
  loop = false,
  useCache = loop,
}: iSoundPlayer): Howl {
  const path = `/assets/sounds/${folder}/${audio}.wav`;

  let sound: Howl;

  if (useCache && soundCache[path]) {
    sound = soundCache[path];
    sound.loop(loop);
    sound.volume(volume);
  } else {
    sound = new Howl({
      src: [path],
      volume,
      loop,
      html5: !loop,
    });
    if (useCache) soundCache[path] = sound;
  }

  const soundId = sound.play();
  activeSounds[path] = soundId;

  return sound;
}

// 🆕 Stops a specific sound (if playing)
function StopSound(folder: string, audio: string) {
  const path = `/assets/sounds/${folder}/${audio}.wav`;
  const sound = soundCache[path];
  const soundId = activeSounds[path];

  if (sound && soundId !== undefined) {
    sound.stop(soundId);
    delete activeSounds[path];
  }
}

function StopAllSounds() {
  Howler.stop();
}

export default { PreloadSound, PlaySound, StopSound, StopAllSounds };
