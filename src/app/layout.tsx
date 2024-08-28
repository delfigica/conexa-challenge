import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Conexa Challenge",
  description: "A challenge for Conexa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <Head>
        <link rel="icon"  href="/favicon.ico"  sizes="any" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
