import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"; // Go up one level to find globals.css
import { Providers } from "../provider"; // Import the provider we made
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jain Wisdom Hub",
  description: "A digital encyclopedia of Jain Principles",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>; // <--- Changed this type
}) {
  const { lang } = await params; // <--- Added await here

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}>
        <Providers>
          <Navbar lang={lang} />
          <main className="flex-grow">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}