// app/components/RequireAuth.tsx
"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      console.log("Redirecting to home...");
      router.replace("/");
    }
  }, [user, router]);

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent mb-2"></div>
        <p className="text-accent">Redirecting...</p>
      </div>
    );

  return <>{children}</>;
}
