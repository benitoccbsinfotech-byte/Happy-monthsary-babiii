import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation: number;
  rotSpeed: number;
  color: string;
  type: 'heart' | 'sparkle' | 'petal';
}

export const FloatingHearts: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(244, 114, 182, ', // pink-400
      'rgba(251, 113, 133, ', // rose-400
      'rgba(253, 164, 175, ', // rose-300
      'rgba(248, 180, 217, ', // pastel pink
      'rgba(239, 68, 68, ',   // warm red
      'rgba(255, 214, 224, ', // soft blush
    ];

    const particles: Particle[] = [];
    const maxParticles = 32;

    const createParticle = (customX?: number, customY?: number, isBurst?: boolean): Particle => {
      const typeRand = Math.random();
      const type: 'heart' | 'sparkle' | 'petal' =
        typeRand < 0.65 ? 'heart' : typeRand < 0.85 ? 'petal' : 'sparkle';

      return {
        x: customX !== undefined ? customX : Math.random() * width,
        y: customY !== undefined ? customY : height + Math.random() * 80,
        size: isBurst ? Math.random() * 16 + 12 : Math.random() * 14 + 10,
        speedY: isBurst ? -(Math.random() * 3 + 2) : -(Math.random() * 1.2 + 0.5),
        speedX: isBurst ? (Math.random() - 0.5) * 4 : Math.sin(Math.random() * Math.PI) * 0.8 - 0.4,
        opacity: Math.random() * 0.5 + 0.35,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        color: colors[Math.floor(Math.random() * colors.length)],
        type,
      };
    };

    for (let i = 0; i < maxParticles; i++) {
      const p = createParticle();
      p.y = Math.random() * height; // distribute initial
      particles.push(p);
    }

    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number,
      rotation: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.beginPath();
      context.fillStyle = `${color}${opacity})`;

      const topCurveHeight = size * 0.3;
      context.moveTo(0, topCurveHeight);
      // top left curve
      context.bezierCurveTo(-size / 2, -topCurveHeight, -size, topCurveHeight / 3, 0, size);
      // top right curve
      context.bezierCurveTo(size, topCurveHeight / 3, size / 2, -topCurveHeight, 0, topCurveHeight);

      context.fill();
      context.restore();
    };

    const drawPetal = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number,
      rotation: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.beginPath();
      context.fillStyle = `${color}${opacity * 0.8})`;
      context.ellipse(0, 0, size * 0.5, size * 0.9, 0, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const drawSparkle = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      opacity: number
    ) => {
      context.save();
      context.translate(x, y);
      context.fillStyle = `rgba(255, 230, 180, ${opacity})`;
      context.beginPath();
      context.arc(0, 0, size * 0.25, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.015) * 0.6 + p.speedX;
        p.rotation += p.rotSpeed;

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        } else if (p.type === 'petal') {
          drawPetal(ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        } else {
          drawSparkle(ctx, p.x, p.y, p.size, p.opacity);
        }

        // Recycle particle when it drifts off screen
        if (p.y < -40 || p.x < -40 || p.x > width + 40) {
          particles[i] = createParticle();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Burst on click
    const handleClick = (e: MouseEvent) => {
      for (let k = 0; k < 6; k++) {
        particles.push(createParticle(e.clientX, e.clientY, true));
      }
      if (particles.length > 55) {
        particles.splice(0, 6);
      }
    };
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 h-full w-full opacity-70"
      aria-hidden="true"
    />
  );
};
