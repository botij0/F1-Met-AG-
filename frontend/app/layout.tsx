import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarF from "./components/Navbar";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import VerificarToken from "./components/VerificarToken";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "F1-Agile-Portal",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" suppressHydrationWarning={true}>
            <head>
                <meta charSet="UTF-8" />
                <link
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/tw-elements/dist/css/tw-elements.min.css"
                />
                <script src="https://cdn.tailwindcss.com/3.3.0"></script>
            </head>
            <body suppressHydrationWarning={true}>
                <Toaster />
                {/* <VerificarToken /> */}

                <NavbarF />
                <main className="relative overflow-x-auto text-black mt-[80px] min-h-screen">
                    {children}
                </main>

                <Footer />

                <script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/tw-elements.umd.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
                <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
            </body>
        </html>
    );
}
