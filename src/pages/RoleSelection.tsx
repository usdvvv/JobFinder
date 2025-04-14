
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
          // Fade out "Welcome" text
          gsap.to(introTextRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              // Show "Choose Your Role" text
              gsap.to(roleTextRef.current, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1.5,
                ease: "elastic.out(1, 0.7)",
                onComplete: () => {
                  // Move "Choose Your Role" text to the top-left corner
                  gsap.to(roleTextRef.current, {
                    top: '2rem',
                    left: '2rem',
                    scale: 0.5,
                    fontSize: '2rem',
                    duration: 1,
                    ease: "power2.inOut",
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
    navigate('/choose');
  };

  const handleCompanyClick = () => {
    navigate('/company/login');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
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

      <style jsx>{`
        .background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          z-index: -2;
        }
        
        .particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          z-index: -1;
        }
        
        .particle {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
        }
        
        .glow {
          position: fixed;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0) 70%);
          pointer-events: none;
          z-index: -1;
        }
        
        .intro-text, .role-text {
          position: absolute;
          color: white;
          font-size: 3rem;
          font-weight: 700;
          text-align: center;
          opacity: 0;
          transform: translateY(20px) scale(0.95);
        }
        
        .choice-container {
          display: flex;
          flex-direction: row;
          gap: 2rem;
          opacity: 0;
          transform: translateY(20px);
        }
        
        @media (max-width: 640px) {
          .choice-container {
            flex-direction: column;
          }
        }
        
        .choice-button {
          width: 280px;
          height: 280px;
          background: rgba(30, 41, 59, 0.7);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        
        .choice-button:hover {
          transform: translateY(-5px);
          border-color: rgba(59, 130, 246, 0.8);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
        }
        
        .choice-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(59, 130, 246, 0.2),
            transparent
          );
          transition: 0.5s;
          z-index: -1;
        }
        
        .choice-button:hover::before {
          left: 100%;
        }
        
        .button-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
        }
        
        .button-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .button-title {
          color: white;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        
        .button-subtitle {
          color: #94a3b8;
          font-size: 0.875rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default RoleSelection;
