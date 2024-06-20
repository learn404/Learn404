import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={true}
          theme="light"
        />
        <div className="min-h-screen bg-bg-primary">{children}</div>
      </body>
    </html>
  );
}
