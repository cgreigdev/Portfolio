"use client";
import { useRef, useEffect, useState } from "react";

interface HeptaGridProps {
  speed?: number;
  squareSize?: number;
  gap?: number;
  borderRadius?: number;
  direction?: "right" | "left" | "up" | "down" | "diagonal-down-right" | "diagonal-up-right" | "diagonal-down-left" | "diagonal-up-left";
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  dashArray?: number;
  hoverFillColor?: string;
  enableHover?: boolean;
  className?: string;
}

export default function HeptaGrid({
  speed = 0.13,
  squareSize = 60,
  gap = 5,
  borderRadius = 8,
  direction = "diagonal-up-right",
  backgroundColor = "transparent",
  borderColor = "#6b7d5f33",
  borderWidth = 1,
  dashArray = 0,
  hoverFillColor = "#6b7d5fa9",
  enableHover = true,
  className = "",
}: HeptaGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquare = useRef<{ rawX: number; rawY: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const adjSquareSize = isMobile ? squareSize * 1.2 : squareSize;
    const totalSize = adjSquareSize + gap;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const drawRoundedRect = (x: number, y: number, size: number, radius: number) => {
      if (radius > size / 2) radius = size / 2;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + size - radius, y);
      ctx.quadraticCurveTo(x + size, y, x + size, y + radius);
      ctx.lineTo(x + size, y + size - radius);
      ctx.quadraticCurveTo(x + size, y + size, x + size - radius, y + size);
      ctx.lineTo(x + radius, y + size);
      ctx.quadraticCurveTo(x, y + size, x, y + size - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    };

    const updateAnimation = () => {
      const effSpeed = isMobile ? speed * 0.5 : speed;
      switch (direction) {
        case "right": gridOffset.current.x = (gridOffset.current.x + effSpeed) % totalSize; break;
        case "left": gridOffset.current.x = (gridOffset.current.x - effSpeed) % totalSize; break;
        case "up": gridOffset.current.y = (gridOffset.current.y - effSpeed) % totalSize; break;
        case "down": gridOffset.current.y = (gridOffset.current.y + effSpeed) % totalSize; break;
        case "diagonal-down-right": gridOffset.current.x = (gridOffset.current.x + effSpeed) % totalSize; gridOffset.current.y = (gridOffset.current.y + effSpeed) % totalSize; break;
        case "diagonal-up-right": gridOffset.current.x = (gridOffset.current.x + effSpeed) % totalSize; gridOffset.current.y = (gridOffset.current.y - effSpeed) % totalSize; break;
        case "diagonal-down-left": gridOffset.current.x = (gridOffset.current.x - effSpeed) % totalSize; gridOffset.current.y = (gridOffset.current.y + effSpeed) % totalSize; break;
        case "diagonal-up-left": gridOffset.current.x = (gridOffset.current.x - effSpeed) % totalSize; gridOffset.current.y = (gridOffset.current.y - effSpeed) % totalSize; break;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.offsetWidth / totalSize) + 2;
      const rows = Math.ceil(canvas.offsetHeight / totalSize) + 2;

      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          const x = i * totalSize + gridOffset.current.x % totalSize;
          const y = j * totalSize + gridOffset.current.y % totalSize;

          let isHovered = false;
          if (enableHover && hoveredSquare.current) {
            const { rawX, rawY } = hoveredSquare.current;
            if (rawX >= x && rawX <= x + adjSquareSize && rawY >= y && rawY <= y + adjSquareSize) {
              isHovered = true;
            }
          }

          if (isHovered) {
            ctx.fillStyle = hoverFillColor;
            drawRoundedRect(x, y, adjSquareSize, borderRadius);
            ctx.fill();
          }

          ctx.strokeStyle = borderColor;
          ctx.lineWidth = borderWidth;
          ctx.setLineDash([dashArray, dashArray > 0 ? dashArray * 0.5 : 0]);
          drawRoundedRect(x, y, adjSquareSize, borderRadius);
          ctx.stroke();
        }
      }

      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      hoveredSquare.current = { rawX: e.clientX - rect.left, rawY: e.clientY - rect.top };
    };
    const handleMouseLeave = () => hoveredSquare.current = null;

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [squareSize, gap, borderRadius, direction, speed, isMobile, enableHover, borderColor, borderWidth, dashArray, hoverFillColor]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block", background: backgroundColor }}
    />
  );
}