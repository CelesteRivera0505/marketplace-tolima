import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/context/AuthContext";
import { CartProvider } from "@/lib/context/CartContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marketplace Tolima - Comercios locales del Tolima",
  description: "Descubre y compra en los mejores comercios locales del departamento del Tolima, Colombia.",
  keywords: "marketplace, tolima, ibagué, comercios locales, tiendas, colombia",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  borderRadius: "12px",
                  background: "#1a1a1a",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "500",
                },
                success: { iconTheme: { primary: "#FFE600", secondary: "#1a1a1a" } },
              }}
            />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
