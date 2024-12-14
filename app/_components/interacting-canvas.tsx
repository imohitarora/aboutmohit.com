import { useEffect, useRef, useState } from "react";

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const pointsRef = useRef<Point[]>([]);
  const frameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize points
    const initPoints = () => {
      pointsRef.current = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
      }));
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle =
        mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
      ctx.strokeStyle =
        mode === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";

      pointsRef.current.forEach((point, i) => {
        // Update position
        point.x += point.vx;
        point.y += point.vy;

        // Bounce off walls
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

        // Draw point
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Connect to mouse if nearby
        const dx = mousePos.x - point.x;
        const dy = mousePos.y - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(mousePos.x, mousePos.y);
          ctx.stroke();

          // Attract to mouse
          point.vx += dx * 0.0001;
          point.vy += dy * 0.0001;
        }

        // Connect nearby points
        pointsRef.current.slice(i + 1).forEach((other) => {
          const dx2 = other.x - point.x;
          const dy2 = other.y - point.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < 100) {
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
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    });

    return () => {
      window.removeEventListener("resize", resize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
    />
  );
};
