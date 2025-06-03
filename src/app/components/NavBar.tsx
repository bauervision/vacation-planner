// components/NavBar.tsx
"use client";
import { useAuth } from "@/app/context/AuthContext";
import React from "react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";

interface NavBarProps {
  currentPath?: string;
  className?: string;
  onLoginClick?: () => void;
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

export default function NavBar({
  currentPath,
  onLoginClick,
  className = "",
}: NavBarProps) {
  const { user, logout } = useAuth();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Wait until client-side hydration
  if (!mounted) return null;

  function navButtonClass(href: string) {
    const isActive =
      href === "/" ? currentPath === "/" : currentPath?.startsWith(href);
    return `${buttonClasses} ${isActive ? "bg-accent text-primary" : ""}`;
  }

  return (
    <nav
      className={`w-full max-w-5xl mx-auto flex flex-row gap-1 items-center justify-center overflow-x-hidden ${className} `}
    >
      <div className="flex flex-row gap-1 items-center py-5 md:py-2">
        {/* LOGIN / DASHBOARD */}
        {user ? (
          currentPath?.startsWith("/dashboard") ? (
            <span
              className={navButtonClass("/dashboard") + " pointer-events-none"}
            >
              Dashboard
            </span>
          ) : (
            <Link href="/dashboard" className={navButtonClass("/dashboard")}>
              Dashboard
            </Link>
          )
        ) : currentPath === "/" ? (
          <button className={navButtonClass("/")} disabled>
            Sign-up / Login
          </button>
        ) : (
          <button onClick={onLoginClick} className={navButtonClass("/")}>
            Sign-up / Login
          </button>
        )}

        {/* MY TRIPS */}
        {user &&
          (currentPath?.startsWith("/my-trips") ? (
            <span className={navButtonClass("/my-trips")}>My Trips</span>
          ) : (
            <Link href="/my-trips" className={navButtonClass("/my-trips")}>
              My Trips
            </Link>
          ))}

        {/* BOOK */}
        {user &&
          (currentPath?.startsWith("/book") ? (
            <span className={navButtonClass("/book")}>Book</span>
          ) : (
            <Link href="/book" className={navButtonClass("/book")}>
              Book
            </Link>
          ))}

        {/* EXPLORE */}
        {currentPath?.startsWith("/explore") ? (
          <span className={navButtonClass("/explore")}>Explore</span>
        ) : (
          <Link href="/explore" className={navButtonClass("/explore")}>
            Explore
          </Link>
        )}

        {user && (
          <>
            {/* Profile icon: disable or highlight if active */}
            <button
              aria-label="Profile"
              className={`${iconBtn} ${
                currentPath?.startsWith("/profile")
                  ? "bg-accent text-primary pointer-events-none opacity-70"
                  : ""
              }`}
              // onClick={() => ...open profile/settings menu...}
              disabled={currentPath?.startsWith("/profile")}
            >
              <User className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Logout always enabled */}
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
