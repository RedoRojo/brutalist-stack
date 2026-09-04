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
        bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-xl p-6
        hover:shadow-lg hover:border-[var(--border-hover)] transition-all duration-200
        ${accent ? "border-l-4 border-l-[var(--accent)]" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

