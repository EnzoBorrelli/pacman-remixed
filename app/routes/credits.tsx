import { useLocation } from "@remix-run/react";
import { useEffect } from "react";
import UITop from "~/ui/level_ui/ui_top";
import soundPlayer from "~/utils/soundPlayer";

export default function Credits() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/credits") {
      soundPlayer.PlaySound({
        folder: "ui",
        audio: "credits",
        volume: 0.2,
      });
    }
  }, [location.pathname]);
  return (
    <main className="relative flex flex-col items-center justify-between h-screen py-2 text-white bg-slate-950">
      <UITop />
      <h2 className="m-4 text-2xl font-bold text-yellow-500">CREDITS</h2>
      <article className="grid justify-center grid-cols-2 gap-4 px-4">
        <section className="flex flex-col items-center gap-2">
          <h3 className="">Game Concept & Development</h3>
          <ul className="text-xs max-w-[400px] text-slate-400 ml-12">
            <li>
              <a
                className="text-teal-500 hover:text-yellow-600"
                href="https://endykaishi-web.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                Endy Kaishi®
              </a>{" "}
              - Programming, design, and pixel-perfect determination
            </li>
          </ul>
        </section>
        <section className="flex flex-col items-center gap-2">
          <h3>Frameworks & libraries</h3>
          <ul className="flex flex-col text-xs max-w-[400px] text-slate-400 gap-1">
            <li>
              {" "}
              <a
                className="text-sky-500 hover:text-yellow-600"
                href="https://pixijs.com/"
                target="_blank"
                rel="noreferrer"
              >
                PixiJS
              </a>{" "}
              - Rendering Engine
            </li>
            <li>
              <a
                className="text-sky-500 hover:text-yellow-600"
                href="https://remix.run/"
                target="_blank"
                rel="noreferrer"
              >
                Remix
              </a>{" "}
              - UI framework
            </li>
            <li>
              <a
                className="text-sky-500 hover:text-yellow-600"
                href="https://redux-toolkit.js.org/"
                target="_blank"
                rel="noreferrer"
              >
                Redux Toolkit
              </a>{" "}
              - State Management
            </li>
            <li>
              <a
                className="text-sky-500 hover:text-yellow-600"
                href="https://howlerjs.com/"
                target="_blank"
                rel="noreferrer"
              >
                Howler.js
              </a>{" "}
              - Audio Library
            </li>
          </ul>
        </section>
        <section className="flex flex-col items-center gap-2">
          <h3>Sounds & Assets</h3>
          <ul className="flex flex-col text-xs max-w-[400px] text-slate-400 gap-1">
            <li>
              <a
                className="text-sky-500 hover:text-yellow-600"
                href="https://www.sounds-resource.com/arcade/pacman/sound/10603/"
                target="_blank"
                rel="noreferrer"
              >
                Pacman original sounds
              </a>{" "}
              - by The sounds resource
            </li>
            <li>
              <a
                className="text-sky-500 hover:text-yellow-600"
                href="https://pixabay.com/sound-effects/search/8-bit/"
                target="_blank"
                rel="noreferrer"
              >
                8-bit UI sounds
              </a>{" "}
              - by Pixabay
            </li>
            <li>
              <a
                className="text-sky-500 hover:text-yellow-600"
                href="https://www.spriters-resource.com/arcade/pacman/"
                target="_blank"
                rel="noreferrer"
              >
                Pacman original sprites as reference
              </a>{" "}
              - by the spriters resource
            </li>
            <li>
              <span className="text-rose-400">32x32 sprites</span> - by Endy Kaishi®
            </li>
          </ul>
        </section>
        <section className="flex flex-col items-center gap-2">
          <h3>Special thanks</h3>
          <ul className="flex flex-col text-xs max-w-[400px] text-slate-400 gap-1 ml-12">
            <li>
              <span className="text-rose-400">Family & Friends</span> - for
              their unwavering support
            </li>
            <li>
              <span className="text-rose-400">ChatGPT by OpenAI</span> - for
              their assistance in development
            </li>
            <li>
              <a
                className="text-sky-500 hover:text-yellow-600"
                href="https://www.youtube.com/watch?v=HC6UdQPHw2E&t=2590s"
                target="_blank"
                rel="noreferrer"
              >
                VNNCK PIXI + REACT COURSE
              </a>{" "}
              - for the valuable insights and guidance
            </li>
            <li>
              {" "}
              <span className=" text-rose-400">YOU</span> - for playing and
              enjoying the game
            </li>
          </ul>
        </section>
      </article>
      <h2 className="mt-6 mb-4 text-2xl font-bold text-yellow-500">
        DISCLAIMER
      </h2>
      <p className="px-4 text-xs text-center text-slate-300">
        This game is a fan-made project created for educational and
        non-commercial purposes. Pac-Man and related characters, names, and
        concepts are trademarks and intellectual property of{" "}
        <a
          className="text-sky-400 hover:text-yellow-600"
          href="https://www.namco.co.jp/"
          target="_blank"
          rel="noreferrer"
        >
          Bandai Namco Entertainment Inc.
        </a>{" "}
        This project is not affiliated with, endorsed by, or sponsored by Bandai
        Namco. All rights to the original Pac-Man game and its assets belong to
        their respective owners.
      </p>
    </main>
  );
}
