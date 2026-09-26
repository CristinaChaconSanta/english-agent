import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "English Agent",
    short_name: "Inglés",
    start_url: "/hoy",
    display: "standalone",
    background_color: "#FFD23F",
    theme_color: "#111111",
    icons: [
      { src: "/icon", sizes: "180x180", type: "image/png", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
