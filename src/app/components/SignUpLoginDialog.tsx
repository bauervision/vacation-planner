"use client";
import { useAuth } from "@/app/context/AuthContext";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserIcon, LockIcon, SunIcon } from "lucide-react"; // <--- You can swap SunIcon for your app icon

interface SignUpLoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SignUpLoginDialog({
  open,
  onClose,
}: SignUpLoginDialogProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const { login } = useAuth();
  const [error, setError] = useState("");

  function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const username = form.username.value.trim();

    if (login(username)) {
      setError("");
      onClose();
    } else {
      setError("Username must be 'mcb'");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-gradient-to-br from-primary/80 via-sky-200/80 to-secondary/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="
              relative
              z-[1001]
              w-[90vw] max-w-sm
              p-8 pb-6
              rounded-2xl
              shadow-2xl
              flex flex-col gap-4
              max-h-[90vh]
              overflow-y-auto
              bg-white/70
              backdrop-blur-md
              border-4 border-primary
            "
            initial={{ y: 50, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 50, scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-primary text-2xl"
              aria-label="Close"
              onClick={onClose}
              type="button"
            >
              ×
            </button>
            <div className="flex flex-col items-center gap-2 mb-2">
              <span className="bg-primary p-3 rounded-full shadow-lg flex items-center justify-center">
                <SunIcon className="h-7 w-7 text-white" />
              </span>
              <h2 className="text-2xl font-bold text-primary text-center tracking-tight drop-shadow">
                {mode === "login" ? "Welcome Back!" : "Create Your Account"}
              </h2>
              <p className="text-muted-foreground text-sm text-center">
                {mode === "login"
                  ? "Log in to start planning your perfect trip"
                  : "Sign up and start dreaming!"}
              </p>
            </div>
            <form
              className="flex flex-col gap-3 mt-2"
              onSubmit={handleLoginSubmit}
            >
              {mode === "signup" && (
                <div className="relative">
                  <input
                    className="w-full text-primary rounded-lg px-10 py-3 border border-gray-200 bg-white/70 focus:ring-2 focus:ring-accent focus:outline-none focus:bg-white shadow-sm transition-all"
                    type="text"
                    placeholder="Full Name"
                    autoComplete="name"
                  />
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              )}
              <div className="relative">
                <input
                  name="username"
                  className="w-full text-primary rounded-lg px-10 py-3 border border-gray-200 bg-white/70 focus:ring-2 focus:ring-primary/80 focus:outline-none focus:bg-white shadow-sm transition-all"
                  placeholder="Username"
                  required
                  autoFocus
                />
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
              <div className="relative">
                <input
                  className="w-full text-primary rounded-lg px-10 py-3 border border-gray-200 bg-white/70 focus:ring-2 focus:ring-primary/60 focus:outline-none focus:bg-white shadow-sm transition-all"
                  type="password"
                  placeholder="Password"
                  autoComplete={
                    mode === "signup" ? "new-password" : "current-password"
                  }
                />
                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.03 }}
                className="mt-3 bg-primary text-white py-2.5 rounded-lg font-semibold shadow-lg hover:bg-primary/90 transition-all text-lg tracking-wide"
                type="submit"
              >
                {mode === "login" ? "Login" : "Sign Up"}
              </motion.button>
              {error && (
                <div className="text-destructive text-sm pl-1">{error}</div>
              )}
            </form>
            <div className="text-center text-sm text-gray-600 mt-3">
              {mode === "login" ? (
                <>
                  {"Don't have an account? "}
                  <button
                    className="text-accent font-semibold hover:underline transition"
                    onClick={() => setMode("signup")}
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    className="text-accent font-semibold hover:underline transition"
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
