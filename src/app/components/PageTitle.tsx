"use client";
import { motion } from "framer-motion";
import React from "react";

export default function PageTitle({
  title,
  children,
  className = "",
  fontSize = "text-5xl sm:text-6xl md:text-8xl lg:text-8xl xl:text-9xl",
  style,
  titleTop = "top-6 md:top-10",
  navOffset = "top-12 xl:top-40", // vertical gap below title
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;
  fontSize?: string;
  style?: React.CSSProperties;
  titleTop?: string;
  navOffset?: string;
}) {
  return (
    <>
      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 40, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 16,
          delay: 0.2,
        }}
        className={`
          absolute
          right-8 top-8
          ${titleTop}
          z-50
          ${fontSize}
          font-bold
          pointer-events-none
          select-none
          drop-shadow-2xl
          text-hero-shadow
          tracking-normal sm:tracking-wide md:tracking-wider
          bg-gradient-to-b from-[#7D4E57] via-[#D66853] to-[#e4ddde]
          text-transparent bg-clip-text animated-gradient
          sm:text-stroke
          max-w-[95vw]
          whitespace-nowrap
          ${className}
        `}
        style={{
          fontFamily: "var(--font-lilita-one), cursive",
          ...style,
        }}
      >
        {title}
      </motion.h1>
      {children && (
        <div
          className={`
            absolute
            left-1/2 -translate-x-1/2
    md:left-auto md:translate-x-0 md:right-40
            ${navOffset}
            z-40
            flex
            pointer-events-auto
          `}
        >
          {children}
        </div>
      )}
    </>
  );
}
