/* eslint-disable @typescript-eslint/no-explicit-any */
// components/HeroSection.tsx
"use client";

import React, { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Align from "./Align";

type ScrollEffect =
  | "static"
  | "sticky"
  | "parallax"
  | "fadeIn"
  | "fadeInOut"
  | "zoomIn"
  | "zoomOut"
  | "slideLeft"
  | "slideRight"
  | "slideLeftZoom"
  | "slideRightZoom";

interface HeroSectionProps {
  imageUrl: string;
  title?: string;
  description?: string;
  scrollEffect?: ScrollEffect;
  overlayGradient?: string;
  children?: ReactNode;
  height?: string; // e.g. 'h-[70vh]'
  className?: string;
  slideStrength?: string; // e.g., '20%' or '200px'
  panScale?: number; // for slideLeftZoom/slideRightZoom
  imageScale?: number; // for always-on scale
  maskAngle?: number;
  maskDirection?: "left" | "right";
  maskedBgColor?: string; // Top color (default)
  maskedBgColor2?: string; // Bottom color (optional)
  maskedBgGradientPoint?: string | number; // e.g. "60%"
  contentAlign?: "left" | "center" | "right";
  gap?: string;
}

// Utility: parallelogram mask generator
function GetParallelogram(maskDirection: string, angle: number) {
  // Clamp angle and calculate y offset percent
  const clampAngle = Math.max(5, Math.min(45, angle));
  const offsetPercent = Math.tan((clampAngle * Math.PI) / 180) * 15;
  const safeOffset = Math.min(25, Math.max(3, offsetPercent));

  let polygon = "";
  if (maskDirection === "right") {
    polygon = `
      0% ${safeOffset}%, 
      100% 0%, 
      100% ${100 - safeOffset}%, 
      0% 100%
    `;
  } else {
    polygon = `
      0% 0%, 
      100% ${safeOffset}%, 
      100% 100%, 
      0% ${100 - safeOffset}%
    `;
  }
  return polygon;
}

export default function HeroSection({
  imageUrl,
  title,
  description,
  scrollEffect = "static",
  overlayGradient = "from-black/30 to-black/10",
  children,
  height = "h-[70vh]",
  className = "",
  slideStrength,
  panScale,
  imageScale,
  maskAngle,
  maskDirection = "right",
  maskedBgColor = "#0a0d1a",
  maskedBgColor2,
  maskedBgGradientPoint = "60%",
  contentAlign = "left",
  gap,
}: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const alignClass =
    contentAlign === "center"
      ? "items-center"
      : contentAlign === "right"
      ? "items-end"
      : "items-start"; // left/default

  // --- Motion effect hooks (only for non-sticky) ---
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // All transform hooks (unconditionally for React)
  const staticImageScale = imageScale ?? 1;
  slideStrength = slideStrength ?? "10%";
  panScale = panScale ?? 0;

  const slideLeftX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${slideStrength}`]
  );
  const slideRightX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", slideStrength]
  );
  const fadeInOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const fadeInOutOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );
  const zoomInScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const zoomOutScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const slideLeftScale = useTransform(
    scrollYProgress,
    [0, 1],
    [staticImageScale, panScale]
  );
  const slideRightScale = useTransform(
    scrollYProgress,
    [0, 1],
    [staticImageScale, panScale]
  );

  // Masked parallelogram polygon
  const hasMask = !!maskAngle && maskAngle > 0;
  const polygon = hasMask
    ? GetParallelogram(maskDirection, maskAngle)
    : undefined;
  const clipPath = polygon ? `polygon(${polygon})` : undefined;

  // Compose gradient for masked background
  const maskedBgGradient = maskedBgColor2
    ? `linear-gradient(to bottom, ${maskedBgColor} 0%, ${maskedBgColor} ${maskedBgGradientPoint}, ${maskedBgColor2} ${maskedBgGradientPoint}, ${maskedBgColor2} 100%)`
    : maskedBgColor;

  // --- Compose style object for image (motion effects) ---
  let imageStyle: any = {};
  switch (scrollEffect) {
    case "parallax":
      imageStyle = {
        ...(clipPath ? { clipPath, WebkitClipPath: clipPath } : {}),
        y: parallaxY,
        scale: staticImageScale,
      };
      break;
    case "fadeIn":
      imageStyle = {
        ...(clipPath ? { clipPath, WebkitClipPath: clipPath } : {}),
        opacity: fadeInOpacity,
        scale: staticImageScale,
      };
      break;
    case "fadeInOut":
      imageStyle = {
        ...(clipPath ? { clipPath, WebkitClipPath: clipPath } : {}),
        opacity: fadeInOutOpacity,
        scale: staticImageScale,
      };
      break;
    case "zoomIn":
      imageStyle = {
        ...(clipPath ? { clipPath, WebkitClipPath: clipPath } : {}),
        scale: zoomInScale,
      };
      break;
    case "zoomOut":
      imageStyle = {
        ...(clipPath ? { clipPath, WebkitClipPath: clipPath } : {}),
        scale: zoomOutScale,
      };
      break;
    case "slideLeft":
      imageStyle = {
        ...(clipPath ? { clipPath, WebkitClipPath: clipPath } : {}),
        x: slideLeftX,
        scale: staticImageScale,
      };
      break;
    case "slideRight":
      imageStyle = {
        ...(clipPath ? { clipPath, WebkitClipPath: clipPath } : {}),
        x: slideRightX,
        scale: staticImageScale,
      };
      break;
    case "slideLeftZoom":
      imageStyle = {
        ...(clipPath ? { clipPath, WebkitClipPath: clipPath } : {}),
        x: slideLeftX,
        scale: slideLeftScale,
      };
      break;
    case "slideRightZoom":
      imageStyle = {
        ...(clipPath ? { clipPath, WebkitClipPath: clipPath } : {}),
        x: slideRightX,
        scale: slideRightScale,
      };
      break;
    // "sticky" and "static" handled below
    default:
      imageStyle = {
        ...(clipPath ? { clipPath, WebkitClipPath: clipPath } : {}),
        scale: staticImageScale,
      };
  }

  // =========== STICKY ===============
  if (scrollEffect === "sticky") {
    return (
      <div className={`sticky top-0 left-0 w-full ${height} z-5 ${className}`}>
        {/* If masked, show fill background behind parallelogram. If not, just the image */}
        {hasMask ? (
          <div
            className={`absolute inset-0 w-full h-full z-5`}
            style={{
              background: maskedBgGradient,
              transition: "background 0.2s",
            }}
          >
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                clipPath,
                WebkitClipPath: clipPath,
                transition: "clip-path 0.4s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
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
          </div>
        ) : (
          <div className="absolute inset-0 w-full h-full z-5">
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
        )}
        {/* Content */}
        <div
          className={`absolute inset-0 z-10 pl-8 md:pl-20  flex flex-col ${alignClass}  justify-end w-full h-full px-6 pb-10 pointer-events-none`}
        >
          <div className="pointer-events-auto">
            <Align
              align={contentAlign}
              gap={gap}
              className="pointer-events-auto w-full"
            >
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
                  className="text-lg md:text-2xl mb-8 max-w-xl "
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  {description}
                </motion.p>
              )}
              {children}
            </Align>
          </div>
        </div>
      </div>
    );
  }

  // =========== MOTION EFFECTS (non-sticky) ============
  return (
    <section
      ref={ref}
      className={`relative w-full ${height} flex items-stretch justify-center overflow-hidden ${className}`}
    >
      {/* Fill background only if masked */}
      {hasMask && (
        <div
          className="absolute inset-0 w-full h-full z-5"
          style={{ background: maskedBgGradient }}
          aria-hidden="true"
        />
      )}
      <Align
        align={contentAlign}
        gap={gap}
        className="pointer-events-auto w-full"
      >
        <motion.div
          className="absolute inset-0 w-full h-full z-5"
          style={imageStyle}
          initial={{ opacity: 1, scale: staticImageScale }}
        >
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
        </motion.div>
      </Align>
      {/* Content Layer */}
      <div
        className={`relative z-10 flex flex-col  ${alignClass} justify-end h-full w-full px-6 pb-10 pointer-events-none`}
      >
        <div className="pointer-events-auto">
          <Align
            align={contentAlign}
            gap={gap}
            className="pointer-events-auto w-full"
          >
            {title && (
              <motion.h1
                className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-2xl"
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
                className="text-lg md:text-2xl mb-8 max-w-xl"
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
              >
                {description}
              </motion.p>
            )}
            {children}
          </Align>
        </div>
      </div>
    </section>
  );
}
