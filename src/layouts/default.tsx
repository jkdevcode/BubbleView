import type React from "react";

import { Navbar } from "@/components/navbar";
import Footer from "@/components/Footer";
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      {/* main sin padding para permitir que el carrusel ocupe toda la ventana */}
      <div className="absolute inset-0 z-0">{children}</div>
      <Footer />
    </div>
  );
}
