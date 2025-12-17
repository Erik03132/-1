import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: string;
  delay?: string;
}

const Reveal: React.FC<RevealProps> = ({ 
  children, 
  className = "", 
  animation = "animate-fade-in", 
  delay = "" 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? `${animation} opacity-100 translate-y-0` : 'opacity-0 translate-y-8'} transition-all duration-700 ${delay}`}
    >
      {children}
    </div>
  );
};

export default Reveal;