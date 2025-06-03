"use client";
import { usePathname } from "next/navigation";
import NavBar from "./NavBar";
import { motion, AnimatePresence } from "framer-motion";

export default function StickyNavClient() {
  const pathname = usePathname();
  // Show sticky NavBar on all non-home pages
  if (pathname === "/") return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100vw", opacity: 1 }}
        exit={{ width: 0, opacity: 0 }}
        transition={{
          width: { duration: 0.2, ease: "easeOut" },
          opacity: { duration: 0.3 },
        }}
        className="bg-accent2  w-full max-w-full fixed py-6 md:py-10 top-0 left-0 right-0 z-[999] h-15 flex items-center justify-center bg-secondary shadow-xl overflow-hidden"
      >
        <NavBar currentPath={pathname} />
      </motion.div>
    </AnimatePresence>
  );
}
