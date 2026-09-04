"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  accent?: boolean;
  className?: string;
  delay?: number;
}

export default function Card({ children, accent = false, className = "", delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`
        bg-white border border-neutral-200 rounded-xl p-6
        hover:shadow-lg hover:border-neutral-300 transition-shadow duration-300
        ${accent ? "border-l-4 border-l-blue-600" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

