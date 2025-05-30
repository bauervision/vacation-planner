// components/PageFade.tsx
"use client";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";

export default function PageFade({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="min-h-screen"
      // you can pass more classes here
    >
      {children}
    </motion.div>
  );
}
