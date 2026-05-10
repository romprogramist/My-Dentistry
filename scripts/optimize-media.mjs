#!/usr/bin/env node
// Idempotent media converter: HEIC/JPG -> WebP, MOV -> MP4 + WebM + WebP poster.
// Reads from process.env.MEDIA_SRC or the hardcoded SRC_ROOT below.
// Writes into public/media/ relative to repo root.
// Re-runs only when source mtime > target mtime.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync, unlinkSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const SRC_ROOT = process.env.MEDIA_SRC ?? "C:\\Users\\Roman\\Desktop\\My-Dentistry";
const DST_ROOT = join(REPO_ROOT, "public", "media");

function findExe(globRoot, fileName) {
  if (!existsSync(globRoot)) return null;
  const stack = [globRoot];
  while (stack.length) {
    const dir = stack.pop();
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of entries) {
      const full = join(dir, e.name);
      if (e.isDirectory()) stack.push(full);
      else if (e.isFile() && e.name.toLowerCase() === fileName.toLowerCase()) return full;
    }
  }
  return null;
}

function locateMagick() {
  const pf = "C:\\Program Files";
  if (existsSync(pf)) {
    for (const d of readdirSync(pf)) {
      if (d.startsWith("ImageMagick-")) {
        const candidate = join(pf, d, "magick.exe");
        if (existsSync(candidate)) return candidate;
      }
    }
  }
  return "magick";
}

function locateFfmpeg() {
  const wingetRoot = join(process.env.LOCALAPPDATA ?? "", "Microsoft", "WinGet", "Packages");
  const found = findExe(wingetRoot, "ffmpeg.exe");
  return found ?? "ffmpeg";
}

const MAGICK = locateMagick();
const FFMPEG = locateFfmpeg();

console.log(`magick: ${MAGICK}`);
console.log(`ffmpeg: ${FFMPEG}`);
console.log(`source: ${SRC_ROOT}`);
console.log(`dest:   ${DST_ROOT}`);
console.log("");

const PHOTOS = [
  { src: "photo/IMG_1474.HEIC", dst: "clinic/reception-detail.webp", width: 1600, q: 80 },
  { src: "photo/IMG_1475.HEIC", dst: "clinic/reception-wide.webp", width: 1600, q: 80 },
  { src: "photo/IMG_1378.HEIC", dst: "clinic/doctor-at-work-1.webp", width: 1200, q: 80 },
  { src: "photo/IMG_1379.HEIC", dst: "clinic/doctor-at-work-2.webp", width: 1200, q: 80 },
  { src: "photo/IMG_1702.HEIC", dst: "procedures/implant-1.webp", width: 1200, q: 80 },
  { src: "photo/IMG_1703.HEIC", dst: "procedures/implant-2.webp", width: 1200, q: 80 },
  { src: "photo/IMG_1704.HEIC", dst: "procedures/implant-3.webp", width: 1200, q: 80 },
  { src: "photo/FullSizeRender.jpg", dst: "stock/smile-cosmetic.webp", width: 1200, q: 80 },
  { src: "photo/IMG_0714.JPG", dst: "stock/smile-after.webp", width: 1200, q: 80 },
  { src: "photo/IMG_0646.JPG", dst: "stock/veneer-application.webp", width: 1200, q: 80 },
  { src: "photo/IMG_0647.JPG", dst: "stock/veneer-pieces.webp", width: 1200, q: 80 },
];

const VIDEOS = [
  { src: "video/IMG_0773.MOV", base: "video/microscope", width: 1080 },
  { src: "video/IMG_1697.MOV", base: "video/implant", width: 720 },
  { src: "video/IMG_1698.MOV", base: "video/khechoyan", width: 720 },
  { src: "video/IMG_1710.MOV", base: "video/clinic-tour", width: 720 },
  { src: "video/IMG_1711.MOV", base: "video/treatment", width: 720 },
];

function ensureDir(filePath) {
  mkdirSync(dirname(filePath), { recursive: true });
}

function isStale(srcPath, dstPath) {
  if (!existsSync(dstPath)) return true;
  return statSync(srcPath).mtimeMs > statSync(dstPath).mtimeMs;
}

function run(exe, args, label) {
  process.stdout.write(`  ${label}... `);
  try {
    execFileSync(exe, args, { stdio: ["ignore", "pipe", "pipe"] });
    process.stdout.write("ok\n");
  } catch (e) {
    process.stdout.write("FAIL\n");
    console.error(e.stderr?.toString() ?? e.message);
    process.exit(1);
  }
}

function convertPhoto({ src, dst, width, q }) {
  const srcPath = join(SRC_ROOT, src);
  const dstPath = join(DST_ROOT, dst);
  if (!existsSync(srcPath)) {
    console.log(`SKIP ${src} (source missing)`);
    return { skipped: true, before: 0, after: 0 };
  }
  ensureDir(dstPath);
  const before = statSync(srcPath).size;
  if (!isStale(srcPath, dstPath)) {
    console.log(`skip ${dst} (up to date)`);
    return { skipped: true, before, after: statSync(dstPath).size };
  }
  console.log(`PHOTO ${src} -> ${dst}`);
  run(MAGICK, [srcPath, "-auto-orient", "-resize", `${width}x>`, "-quality", String(q), dstPath], "magick");
  return { skipped: false, before, after: statSync(dstPath).size };
}

function convertVideo({ src, base, width }) {
  const srcPath = join(SRC_ROOT, src);
  const mp4Path = join(DST_ROOT, `${base}.mp4`);
  const webmPath = join(DST_ROOT, `${base}.webm`);
  const posterJpg = join(DST_ROOT, `${base}.poster.jpg`);
  const posterWebp = join(DST_ROOT, `${base}.poster.webp`);
  if (!existsSync(srcPath)) {
    console.log(`SKIP ${src} (source missing)`);
    return { skipped: true, before: 0, after: 0 };
  }
  ensureDir(mp4Path);
  const before = statSync(srcPath).size;
  let after = 0;
  let didWork = false;
  console.log(`VIDEO ${src} -> ${base}.{mp4,webm,poster.webp}`);

  if (isStale(srcPath, mp4Path)) {
    didWork = true;
    run(FFMPEG, [
      "-y", "-i", srcPath,
      "-vf", `scale='min(${width},iw)':-2,fps=30`,
      "-c:v", "libx264", "-preset", "slow", "-crf", "26",
      "-movflags", "+faststart", "-an",
      mp4Path,
    ], "mp4");
  } else {
    console.log("  mp4... skip");
  }

  if (isStale(srcPath, webmPath)) {
    didWork = true;
    run(FFMPEG, [
      "-y", "-i", srcPath,
      "-vf", `scale='min(${width},iw)':-2,fps=30`,
      "-c:v", "libvpx-vp9", "-crf", "32", "-b:v", "0", "-an",
      webmPath,
    ], "webm");
  } else {
    console.log("  webm... skip");
  }

  if (isStale(srcPath, posterWebp)) {
    didWork = true;
    run(FFMPEG, [
      "-y", "-ss", "1", "-i", srcPath,
      "-frames:v", "1", "-vf", "scale=1200:-1", "-q:v", "2",
      posterJpg,
    ], "poster.jpg");
    run(MAGICK, [posterJpg, "-quality", "75", posterWebp], "poster.webp");
    if (existsSync(posterJpg)) unlinkSync(posterJpg);
  } else {
    console.log("  poster... skip");
  }

  for (const p of [mp4Path, webmPath, posterWebp]) {
    if (existsSync(p)) after += statSync(p).size;
  }
  return { skipped: !didWork, before, after };
}

function fmt(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

let totalBefore = 0;
let totalAfter = 0;

for (const p of PHOTOS) {
  const r = convertPhoto(p);
  totalBefore += r.before;
  totalAfter += r.after;
}
for (const v of VIDEOS) {
  const r = convertVideo(v);
  totalBefore += r.before;
  totalAfter += r.after;
}

console.log("");
console.log(`Source total: ${fmt(totalBefore)}`);
console.log(`Output total: ${fmt(totalAfter)}`);
console.log(`Saved:        ${fmt(totalBefore - totalAfter)} (${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`);
