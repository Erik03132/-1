
import React, { useEffect } from 'react';

declare global {
  interface Window {
    particlesJS: any;
  }
}

const SnowEffect: React.FC = () => {
  useEffect(() => {
    const initParticles = () => {
      if (window.particlesJS) {
        window.particlesJS('particles-js', {
          particles: {
            number: { value: 60, density: { enable: true, value_area: 1200 } },
            color: { value: "#38bdf8" },
            shape: { type: "circle" },
            opacity: { value: 0.2, random: true },
            size: { value: 2, random: true },
            line_linked: { 
              enable: true, 
              distance: 180, 
              color: "#38bdf8", 
              opacity: 0.1, 
              width: 1 
            },
            move: { 
              enable: true, 
              speed: 1, 
              direction: "none", 
              random: true, 
              straight: false, 
              out_mode: "out", 
              bounce: false 
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: false }, resize: true },
            modes: { grab: { distance: 200, line_linked: { opacity: 0.3 } } }
          },
          retina_detect: true
        });
      } else {
        setTimeout(initParticles, 100);
      }
    };

    initParticles();
  }, []);

  return (
    <div 
      id="particles-js" 
      className="fixed inset-0 w-full h-full -z-10 bg-[#0b0f1a]" 
    />
  );
};

export default SnowEffect;
