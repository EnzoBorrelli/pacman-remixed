export default function HowToPlay() {
  return (
    <article className="absolute flex flex-col items-center text-center gap-4 p-4 w-[370px] rounded-lg top-30 left-10 ">
      <h2 className="text-2xl font-bold text-yellow-500 text-stroke-3 mb-6">
        How To Play
      </h2>
      <p>Eat all the pellets to complete the level.</p>
      <p>Avoid the ghosts!</p>
      <div className="flex items-center gap-6 mt-10">
        <ul className="grid grid-cols-3 gap-2 text-2xl">
          <li className="opacity-0">.</li>
          <li>W</li>
          <li className="opacity-0">.</li>
          <li>A</li>
          <li>S</li>
          <li>D</li>
        </ul>
        <div className="h-[100px] w-2 bg-white">.</div>
        <ul className="grid grid-cols-3 gap-2 text-2xl">
          <li className="opacity-0">.</li>
          <li>↑</li>
          <li className="opacity-0">.</li>
          <li>←</li>
          <li>↓</li>
          <li>→</li>
        </ul>
      </div>
    </article>
  );
}
