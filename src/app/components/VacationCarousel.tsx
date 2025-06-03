// VacationCarousel.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import VacationCard from "./VacationCard";
import { JSX } from "react";
import CountdownCard from "./CountdownCard";
import { Vacation } from "../types/user";

interface VacationCarouselProps {
  pastVacations: Vacation[];
  nextVacation: Vacation | null;
  futureVacations: Vacation[];
}

export default function VacationCarousel({
  pastVacations,
  nextVacation,
  futureVacations,
}: VacationCarouselProps) {
  // Build the slides array:
  const slides: JSX.Element[] = [];

  // Add past vacations (reverse order for most recent first)
  slides.push(
    ...[...pastVacations]
      .reverse()
      .map((v) => <VacationCard key={`past-${v.id}`} vacation={v} past />)
  );

  // Center countdown card
  if (nextVacation) {
    slides.push(<CountdownCard key="next-vacation" vacation={nextVacation} />);
  }

  // Add remaining future vacations (excluding the next)
  slides.push(
    ...futureVacations
      .filter((v) => v.id !== nextVacation?.id)
      .map((v) => <VacationCard key={`future-${v.id}`} vacation={v} />)
  );

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <Swiper
        initialSlide={pastVacations.length} // center on countdown
        spaceBetween={30}
        centeredSlides
        grabCursor
        breakpoints={{
          640: { slidesPerView: 1.2 }, // Mobile
          1024: { slidesPerView: 3 }, // Tablet and up (shows 3 cards)
          1440: { slidesPerView: 4 }, // Desktop (shows 4 cards)
        }}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>{slide}</SwiperSlide>
        ))}
      </Swiper>
      {/* LEFT GRADIENT */}
      <div
        className="pointer-events-none absolute top-0 left-0 h-full w-90 z-20"
        style={{
          background: "linear-gradient(to right, #364156, rgba(245,245,245,0))",
        }}
      />

      {/* RIGHT GRADIENT */}
      <div
        className="pointer-events-none absolute top-0 right-0 h-full w-90 z-20"
        style={{
          background: "linear-gradient(to left, #364156, rgba(245,245,245,0))",
        }}
      />
    </div>
  );
}
