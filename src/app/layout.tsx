import type { Metadata } from "next";
import { Lato, Cormorant_Garamond } from "next/font/google";
import CookieBanner from "@/components/CookieBanner";
import DisclaimerLegalGlobal from "@/components/DisclaimerLegalGlobal";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://calculadora-medicos.tayah.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Calculadora Tributária para Médicos · Tayah Advogados",
  description:
    "Descubra em 2 minutos se sua clínica tem direito à equiparação hospitalar (STJ Tema 217) e pode pagar até 70% menos de IRPJ e CSLL.",
  openGraph: {
    title: "Calculadora Tributária para Médicos · Tayah Advogados",
    description:
      "Descubra em 2 minutos se sua clínica tem direito a até 70% menos IRPJ e CSLL.",
    type: "website",
    locale: "pt_BR",
    siteName: "Tayah Advogados",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora Tributária para Médicos · Tayah Advogados",
    description:
      "Descubra em 2 minutos se sua clínica tem direito a até 70% menos IRPJ e CSLL.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${lato.variable} ${cormorant.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
        <DisclaimerLegalGlobal />
        <WhatsAppFloat />
        <CookieBanner />
      </body>
    </html>
  );
}
