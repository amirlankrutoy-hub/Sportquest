import { Manrope, Oswald } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/components/AppProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGate from "@/components/AuthGate";
import ClerkShell from "@/components/ClerkShell";

const oswald = Oswald({ subsets: ["latin", "latin-ext", "cyrillic"], variable: "--font-oswald", weight: ["500", "600", "700"] });
const manrope = Manrope({ subsets: ["latin", "latin-ext", "cyrillic"], variable: "--font-manrope" });

export const metadata = {
  title: "SPORT QUEST",
  description: "Find your sport · Найди свой спорт · Oʻz sportingni top",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${oswald.variable} ${manrope.variable}`}>
      <body className="min-h-dvh overflow-x-clip antialiased">
        <AppProvider>
          <ClerkShell>
            <AuthGate>
              <Navbar />
              {children}
              <Footer />
            </AuthGate>
          </ClerkShell>
        </AppProvider>
      </body>
    </html>
  );
}
