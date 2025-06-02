"use client";
import React from "react";
import PageTitle from "./PageTitle";

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function Header({
  title,
  children,
  className = "",
  style,
}: HeaderProps) {
  return (
    <header
      className={`relative w-full flex flex-col items-center min-h-[7rem] sm:min-h-[10rem] ${className}`}
      style={style}
    >
      <PageTitle>{title}</PageTitle>
      <div className="w-full flex justify-center mt-[4.5rem] sm:mt-8">
        {children}
      </div>
    </header>
  );
}
