import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider, ChackraProviders, SwrProviders } from "./providers";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Tech 🧑🏽‍💻 Blog",
  description:
    "Final backend project at Tunga. This blog demonstrates CRUD operations using MongoDB, Node.js and frontend using Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className=" bg-neutral-200 flex flex-col min-h-full">
        <AuthProvider>
          <ChackraProviders>
            <SwrProviders>
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </SwrProviders>
          </ChackraProviders>
        </AuthProvider>
      </body>
    </html>
  );
}
