import type { Metadata } from "next";
import { Lato, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import AnnouncementBar from "@/components/AnnouncementBar";
import CookieBanner from "@/components/CookieBanner";
import DisclaimerLegalGlobal from "@/components/DisclaimerLegalGlobal";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PixelRouteTracker from "@/components/PixelRouteTracker";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import "./globals.css";

const META_PIXEL_ID = "27200029849602685";

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

const TITLE =
  "Equiparação Hospitalar para Médicos · Pague até 70% menos de IRPJ e CSLL · Tayah Advogados";
const DESCRIPTION =
  "Médicos e clínicas com serviços hospitalares podem reduzir a base do IRPJ de 32% para 8% (STJ, Tema 217). Calcule sua economia em 2 minutos. Análise gratuita.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "pt_BR",
    siteName: "Tayah Advogados",
    // TODO: substituir por imagem 1200x630 dedicada quando disponível
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
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
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <PixelRouteTracker />
        <AnnouncementBar />
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
