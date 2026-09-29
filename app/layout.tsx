import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { SplashScreen } from "@/components/splash-screen";
import { WhatsAppButton } from "@/components/whatsapp-button";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Aluna | Boutique Guest House Booking",
  description:
    "Book a slow, boutique stay at The Aluna's guest houses. Browse rooms and send a booking inquiry.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-[#221604]">
        <SplashScreen />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
