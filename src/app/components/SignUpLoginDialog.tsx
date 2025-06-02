"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SignUpLoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SignUpLoginDialog({
  open,
  onClose,
}: SignUpLoginDialogProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1000] flex bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="
    fixed z-[1001]
    left-1/2 top-1/2
    -translate-x-1/2 -translate-y-1/2
    bg-white
    w-[90vw] max-w-sm
    p-6
    rounded-2xl
    shadow-2xl
    flex flex-col
    gap-4
    max-h-[90vh]
    overflow-y-auto
  "
            initial={{ y: 50, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 50, scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-900 text-2xl"
              aria-label="Close"
              onClick={onClose}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              {mode === "login" ? "Login" : "Sign Up"}
            </h2>
            <form className="flex flex-col gap-3">
              {mode === "signup" && (
                <input
                  className="rounded px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                  type="text"
                  placeholder="Full Name"
                  autoComplete="name"
                />
              )}
              <input
                className="rounded px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                type="email"
                placeholder="Email"
                autoComplete="email"
                required
              />
              <input
                className="rounded px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                type="password"
                placeholder="Password"
                autoComplete={
                  mode === "signup" ? "new-password" : "current-password"
                }
                required
              />
              <button
                className="mt-2 bg-primary text-white py-2 rounded font-semibold shadow hover:bg-primary/90 transition"
                type="submit"
              >
                {mode === "login" ? "Login" : "Sign Up"}
              </button>
            </form>
            <div className="text-center text-sm text-gray-600 mt-2">
              {mode === "login" ? (
                <>
                  {" Don't have an account? "}
                  <button
                    className="text-accent font-medium hover:underline"
                    onClick={() => setMode("signup")}
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    className="text-accent font-medium hover:underline"
                    onClick={() => setMode("login")}
                  >
                    Log in
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
