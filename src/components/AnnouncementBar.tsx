export default function AnnouncementBar() {
  return (
    <div className="bg-tayah-red text-tayah-white">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-center font-sans text-[12px] leading-snug md:text-[13px]">
        <span className="hidden sm:inline">
          Médico ou clínica? Descubra em 2 minutos quanto você pode economizar
          em impostos —{" "}
        </span>
        <span className="sm:hidden">Economize impostos —{" "}</span>
        <a
          href="/#calculadora"
          className="font-semibold underline-offset-4 transition-opacity hover:underline hover:opacity-90"
        >
          Calcular agora →
        </a>
      </div>
    </div>
  );
}
