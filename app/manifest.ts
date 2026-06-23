import type { MetadataRoute } from "next";
import { CLINIC } from "@/lib/constants/clinic";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${CLINIC.name} — стоматология в Сочи`,
    short_name: CLINIC.name,
    description:
      "Стоматология полного цикла в центре Сочи. Лечение, протезирование, имплантация.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0284c7",
    lang: "ru",
    icons: [
      {
        src: "/images/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
