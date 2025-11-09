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

  // Preload images to avoid mismatch between main image and thumbnails
  useEffect(() => {
    slides.forEach((s) => {
      const img = new (window as any).Image();

      img.src = s.image;
    });
  }, []);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  // Control por teclado
  useEffect(() => {
    const handleKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Control por scroll o swipe
  useEffect(() => {
    const handleWheel = (e: globalThis.WheelEvent) => {
      if (e.deltaY > 0) next();
      else if (e.deltaY < 0) prev();
    };

    window.addEventListener("wheel", handleWheel);

    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    // volver a ocupar toda la ventana para que la imagen quede bajo navbar/footer
    <div className="relative w-full h-screen overflow-hidden text-white">
      {/* Fondo dinámico */}
      <AnimatePresence mode="wait">
        <motion.img
          // usar la URL como key para asegurar que la animación responda al cambio de imagen
          key={slides[index].image}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 w-full h-full object-cover brightness-90 dark:brightness-75 z-0"
          exit={{ opacity: 0, scale: 1.05 }}
          initial={{ opacity: 0, scale: 1.1 }}
          src={slides[index].image}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Capa de oscurecimiento (por encima de la imagen, por debajo del contenido) */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent dark:from-black/10 dark:via-black/5 dark:to-transparent z-10" />

      {/* Texto principal (por encima del overlay) */}
      <div className="absolute inset-y-0 left-0 z-20 flex flex-col justify-center pl-16 pr-8 max-w-lg py-20">
        <motion.h1
          key={slides[index].title}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-bold mb-4 drop-shadow-lg text-black dark:text-white"
          initial={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {slides[index].title}
        </motion.h1>
        <motion.p
          key={slides[index].description}
          animate={{ opacity: 1 }}
          className="text-lg leading-relaxed text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.3 }}
        >
          {slides[index].description}
        </motion.p>
      </div>

      {/* Previsualizaciones rotando en 3D */}
      <div
        className="absolute right-10 top-1/2 translate-y-[-50%] mt-16 flex flex-col items-center gap-6 z-20"
        style={{
          perspective: "1000px",
        }}
      >
        {/* mostrar prev, current, next */}
        {[-1, 0, 1].map((offset) => {
          const previewIndex = (index + offset + slides.length) % slides.length;
          const isCurrent = offset === 0;
          const rotation = offset * 18; // menos rotación para más sutileza
          const zDistance = offset * -80;
          const baseScale = isCurrent ? 1.18 : 0.88;
          const borderClass = isCurrent
            ? "ring-4 ring-black/80 border-black/30 dark:ring-white/80 dark:border-white/30"
            : "border-4 border-black/20 dark:border-white/20";
          const shadowClass = isCurrent
            ? "shadow-lg dark:shadow-2xl"
            : "shadow-sm dark:shadow-lg";

          return (
            <motion.div
              key={slides[previewIndex].image}
              layout
              animate={{
                opacity: 1,
                scale: baseScale,
                rotateY: rotation,
                z: zDistance,
              }}
              className={`w-32 h-32 rounded-full overflow-hidden ${borderClass} ${shadowClass} hover:scale-105 transition-transform cursor-pointer`}
              initial={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onClick={() => setIndex(previewIndex)}
            >
              <img
                alt={slides[previewIndex].title}
                className="object-cover w-full h-full"
                src={slides[previewIndex].image}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Indicador inferior */}
      <div className="absolute bottom-12 w-full flex justify-center gap-3 z-20">
        {slides.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: i === index ? 1.4 : 1,
              opacity: i === index ? 1 : 0.5,
            }}
            className={`w-3 h-3 rounded-full ${i === index ? "bg-black dark:bg-white" : "bg-black/30 dark:bg-white/30"}`}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}
