import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider, ChackraProviders, SwrProviders } from "./providers";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Dev 🧑🏽‍💻 Digist",
  description:
    "Explore our blog for the latest insights across AI, Frontend, Backend, and Fullstack development. Discover cutting-edge AI advancements, stay updated with frontend technologies, learn the intricacies of backend development, and master the art of fullstack programming. Whether you're a beginner or a seasoned developer, our comprehensive guides and articles will help you stay ahead in the tech world.",
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
