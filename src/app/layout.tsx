import type { Metadata } from "next";
import "./globals.css";
import PWAInstallPrompt from "./components/PWAInstallPrompt";

// Remove these two lines
// import { Geist_Sans, Geist_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: 'Naughty Den',
  description: 'A global community for creators and photo seekers.',
  icons: {
    icon: '/favicon.png',
  },
  manifest: '/manifest.webmanifest',
  themeColor: '#0a0a0a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {/* Install prompt component */}
        <PWAInstallPrompt />
        {/* PWA service worker registration */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        {/* Client component handles registration */}
        {/* Inject lightweight registrar */}
        <script dangerouslySetInnerHTML={{
          __html: `
          (function(){
            if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').catch(function(){});
              });
            }
          })();
        `}}
        />
        {children}
      </body>
    </html>
  );
}
