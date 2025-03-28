
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Briefcase, Home, FileText, Video, UserRound, Code, Brain, Bot } from 'lucide-react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">DreamJob</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <NavLink to="/" icon={<Home className="h-4 w-4" />} text="Home" />
              <NavLink to="/jobs" icon={<Briefcase className="h-4 w-4" />} text="Browse Jobs" />
              <NavLink to="/resume" icon={<FileText className="h-4 w-4" />} text="Resume Maker" />
              <NavLink to="/interview" icon={<Video className="h-4 w-4" />} text="Interview Prep" />
              <NavLink to="/practice" icon={<Code className="h-4 w-4" />} text="Practice Coding" />
              <NavLink to="/therapist" icon={<Brain className="h-4 w-4" />} text="AI Therapist" />
              <NavLink to="/assistant" icon={<Bot className="h-4 w-4" />} text="AI Assistant" />
              <Link to="/login">
                <Button variant="outline" size="sm" className="ml-2">
                  <UserRound className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass-effect animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/" icon={<Home className="h-5 w-5" />} text="Home" />
            <MobileNavLink to="/jobs" icon={<Briefcase className="h-5 w-5" />} text="Browse Jobs" />
            <MobileNavLink to="/resume" icon={<FileText className="h-5 w-5" />} text="Resume Maker" />
            <MobileNavLink to="/interview" icon={<Video className="h-5 w-5" />} text="Interview Prep" />
            <MobileNavLink to="/practice" icon={<Code className="h-5 w-5" />} text="Practice Coding" />
            <MobileNavLink to="/therapist" icon={<Brain className="h-5 w-5" />} text="AI Therapist" />
            <MobileNavLink to="/assistant" icon={<Bot className="h-5 w-5" />} text="AI Assistant" />
            <MobileNavLink to="/login" icon={<UserRound className="h-5 w-5" />} text="Login" />
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-all duration-300 ${
        isActive 
          ? 'text-primary' 
          : 'text-foreground hover:text-primary hover:bg-muted'
      }`}
    >
      {icon}
      <span>{text}</span>
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded"></span>
      )}
    </Link>
  );
};

const MobileNavLink = ({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-3 ${
        isActive 
          ? 'bg-primary/10 text-primary' 
          : 'text-foreground hover:bg-muted hover:text-primary'
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default NavBar;
