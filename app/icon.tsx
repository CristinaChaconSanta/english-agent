import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FFD23F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#111111",
          fontSize: 72,
          fontWeight: 800,
          border: "10px solid #111111",
        }}
      >
        EA
      </div>
    ),
    { ...size },
  );
}
