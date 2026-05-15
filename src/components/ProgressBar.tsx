"use client";

import { motion } from "framer-motion";

interface Props {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: Props) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between font-sans text-[11px] uppercase tracking-widest text-tayah-gray-700">
        <span>
          Passo {current} <span className="text-tayah-gray-300">/ {total}</span>
        </span>
        <span className="text-tayah-red">{pct}%</span>
      </div>
      <div className="h-[3px] w-full overflow-hidden bg-tayah-gray-200">
        <motion.div
          className="h-full bg-tayah-red"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
