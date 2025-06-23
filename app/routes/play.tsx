import Game from "~/components/game";
import HowToPlay from "~/ui/level_ui/howToPlay";
import UIBottom from "~/ui/level_ui/ui_bottom";
import UITop from "~/ui/level_ui/ui_top";
import Debuggers from "~/utils/debuggers";

export default function Play() {
  return (
    <main className="relative flex flex-col items-center justify-center h-screen text-white bg-slate-950">
      <UITop />
      <Game />
      <UIBottom />
      <HowToPlay />
      <Debuggers debugMode={false} />
    </main>
  );
}
