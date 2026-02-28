"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const SESSION_KEY = "hs-loaded";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const alreadyLoaded = window.sessionStorage.getItem(SESSION_KEY) === "1";

    if (alreadyLoaded) return;

    window.sessionStorage.setItem(SESSION_KEY, "1");
    setIsVisible(true);

    const timer = window.setTimeout(() => setIsVisible(false), 500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence initial={false}>
      {isVisible ? (
        <motion.div
          layout={false}
          className="fixed inset-0 z-[9999] grid place-items-center bg-[#04040a]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.35, ease: "easeInOut" },
          }}
        >
          <span className="bg-gradient-to-r from-[#6d28d9] to-[#22d3ee] bg-clip-text font-mono text-2xl font-semibold text-transparent">
            HS
          </span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
