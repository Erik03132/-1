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
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
          },
          interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
          },
          retina_detect: true
        });
      } else {
        // Retry if script is still loading
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