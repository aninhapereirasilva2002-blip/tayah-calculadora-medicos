import Image from "next/image";
import Link from "next/link";
import WhatsAppIcon from "@/components/icons/WhatsApp";

const WHATSAPP_HREF = "https://wa.me/5521998917757";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-[60px] border-b border-tayah-border-soft bg-tayah-white shadow-tayah-header md:h-[72px]">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          aria-label="Calculadora Médicos · Tayah Advogados"
          className="flex items-center"
        >
          <Image
            src="/logo-tayah.png"
            alt="Tayah Advogados"
            width={160}
            height={40}
            priority
            className="h-8 w-auto md:h-10"
          />
        </Link>

        <Link
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 font-sans text-sm font-semibold text-tayah-red underline-offset-4 transition-all hover:underline md:inline-flex"
        >
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp
        </Link>
      </div>
    </header>
  );
}
