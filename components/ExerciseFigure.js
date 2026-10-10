"use client";

import { motion } from "framer-motion";

// Анимированный схематичный человек, который показывает технику упражнения.
// Поза — набор точек: h (голова), n (шея), p (таз), eN/hN и eF/hF (локоть/кисть
// ближней и дальней руки), kN/fN и kF/fF (колено/стопа ближней и дальней ноги).
// Кадры поз проигрываются по кругу.

const STAND = {
  h: [120, 44], n: [120, 60], p: [120, 108],
  eF: [118, 84], hF: [117, 108], eN: [122, 84], hN: [124, 108],
  kF: [118, 143], fF: [116, 178], kN: [122, 143], fN: [126, 178],
};
const FRONT = {
  h: [120, 40], n: [120, 56], p: [120, 106],
  eF: [104, 78], hF: [98, 102], eN: [136, 78], hN: [142, 102],
  kF: [112, 142], fF: [110, 178], kN: [128, 142], fN: [130, 178],
};
const PLANK_HIGH = {
  h: [180, 122], n: [166, 130], p: [108, 153],
  eN: [168, 154], hN: [170, 178], eF: [163, 155], hF: [165, 178],
  kN: [76, 166], fN: [44, 178], kF: [76, 168], fF: [44, 179],
};
const SQUAT_HANDS = {
  h: [152, 100], n: [138, 110], p: [108, 140],
  eN: [150, 140], hN: [154, 178], eF: [146, 142], hF: [150, 178],
  kN: [136, 150], fN: [118, 178], kF: [132, 152], fF: [114, 178],
};
const STANCE = {
  h: [118, 44], n: [118, 60], p: [116, 108],
  eN: [132, 84], hN: [142, 62], eF: [126, 86], hF: [136, 66],
  kN: [134, 142], fN: [142, 178], kF: [104, 144], fF: [94, 178],
};
const shiftY = (pose, dy) => Object.fromEntries(Object.entries(pose).map(([k, [x, y]]) => [k, [x, y + dy]]));

export const MOVES = {
  warmup: {
    duration: 3.2,
    frames: [
      { ...FRONT, eF: [96, 58], hF: [72, 58], eN: [144, 58], hN: [168, 58] },
      { ...FRONT, eF: [104, 36], hF: [98, 14], eN: [136, 36], hN: [142, 14] },
      { ...FRONT, eF: [96, 58], hF: [72, 58], eN: [144, 58], hN: [168, 58] },
      FRONT,
    ],
  },
  pushup: {
    duration: 2.4,
    frames: [
      PLANK_HIGH,
      { ...PLANK_HIGH, h: [181, 148], n: [166, 152], p: [108, 163], eN: [146, 152], eF: [142, 154], kN: [76, 170], kF: [76, 171] },
    ],
  },
  knee_pushup: {
    duration: 2.4,
    frames: [
      { ...PLANK_HIGH, p: [110, 156], kN: [86, 178], fN: [58, 164], kF: [84, 178], fF: [56, 165] },
      { ...PLANK_HIGH, h: [181, 148], n: [166, 152], p: [112, 165], eN: [146, 152], eF: [142, 154], kN: [86, 178], fN: [58, 164], kF: [84, 178], fF: [56, 165] },
    ],
  },
  squat: {
    duration: 2.6,
    frames: [
      { h: [120, 40], n: [120, 56], p: [118, 106], eN: [146, 60], hN: [172, 60], eF: [142, 62], hF: [168, 62], kN: [122, 142], fN: [122, 178], kF: [118, 142], fF: [116, 178] },
      { h: [124, 76], n: [118, 90], p: [90, 134], eN: [144, 92], hN: [170, 92], eF: [140, 94], hF: [166, 94], kN: [132, 140], fN: [122, 178], kF: [128, 142], fF: [116, 178] },
    ],
  },
  plank: {
    duration: 3,
    frames: [
      { h: [178, 132], n: [164, 140], p: [106, 156], eN: [166, 178], hN: [194, 178], eF: [162, 178], hF: [190, 178], kN: [74, 167], fN: [42, 178], kF: [72, 168], fF: [40, 178] },
      { h: [178, 131], n: [164, 139], p: [106, 152], eN: [166, 178], hN: [194, 178], eF: [162, 178], hF: [190, 178], kN: [74, 166], fN: [42, 178], kF: [72, 167], fF: [40, 178] },
    ],
  },
  lunge: {
    duration: 2.8,
    frames: [
      STAND,
      { h: [118, 62], n: [118, 78], p: [116, 128], eN: [124, 104], hN: [126, 128], eF: [114, 104], hF: [112, 128], kN: [150, 146], fN: [152, 178], kF: [98, 172], fF: [72, 176] },
    ],
  },
  jumping_jack: {
    duration: 1.2,
    frames: [
      FRONT,
      { h: [120, 34], n: [120, 50], p: [120, 100], eF: [100, 34], hF: [92, 12], eN: [140, 34], hN: [148, 12], kF: [104, 136], fF: [92, 172], kN: [136, 136], fN: [148, 172] },
    ],
  },
  crunch: {
    duration: 2.2,
    frames: [
      { h: [44, 166], n: [58, 170], p: [110, 172], kN: [134, 140], fN: [156, 178], kF: [130, 142], fF: [152, 178], eN: [52, 152], hN: [46, 162], eF: [50, 154], hF: [44, 164] },
      { h: [60, 138], n: [72, 150], p: [110, 172], kN: [134, 140], fN: [156, 178], kF: [130, 142], fF: [152, 178], eN: [68, 128], hN: [60, 140], eF: [66, 130], hF: [58, 142] },
    ],
  },
  glute_bridge: {
    duration: 2.4,
    frames: [
      { h: [44, 170], n: [58, 172], p: [108, 174], kN: [140, 140], fN: [156, 178], kF: [136, 142], fF: [152, 178], eN: [80, 178], hN: [100, 178], eF: [78, 178], hF: [98, 178] },
      { h: [44, 170], n: [60, 170], p: [112, 140], kN: [144, 132], fN: [156, 178], kF: [140, 134], fF: [152, 178], eN: [80, 178], hN: [100, 178], eF: [78, 178], hF: [98, 178] },
    ],
  },
  burpee: {
    duration: 3.6,
    frames: [
      STAND,
      SQUAT_HANDS,
      PLANK_HIGH,
      SQUAT_HANDS,
      { h: [120, 30], n: [120, 46], p: [120, 96], eN: [126, 24], hN: [130, 4], eF: [116, 24], hF: [112, 4], kN: [124, 132], fN: [126, 166], kF: [116, 132], fF: [114, 166] },
    ],
  },
  jump_rope: {
    duration: 0.9,
    rope: true,
    frames: [
      { ...FRONT, eF: [104, 84], hF: [94, 104], eN: [136, 84], hN: [146, 104], rope: 196 },
      { ...shiftY({ ...FRONT, eF: [104, 84], hF: [94, 104], eN: [136, 84], hN: [146, 104] }, -10), rope: -24 },
    ],
  },
  jab: {
    duration: 1.4,
    frames: [STANCE, { ...STANCE, h: [122, 44], n: [121, 60], eN: [148, 62], hN: [174, 58] }],
  },
  run: {
    duration: 0.9,
    frames: [
      { h: [124, 42], n: [122, 58], p: [118, 108], kN: [140, 96], fN: [134, 128], kF: [116, 144], fF: [112, 178], eN: [104, 80], hN: [110, 100], eF: [134, 82], hF: [146, 68] },
      { h: [124, 42], n: [122, 58], p: [118, 108], kN: [118, 144], fN: [114, 178], kF: [140, 96], fF: [134, 128], eN: [134, 82], hN: [146, 68], eF: [104, 80], hF: [110, 100] },
    ],
  },
  stretch: {
    duration: 3.4,
    frames: [
      { ...STAND, eN: [122, 34], hN: [124, 10], eF: [118, 34], hF: [116, 10] },
      { h: [168, 140], n: [156, 124], p: [116, 108], eN: [150, 150], hN: [134, 176], eF: [146, 152], hF: [130, 176], kN: [120, 143], fN: [122, 178], kF: [116, 143], fF: [116, 178] },
    ],
  },
  swim: {
    duration: 1.6,
    water: true,
    frames: [
      { h: [168, 102], n: [152, 104], p: [96, 108], eN: [180, 102], hN: [206, 102], eF: [150, 124], hF: [142, 146], kN: [62, 110], fN: [30, 112], kF: [62, 114], fF: [30, 120] },
      { h: [168, 102], n: [152, 104], p: [96, 108], eN: [150, 124], hN: [142, 146], eF: [180, 104], hF: [206, 104], kN: [62, 114], fN: [30, 120], kF: [62, 110], fF: [30, 112] },
    ],
  },
  shot: {
    duration: 1.8,
    ball: true,
    frames: [
      { h: [120, 58], n: [120, 74], p: [118, 120], kN: [130, 148], fN: [122, 178], kF: [126, 150], fF: [116, 178], eN: [138, 96], hN: [140, 74], eF: [132, 98], hF: [136, 76], ball: [142, 62] },
      { h: [120, 30], n: [120, 46], p: [120, 96], kN: [124, 132], fN: [124, 166], kF: [118, 132], fF: [116, 166], eN: [128, 22], hN: [140, 8], eF: [124, 24], hF: [136, 10], ball: [176, 10] },
    ],
  },
  dribble: {
    duration: 0.7,
    ball: true,
    frames: [
      { h: [124, 50], n: [122, 66], p: [118, 114], kN: [132, 146], fN: [130, 178], kF: [112, 146], fF: [108, 178], eF: [110, 90], hF: [116, 108], eN: [140, 96], hN: [150, 120], ball: [152, 132] },
      { h: [124, 50], n: [122, 66], p: [118, 114], kN: [132, 146], fN: [130, 178], kF: [112, 146], fF: [108, 178], eF: [110, 90], hF: [116, 108], eN: [140, 100], hN: [150, 128], ball: [152, 170] },
    ],
  },
  kick: {
    duration: 1.6,
    ball: true,
    frames: [
      { ...STAND, kN: [108, 146], fN: [86, 162], eF: [104, 80], hF: [92, 96], eN: [134, 80], hN: [146, 94], ball: [156, 172] },
      { ...STAND, kN: [146, 128], fN: [176, 132], eF: [134, 80], hF: [146, 94], eN: [104, 80], hN: [92, 96], ball: [204, 140] },
    ],
  },
  juggle: {
    duration: 1.1,
    ball: true,
    frames: [
      { ...STAND, kN: [140, 124], fN: [148, 150], ball: [152, 138] },
      { ...STAND, ball: [152, 90] },
    ],
  },
  bump: {
    duration: 1.6,
    ball: true,
    frames: [
      { h: [126, 58], n: [124, 74], p: [114, 118], kN: [138, 146], fN: [132, 178], kF: [134, 148], fF: [126, 178], eN: [144, 104], hN: [162, 118], eF: [142, 106], hF: [160, 120], ball: [176, 64] },
      { h: [122, 46], n: [122, 62], p: [116, 110], kN: [130, 144], fN: [130, 178], kF: [124, 144], fF: [122, 178], eN: [146, 86], hN: [168, 90], eF: [144, 88], hF: [166, 92], ball: [172, 78] },
    ],
  },
  swing: {
    duration: 1.6,
    racket: true,
    frames: [
      { ...STANCE, eN: [100, 76], hN: [80, 84], eF: [132, 80], hF: [146, 70] },
      { ...STANCE, eN: [140, 70], hN: [166, 62], eF: [112, 82], hF: [104, 96] },
    ],
  },
  superman: {
    duration: 2.6,
    frames: [
      { h: [172, 172], n: [158, 174], p: [104, 176], eN: [180, 176], hN: [204, 176], eF: [178, 177], hF: [202, 177], kN: [72, 176], fN: [40, 176], kF: [72, 177], fF: [40, 177] },
      { h: [172, 158], n: [156, 166], p: [104, 176], eN: [182, 158], hN: [206, 150], eF: [180, 160], hF: [204, 152], kN: [72, 172], fN: [40, 162], kF: [72, 173], fF: [40, 164] },
    ],
  },
  mountain_climber: {
    duration: 0.9,
    frames: [
      { ...PLANK_HIGH, kN: [132, 150], fN: [122, 172] },
      { ...PLANK_HIGH, kF: [132, 150], fF: [122, 172] },
    ],
  },
  cycle: {
    duration: 1,
    bike: true,
    frames: [
      { h: [150, 54], n: [138, 68], p: [112, 110], eN: [160, 84], hN: [176, 92], eF: [156, 86], hF: [172, 94], kN: [142, 118], fN: [138, 150], kF: [124, 132], fF: [110, 150] },
      { h: [150, 54], n: [138, 68], p: [112, 110], eN: [160, 84], hN: [176, 92], eF: [156, 86], hF: [172, 94], kN: [146, 106], fN: [124, 136], kF: [128, 140], fF: [124, 164] },
      { h: [150, 54], n: [138, 68], p: [112, 110], eN: [160, 84], hN: [176, 92], eF: [156, 86], hF: [172, 94], kN: [124, 132], fN: [110, 150], kF: [142, 118], fF: [138, 150] },
      { h: [150, 54], n: [138, 68], p: [112, 110], eN: [160, 84], hN: [176, 92], eF: [156, 86], hF: [172, 94], kN: [128, 140], fN: [124, 164], kF: [146, 106], fF: [124, 136] },
    ],
  },
  high_kick: {
    duration: 1.5,
    frames: [
      STANCE,
      { h: [100, 46], n: [104, 62], p: [112, 110], eN: [118, 86], hN: [126, 66], eF: [96, 80], hF: [84, 96], kN: [146, 98], fN: [184, 78], kF: [108, 144], fF: [104, 178] },
    ],
  },
  deadlift: {
    duration: 2.8,
    barbell: true,
    frames: [
      { h: [152, 84], n: [140, 94], p: [104, 120], kN: [132, 142], fN: [122, 178], kF: [128, 144], fF: [118, 178], eN: [140, 130], hN: [138, 164], eF: [136, 132], hF: [134, 166] },
      { h: [122, 40], n: [120, 56], p: [116, 106], kN: [120, 142], fN: [122, 178], kF: [116, 142], fF: [118, 178], eN: [124, 82], hN: [126, 106], eF: [120, 82], hF: [122, 108] },
    ],
  },
  pullup: {
    duration: 2.4,
    bar: true,
    frames: [
      { h: [120, 60], n: [120, 76], p: [120, 124], eF: [104, 50], hF: [100, 24], eN: [136, 50], hN: [140, 24], kF: [114, 150], fF: [114, 176], kN: [126, 150], fN: [126, 176] },
      { h: [120, 12], n: [120, 30], p: [120, 78], eF: [92, 36], hF: [100, 24], eN: [148, 36], hN: [140, 24], kF: [114, 106], fF: [114, 132], kN: [126, 106], fN: [126, 132] },
    ],
  },
  takedown: {
    duration: 1.8,
    frames: [
      STANCE,
      { h: [166, 104], n: [150, 112], p: [110, 138], kN: [146, 150], fN: [150, 178], kF: [96, 176], fF: [70, 178], eN: [174, 122], hN: [196, 130], eF: [170, 124], hF: [192, 134] },
    ],
  },
};

const BONES = [
  ["n", "eF"], ["eF", "hF"], ["p", "kF"], ["kF", "fF"], // дальние конечности
  ["n", "p"],
  ["n", "eN"], ["eN", "hN"], ["p", "kN"], ["kN", "fN"], // ближние конечности
];
const FAR = new Set(["eF", "hF", "kF", "fF"]);

export default function ExerciseFigure({ move = "warmup", className = "" }) {
  const m = MOVES[move] ?? MOVES.warmup;
  const frames = m.frames.length === 2 ? [m.frames[0], m.frames[1], m.frames[0]] : [...m.frames, m.frames[0]];
  const track = (key, i) => frames.map((f) => (f[key] ?? STAND[key])[i]);
  const transition = { duration: m.duration, repeat: Infinity, ease: "easeInOut", times: frames.map((_, i) => i / (frames.length - 1)) };

  return (
    <svg viewBox="0 0 240 200" className={className} role="img">
      <defs>
        <filter id="fig-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="fig-floor" x1="0" x2="1">
          <stop offset="0" stopColor="#18f5b5" stopOpacity="0" />
          <stop offset=".5" stopColor="#18f5b5" stopOpacity=".5" />
          <stop offset="1" stopColor="#18f5b5" stopOpacity="0" />
        </linearGradient>
      </defs>

      {m.water ? (
        <g stroke="#3de0ff" strokeOpacity=".45" strokeWidth="2" fill="none">
          <path d="M0 100 q15 -6 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" />
          <path d="M0 150 q15 -6 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" strokeOpacity=".2" />
        </g>
      ) : (
        <line x1="10" y1="182" x2="230" y2="182" stroke="url(#fig-floor)" strokeWidth="2" />
      )}

      {m.bike && (
        <g stroke="#7e9296" strokeWidth="3" fill="none" strokeLinecap="round">
          <circle cx="66" cy="156" r="24" />
          <circle cx="190" cy="156" r="24" />
          <path d="M66 156 L124 150 L190 156 M124 150 L108 112 M124 150 L176 98 M100 110 L118 110 M170 92 L184 96" />
          <circle cx="124" cy="150" r="14" strokeOpacity=".4" />
        </g>
      )}

      {m.bar && (
        <g stroke="#7e9296" strokeLinecap="round">
          <line x1="60" y1="22" x2="180" y2="22" strokeWidth="5" />
          <line x1="64" y1="22" x2="64" y2="0" strokeWidth="3" />
          <line x1="176" y1="22" x2="176" y2="0" strokeWidth="3" />
        </g>
      )}

      {m.rope && (
        <motion.path
          fill="none"
          stroke="#ff8a3d"
          strokeWidth="2.5"
          animate={{ d: frames.map((f) => `M ${f.hF[0]} ${f.hF[1]} Q 120 ${f.rope} ${f.hN[0]} ${f.hN[1]}`) }}
          transition={transition}
        />
      )}

      <g strokeLinecap="round" filter="url(#fig-glow)">
        {BONES.map(([a, b]) => (
          <motion.line
            key={a + b}
            stroke={FAR.has(b) ? "#0f8f6c" : "#29ffc3"}
            strokeWidth={a === "n" && b === "p" ? 9 : 7}
            animate={{ x1: track(a, 0), y1: track(a, 1), x2: track(b, 0), y2: track(b, 1) }}
            transition={transition}
          />
        ))}
        <motion.circle r="11" fill="#29ffc3" animate={{ cx: track("h", 0), cy: track("h", 1) }} transition={transition} />
      </g>

      {m.racket && (
        <motion.g animate={{ x: track("hN", 0), y: track("hN", 1) }} transition={transition}>
          <line x1="0" y1="0" x2="10" y2="-16" stroke="#d9e4e5" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="15" cy="-27" rx="9" ry="12" fill="none" stroke="#d9e4e5" strokeWidth="3" transform="rotate(25 15 -27)" />
        </motion.g>
      )}

      {m.barbell && (
        <motion.g animate={{ x: track("hN", 0), y: track("hN", 1) }} transition={transition}>
          <line x1="-34" y1="0" x2="34" y2="0" stroke="#d9e4e5" strokeWidth="4" strokeLinecap="round" />
          <circle cx="-30" cy="0" r="17" fill="#0f3a35" stroke="#18f5b5" strokeWidth="3" />
          <circle cx="30" cy="0" r="17" fill="#0f3a35" stroke="#18f5b5" strokeWidth="3" />
        </motion.g>
      )}

      {m.ball && (
        <motion.circle r="9" fill="#ff8a3d" stroke="#03090b" strokeWidth="2" animate={{ cx: track("ball", 0), cy: track("ball", 1) }} transition={transition} />
      )}
    </svg>
  );
}
