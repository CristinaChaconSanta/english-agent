import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans, Permanent_Marker } from "next/font/google";
import { ServiceWorker } from "@/components/service-worker";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-bricolage",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-dm",
});

const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marker",
});

export const metadata: Metadata = {
  title: "English Agent",
  description: "Sesión de inglés de hoy",
  applicationName: "English Agent",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black",
    title: "Inglés",
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${display.variable} ${sans.variable} ${marker.variable} font-sans antialiased`}>
        <ServiceWorker />
        {children}
      </body>
    </html>
  );
}
