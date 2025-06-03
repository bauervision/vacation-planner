"use client";
import React, { createContext, useContext, useState } from "react";
import { demoUser } from "../constants";
import { User } from "../types/user";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  login: (username: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  function login(username: string) {
    if (username.trim().toLowerCase() === "mcb") {
      setUser(demoUser);
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
    router.replace("/");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function useAuthenticatedUser() {
  const { user } = useAuth();
  if (!user) {
    throw new Error(
      "useAuthenticatedUser: user is null – authentication required."
    );
  }
  return user;
}
