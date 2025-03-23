import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface InteractiveCanvasProps {
  mode: "light" | "dark";
}

export const InteractiveCanvas = ({ mode }: InteractiveCanvasProps) => {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const pointsRef = useRef<Point[]>([]);
  const frameRef = useRef<number>(undefined);
  const lastFrameTime = useRef<number>(0);
  const FPS = 30; // Limit FPS
  const frameDelay = 1000 / FPS;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Reinitialize points when resizing
      initPoints();
    };

    // Initialize points based on screen size
    const initPoints = () => {
      const pointCount = isMobile ? 15 : 50; // Reduced from 25 to 15 for mobile

      pointsRef.current = Array.from({ length: pointCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.5 : 2), // Reduced velocity
        vy: (Math.random() - 0.5) * (isMobile ? 0.5 : 2), // Reduced velocity
      }));
    };

    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;

      // Throttle frame rate
      if (timestamp - lastFrameTime.current < frameDelay) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime.current = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Adjust opacity based on mode and device
      const opacity = isMobile
        ? mode === "dark"
          ? 0.25
          : 0.3 // Increased opacity for mobile
        : mode === "dark"
        ? 0.1
        : 0.1;

      ctx.fillStyle =
        mode === "dark"
          ? `rgba(255, 255, 255, ${opacity})`
          : `rgba(0, 0, 0, ${opacity})`;
      ctx.strokeStyle =
        mode === "dark"
          ? `rgba(255, 255, 255, ${opacity * 2})`
          : `rgba(0, 0, 0, ${opacity * 2})`;

      const connectionDistance = isMobile ? 60 : 100; // Reduced connection distance
      const mouseDistance = isMobile ? 120 : 200; // Reduced mouse influence range

      pointsRef.current.forEach((point, i) => {
        point.x += point.vx;
        point.y += point.vy;

        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

        ctx.beginPath();
        ctx.arc(point.x, point.y, isMobile ? 1 : 2, 0, Math.PI * 2); // Smaller points
        ctx.fill();

        const dx = mousePos.x - point.x;
        const dy = mousePos.y - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseDistance) {
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(mousePos.x, mousePos.y);
          ctx.stroke();

          point.vx += dx * 0.0001;
          point.vy += dy * 0.0001;
        }

        pointsRef.current.slice(i + 1).forEach((other) => {
          const dx2 = other.x - point.x;
          const dy2 = other.y - point.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    resize();
    initPoints();
    animate(0);

    const handlePointerMove = (e: TouchEvent | MouseEvent) => {
      const x =
        "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const y =
        "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      setMousePos({ x, y });
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, isMobile]); // Add isMobile to dependencies

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
    />
  );
};
