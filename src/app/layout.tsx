import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./Providers/ConvexProvider";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PodCraft",
  description: "Generate your podcasts using AI",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased`}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
