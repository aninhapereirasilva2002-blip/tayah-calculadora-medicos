import CalculadoraInline from "@/components/CalculadoraInline";

export default function CalculadoraPage() {
  return (
    <main className="min-h-screen bg-tayah-cream">
      <div className="mx-auto w-full max-w-[720px] px-4 py-8 md:px-6 md:py-16">
        <CalculadoraInline />
      </div>
    </main>
  );
}
