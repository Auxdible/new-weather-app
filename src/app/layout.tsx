import type { Metadata } from "next";

import "@/styles/globals.scss";
import { lato, raleway } from "./fonts";
import { NavigationBar } from "./navbar";
import Providers from "@/components/providers/core";



export const metadata: Metadata = {
  title: "Auxdible's Weather App",
  metadataBase: new URL(process.env.METADATA_URL ?? "http://localhost:3000"),
  description: "A weather app created by Auxdible.",
  openGraph: {
    title: "Auxdible's Weather App",
    description: "A weather app created by Auxdible.",
    images: [
      {
        url: "/logo512.png",
        width: 512,
        height: 512,
        alt: "Auxdible's Weather App Logo",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${raleway.variable} ${lato.variable}`}>
      <meta name="theme-color" content="#2190BF" />
      <body>
        <Providers>
          <NavigationBar/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
