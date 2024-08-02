import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from 'sonner';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://learn404.com'),
  keywords: ['Next.js', 'React', 'JavaScript', 'Développement', 'Web', 'Formation', 'Learn404', 'Formation en Développement Web', 'Formation en Développement Web avec Next.js', 'Formation en Développement Web avec React', 'Formation en Développement Web avec JavaScript', 'Formation en Développement Web avec Git', 'Formation en ligne'],
  title: "Learn404 - Formation en Développement Web",
  description:
    "Devenez expert en création et optimisation de sites web avec notre formation complète en Développement Web. Apprenez les bases du HTML, CSS, et JavaScript, maîtrisez des frameworks comme React, Angular et plus encore, et les outils de développement web comme Git,...",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Toaster position="bottom-right" expand={false} closeButton richColors/>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen bg-bg-primary">{children}</div>
          </ThemeProvider>
      </body>
    </html>
  );
}
