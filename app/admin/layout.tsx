import "@/app/globals.css";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
// 👇 IMPORT YOUR THEME PROVIDER (Check your main layout for the exact path)
import { Providers } from "../provider";

export const metadata: Metadata = {
  title: "Admin Dashboard | Jain Wisdom",
  description: "Restricted Access",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 👇 suppressHydrationWarning is needed for next-themes to prevent console errors
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-black text-gray-900 dark:text-white antialiased">
        
        {/* ✅ Wrap everything in Providers so the Theme Toggler works */}
        <Providers>
          
          {/* ✅ Add Navbar here. If it requires a 'lang' prop, pass a default */}
          <Navbar lang="en" /> 
          
          {children}
          
        </Providers>

      </body>
    </html>
  );
}