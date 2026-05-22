"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function PixelRouteTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRun = useRef(true);

  useEffect(() => {
    // O <Script> base já dispara o PageView inicial via fbq('track','PageView')
    // logo após init. Aqui só disparamos para navegações subsequentes (SPA).
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [pathname, searchParams]);

  return null;
}

export default function PixelRouteTracker() {
  // useSearchParams() exige Suspense durante a build estática.
  return (
    <Suspense fallback={null}>
      <PixelRouteTrackerInner />
    </Suspense>
  );
}
