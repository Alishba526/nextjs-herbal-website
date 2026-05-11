"use client";

import { useEffect, useState } from "react";

export function FlashCountdown() {
  const [t, setT] = useState({ h: 2, m: 10, s: 45 });
  useEffect(() => {
    const id = setInterval(() => {
      setT(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="flex gap-2 items-center font-mono">
      {[["HRS", t.h], ["MIN", t.m], ["SEC", t.s]].map(([l, v]) => (
        <div key={l as string} className="text-center">
          <div className="bg-foreground text-background px-3 py-2 rounded-lg text-2xl font-bold min-w-[58px]">{pad(v as number)}</div>
          <p className="text-[10px] mt-1 text-muted-foreground tracking-wider">{l}</p>
        </div>
      ))}
    </div>
  );
}
