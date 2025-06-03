/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { getNextVacation } from "@/app/utils/user";
import VacationCard from "@/app/components/VacationCard";
import CountdownCard from "@/app/components/CountdownCard";
import RequireAuth from "@/app/components/RequireAuth";
import { VacationToast } from "../components/VacationToast";

function DashboardContent() {
  // If you know user is always defined here, you can assert:
  const { user } = useAuth();
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    // Show toast when dashboard mounts (or when user changes)
    if (user) setShowToast(true);
  }, [user]);

  if (!user) return null;

  const nextVacation = useMemo(
    () => getNextVacation(user!.futureVacations),
    [user]
  );

  const slides = [
    ...[...user.pastVacations]
      .reverse()
      .map((v) => <VacationCard key={`past-${v.id}`} vacation={v} past />),
    nextVacation ? (
      <CountdownCard key="next-vacation" vacation={nextVacation} />
    ) : null,
    ...user.futureVacations
      .filter((v) => v.id !== nextVacation?.id)
      .map((v) => <VacationCard key={`future-${v.id}`} vacation={v} />),
  ].filter(Boolean);

  return (
    <main className="mt-15 flex flex-col items-center min-h-screen bg-secondary p-8 overflow-x-hidden">
      <h1
        className="text-3xl font-extrabold mb-8   sm:text-3xl md:text-8xl lg:text-8xl xl:text-9xl drop-shadow-2xl
          text-hero-shadow whitespace-nowrap
          tracking-normal sm:tracking-wide md:tracking-wider
          bg-gradient-to-b from-[#D66853]  to-[#e4ddde]
          text-transparent bg-clip-text animated-gradient"
        style={{
          fontFamily: "var(--font-lilita-one), cursive",
        }}
      >
        Your Vacation Dashboard
      </h1>

      {/* Carousel */}
      <div className="w-full mx-auto mb-12 relative overflow-x-visible">
        <Swiper
          modules={[EffectCoverflow]}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0, // Card rotation in degrees (set to 0 for just scaling)
            stretch: 0, // Space between slides
            depth: 100, // Z axis depth
            scale: 0.85, // Scale of side slides (center is 1.0)
            modifier: 1, // Effect intensity (1 is standard)
            slideShadows: false, // Set to true for slide shadows
          }}
          initialSlide={user!.pastVacations.length}
          centeredSlides
          grabCursor
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 0 },
            640: { slidesPerView: 1.2, spaceBetween: 12 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 2.5, spaceBetween: 32 },
            1280: { slidesPerView: 3, spaceBetween: 40 },
          }}
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx}>{slide}</SwiperSlide>
          ))}
        </Swiper>

        {/* LEFT GRADIENT */}
        <div
          className="pointer-events-none absolute top-0 left-0 h-full md:w-90 w-20 z-0 md:z-90"
          style={{
            background:
              "linear-gradient(to right, #364156, rgba(245,245,245,0))",
          }}
        />

        {/* RIGHT GRADIENT */}
        <div
          className="pointer-events-none absolute top-0 right-0 h-full md:w-90 w-20 z-0 md:z-90"
          style={{
            background:
              "linear-gradient(to left, #364156, rgba(245,245,245,0))",
          }}
        />
      </div>

      <div className="w-full max-w-3xl mt-8">
        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-accent">
            Upcoming Plans
          </h2>
          <p>
            Quick summary or actions related to your upcoming trips could go
            here.
          </p>
        </section>
      </div>

      <VacationToast
        open={showToast}
        onClose={() => setShowToast(false)}
        daysToVacation={
          nextVacation
            ? Math.ceil(
                (new Date(nextVacation.startDate).getTime() - Date.now()) /
                  (1000 * 60 * 60 * 24)
              )
            : undefined
        }
        destination={nextVacation?.location}
      />
    </main>
  );
}

export default function DashboardPage() {
  return (
    <RequireAuth>
      <DashboardContent />
    </RequireAuth>
  );
}
