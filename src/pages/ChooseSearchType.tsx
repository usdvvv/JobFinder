
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchIcon, Sparkles, ChevronRight, ArrowRight } from 'lucide-react';
import NavBar from '@/components/NavBar';
import AnimatedSection from '@/components/AnimatedSection';

const ChooseSearchType = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<'manual' | 'automated' | null>(null);

  const handleSelectOption = (option: 'manual' | 'automated') => {
    if (option === 'manual') {
      navigate('/jobs');
    } else {
      navigate('/automated-search');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="slide-down" className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold">How would you like to search for jobs?</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Choose how you'd like to find your next opportunity. You can manually browse listings or let our AI find the perfect match for you.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AnimatedSection 
              animation="slide-up" 
              delay={100}
              className="group"
              threshold={0.2}
            >
              <Card 
                className={`relative overflow-hidden transition-all duration-500 h-full cursor-pointer hover:shadow-lg ${
                  hoveredCard === 'manual' ? 'border-primary ring-1 ring-primary/20 shadow-lg' : ''
                } ${hoveredCard === 'automated' ? 'opacity-90 scale-95' : ''}`}
                onMouseEnter={() => setHoveredCard('manual')}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleSelectOption('manual')}
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-secondary transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100" />
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                
                <div className="relative h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="p-2 w-12 h-12 bg-primary/10 rounded-lg mb-4">
                      <SearchIcon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">Manual Search</CardTitle>
                    <CardDescription className="text-base">Browse and filter job listings yourself</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="py-4 flex-1">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="ml-2">Browse thousands of job listings</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="ml-2">Use filters to narrow down your search</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="ml-2">Save favorites and track applications</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="ml-2">Apply directly with one click</span>
                      </li>
                    </ul>
                  </CardContent>
                  
                  <CardFooter className="pt-4">
                    <Button 
                      className="w-full group-hover:bg-primary/90 transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectOption('manual');
                      }}
                    >
                      Continue <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            </AnimatedSection>

            <AnimatedSection 
              animation="slide-up" 
              delay={200}
              className="group"
              threshold={0.2}
            >
              <Card 
                className={`relative overflow-hidden transition-all duration-500 h-full cursor-pointer hover:shadow-lg ${
                  hoveredCard === 'automated' ? 'border-accent ring-1 ring-accent/20 shadow-lg' : ''
                } ${hoveredCard === 'manual' ? 'opacity-90 scale-95' : ''}`}
                onMouseEnter={() => setHoveredCard('automated')}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleSelectOption('automated')}
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-secondary to-accent transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100" />
                <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                
                <div className="relative h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="p-2 w-12 h-12 bg-accent/10 rounded-lg mb-4">
                      <Sparkles className="h-8 w-8 text-accent" />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-accent transition-colors duration-300">AI-Powered Search</CardTitle>
                    <CardDescription className="text-base">Let our AI find the perfect match for you</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="py-4 flex-1">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span className="ml-2">Upload your resume for personalized matches</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span className="ml-2">Receive job recommendations based on your skills</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span className="ml-2">Get insights on skill gaps and improvements</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span className="ml-2">Daily updates with new matching opportunities</span>
                      </li>
                    </ul>
                  </CardContent>
                  
                  <CardFooter className="pt-4">
                    <Button 
                      className="w-full bg-accent hover:bg-accent/90 transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectOption('automated');
                      }}
                    >
                      Continue <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="fade-in" delay={400} className="text-center mt-12">
            <p className="text-muted-foreground">
              You can always switch between search methods later.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default ChooseSearchType;
