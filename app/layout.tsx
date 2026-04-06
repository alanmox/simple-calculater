import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALLANMOX CALCULATOR",
  description: "A clean and modern calculator experience.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className="font-theme"
      suppressHydrationWarning
    >
      <body className="h-screen overflow-hidden antialiased">{children}</body>
    </html>
  );
}
