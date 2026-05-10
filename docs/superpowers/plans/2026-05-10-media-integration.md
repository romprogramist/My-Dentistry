# Media Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all `bg-slate-200` placeholders on the live pages with real photos and click-to-play videos derived from the source assets in `C:\Users\Roman\Desktop\My-Dentistry\`.

**Architecture:** A one-shot Node script (`scripts/optimize-media.mjs`) converts HEIC→WebP via ImageMagick and MOV→MP4+WebM via ffmpeg, writing into `public/media/`. A new client component `<VideoPlayer>` renders a poster image until clicked, then mounts a `<video>` with WebM-then-MP4 fallback. Four existing components/pages are edited to consume the assets. No `next/image`, no manifest layer.

**Tech Stack:** Next.js 16 App Router (static export, `images.unoptimized: true`), React 19, Tailwind 4, TypeScript strict, vitest + RTL + jsdom for tests, ImageMagick 7 + ffmpeg 8 (already installed via winget) for media conversion.

**Spec:** `docs/superpowers/specs/2026-05-10-media-integration-design.md`

**Prerequisites the executor must verify before starting:**
- ImageMagick at `C:\Program Files\ImageMagick-7.1.2-Q16-HDRI\magick.exe` (or any `ImageMagick-*` folder)
- ffmpeg at `C:\Users\Roman\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe` (or any `Gyan.FFmpeg_*` folder)
- Source folder exists at `C:\Users\Roman\Desktop\My-Dentistry\` with `photo/` and `video/` subfolders
- Node 20+ available (`node --version`)

---

## File Structure

**New files:**
- `scripts/optimize-media.mjs` — converts source HEIC/JPG/MOV → optimized WebP/MP4/WebM in `public/media/`. Idempotent (mtime check). Runs manually.
- `components/blocks/VideoPlayer.tsx` — client component, ~50 lines, click-to-play with poster + WebM/MP4 fallback.
- `tests/components/VideoPlayer.test.tsx` — RTL test for VideoPlayer (initial poster render, click → video mounts, correct source order).
- `public/media/clinic/{reception-detail,reception-wide,doctor-at-work-1,doctor-at-work-2}.webp` — produced by script
- `public/media/procedures/implant-{1,2,3}.webp` — produced by script
- `public/media/stock/{smile-cosmetic,smile-after,veneer-application,veneer-pieces}.webp` — produced by script
- `public/media/video/{microscope,clinic-tour,treatment,implant,khechoyan}.{mp4,webm,poster.webp}` — produced by script

**Modified files:**
- `components/home/HomeHero.tsx` — replace placeholder div with `<img>` reception-detail
- `components/home/HomeMicroscope.tsx` — replace placeholder with `<VideoPlayer>` microscope
- `components/home/HomeLab.tsx` — replace placeholder with `<img>` reception-wide
- `app/o-klinike/page.tsx` — append new "Клиника в работе" gallery section

**Untouched (intentionally):**
- `components/home/HomeDoctors.tsx`, `app/vrachi/khechoyan-armen-aratovich/page.tsx`, `app/vrachi/navasardyan-marine-movsesovna/page.tsx` — placeholders stay (depersonalization decision per spec)

---

## Task 1: Create the media optimization script

**Files:**
- Create: `scripts/optimize-media.mjs`

- [ ] **Step 1: Create the script file**

Write `scripts/optimize-media.mjs` with the following content exactly:

```javascript
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
```

- [ ] **Step 2: Run the script**

Run: `node scripts/optimize-media.mjs`

Expected output (last lines):
```
Source total: ~225 MB
Output total: ~21 MB
Saved:        ~204 MB (~90%)
```

The actual numbers will vary slightly by ±10%. Critical checks:
- No FAIL lines
- All 11 PHOTO lines and all 5 VIDEO lines processed
- `microscope.mp4` is between 5 and 9 MB (1080p)
- Other `.mp4` files are between 1.5 and 6 MB (720p)

- [ ] **Step 3: Verify the output tree**

Run (PowerShell):
```powershell
Get-ChildItem public\media -Recurse -File | Select-Object FullName, @{N="KB";E={[math]::Round($_.Length/1KB,0)}} | Format-Table -AutoSize
```

Expected: 11 .webp files in `clinic/`, `procedures/`, `stock/`; 5 sets of `.mp4`+`.webm`+`.poster.webp` in `video/`.

Open one converted photo to confirm it is not blank/grey:
```powershell
Start-Process public\media\clinic\reception-detail.webp
```
You should see the reception room with the turquoise furniture.

- [ ] **Step 4: Re-run the script to verify idempotency**

Run: `node scripts/optimize-media.mjs`

Expected: every entry prints `skip ... (up to date)` or `mp4... skip`, `webm... skip`, `poster... skip`. No conversions actually run. `Source total` and `Output total` are still printed.

- [ ] **Step 5: Commit**

```bash
git add scripts/optimize-media.mjs public/media/
git commit -m "feat: add media optimization script and converted assets"
```

---

## Task 2: Build the VideoPlayer component (TDD)

**Files:**
- Create: `components/blocks/VideoPlayer.tsx`
- Test: `tests/components/VideoPlayer.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/components/VideoPlayer.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VideoPlayer } from "@/components/blocks/VideoPlayer";

describe("VideoPlayer", () => {
  const baseProps = {
    src: "/media/video/microscope",
    poster: "/media/video/microscope.poster.webp",
    title: "Эндодонтия под микроскопом",
  };

  it("renders the poster button initially, no <video> element", () => {
    render(<VideoPlayer {...baseProps} />);
    const button = screen.getByRole("button", {
      name: /воспроизвести.*эндодонтия под микроскопом/i,
    });
    expect(button).toBeInTheDocument();
    const poster = screen.getByAltText("Эндодонтия под микроскопом");
    expect(poster).toHaveAttribute("src", baseProps.poster);
    expect(document.querySelector("video")).toBeNull();
  });

  it("mounts a <video> with WebM source first, MP4 second after click", async () => {
    const user = userEvent.setup();
    render(<VideoPlayer {...baseProps} />);
    await user.click(screen.getByRole("button"));

    const video = document.querySelector("video");
    expect(video).not.toBeNull();
    expect(video).toHaveAttribute("playsinline");
    expect(video).toHaveAttribute("controls");
    expect(video).toHaveAttribute("poster", baseProps.poster);

    const sources = video!.querySelectorAll("source");
    expect(sources).toHaveLength(2);
    expect(sources[0]).toHaveAttribute("src", `${baseProps.src}.webm`);
    expect(sources[0]).toHaveAttribute("type", "video/webm");
    expect(sources[1]).toHaveAttribute("src", `${baseProps.src}.mp4`);
    expect(sources[1]).toHaveAttribute("type", "video/mp4");
  });

  it("respects custom aspectRatio prop", () => {
    render(<VideoPlayer {...baseProps} aspectRatio="4/3" />);
    const button = screen.getByRole("button");
    expect(button).toHaveStyle({ aspectRatio: "4/3" });
  });

  it("defaults aspectRatio to 9/16 (vertical)", () => {
    render(<VideoPlayer {...baseProps} />);
    const button = screen.getByRole("button");
    expect(button).toHaveStyle({ aspectRatio: "9/16" });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- VideoPlayer`

Expected: FAIL with module-not-found error for `@/components/blocks/VideoPlayer`.

- [ ] **Step 3: Implement the VideoPlayer**

Create `components/blocks/VideoPlayer.tsx`:

```tsx
"use client";
import { useState } from "react";

type Props = {
  src: string;
  poster: string;
  title: string;
  aspectRatio?: string;
};

export function VideoPlayer({ src, poster, title, aspectRatio = "9/16" }: Props) {
  const [playing, setPlaying] = useState(false);

  if (!playing) {
    return (
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={`Воспроизвести: ${title}`}
        className="group relative block w-full overflow-hidden rounded-2xl"
        style={{ aspectRatio }}
      >
        <img
          src={poster}
          alt={title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-brand-700">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </button>
    );
  }

  return (
    <video
      controls
      autoPlay
      playsInline
      poster={poster}
      className="w-full rounded-2xl"
      style={{ aspectRatio }}
    >
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- VideoPlayer`

Expected: PASS — 4 tests pass, 0 failed.

- [ ] **Step 5: Run the full test suite**

Run: `npm test`

Expected: PASS — all existing tests (transliterate, schema, booking, sanity) still pass plus the 4 new VideoPlayer tests. Total should be 22+ passing.

- [ ] **Step 6: Commit**

```bash
git add components/blocks/VideoPlayer.tsx tests/components/VideoPlayer.test.tsx
git commit -m "feat: add VideoPlayer component with click-to-play and webm/mp4 fallback"
```

---

## Task 3: Wire reception photo into HomeHero

**Files:**
- Modify: `components/home/HomeHero.tsx:47-51`

- [ ] **Step 1: Replace the placeholder div with an `<img>`**

In `components/home/HomeHero.tsx`, replace these lines (currently 47–51):

```tsx
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 md:aspect-square">
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Фото клиники
          </div>
        </div>
```

with:

```tsx
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 md:aspect-square">
          <img
            src="/media/clinic/reception-detail.webp"
            alt="Приёмная клиники «Моя Стоматология» — Сочи, Донская 52"
            width={1200}
            height={1600}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
```

Rationale: hero is above the fold, so `eager` + `fetchPriority="high"` (LCP optimisation). The `bg-slate-200` stays as a fallback in case the image is slow.

- [ ] **Step 2: Verify the page renders**

Start dev server in a background terminal:
```bash
npm run dev
```

Open `http://localhost:3000/` and confirm the hero shows the reception photo (turquoise furniture, white reception desk) instead of a grey square. Check both desktop width and mobile width (DevTools 375×667).

- [ ] **Step 3: Run tests**

Run: `npm test`

Expected: all tests still pass (no test touches HomeHero).

- [ ] **Step 4: Commit**

```bash
git add components/home/HomeHero.tsx
git commit -m "feat(home): replace hero placeholder with reception photo"
```

---

## Task 4: Wire microscope video into HomeMicroscope

**Files:**
- Modify: `components/home/HomeMicroscope.tsx:27-31`

- [ ] **Step 1: Add the import and replace the placeholder**

Replace the entire file contents of `components/home/HomeMicroscope.tsx` with:

```tsx
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { VideoPlayer } from "@/components/blocks/VideoPlayer";

export function HomeMicroscope() {
  return (
    <section className="bg-brand-50 py-12 md:py-16">
      <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
        <div>
          <span className="inline-block rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
            УНИКАЛЬНОЕ В СОЧИ
          </span>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">
            Эндодонтия под микроскопом
          </h2>
          <p className="mt-4 text-muted-foreground">
            Дентальный микроскоп даёт увеличение до 25× — врач видит каждый
            канал и микротрещину. Это позволяет лечить даже сложные случаи и
            спасать зубы, которые в других клиниках предлагают удалить.
          </p>
          <Link
            href="/uslugi/endodontiya-pod-mikroskopom/"
            className={`${buttonVariants()} mt-6 inline-flex`}
          >
            Узнать больше
          </Link>
        </div>
        <div className="mx-auto w-full max-w-sm">
          <VideoPlayer
            src="/media/video/microscope"
            poster="/media/video/microscope.poster.webp"
            title="Дентальный микроскоп Zeiss в работе"
            aspectRatio="9/16"
          />
        </div>
      </div>
    </section>
  );
}
```

Note: the wrapper `<div className="mx-auto w-full max-w-sm">` constrains the vertical 9:16 video to ~384px wide on desktop so it doesn't dominate the column. Centred in the column.

- [ ] **Step 2: Verify in the browser**

Reload `http://localhost:3000/`, scroll to the microscope section. Expected:
- A poster image (still frame from the microscope video) with a white play button overlay
- Click the poster — `<video controls>` mounts and starts playing
- On mobile width, the video is constrained, not full-width

- [ ] **Step 3: Run tests**

Run: `npm test`

Expected: all tests pass.

- [ ] **Step 4: Commit**

```bash
git add components/home/HomeMicroscope.tsx
git commit -m "feat(home): replace microscope placeholder with click-to-play video"
```

---

## Task 5: Wire reception-wide photo into HomeLab

**Files:**
- Modify: `components/home/HomeLab.tsx:8-12`

- [ ] **Step 1: Replace the placeholder div with an `<img>`**

In `components/home/HomeLab.tsx`, replace these lines (currently 8–12):

```tsx
        <div className="aspect-[4/3] rounded-2xl bg-slate-200">
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Фото зубного техника / лаборатории
          </div>
        </div>
```

with:

```tsx
        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200">
          <img
            src="/media/clinic/reception-wide.webp"
            alt="Интерьер клиники «Моя Стоматология»"
            width={1600}
            height={1200}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
```

Note: spec acknowledges we have no real lab photo yet — using the wide reception shot keeps the block visual until a real one arrives. The `alt` is honest ("интерьер клиники"), not "лаборатория".

- [ ] **Step 2: Verify in the browser**

Reload, scroll to the "Своя зуботехническая база" block. Expected: the wide reception shot (turquoise chairs, corridor, doors) replaces the grey square. The 4:3 aspect crop hides minor edges.

- [ ] **Step 3: Run tests**

Run: `npm test`

Expected: all tests pass.

- [ ] **Step 4: Commit**

```bash
git add components/home/HomeLab.tsx
git commit -m "feat(home): replace lab placeholder with clinic interior photo"
```

---

## Task 6: Add gallery section to «О клинике»

**Files:**
- Modify: `app/o-klinike/page.tsx` (insert section after line 69)

- [ ] **Step 1: Add the import and gallery section**

In `app/o-klinike/page.tsx`:

(a) Add this import below the existing imports at the top:

```tsx
import { VideoPlayer } from "@/components/blocks/VideoPlayer";
```

(b) Insert this block immediately after the closing `</dl>` of the «Реквизиты и лицензия» list (after line 69, before the closing `</article>` tag):

```tsx
        <h2 className="mt-12 text-2xl font-bold">Клиника в работе</h2>

        <figure className="mt-6 overflow-hidden rounded-2xl bg-slate-200">
          <img
            src="/media/clinic/reception-wide.webp"
            alt="Приёмная клиники «Моя Стоматология»"
            width={1600}
            height={1200}
            loading="lazy"
            decoding="async"
            className="h-auto w-full object-cover"
          />
        </figure>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <figure className="overflow-hidden rounded-2xl bg-slate-200">
            <img
              src="/media/clinic/doctor-at-work-1.webp"
              alt="Команда клиники в работе"
              width={1200}
              height={1600}
              loading="lazy"
              decoding="async"
              className="h-auto w-full object-cover"
            />
          </figure>
          <figure className="overflow-hidden rounded-2xl bg-slate-200">
            <img
              src="/media/clinic/doctor-at-work-2.webp"
              alt="Лечение пациента"
              width={1200}
              height={1600}
              loading="lazy"
              decoding="async"
              className="h-auto w-full object-cover"
            />
          </figure>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <figure className="overflow-hidden rounded-2xl bg-slate-200">
            <img
              src="/media/procedures/implant-1.webp"
              alt="Имплантация — установка имплантата"
              width={1200}
              height={1600}
              loading="lazy"
              decoding="async"
              className="h-auto w-full object-cover"
            />
          </figure>
          <VideoPlayer
            src="/media/video/clinic-tour"
            poster="/media/video/clinic-tour.poster.webp"
            title="Тур по кабинету"
            aspectRatio="9/16"
          />
        </div>

        <div className="mt-4">
          <VideoPlayer
            src="/media/video/treatment"
            poster="/media/video/treatment.poster.webp"
            title="Общий план лечения"
            aspectRatio="9/16"
          />
        </div>
```

- [ ] **Step 2: Verify in the browser**

Open `http://localhost:3000/o-klinike/`. Expected after the «Реквизиты и лицензия» block:
- Heading «Клиника в работе»
- Wide reception photo (full width)
- Two-column row: doctor-at-work-1 + doctor-at-work-2
- Two-column row: implant-1 photo + clinic-tour video poster
- Full-width row: treatment video poster

Click each video poster — both videos must mount `<video controls autoPlay>` and start playing. Click anywhere outside the video does not affect playback.

On mobile (375px width), the two-column rows collapse to single column. The vertical videos render at full mobile width.

- [ ] **Step 3: Run tests**

Run: `npm test`

Expected: all tests pass.

- [ ] **Step 4: Run lint**

Run: `npm run lint`

Expected: no errors. If ESLint complains about `<img>` without `next/image`, that is expected — the project uses static export with `images.unoptimized: true`, so `<img>` is intentional. If the warning is treated as error, add `// eslint-disable-next-line @next/next/no-img-element` above each `<img>`.

- [ ] **Step 5: Commit**

```bash
git add app/o-klinike/page.tsx
git commit -m "feat(about): add 'Клиника в работе' gallery with photos and videos"
```

---

## Task 7: Production build verification

**Files:** none modified.

- [ ] **Step 1: Stop the dev server, run a production build**

In the terminal running `npm run dev`, press Ctrl+C. Then run:

```bash
npm run build
```

Expected: build completes without errors. The `out/` directory is generated and contains:
- `out/media/clinic/reception-detail.webp` (and the rest of the optimized assets)
- `out/media/video/microscope.mp4`, `.webm`, `.poster.webp`
- `out/index.html` references `/media/clinic/reception-detail.webp`
- `out/o-klinike/index.html` references all the gallery assets

Run (PowerShell):
```powershell
Select-String -Path out\index.html -Pattern "reception-detail|microscope" | Select-Object -First 5
Select-String -Path out\o-klinike\index.html -Pattern "doctor-at-work|implant-1|clinic-tour|treatment" | Select-Object -First 10
```

Expected: matches found in both. If empty, the asset paths did not survive the static export.

- [ ] **Step 2: Smoke-test the static build**

Run:
```bash
npx serve out
```

Open the URL shown (typically `http://localhost:3000/`). Test the same flows as in dev:
- Hero photo loads on home
- Microscope video poster + click-to-play works
- Lab block shows interior photo
- `/o-klinike/` gallery renders all 4 photos and 2 videos; both video posters play on click

Stop the server (Ctrl+C).

- [ ] **Step 3: Final commit if anything changed**

If the build produced no source changes (only `out/`, which is gitignored), nothing to commit. Otherwise:

```bash
git status
git add <changed files>
git commit -m "chore: post-build adjustments"
```

- [ ] **Step 4: Update README phase-2 list**

In `README.md`, find the «Что заполняется в Phase 2» section. Edit the line:
```markdown
- Фото клиники, врачей, оборудования (микроскоп), зубного техника
```
to:
```markdown
- Фото и видео врачей с привязкой к именам Хечоян/Навасардян (текущие фото обезличены — см. spec 2026-05-10)
- Реальные фото лаборатории / зубного техника (сейчас в HomeLab подставлен интерьер приёмной)
```

Commit:
```bash
git add README.md
git commit -m "docs: update phase-2 list after media integration"
```

---

## Done

After Task 7, the live pages have:
- Real reception photo on the home hero (eager-loaded for LCP)
- Click-to-play microscope video on home
- Reception-wide photo in the lab block
- 4-photo + 2-video gallery on the «О клинике» page

Doctor profile pages and the home «Наши врачи» block intentionally still show grey placeholders — to be addressed in Phase 2 once doctor identities are confirmed.

Total media weight added to repo: ~21 MB (vs ~225 MB if shipped raw).
