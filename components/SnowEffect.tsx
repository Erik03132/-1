import React, { useEffect, useRef } from 'react';

const SnowEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    // Initial setup
    handleResize();

    // Конфигурация частиц
    const particleCount = 75; // Немного увеличим количество
    const particles: { x: number; y: number; radius: number; speed: number; drift: number; opacity: number }[] = [];

    // Инициализация
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 0.5, // Размер
        speed: Math.random() * 0.4 + 0.1, // Медленное падение (пыль)
        drift: Math.random() * 0.4 - 0.2, // Дрейф
        opacity: Math.random() * 0.3 + 0.1 // Разная прозрачность
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();

        // Обновление позиции
        p.y += p.speed;
        p.x += p.drift;

        // Если ушла за нижний край
        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        
        // Если ушла за боковые края
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-[1]" 
    />
  );
};

export default SnowEffect;