"use client";

import { useEffect, useRef } from "react";

export default function HeroWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = 320); // Height bounds for the lower ribbon wave

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = 320;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor LERP for spring inertia
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Draw 3 layered organic blending ribbon waves
      // Wave 1: Warm Gold/Cream Ribbon
      drawRibbon(
        ctx,
        width,
        height,
        phase,
        0.0024, // frequency
        1.1, // speed multiplier
        42, // amplitude
        height * 0.52, // vertical offset
        "#ebd1a0", // color 1 (light gold)
        "#d5a864", // color 2 (rich gold)
        mouse,
        0.18 // mouse influence index
      );

      // Wave 2: Sky Blue Ribbon
      drawRibbon(
        ctx,
        width,
        height,
        phase + Math.PI * 0.45,
        0.002,
        0.9,
        36,
        height * 0.48,
        "#78c6f5",
        "#4395cf",
        mouse,
        -0.22
      );

      // Wave 3: Soft Sand Ribbon
      drawRibbon(
        ctx,
        width,
        height,
        phase + Math.PI * 0.9,
        0.003,
        0.8,
        30,
        height * 0.58,
        "#f0dcb2",
        "#cfab72",
        mouse,
        0.14
      );

      phase += 0.007; // wave travel speed
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[320px] absolute bottom-0 left-0 right-0 z-10 pointer-events-none select-none"
    />
  );
}

// Draw a smooth, filled, morphing ribbon shape
function drawRibbon(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  phase: number,
  freq: number,
  speedMult: number,
  amplitude: number,
  verticalOffset: number,
  colorStart: string,
  colorEnd: string,
  mouse: { x: number; y: number },
  mouseInfluence: number
) {
  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  ctx.globalAlpha = 0.7;

  const pointsTop: { x: number; y: number }[] = [];
  const pointsBottom: { x: number; y: number }[] = [];

  const steps = 45;
  const stepWidth = width / steps;

  for (let i = 0; i <= steps; i++) {
    const x = i * stepWidth;
    
    // Wave physics warp on cursor proximity
    const distToMouse = Math.abs(x - mouse.x);
    const mouseWarp = distToMouse < 220 
      ? (1 - distToMouse / 220) * mouseInfluence * (mouse.y - verticalOffset) * 0.85 
      : 0;

    const angleTop = x * freq + phase * speedMult;
    const yTop = verticalOffset + Math.sin(angleTop) * amplitude + mouseWarp;

    const angleBottom = x * (freq * 0.96) + phase * speedMult + 0.9;
    const yBottom = verticalOffset + 38 + Math.sin(angleBottom) * (amplitude * 0.85) + mouseWarp;

    pointsTop.push({ x, y: yTop });
    pointsBottom.push({ x, y: yBottom });
  }

  // Color linear gradient path
  const grad = ctx.createLinearGradient(0, 0, width, 0);
  grad.addColorStop(0, colorStart);
  grad.addColorStop(0.35, colorEnd);
  grad.addColorStop(0.65, colorEnd);
  grad.addColorStop(1, colorStart);

  ctx.fillStyle = grad;
  ctx.beginPath();

  // Top curve drawing using midpoint quadratic interpolation
  ctx.moveTo(pointsTop[0].x, pointsTop[0].y);
  for (let i = 1; i < pointsTop.length; i++) {
    const xc = (pointsTop[i].x + pointsTop[i - 1].x) / 2;
    const yc = (pointsTop[i].y + pointsTop[i - 1].y) / 2;
    ctx.quadraticCurveTo(pointsTop[i - 1].x, pointsTop[i - 1].y, xc, yc);
  }
  ctx.lineTo(pointsTop[pointsTop.length - 1].x, pointsTop[pointsTop.length - 1].y);

  // Close with bottom backwards path
  ctx.lineTo(pointsBottom[pointsBottom.length - 1].x, pointsBottom[pointsBottom.length - 1].y);
  for (let i = pointsBottom.length - 2; i >= 0; i--) {
    const xc = (pointsBottom[i].x + pointsBottom[i + 1].x) / 2;
    const yc = (pointsBottom[i].y + pointsBottom[i + 1].y) / 2;
    ctx.quadraticCurveTo(pointsBottom[i + 1].x, pointsBottom[i + 1].y, xc, yc);
  }
  ctx.lineTo(pointsBottom[0].x, pointsBottom[0].y);

  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
