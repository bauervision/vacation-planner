// components/NavBar.tsx
"use client";
import React from "react";
import Link from "next/link";

interface NavBarProps {
  loggedIn: boolean;
  className?: string;
}

const buttonClasses = `
  border border-white 
  md:border-4 
  text-sm md:text-base 
  font-semibold
  px-4 py-1.5 md:px-6 md:py-2 
  rounded-full 
  transition 
  hover:bg-accent hover:text-[#11151C] 
  focus:outline-none 
  focus:ring-2 
  focus:ring-white
  flex items-center justify-center
  mt-7 md:mt-2
`;

export default function NavBar({ loggedIn, className = "" }: NavBarProps) {
  return (
    <nav className={`flex flex-row gap-3 ${className}`}>
      <div className="flex flex-row gap-3">
        {/* LOGIN / DASHBOARD */}
        {loggedIn ? (
          <Link href="/dashboard" className={buttonClasses}>
            Dashboard
          </Link>
        ) : (
          <Link href="/login" className={buttonClasses}>
            Login
          </Link>
        )}

        {/* MY TRIPS */}
        {loggedIn && (
          <Link href="/my-trips" className={buttonClasses}>
            My Trips
          </Link>
        )}

        {/* BOOK */}
        {loggedIn && (
          <Link href="/book" className={buttonClasses}>
            Book
          </Link>
        )}

        {/* EXPLORE */}
        <Link href="/explore" className={buttonClasses}>
          Explore
        </Link>
      </div>
    </nav>
  );
}
