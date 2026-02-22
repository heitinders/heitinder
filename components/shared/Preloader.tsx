"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const SESSION_KEY = "hs-loaded";

export default function Preloader() {
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const alreadyLoaded = window.sessionStorage.getItem(SESSION_KEY) === "1";
    let frame = 0;
    let timer = 0;

    if (alreadyLoaded) {
      frame = window.requestAnimationFrame(() => {
        setIsReady(true);
        setIsVisible(false);
      });
      return () => window.cancelAnimationFrame(frame);
    }

    window.sessionStorage.setItem(SESSION_KEY, "1");

    frame = window.requestAnimationFrame(() => {
      setIsReady(true);
      setIsVisible(true);

      timer = window.setTimeout(() => {
        setIsVisible(false);
      }, 800);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  if (!isReady) return null;

  return (
    <AnimatePresence initial={false}>
      {isVisible ? (
        <motion.div
          layout={false}
          className="fixed inset-0 z-[9999] grid place-items-center bg-[#04040a]"
          initial={{ clipPath: "inset(0 0 0 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <svg
            viewBox="0 0 120 80"
            width="120"
            height="80"
            aria-label="HS monogram loading animation"
            role="img"
          >
            <motion.path
              layout={false}
              d="M18 14V66M18 40H42M42 14V66"
              pathLength={1}
              stroke="#8b5cf6"
              strokeWidth={1.5}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ strokeDasharray: 1 }}
              initial={{ strokeDashoffset: 1 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            <motion.path
              layout={false}
              d="M97 20C92 14 80 14 75 20C70 26 74 32 84 35C94 38 98 43 94 50C90 58 77 59 71 53"
              pathLength={1}
              stroke="#8b5cf6"
              strokeWidth={1.5}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ strokeDasharray: 1 }}
              initial={{ strokeDashoffset: 1 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
