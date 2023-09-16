import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "./components/footer/footer";
import NavBar from "./NavBar";
import { cookies } from "next/headers";
import { ClientCookiesProvider } from "./CookiesProvider";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>ShopIT</title>
        <meta name="description" content="Buy and sell products" />
      </head>
      <body className={inter.className}>
        <ClientCookiesProvider value={cookies().getAll()}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <NavBar />
            <div>{children}</div>
            <div>
              <Footer />
            </div>
          </div>
        </ClientCookiesProvider>
      </body>
    </html>
  );
}
