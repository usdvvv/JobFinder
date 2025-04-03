
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Briefcase, User, FileText, Code, Bot } from 'lucide-react';
import NavBar from '@/components/NavBar';
import AnimatedSection from '@/components/AnimatedSection';

const ChooseSearchType = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="slide-down" className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold">Choose How to Find Your Next Role</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Select the approach that works best for your job search
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatedSection animation="slide-up" delay={100}>
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Browse Jobs</CardTitle>
                  <CardDescription>
                    Search and filter through job listings manually
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>Access thousands of job listings</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>Filter by location, salary, and more</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>Save your favorite listings</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/jobs" className="w-full">
                    <Button className="w-full">
                      <Briefcase className="mr-2 h-4 w-4" />
                      Browse Jobs
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-up" delay={200}>
              <Card className="h-full flex flex-col border-primary">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>AI Job Matching</CardTitle>
                  <CardDescription>
                    Let our AI find the perfect job match for your skills
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>Upload your CV for AI analysis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>Get personalized job recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>See why you're a good fit for each role</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/ai-job-search" className="w-full">
                    <Button className="w-full" variant="default">
                      <Bot className="mr-2 h-4 w-4" />
                      AI Job Matching
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-up" delay={300}>
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Create Resume</CardTitle>
                  <CardDescription>
                    Build a professional resume to land your dream job
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>Choose from professional templates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>Get AI suggestions to improve content</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>Download as PDF or share directly</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/resume" className="w-full">
                    <Button className="w-full" variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Create Resume
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-up" delay={400}>
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Interview Preparation</CardTitle>
                  <CardDescription>
                    Practice with AI interviewers to ace your interviews
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>Practice with industry-specific questions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>Get feedback on your answers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>Build confidence through simulation</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/interview" className="w-full">
                    <Button className="w-full" variant="outline">
                      <User className="mr-2 h-4 w-4" />
                      Practice Interviews
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-up" delay={500}>
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Coding Challenges</CardTitle>
                  <CardDescription>
                    Test your technical skills with interactive coding problems
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>Practice with real coding challenges</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>Get AI-powered hints and solutions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>Compare your solutions with best practices</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/practice" className="w-full">
                    <Button className="w-full" variant="outline">
                      <Code className="mr-2 h-4 w-4" />
                      Coding Challenges
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseSearchType;
