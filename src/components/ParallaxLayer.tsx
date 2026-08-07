"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // 0.1 = slow, 0.5 = medium, 1 = full
  direction?: "up" | "down";
}

export default function ParallaxLayer({
  children,
  className = "",
  speed = 0.3,
  direction = "up",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const factor = direction === "up" ? -1 : 1;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [factor * speed * 100, factor * speed * -100]
  );

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
