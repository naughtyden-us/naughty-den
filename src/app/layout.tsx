import type { Metadata } from "next";
import "./globals.css";

// Remove these two lines
// import { Geist_Sans, Geist_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: 'Naughty Den',
  description: 'A global community for creators and photo seekers.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}