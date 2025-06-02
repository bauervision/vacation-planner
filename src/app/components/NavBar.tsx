// components/NavBar.tsx
"use client";
import React from "react";
import Link from "next/link";
import { User } from "lucide-react";

interface NavBarProps {
  loggedIn: boolean;
  className?: string;
}

const buttonClasses = `
  border border-white 
  md:border-4 
  text-xs md:text-sm 
  font-semibold
  px-2 py-1 md:px-4 md:py-2 
  rounded-full 
  transition 
  hover:bg-accent hover:text-[#11151C] 
  focus:outline-none 
  focus:ring-2 
  focus:ring-white
  flex items-center justify-center
  whitespace-nowrap
`;

const iconBtn = `
  border border-white md:border-4 text-white 
  w-8 h-8 md:w-10 md:h-10 
  rounded-full flex items-center justify-center 
  transition hover:bg-accent hover:text-[#11151C] 
  focus:outline-none focus:ring-2 focus:ring-white 
  ml-1 md:ml-2
`;

export default function NavBar({ loggedIn, className = "" }: NavBarProps) {
  return (
    <nav className={`flex flex-row gap-3 ${className} `}>
      <div className="flex flex-row gap-3 items-center py-5 md:py-2">
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

        {loggedIn && (
          <button
            aria-label="Profile"
            className={iconBtn}
            // onClick={() => ...open profile/settings menu...}
          >
            <User className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        )}
      </div>
    </nav>
  );
}
