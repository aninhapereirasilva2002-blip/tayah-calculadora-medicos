import Image from "next/image";
import Link from "next/link";
import WhatsAppIcon from "@/components/icons/WhatsApp";

const WHATSAPP_HREF =
  "https://wa.me/5521998917757?text=Ol%C3%A1%2C%20vim%20pela%20calculadora%20de%20equipara%C3%A7%C3%A3o%20hospitalar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-[60px] border-b border-tayah-border-soft bg-tayah-white/95 shadow-tayah-header backdrop-blur md:h-[72px]">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          aria-label="Tayah Advogados · Desde 1961"
          className="flex items-center gap-3"
        >
          <Image
            src="/logo-tayah.png"
            alt="Tayah Advogados"
            width={160}
            height={40}
            priority
            className="h-8 w-auto md:h-10"
          />
          <span className="hidden border-l border-tayah-border-card pl-3 font-sans text-[10px] font-semibold uppercase tracking-[2px] text-tayah-text-muted md:inline">
            Desde 1961
          </span>
        </Link>

        <Link
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-tayah-red px-4 py-2 font-sans text-xs font-semibold text-tayah-white transition-all hover:bg-tayah-red-dark md:px-5 md:py-2.5 md:text-sm"
        >
          <WhatsAppIcon className="h-4 w-4 md:h-5 md:w-5" />
          <span className="hidden sm:inline">Falar com a equipe</span>
          <span className="sm:hidden">Falar</span>
        </Link>
      </div>
    </header>
  );
}
