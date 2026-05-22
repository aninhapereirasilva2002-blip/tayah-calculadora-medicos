const METRICS = [
  { valor: "65+", label: "anos de tradição" },
  { valor: "97%", label: "de êxito" },
  { valor: "R$ 37mi", label: "em indenizações" },
  { valor: "30+", label: "escritórios conveniados" },
];

export default function MetricsBar() {
  return (
    <div className="border-y border-tayah-border-card bg-tayah-cream-deep/40">
      <div className="container-tayah py-8 md:py-10">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {METRICS.map((m) => (
            <div key={m.label} className="text-center">
              <p className="font-serif text-3xl font-semibold leading-none text-tayah-red md:text-4xl">
                {m.valor}
              </p>
              <p className="mt-2 font-sans text-[11px] uppercase tracking-wider text-tayah-text-muted md:text-xs">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
