import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VacationToastProps {
  open: boolean;
  onClose: () => void;
  daysToVacation?: number;
  destination?: string;
}

export function VacationToast({
  open,
  onClose,
  daysToVacation,
  destination,
}: VacationToastProps) {
  // Auto-dismiss after 2.5s
  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, 3500);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  // SVG sun with sunglasses!
  const SunIcon = (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      width="60"
      height="60"
      initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
      animate={{ rotate: [-15, 15, -10, 0], scale: 1, opacity: 1 }}
      exit={{ y: -30, opacity: 0, scale: 0.7 }}
      transition={{
        rotate: { duration: 1, type: "tween", ease: "easeInOut" },
        opacity: { duration: 0.6, delay: 0.1 },
        scale: { type: "spring", stiffness: 180 },
      }}
      className="mx-auto mb-1"
    >
      <circle cx="40" cy="40" r="24" fill="#facc15" />
      {/* Sunglasses */}
      <ellipse cx="31" cy="40" rx="7" ry="5" fill="#222" />
      <ellipse cx="49" cy="40" rx="7" ry="5" fill="#222" />
      <rect x="24" y="38" width="7" height="2.5" rx="1" fill="#222" />
      <rect x="49" y="38" width="7" height="2.5" rx="1" fill="#222" />
      {/* Smile */}
      <path
        d="M33 48 Q40 54 47 48"
        stroke="#d97706"
        strokeWidth="2.5"
        fill="none"
      />
      {/* Sun rays */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI) / 4;
        const x1 = 40 + Math.cos(angle) * 28;
        const y1 = 40 + Math.sin(angle) * 28;
        const x2 = 40 + Math.cos(angle) * 36;
        const y2 = 40 + Math.sin(angle) * 36;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#facc15"
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
      })}
    </motion.svg>
  );

  // Toast body/message
  const message =
    daysToVacation !== undefined ? (
      <>
        <span className="font-semibold text-primary">
          Only <span className="text-accent">{daysToVacation} days</span> until
          your trip
          {destination ? (
            <>
              {" "}
              to <span className="font-bold">{destination}</span>
            </>
          ) : null}
          !
        </span>
      </>
    ) : (
      <>
        <span className="font-semibold text-primary">
          Ready for your next adventure?
        </span>
        <br />
        <a
          href="/vacations/new"
          className="text-accent underline font-medium hover:text-accent/80"
        >
          Start planning now!
        </a>
      </>
    );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1050] bg-white/95 border border-primary/30 rounded-xl shadow-2xl px-6 py-4 flex flex-col items-center"
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", duration: 0.45 }}
        >
          {SunIcon}
          <div className="text-center text-lg">{message}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
