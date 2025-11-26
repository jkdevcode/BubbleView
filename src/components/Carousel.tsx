import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

import { slideImages, slideInfo } from "../mocks/mock-carousel";

interface Slide {
  id: number;
  title: string;
  description: string;
  image: {
    small: string;
    desktop: string;
  };
}

export default function CinematicCarousel() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [screenSize, setScreenSize] = useState<"small" | "desktop">("desktop");

  // Detectar tamaño de pantalla
  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth < 1024) {
        setScreenSize("small");
      } else {
        setScreenSize("desktop");
      }
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  // Memoizar slides para evitar recrearlos en cada render y para usar en efectos de preload
  const slides: Slide[] = useMemo(
    () =>
      slideImages.slice(0, 5).map((img, i) => ({
        id: i + 1,
        title: t(slideInfo[i]?.titleKey ?? "carousel-oriental-title"),
        description: t(slideInfo[i]?.descKey ?? "carousel-oriental-desc"),
        image: img,
      })),
    [t],
  );

  // Preload imágenes (dependiendo de slides memoizados y screenSize)
  useEffect(() => {
    slides.forEach((s) => {
      const img = new window.Image();

      img.src = s.image[screenSize];
    });
  }, [slides, screenSize]);

  // Autoplay pausable
  const autoplayRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const start = () => {
      if (autoplayRef.current == null) {
        autoplayRef.current = window.setInterval(() => {
          if (!pausedRef.current) setIndex((i) => (i + 1) % slides.length);
        }, 5000);
      }
    };

    start();

    return () => {
      if (autoplayRef.current != null) {
        window.clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
  }, [slides.length]);

  // Debounce para scroll (rueda) y control de teclas
  const wheelTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % slides.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + slides.length) % slides.length);
    };

    const handleWheel = (e: globalThis.WheelEvent) => {
      // debounce básico para evitar saltos múltiples
      if (wheelTimeoutRef.current) return;
      wheelTimeoutRef.current = window.setTimeout(() => {
        wheelTimeoutRef.current && window.clearTimeout(wheelTimeoutRef.current);
        wheelTimeoutRef.current = null;
      }, 300);

      if (e.deltaY > 0) setIndex((i) => (i + 1) % slides.length);
      else if (e.deltaY < 0)
        setIndex((i) => (i - 1 + slides.length) % slides.length);
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("wheel", handleWheel);
      if (wheelTimeoutRef.current) {
        window.clearTimeout(wheelTimeoutRef.current);
        wheelTimeoutRef.current = null;
      }
    };
  }, [slides.length]);

  // Helper para obtener la imagen correcta según breakpoint
  const getImageSrc = (slide: Slide): string => {
    return slide.image[screenSize];
  };

  return (
    <div
      className="relative w-full h-[100dvh] md:h-screen overflow-hidden text-black dark:text-white"
      onBlur={() => (pausedRef.current = false)}
      onFocus={() => (pausedRef.current = true)}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      {/* Leer por lectores de pantalla cuando cambia la slide */}
      <span aria-live="polite" className="sr-only">
        {slides[index].title}
      </span>

      {/* Fondo cinematográfico con animación */}
      <AnimatePresence mode="wait">
        <motion.img
          key={getImageSrc(slides[index])}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px) saturate(100%) brightness(1)",
          }}
          className="absolute inset-0 w-full h-full object-cover z-0"
          exit={{ opacity: 0, scale: 1.03, filter: "blur(6px) saturate(90%)" }}
          initial={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(8px) saturate(80%)",
          }}
          src={getImageSrc(slides[index])}
          transition={{
            // imagen más ágil para que el contenido textual se sincronice mejor
            duration: 0.9,
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
          initial={{ y: 20, opacity: 0 }}
          // título aparece primero (delay reducido y duración cómoda)
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {slides[index].title}
        </motion.h1>

        <motion.p
          key={slides[index].description}
          animate={{ y: 0, opacity: 1 }}
          // animación de entrada: slide + fade
          className="relative text-base sm:text-lg leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-stone-700 via-stone-500 to-stone-700 dark:from-cyan-200 dark:via-blue-200 dark:to-purple-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]"
          initial={{ y: 12, opacity: 0 }}
          // delay mayor que el título para respetar jerarquía visual
          transition={{ duration: 0.45, delay: 0.55 }}
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
          // rotación menos agresiva y distancia Z reducida
          const rotation = offset * 12;
          const zDistance = offset * -60;
          const baseScale = isCurrent ? 1.08 : 0.86;
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
                duration: 0.35,
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
                src={getImageSrc(slides[previewIndex])}
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
