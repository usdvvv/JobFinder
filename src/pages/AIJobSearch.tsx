
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  FileText, 
  Search, 
  ArrowRight,
  Briefcase,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import NavBar from '@/components/NavBar';
import AnimatedSection from '@/components/AnimatedSection';
import JobMatchCard from '@/components/JobMatchCard';

const AIJobSearch = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [jobMatches, setJobMatches] = useState<any[]>([]);
  const [jobTitle, setJobTitle] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('upload');
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a PDF or DOCX file only.",
        });
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
        });
        return;
      }
      
      setCvFile(file);
    }
  };
  
  // Handle file drop
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      // Validate file type
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a PDF or DOCX file only.",
        });
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
        });
        return;
      }
      
      setCvFile(file);
    }
  };
  
  const handleFileDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Simulate CV analysis using AI
  const analyzeCV = () => {
    if (!cvFile) {
      toast({
        variant: "destructive",
        title: "No CV uploaded",
        description: "Please upload your CV first.",
      });
      return;
    }
    
    setIsAnalyzing(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    
    // Simulate API response
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      
      // Mock job match data
      const mockJobMatches = [
        {
          id: 1,
          title: "Senior Frontend Developer",
          matchScore: 92,
          whyMatch: "Your extensive React experience and UI/UX skills align perfectly with this role.",
          responsibilities: [
            "Develop responsive web applications using React",
            "Collaborate with UI/UX designers to implement designs",
            "Optimize application performance and user experience"
          ],
          whyExcel: "Your portfolio demonstrates exceptional UI work and your experience with performance optimization will be valuable."
        },
        {
          id: 2,
          title: "Full Stack Engineer",
          matchScore: 87,
          whyMatch: "Your combined frontend and backend experience makes you an ideal candidate.",
          responsibilities: [
            "Build full-stack web applications",
            "Work with Node.js backends and React frontends",
            "Design and implement database schemas"
          ],
          whyExcel: "Your GitHub projects show proficiency in both frontend and backend technologies."
        },
        {
          id: 3,
          title: "UX/UI Developer",
          matchScore: 85,
          whyMatch: "Your design sensibility combined with development skills is perfect for this hybrid role.",
          responsibilities: [
            "Create wireframes and prototypes",
            "Implement responsive designs in code",
            "Conduct usability testing"
          ],
          whyExcel: "Your attention to detail and understanding of user experience principles are evident in your work."
        },
        {
          id: 4,
          title: "DevOps Engineer",
          matchScore: 78,
          whyMatch: "Your experience with CI/CD pipelines and cloud services is relevant for this position.",
          responsibilities: [
            "Set up and maintain CI/CD pipelines",
            "Manage cloud infrastructure",
            "Optimize deployment workflows"
          ],
          whyExcel: "Your background in automation and infrastructure as code will be particularly valuable."
        },
        {
          id: 5,
          title: "Technical Lead",
          matchScore: 76,
          whyMatch: "Your leadership experience and technical expertise qualify you for this role.",
          responsibilities: [
            "Lead a team of developers",
            "Make architectural decisions",
            "Mentor junior team members"
          ],
          whyExcel: "Your communication skills and experience mentoring junior developers make you a strong fit."
        }
      ];
      
      setJobMatches(mockJobMatches);
      setIsAnalyzing(false);
      
      toast({
        title: "CV analyzed successfully",
        description: "We've found job matches for your profile!",
      });
    }, 3000);
  };
  
  // Search for jobs
  const searchJobs = () => {
    if (!jobTitle.trim()) {
      toast({
        variant: "destructive",
        title: "No job title entered",
        description: "Please enter a job title to search for.",
      });
      return;
    }
    
    setIsSearching(true);
    setSearchResults([]);
    
    // Simulate API response
    setTimeout(() => {
      // Mock search results
      const mockSearchResults = [
        {
          id: 101,
          title: jobTitle,
          company: "TechCorp Inc.",
          location: "San Francisco, CA",
          salary: "$120K - $150K",
          description: "We are looking for an experienced professional to join our team...",
          posted: "2 days ago",
          remote: true,
          link: "#"
        },
        {
          id: 102,
          title: jobTitle,
          company: "Innovation Labs",
          location: "New York, NY",
          salary: "$110K - $140K",
          description: "Join our dynamic team working on cutting-edge projects...",
          posted: "1 week ago",
          remote: false,
          link: "#"
        },
        {
          id: 103,
          title: jobTitle,
          company: "Future Technologies",
          location: "Remote",
          salary: "$100K - $130K",
          description: "We're seeking a talented individual to help us build the next generation of products...",
          posted: "3 days ago",
          remote: true,
          link: "#"
        },
        {
          id: 104,
          title: jobTitle,
          company: "Digital Solutions",
          location: "Austin, TX",
          salary: "$115K - $145K",
          description: "Be part of a team that's transforming how businesses operate...",
          posted: "5 days ago",
          remote: false,
          link: "#"
        },
        {
          id: 105,
          title: jobTitle,
          company: "Tech Innovators",
          location: "Seattle, WA",
          salary: "$125K - $155K",
          description: "Work on challenging problems and innovative solutions...",
          posted: "1 day ago",
          remote: true,
          link: "#"
        }
      ];
      
      setSearchResults(mockSearchResults);
      setIsSearching(false);
    }, 2000);
  };
  
  const applyToJob = (jobId: number) => {
    navigate(`/apply/${jobId}`);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="slide-down" className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold">AI-Powered Job Matching</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Upload your CV and let our AI match you with the perfect job opportunities
            </p>
          </AnimatedSection>
          
          <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
            <AnimatedSection animation="fade-in">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload CV
                </TabsTrigger>
                <TabsTrigger value="search">
                  <Search className="mr-2 h-4 w-4" />
                  Search Jobs
                </TabsTrigger>
              </TabsList>
            </AnimatedSection>
            
            <TabsContent value="upload" className="mt-6">
              <AnimatedSection animation="slide-up" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Upload Your CV</CardTitle>
                    <CardDescription>
                      Upload your CV and our AI will find the best job matches for you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className={`border-2 border-dashed rounded-lg p-6 text-center ${
                        cvFile ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-muted-foreground/20 hover:border-muted-foreground/50'
                      } transition-colors duration-200`}
                      onDrop={handleFileDrop}
                      onDragOver={handleFileDragOver}
                    >
                      {cvFile ? (
                        <div className="flex flex-col items-center">
                          <CheckCircle className="h-10 w-10 text-green-500 mb-2" />
                          <p className="font-medium text-green-700 dark:text-green-300">{cvFile.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-4"
                            onClick={() => setCvFile(null)}
                          >
                            Remove file
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="font-medium">Drop your CV here or click to browse</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Supports PDF or DOCX (Max 5MB)
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-4"
                            onClick={triggerFileInput}
                          >
                            Browse files
                          </Button>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.docx"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                    
                    {cvFile && (
                      <div className="mt-6">
                        <Button
                          className="w-full"
                          onClick={analyzeCV}
                          disabled={isAnalyzing}
                        >
                          {isAnalyzing ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Analyzing... {uploadProgress}%
                            </>
                          ) : (
                            <>
                              <FileText className="mr-2 h-4 w-4" />
                              Analyze CV
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <div className="md:col-span-2">
                  {isAnalyzing ? (
                    <Card className="h-full flex flex-col justify-center items-center p-8">
                      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                      <h3 className="text-xl font-medium mb-2">Analyzing your CV</h3>
                      <p className="text-muted-foreground text-center">
                        Our AI is processing your CV and finding the best job matches for your skills and experience.
                      </p>
                      <div className="w-full max-w-md mt-6 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-300 ease-in-out" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </Card>
                  ) : jobMatches.length > 0 ? (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold mb-4">Your Top Job Matches</h2>
                      {jobMatches.map((job) => (
                        <JobMatchCard
                          key={job.id}
                          job={job}
                          onApply={() => applyToJob(job.id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <Card className="h-full flex flex-col justify-center items-center p-8">
                      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-medium mb-2">No analysis yet</h3>
                      <p className="text-muted-foreground text-center">
                        Upload your CV and click "Analyze CV" to find your best job matches.
                      </p>
                    </Card>
                  )}
                </div>
              </AnimatedSection>
            </TabsContent>
            
            <TabsContent value="search" className="mt-6">
              <AnimatedSection animation="slide-up">
                <Card>
                  <CardHeader>
                    <CardTitle>Search for Jobs</CardTitle>
                    <CardDescription>
                      Enter a job title to search for relevant openings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          className="pl-10"
                          placeholder="Job title, e.g., 'Frontend Developer'"
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && searchJobs()}
                        />
                      </div>
                      <Button onClick={searchJobs} disabled={isSearching}>
                        {isSearching ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Searching...
                          </>
                        ) : (
                          <>
                            Search
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {searchResults.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <h2 className="text-2xl font-bold mb-4">Search Results</h2>
                    {searchResults.map((job) => (
                      <Card key={job.id} className="transition-all hover:shadow-md">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-semibold">{job.title}</h3>
                              <div className="flex flex-wrap gap-y-2 gap-x-4 mt-2 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Briefcase className="h-4 w-4 mr-1" />
                                  {job.company}
                                </div>
                                <div className="flex items-center">
                                  {job.remote ? (
                                    <span className="flex items-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h2a2 2 0 002-2v-1a2 2 0 012-2h1.945M5.055 7h5M5.055 7H15M15 7h4M15 7v4M9 11h1" />
                                      </svg>
                                      Remote
                                    </span>
                                  ) : (
                                    <span className="flex items-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                      </svg>
                                      {job.location}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {job.salary}
                                </div>
                                <div className="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {job.posted}
                                </div>
                              </div>
                              <p className="mt-4 text-sm">{job.description}</p>
                            </div>
                            <div className="mt-4 md:mt-0">
                              <Button onClick={() => applyToJob(job.id)}>
                                Apply Now
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </AnimatedSection>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AIJobSearch;
