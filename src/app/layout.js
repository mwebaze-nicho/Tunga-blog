import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider, ChackraProviders, SwrProviders } from "./providers";

export const metadata = {
  title: "Tech 🧑🏽‍💻 Blog",
  description:
    "Final backend project at Tunga. This blog demonstrates CRUD operations using MongoDB, Node.js and frontend using Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ChackraProviders>
            <SwrProviders>
              <Navbar />
              {children}
            </SwrProviders>
          </ChackraProviders>
        </AuthProvider>
      </body>
    </html>
  );
}
