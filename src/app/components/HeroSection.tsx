// components/HeroSection.tsx
"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface HeroSectionProps {
  imageUrl: string;
  title?: string;
  description?: string;
  scrollEffect?: "sticky" | "static";
  overlayGradient?: string;
  children?: ReactNode;
  height?: string;
  className?: string;
}

export default function HeroSection({
  imageUrl,
  title,
  description,
  scrollEffect = "static",
  overlayGradient = "from-black/80 to-black/40",
  children,
  height = "h-[70vh]",
  className = "",
}: HeroSectionProps) {
  // Only sticky or static for now; others use the motion.div as in previous answers

  if (scrollEffect === "sticky") {
    return (
      <div className={`sticky top-0 left-0 w-full ${height} z-0`}>
        <div className="relative w-full h-full">
          {/* Absolute BG */}
          <Image
            src={imageUrl}
            alt={title || "Hero Background"}
            fill
            className="object-cover object-center"
            priority
          />
          <div
            className={`absolute inset-0 bg-gradient-to-b ${overlayGradient}`}
          />
          {/* Content */}
          <div className="absolute inset-0 z-10 flex flex-col items-start justify-end w-full h-full px-6 pb-10 pointer-events-none">
            <div className="pointer-events-auto">
              {title && (
                <motion.h1
                  className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-2xl text-left"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.1, delay: 0.3, type: "spring" }}
                  viewport={{ once: true }}
                >
                  {title}
                </motion.h1>
              )}
              {description && (
                <motion.p
                  className="text-lg md:text-2xl mb-8 max-w-xl text-left"
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  {description}
                </motion.p>
              )}
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback: static
  return (
    <section className={`relative w-full ${height} ${className}`}>
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={imageUrl}
          alt={title || "Hero Background"}
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className={`absolute inset-0 bg-gradient-to-b ${overlayGradient}`}
        />
      </div>
      <div className="relative z-10 flex flex-col items-start justify-end h-full w-full px-6 pb-10 pointer-events-none">
        <div className="pointer-events-auto">
          {title && (
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-2xl text-left"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.3, type: "spring" }}
              viewport={{ once: true }}
            >
              {title}
            </motion.h1>
          )}
          {description && (
            <motion.p
              className="text-lg md:text-2xl mb-8 max-w-xl text-left"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {description}
            </motion.p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
