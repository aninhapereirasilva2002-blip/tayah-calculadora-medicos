"use client";

import { motion } from "framer-motion";

interface Props {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: Props) {
  const pct = (current / total) * 100;

  return (
    <div className="w-full">
      <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-widest text-tayah-text-muted">
        Passo {current} de {total}
      </p>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-tayah-border-soft">
        <motion.div
          className="h-full rounded-full bg-tayah-red"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
