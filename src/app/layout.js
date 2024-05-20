import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider, Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tech 🧑🏽‍💻 Blog",
  description:
    "Final backend project at Tunga. This blog demonstrates CRUD operations using MongoDB, Node.js and frontend using Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
