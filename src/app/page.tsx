"use client";
import { useAuth } from "@/app/context/AuthContext";
import React, { useRef, useState } from "react";
import { useInView, motion, AnimatePresence } from "framer-motion";

import Align from "./components/Align";

import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";
import PageTitle from "./components/PageTitle";

import Section from "./components/Section";
import SignUpLoginDialog from "./components/SignUpLoginDialog";

export default function HomePage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const isNavInView = useInView(navRef, { margin: "-48px 0px 0px 0px" }); // tweak as needed

  const { user } = useAuth();

  return (
    <div>
      <PageTitle title="Vacation Planner">
        <div ref={navRef}>
          <NavBar className="mt-15" onLoginClick={() => setDialogOpen(true)} />
        </div>
      </PageTitle>

      {/* Sticky centered navbar when original is out of view */}
      <AnimatePresence>
        {!isNavInView && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100vw", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{
              width: { duration: 0.2, ease: "easeOut" },
              opacity: { duration: 0.3 },
            }}
            className="fixed py-6 md:py-10 top-0 left-0 right-0 z-[999] h-15 flex items-center justify-center bg-secondary shadow-xl overflow-hidden"
          >
            <NavBar onLoginClick={() => setDialogOpen(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      <HeroSection
        imageUrl="/backgrounds/coastal-overlook.jpg"
        title="Where to?"
        description="Discover beautiful destinations, track your journeys, and get inspired for your next escape."
        scrollEffect="sticky" // try "parallax", "fadeIn", etc.
      >
        <Align align="left">
          <button
            onClick={() => setDialogOpen(true)}
            className="bg-accent mb-20 hover:bg-primary transition rounded-lg px-8 py-3 text-xl font-bold shadow-lg pointer-events-auto"
          >
            {user ? "Book Now" : "Sign-Up!"}
          </button>
        </Align>
      </HeroSection>
      {/* Main content scrolls up over the hero */}
      <Section color="bg-primary" height="min-h-[50vh]" rounded="top">
        <h2 className="text-3xl font-bold mb-8 text-accent">Your Dashboard</h2>
        <p>...More awesome travel content...</p>
      </Section>
      <HeroSection
        imageUrl="/backgrounds/waterfall.jpg"
        title="Plan Your Next Adventure"
        description="Discover beautiful destinations, track your journeys, and get inspired for your next escape."
        scrollEffect="static" // try "parallax", "fadeIn", etc.
        maskAngle={45}
        maskDirection="right"
        maskedBgColor="var(--color-primary)"
        maskedBgColor2="var(--color-secondary)"
      >
        <button className="bg-accent hover:bg-blue-700 transition rounded-lg px-8 py-3 text-xl font-bold shadow-lg pointer-events-auto">
          Explore Dashboard
        </button>
      </HeroSection>
      {/* Main content scrolls up over the hero */}
      <section className="relative z-10 bg-secondary min-h-[100vh] p-10">
        <h2 className="text-3xl font-bold mb-8">Your Dashboard</h2>
        <p>...More awesome travel content...</p>
      </section>
      <HeroSection
        imageUrl="/backgrounds/beach.jpg"
        // title="Plan Your Next Adventure"
        // description="Discover beautiful destinations, track your journeys, and get inspired for your next escape."
        scrollEffect="zoomOut" // try "parallax", "fadeIn", etc.
      >
        {/* <button className="bg-blue-500 hover:bg-blue-700 transition rounded-lg px-8 py-3 text-xl font-bold shadow-lg pointer-events-auto">
          Explore Dashboard
        </button> */}
      </HeroSection>
      {/* Main content scrolls up over the hero */}
      <section className="relative z-10 bg-accent min-h-[100vh] p-10">
        <h2 className="text-5xl font-bold mb-8 text-primary">Your Dashboard</h2>
        <p>...More awesome travel content...</p>
      </section>
      <HeroSection
        imageUrl="/backgrounds/sunset.jpg"
        title="Plan Your Next Adventure"
        description="Discover beautiful destinations, track your journeys, and get inspired for your next escape."
        scrollEffect="slideLeft" // try "parallax", "fadeIn", etc.
        imageScale={2}
      >
        <button className="bg-blue-500 hover:bg-blue-700 transition rounded-lg px-8 py-3 text-xl font-bold shadow-lg pointer-events-auto">
          Explore Dashboard
        </button>
      </HeroSection>
      {/* Main content scrolls up over the hero */}
      <section className="relative z-10 bg-bg min-h-[100vh] p-10">
        <h2 className="text-3xl font-bold mb-8">Your Dashboard</h2>
        <p>...More awesome travel content...</p>
      </section>

      <SignUpLoginDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
}
