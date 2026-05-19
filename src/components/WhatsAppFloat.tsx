import Link from "next/link";
import WhatsAppIcon from "@/components/icons/WhatsApp";

const HREF =
  "https://wa.me/5521998917757?text=Ol%C3%A1%2C%20vim%20pela%20calculadora%20de%20equipara%C3%A7%C3%A3o%20hospitalar";

export default function WhatsAppFloat() {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3">
      <span className="rounded-full bg-tayah-white px-3 py-1.5 font-sans text-xs font-semibold text-tayah-text-strong shadow-tayah-card-sm motion-safe:animate-fade-in-x md:hidden">
        Fale conosco
      </span>

      <Link
        href={HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco no WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-tayah-whatsapp transition-all duration-200 hover:scale-[1.08] hover:shadow-tayah-whatsapp-hover md:h-16 md:w-16"
      >
        <span
          className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] opacity-60 motion-safe:animate-pulse-ring"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] opacity-60 [animation-delay:1s] motion-safe:animate-pulse-ring"
          aria-hidden
        />

        <WhatsAppIcon className="relative z-10 h-7 w-7 text-white md:h-8 md:w-8" />
      </Link>
    </div>
  );
}
