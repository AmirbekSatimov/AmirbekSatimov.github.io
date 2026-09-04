// Generates the "AS" monogram favicon set from a single geometry definition.
// Run with `npm run icons` after changing anything below.
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const APP_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "app");

// --- design ---------------------------------------------------------------
// 64x64 grid. Colours track globals.css: --primary and --primary-foreground.
const SIZE = 64;
const CORNER = 14;
const STROKE = 4.5;
const BG = [0x11, 0x18, 0x27];
const FG = [0xf8, 0xfa, 0xfc];

// Letter centrelines. Stroked with round caps/joins, so these are the spines.
const A_LEFT = "M 9.45 47.5 L 19.95 16.5 L 30.45 47.5";
const A_BAR = "M 12 40 L 27.9 40";

// The S spine is two ellipse bowls joined by a waist. Angles are degrees
// clockwise from the top of the ellipse, so 90 is the right-hand extreme.
const BOWL = { rx: 7.8, ry: 7.75 };
const TOP_BOWL = { cx: 46.75, cy: 24.25, ...BOWL };
const BOT_BOWL = { cx: 46.75, cy: 39.75, ...BOWL };
const TERMINAL = 100; // how far past the extreme the open ends are cut
const WAIST = 8; // vertical pull on the waist control points

const round = (n) => Number(n.toFixed(2));
const onEllipse = ({ cx, cy, rx, ry }, deg) => [
  cx + rx * Math.sin((deg * Math.PI) / 180),
  cy - ry * Math.cos((deg * Math.PI) / 180),
];

function arcCurves(el, deg1, deg2, pieces = 3) {
  const rad = (d) => (d * Math.PI) / 180;
  const tangent = (t) => [el.rx * Math.cos(t), el.ry * Math.sin(t)];
  const out = [];
  for (let i = 0; i < pieces; i++) {
    const t1 = rad(deg1 + ((deg2 - deg1) * i) / pieces);
    const t2 = rad(deg1 + ((deg2 - deg1) * (i + 1)) / pieces);
    const k = (4 / 3) * Math.tan((t2 - t1) / 4);
    const [x0, y0] = onEllipse(el, (t1 * 180) / Math.PI);
    const [x3, y3] = onEllipse(el, (t2 * 180) / Math.PI);
    const [ux, uy] = tangent(t1);
    const [vx, vy] = tangent(t2);
    out.push([x0 + k * ux, y0 + k * uy, x3 - k * vx, y3 - k * vy, x3, y3]);
  }
  return out;
}

const topEnd = onEllipse(TOP_BOWL, -90);
const botStart = onEllipse(BOT_BOWL, 90);
const S = [
  `M ${onEllipse(TOP_BOWL, TERMINAL).map(round).join(" ")}`,
  ...arcCurves(TOP_BOWL, TERMINAL, -90),
  // waist: leaves and enters both bowls vertically, crossing the centre
  [topEnd[0], topEnd[1] + WAIST, botStart[0], botStart[1] - WAIST, ...botStart],
  ...arcCurves(BOT_BOWL, 90, 360 - TERMINAL),
]
  .map((c) => (typeof c === "string" ? c : `C ${c.map(round).join(" ")}`))
  .join(" ");

const PATHS = [A_LEFT, A_BAR, S];

// --- path flattening ------------------------------------------------------
function flatten(d, steps = 48) {
  const tokens = d.match(/[MLC]|-?\d*\.?\d+/g);
  const polylines = [];
  let current = [];
  let cursor = [0, 0];
  let i = 0;
  while (i < tokens.length) {
    const op = tokens[i++];
    const num = () => parseFloat(tokens[i++]);
    if (op === "M") {
      if (current.length) polylines.push(current);
      cursor = [num(), num()];
      current = [cursor];
    } else if (op === "L") {
      cursor = [num(), num()];
      current.push(cursor);
    } else if (op === "C") {
      const [x0, y0] = cursor;
      const x1 = num(), y1 = num(), x2 = num(), y2 = num(), x3 = num(), y3 = num();
      for (let s = 1; s <= steps; s++) {
        const t = s / steps;
        const u = 1 - t;
        current.push([
          u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3,
          u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3,
        ]);
      }
      cursor = [x3, y3];
    }
  }
  if (current.length) polylines.push(current);
  return polylines;
}

const SEGMENTS = PATHS.flatMap((d) => flatten(d)).flatMap((pts) =>
  pts.slice(1).map((p, idx) => [pts[idx][0], pts[idx][1], p[0], p[1]]),
);

// --- coverage tests -------------------------------------------------------
function inTile(x, y) {
  const inner = SIZE / 2 - CORNER;
  const qx = Math.max(Math.abs(x - SIZE / 2) - inner, 0);
  const qy = Math.max(Math.abs(y - SIZE / 2) - inner, 0);
  return qx * qx + qy * qy <= CORNER * CORNER;
}

function inStroke(x, y) {
  const limit = (STROKE / 2) * (STROKE / 2);
  for (const [ax, ay, bx, by] of SEGMENTS) {
    const dx = bx - ax;
    const dy = by - ay;
    const lenSq = dx * dx + dy * dy;
    let t = lenSq === 0 ? 0 : ((x - ax) * dx + (y - ay) * dy) / lenSq;
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    const px = x - (ax + t * dx);
    const py = y - (ay + t * dy);
    if (px * px + py * py <= limit) return true;
  }
  return false;
}

// --- rasteriser -----------------------------------------------------------
function render(px) {
  const SS = 4; // supersampling factor per axis
  const scale = SIZE / px;
  const out = Buffer.alloc(px * px * 4);
  for (let py = 0; py < px; py++) {
    for (let pxi = 0; pxi < px; pxi++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const x = (pxi + (sx + 0.5) / SS) * scale;
          const y = (py + (sy + 0.5) / SS) * scale;
          if (!inTile(x, y)) continue;
          const c = inStroke(x, y) ? FG : BG;
          r += c[0]; g += c[1]; b += c[2]; a += 255;
        }
      }
      const n = SS * SS;
      const o = (py * px + pxi) * 4;
      // un-premultiply so partially covered edge pixels keep their colour
      out[o] = a ? Math.round(r / (a / 255)) : 0;
      out[o + 1] = a ? Math.round(g / (a / 255)) : 0;
      out[o + 2] = a ? Math.round(b / (a / 255)) : 0;
      out[o + 3] = Math.round(a / n);
    }
  }
  return out;
}

// --- PNG encoder ----------------------------------------------------------
const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buf) {
  let c = 0xffffffff;
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePng(rgba, px) {
  const stride = px * 4 + 1;
  const raw = Buffer.alloc(stride * px);
  for (let y = 0; y < px; y++) {
    raw[y * stride] = 0; // filter: none
    rgba.copy(raw, y * stride + 1, y * px * 4, (y + 1) * px * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(px, 0);
  ihdr.writeUInt32BE(px, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // colour type RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// --- ICO container --------------------------------------------------------
function encodeIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = 6 + pngs.length * 16;
  const entries = pngs.map(({ px, data }) => {
    const e = Buffer.alloc(16);
    e[0] = px >= 256 ? 0 : px;
    e[1] = px >= 256 ? 0 : px;
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

// --- emit -----------------------------------------------------------------
const rgb = (c) => `#${c.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" rx="${CORNER}" fill="${rgb(BG)}"/>
  <g fill="none" stroke="${rgb(FG)}" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round">
${PATHS.map((d) => `    <path d="${d}"/>`).join("\n")}
  </g>
</svg>
`;

mkdirSync(APP_DIR, { recursive: true });
writeFileSync(join(APP_DIR, "icon.svg"), svg);
writeFileSync(join(APP_DIR, "apple-icon.png"), encodePng(render(180), 180));
writeFileSync(
  join(APP_DIR, "favicon.ico"),
  encodeIco([16, 32, 48].map((px) => ({ px, data: encodePng(render(px), px) }))),
);
console.log("wrote icon.svg, apple-icon.png, favicon.ico");
