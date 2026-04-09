import type { Metadata } from "next";
import { Barlow, Orbitron } from "next/font/google";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap/dist/css/bootstrap-utilities.min.css";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Space — Explore the Cosmos",
  description:
    "A cinematic space exploration experience featuring missions, interactive 360° astronaut viewer, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${barlow.variable} ${orbitron.variable}`}>
      <body>{children}</body>
    </html>
  );
}
