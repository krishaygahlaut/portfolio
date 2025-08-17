"use client";
import Particles from "react-tsparticles";
import { useCallback } from "react";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: any) => {
    try {
      await loadFull(engine);
    } catch (err) {
      console.error("Particles init error:", err);
    }
  }, []);

  const particlesLoaded = useCallback(async (container: any) => {
    console.log("Particles loaded:", container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: { enable: false },
        background: { color: "transparent" },
        particles: {
          number: { value: 50 },
          color: { value: "#ffffff" },
          size: { value: 2 },
          move: { enable: true, speed: 1 },
        },
      }}
      className="absolute inset-0 -z-10"
    />
  );
}