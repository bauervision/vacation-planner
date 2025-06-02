// components/NavBar.tsx
"use client";
import { useAuth } from "@/app/context/AuthContext";
import React from "react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";

interface NavBarProps {
  className?: string;
  onLoginClick: () => void;
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

export default function NavBar({ onLoginClick, className = "" }: NavBarProps) {
  const { user, logout } = useAuth();

  return (
    <nav className={`flex flex-row gap-3 ${className} `}>
      <div className="flex flex-row gap-3 items-center py-5 md:py-2">
        {/* LOGIN / DASHBOARD */}
        {user ? (
          <Link href="/dashboard" className={buttonClasses}>
            Dashboard
          </Link>
        ) : (
          <button onClick={onLoginClick} className={buttonClasses}>
            Login
          </button>
        )}

        {/* MY TRIPS */}
        {user && (
          <Link href="/my-trips" className={buttonClasses}>
            My Trips
          </Link>
        )}

        {/* BOOK */}
        {user && (
          <Link href="/book" className={buttonClasses}>
            Book
          </Link>
        )}

        {/* EXPLORE */}
        <Link href="/explore" className={buttonClasses}>
          Explore
        </Link>

        {user && (
          <>
            <button
              aria-label="Profile"
              className={iconBtn}
              // onClick={() => ...open profile/settings menu...}
            >
              <User className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
              aria-label="Logout"
              className={iconBtn}
              onClick={logout}
              title="Log out"
            >
              <LogOut className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
