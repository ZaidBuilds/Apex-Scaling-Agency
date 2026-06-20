import { useState, useRef, MouseEvent } from "react";

export function use3DTilt(maxRotation = 12) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const elementRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current) return;
    const el = elementRef.current;
    const rect = el.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const normalizedX = x / rect.width - 0.5;
    const normalizedY = y / rect.height - 0.5;
    
    setRotateX(-normalizedY * maxRotation);
    setRotateY(normalizedX * maxRotation);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return {
    elementRef,
    rotateX,
    rotateY,
    handleMouseMove,
    handleMouseLeave,
    style: {
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: "transform 0.15s ease-out",
    },
  };
}
