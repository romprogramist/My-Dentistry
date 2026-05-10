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
