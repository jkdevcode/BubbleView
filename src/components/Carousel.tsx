import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { slideImages, slideInfo } from "../mocks/mock-carousel";

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
}

const slides: Slide[] = slideImages.slice(0, 5).map((img, i) => ({
  id: i + 1,
  title: slideInfo[i]?.title ?? `Slide ${i + 1}`,
  description: slideInfo[i]?.text ?? "",
  image: img,
}));

export default function CinematicCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    slides.forEach((s) => {
      const img = new window.Image();

      img.src = s.image;
    });
  }, []);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    const handleKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const handleWheel = (e: globalThis.WheelEvent) => {
      if (e.deltaY > 0) next();
      else if (e.deltaY < 0) prev();
    };

    window.addEventListener("wheel", handleWheel);

    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="relative w-full h-[100dvh] md:h-screen overflow-hidden text-black dark:text-white">
      {/* Fondo cinematográfico con animación */}
      <AnimatePresence mode="wait">
        <motion.img
          key={slides[index].image}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px) saturate(100%) brightness(1)",
          }}
          className="absolute inset-0 w-full h-full object-cover z-0"
          exit={{ opacity: 0, scale: 1.05, filter: "blur(8px) saturate(90%)" }}
          initial={{
            opacity: 0,
            scale: 1.08,
            filter: "blur(10px) saturate(80%)",
          }}
          src={slides[index].image}
          transition={{
            duration: 1,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </AnimatePresence>

      {/* Glow ambiental suave */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 200, -150, 0],
            y: [0, -100, 150, 0],
            opacity: [0.2, 0.4, 0.3, 0.2],
          }}
          className="absolute w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl"
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Overlay adaptable (con variantes para modo claro/oscuro) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent dark:from-black/70 dark:via-black/40 dark:to-transparent z-10 md:bg-gradient-to-r md:from-black/60 md:via-black/40 md:to-transparent" />

      {/* Texto principal */}
      <div className="absolute inset-x-0 bottom-34 md:inset-y-0 md:left-0 z-20 flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 md:pl-16 md:pr-8 py-10 md:max-w-lg">
        <motion.h1
          key={slides[index].title}
          animate={{ y: 0, opacity: 1 }}
          className="relative text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-stone-800 via-stone-600 to-stone-800 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          initial={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          {slides[index].title}
        </motion.h1>

        <motion.p
          key={slides[index].description}
          animate={{ opacity: 1 }}
          className="relative text-base sm:text-lg leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-stone-700 via-stone-500 to-stone-700 dark:from-cyan-200 dark:via-blue-200 dark:to-purple-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.3 }}
        >
          {slides[index].description}
        </motion.p>
      </div>

      {/* Miniaturas con efecto 3D mejorado - OPTIMIZADO */}
      <div
        className="absolute pb-5 z-20 flex justify-center md:flex-col md:right-10 md:top-1/2 md:translate-y-[-50%] w-full md:w-auto gap-4 md:gap-6"
        style={{
          perspective: "1000px",
          bottom: "calc(env(safe-area-inset-bottom, 0px) + 3rem)",
        }}
      >
        {[-1, 0, 1].map((offset) => {
          const previewIndex = (index + offset + slides.length) % slides.length;
          const isCurrent = offset === 0;
          const rotation = offset * 18;
          const zDistance = offset * -80;
          const baseScale = isCurrent ? 1.1 : 0.85;
          const borderClass = isCurrent
            ? "ring-2 ring-black/10 dark:ring-white/80 border-black/20 dark:border-white/30"
            : "border-2 border-black/10 dark:border-white/20";
          const shadowClass = isCurrent ? "shadow-lg" : "shadow-sm opacity-80";

          return (
            <motion.div
              key={offset}
              animate={{
                opacity: 1,
                scale: baseScale,
                rotateY: rotation,
                z: zDistance,
              }}
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ${borderClass} ${shadowClass} cursor-pointer relative group`}
              style={{
                willChange: "transform",
              }}
              transition={{
                duration: 0.5,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
              whileHover={{
                scale: 1.12,
                rotateY: rotation + 3,
              }}
              whileTap={{ scale: 1.05 }}
              onClick={() => setIndex(previewIndex)}
            >
              <motion.img
                alt={slides[previewIndex].title}
                animate={{
                  filter: "brightness(1)",
                  scale: 1,
                }}
                className="object-cover w-full h-full"
                src={slides[previewIndex].image}
                style={{
                  willChange: "filter, transform",
                }}
                transition={{ duration: 0.3 }}
                whileHover={{
                  filter: "brightness(1.1)",
                  scale: 1.05,
                }}
              />
              {/* Glow circular interno */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          );
        })}
      </div>

      {/* Indicadores inferiores (ajustados para safe-area en móviles) */}
      <div
        className="absolute w-full flex justify-center gap-3 pb-5 z-20"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
      >
        {slides.map((_, i) => {
          const isActive = i === index;
          const activeClass =
            "w-2.5 h-2.5 rounded-full bg-gradient-to-r from-stone-800 via-stone-600 to-stone-800 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300";
          // Inactivo: gradiente claro en light mode, gradiente translúcido + borde en dark mode para mejor contraste
          const inactiveClass =
            "w-2.5 h-2.5 rounded-full bg-gradient-to-r from-stone-400 via-stone-300 to-stone-400 " +
            "dark:from-white/30 dark:via-white/20 dark:to-white/30 dark:border dark:border-white/10 dark:shadow-[0_0_6px_rgba(255,255,255,0.04)]";

          return (
            <motion.div
              key={i}
              animate={{
                scale: isActive ? 1.3 : 1,
                opacity: isActive ? 1 : 0.6,
              }}
              className={isActive ? activeClass : inactiveClass}
              transition={{ duration: 0.3 }}
            />
          );
        })}
      </div>
    </div>
  );
}
