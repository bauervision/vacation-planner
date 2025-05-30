// components/Align.tsx
import React, { ReactNode } from "react";

type AlignType = "left" | "center" | "right";

interface AlignProps {
  children: ReactNode;
  align?: AlignType;
  className?: string;
  gap?: string; // Tailwind gap class, e.g., 'gap-4'
}

const alignmentMap: Record<AlignType, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
};

export default function Align({
  children,
  align = "left",
  className = "",
  gap = "gap-2",
}: AlignProps) {
  return (
    <div className={`flex flex-col ${alignmentMap[align]} ${gap} ${className}`}>
      {children}
    </div>
  );
}
