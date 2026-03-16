import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const sora = Sora({ 
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Agency-OS | AI Lead Management",
  description: "Real-time visibility into AI-driven automotive lead generation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(sora.variable, "font-sans")}>
        {children}
      </body>
    </html>
  );
}
