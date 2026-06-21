type ProjectVisualProps = {
  seed: string;
  aspect?: string;
  className?: string;
  variant?: number;
};

// Deterministic 0..1 pseudo-random stream from a string seed.
function makeRng(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A quiet, architectural abstraction: layered horizon, sky wash, and an
// orthographic massing of stacked volumes. Deterministic per seed so every
// project keeps a stable identity without needing real photography yet.
export default function ProjectVisual({
  seed,
  aspect = "aspect-[4/3]",
  className = "",
  variant = 0,
}: ProjectVisualProps) {
  const rng = makeRng(seed + ":" + variant);
  const W = 800;
  const H = 600;

  const horizon = 360 + Math.floor(rng() * 60);
  const hue = 18 + Math.floor(rng() * 14); // warm stone range
  const sky1 = `hsl(${hue} 24% 92%)`;
  const sky2 = `hsl(${hue} 20% 84%)`;
  const ground = `hsl(${hue} 14% 78%)`;

  // Build 3–5 stacked rectangular volumes sitting on the horizon.
  const count = 3 + Math.floor(rng() * 3);
  const volumes: {
    x: number;
    y: number;
    w: number;
    h: number;
    tone: string;
  }[] = [];
  let cursorX = 90 + rng() * 60;
  for (let i = 0; i < count; i++) {
    const w = 90 + rng() * 150;
    const h = 110 + rng() * 230;
    const y = horizon - h;
    const tone = `hsl(${hue} ${10 + rng() * 8}% ${30 + rng() * 30}%)`;
    volumes.push({ x: cursorX, y, w, h, tone });
    cursorX += w * (0.55 + rng() * 0.3);
    if (cursorX > W - 120) break;
  }

  const sunX = 120 + rng() * (W - 240);
  const sunY = 90 + rng() * 120;

  return (
    <div className={`${aspect} ${className} overflow-hidden bg-neutral-100 dark:bg-neutral-900`}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        role="img"
        aria-label={`Abstract architectural study for ${seed}`}
      >
        <defs>
          <linearGradient id={`sky-${seed}-${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={sky1} />
            <stop offset="100%" stopColor={sky2} />
          </linearGradient>
        </defs>

        <rect width={W} height={H} fill={`url(#sky-${seed}-${variant})`} />
        <circle cx={sunX} cy={sunY} r={34} fill="#ffffff" opacity={0.65} />

        {/* distant massing, lightened for depth */}
        {volumes.map((v, i) => (
          <rect
            key={`bg-${i}`}
            x={v.x + 26}
            y={v.y + 30}
            width={v.w}
            height={v.h}
            fill={ground}
            opacity={0.5}
          />
        ))}

        {/* primary volumes */}
        {volumes.map((v, i) => (
          <g key={`v-${i}`}>
            <rect x={v.x} y={v.y} width={v.w} height={v.h} fill={v.tone} />
            {/* a single recessed window band */}
            <rect
              x={v.x + v.w * 0.16}
              y={v.y + v.h * 0.18}
              width={v.w * 0.68}
              height={Math.min(36, v.h * 0.12)}
              fill="#ffffff"
              opacity={0.22}
            />
          </g>
        ))}

        {/* ground plane */}
        <rect x={0} y={horizon} width={W} height={H - horizon} fill={ground} />
        <line
          x1={0}
          y1={horizon}
          x2={W}
          y2={horizon}
          stroke="#000"
          strokeOpacity={0.18}
          strokeWidth={1.5}
        />
      </svg>
    </div>
  );
}
