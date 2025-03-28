
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, Briefcase, FileText, UserRound, Star, Sparkles, ArrowUpRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import NavBar from '@/components/NavBar';

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-background">
      <NavBar />
      
      {/* Hero Section */}
      <div 
        ref={heroRef} 
        className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 bg-hero-pattern overflow-hidden"
        style={{ 
          perspective: '1000px',
        }}
      >
        <div 
          className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"
          style={{
            transform: `rotateX(${(mousePosition.y - 300) / 100}deg) rotateY(${(mousePosition.x - 600) / 100}deg)`,
            transition: 'transform 0.1s ease',
          }}
        ></div>
        
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse-slow"></div>
        
        <div className="max-w-6xl mx-auto z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in">
            Find Your <span className="text-gradient">Dream Job</span> Today
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto animate-slide-up animate-delay-200">
            Discover thousands of job opportunities with all the information you need. 
            Your future career is just one click away.
          </p>

          <div className="mt-10 animate-slide-up animate-delay-300">
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl transform -rotate-1"></div>
              <div className="relative flex items-center rounded-full border border-input bg-white shadow-lg">
                <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for a job title, company, or skill..."
                  className="flex-1 h-14 pl-12 pr-24 border-none rounded-full focus-visible:ring-1 focus-visible:ring-primary"
                />
                <Button 
                  className="absolute right-1.5 bg-primary hover:bg-primary/90 transition-all duration-300 h-11" 
                  size="lg"
                  asChild
                >
                  <Link to="/choose">
                    Search <ArrowRight className="ml-1 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground animate-fade-in animate-delay-500">
              <span>Popular:</span>
              <Link to="/jobs?q=developer" className="hover:text-primary transition-colors">Developer</Link>
              <span>&bull;</span>
              <Link to="/jobs?q=designer" className="hover:text-primary transition-colors">Designer</Link>
              <span>&bull;</span>
              <Link to="/jobs?q=marketing" className="hover:text-primary transition-colors">Marketing</Link>
              <span>&bull;</span>
              <Link to="/jobs?q=remote" className="hover:text-primary transition-colors">Remote</Link>
            </div>
          </div>

          <div className="mt-10 animate-fade-in animate-delay-400">
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300"
              asChild
            >
              <Link to="/choose">
                Get Started <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce-slow">
          <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="slide-up" className="text-center mb-16">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Our platform is designed to make your job search simple, efficient, and effective.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedSection animation="slide-up" delay={100} className="relative">
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-border h-full">
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mt-2">Find Jobs</h3>
                <p className="mt-2 text-muted-foreground">
                  Search and browse through thousands of job listings from top companies worldwide. Use filters to narrow down your search.
                </p>
                <Link to="/jobs" className="mt-4 inline-flex items-center text-primary hover:underline">
                  Browse Jobs <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-up" delay={200} className="relative">
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-border h-full">
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mt-2">Create Resume</h3>
                <p className="mt-2 text-muted-foreground">
                  Build an impressive resume with our AI-powered resume builder. Get personalized feedback and suggestions.
                </p>
                <Link to="/resume" className="mt-4 inline-flex items-center text-secondary hover:underline">
                  Create Resume <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-up" delay={300} className="relative">
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-border h-full">
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <UserRound className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mt-2">Apply with Ease</h3>
                <p className="mt-2 text-muted-foreground">
                  One-click application process. No need to fill out the same information multiple times. Track your application status.
                </p>
                <Link to="/login" className="mt-4 inline-flex items-center text-accent hover:underline">
                  Start Applying <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="slide-up" className="text-center mb-16">
            <h2 className="text-3xl font-bold">Powered by AI</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Our cutting-edge AI features help you at every step of your job search journey.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection animation="slide-in-right" delay={100}>
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-border">
                <Sparkles className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold">AI Resume Evaluation</h3>
                <p className="mt-2 text-muted-foreground">
                  Get instant feedback on your resume and personalized suggestions for improvement. Our AI analyzes your resume against job descriptions to help you stand out.
                </p>
                <Link to="/resume/evaluate" className="mt-4 inline-flex items-center text-primary hover:underline">
                  Evaluate Your Resume <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-right" delay={200}>
              <div className="bg-gradient-to-br from-secondary/5 to-accent/5 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-border">
                <Star className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-xl font-semibold">Interview Preparation</h3>
                <p className="mt-2 text-muted-foreground">
                  Practice with our AI interviewer and get real-time feedback on your responses. Prepare for technical, behavioral, and job-specific questions.
                </p>
                <Link to="/interview" className="mt-4 inline-flex items-center text-accent hover:underline">
                  Practice Interviews <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-background to-accent/10 animate-gradient-background">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection animation="fade-in">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Find Your Dream Job?</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Join thousands of job seekers who have found their perfect career match through our platform.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                asChild
              >
                <Link to="/choose">
                  Get Started <ArrowRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto"
                asChild
              >
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-muted/50 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gradient">DreamJob</span>
            </div>
            <div className="flex flex-wrap gap-8 justify-center">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DreamJob. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
