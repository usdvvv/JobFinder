
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const RoleSelection = () => {
  const particlesRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLHeadingElement>(null);
  const roleTextRef = useRef<HTMLHeadingElement>(null);
  const choiceContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Create floating particles
    const createParticles = () => {
      if (!particlesRef.current) return;
      
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 2 and 6 pixels
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        particlesRef.current.appendChild(particle);

        // Animate each particle
        gsap.to(particle, {
          y: -Math.random() * 400 - 200,
          x: (Math.random() - 0.5) * 200,
          opacity: Math.random() * 0.6 + 0.2,
          duration: Math.random() * 4 + 4,
          repeat: -1,
          delay: Math.random() * 2,
          ease: "power1.inOut",
          yoyo: true
        });
      }
    };

    // Animation sequence
    const startAnimations = () => {
      if (!introTextRef.current || !roleTextRef.current || !choiceContainerRef.current) return;

      // Initial "Welcome" text animation
      gsap.to(introTextRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.7)"
      });

      // Move "Welcome" text to the top-left corner
      gsap.to(introTextRef.current, {
        top: '2rem',
        left: '2rem',
        scale: 0.5,
        fontSize: '2rem',
        delay: 2,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          // Show "Choose Your Role" text
          gsap.to(roleTextRef.current, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.7)",
            onComplete: () => {
              // Show buttons
              gsap.to(choiceContainerRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
              });
            }
          });
        }
      });
    };

    // Glow effect following cursor
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      
      gsap.to(glowRef.current, {
        x: e.clientX - 50,
        y: e.clientY - 50,
        opacity: 0.5,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    // Initialize
    createParticles();
    startAnimations();
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleUserClick = () => {
    navigate('/welcome');
  };

  const handleCompanyClick = () => {
    navigate('/company/login');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black overflow-hidden relative">
      <style jsx>{`
        .background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(25, 25, 35, 0.8) 0%, rgba(10, 10, 15, 1) 70%);
          z-index: -2;
        }
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          pointer-events: none;
        }
        .particle {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0.5;
          pointer-events: none;
        }
        .glow {
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: radial-gradient(circle at center, rgba(100, 150, 255, 0.3) 0%, rgba(100, 150, 255, 0) 70%);
          pointer-events: none;
          z-index: -1;
        }
        .intro-text, .role-text {
          position: absolute;
          font-size: 4rem;
          font-weight: bold;
          background: linear-gradient(to right, #64a0ff, #8c5cff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-align: center;
          opacity: 0;
          transform: translateY(30px) scale(0.9);
        }
        .choice-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-top: 3rem;
          opacity: 0;
          transform: translateY(30px);
          z-index: 10;
        }
        @media (min-width: 768px) {
          .choice-container {
            flex-direction: row;
          }
        }
        .choice-button {
          width: 280px;
          height: 200px;
          background: rgba(30, 30, 40, 0.7);
          border: 2px solid rgba(100, 150, 255, 0.3);
          border-radius: 1rem;
          padding: 2rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .choice-button:hover {
          background: rgba(40, 40, 60, 0.8);
          border-color: rgba(100, 150, 255, 0.8);
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(100, 150, 255, 0.4);
        }
        .button-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .button-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .button-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
          margin-bottom: 0.5rem;
        }
        .button-subtitle {
          font-size: 0.9rem;
          color: #aab7c4;
        }
      `}</style>

      <div className="background"></div>
      <div ref={particlesRef} className="particles"></div>
      <div ref={glowRef} className="glow"></div>

      <h1 ref={introTextRef} className="intro-text">Welcome to JobFinder</h1>
      <h1 ref={roleTextRef} className="role-text">Choose Your Role</h1>

      <div ref={choiceContainerRef} className="choice-container">
        {/* User Button */}
        <button className="choice-button" onClick={handleUserClick}>
          <div className="button-content">
            <span className="button-icon">👤</span>
            <span className="button-title">User</span>
            <span className="button-subtitle">Graduate, Student, or Professional</span>
          </div>
        </button>

        {/* Company Button */}
        <button className="choice-button" onClick={handleCompanyClick}>
          <div className="button-content">
            <span className="button-icon">🏢</span>
            <span className="button-title">Company</span>
            <span className="button-subtitle">Employers and Recruiters</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
