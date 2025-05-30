import React from "react";

interface SectionProps {
  children: React.ReactNode;
  color?: string; // tailwind class, e.g. "bg-primary" or "bg-blue-900"
  height?: string; // tailwind class, e.g. "min-h-[100vh]" or "h-[60vh]"
  rounded?: "top" | "bottom" | "both" | "none";
  className?: string;
}

function getRoundedClass(rounded: SectionProps["rounded"]) {
  switch (rounded) {
    case "top":
      return "rounded-t-3xl";
    case "bottom":
      return "rounded-b-3xl";
    case "none":
      return "";
    case "both":
    default:
      return "rounded-3xl";
  }
}

export default function Section({
  children,
  color = "bg-primary",
  height = "min-h-[100vh]",
  rounded = "both",
  className = "",
}: SectionProps) {
  return (
    <section
      className={`relative z-10 ${color} ${height} p-10 ${getRoundedClass(
        rounded
      )} ${className}`}
    >
      {children}
    </section>
  );
}
