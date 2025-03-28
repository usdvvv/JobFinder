
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Briefcase, 
  Search, 
  FilterX, 
  SlidersHorizontal, 
  MapPin, 
  DollarSign, 
  Building,
  Clock,
  ChevronDown,
  X
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import JobCard from '@/components/JobCard';
import NavBar from '@/components/NavBar';
import AnimatedSection from '@/components/AnimatedSection';

// Mock job data
const MOCK_JOBS = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'New York, NY',
    salary: '$80,000 - $100,000',
    type: 'Full-time',
    posted: '2 days ago',
    description: 'We are looking for an experienced Frontend Developer proficient in React to join our dynamic team. You will be responsible for developing and implementing user interface components using React.js concepts and workflows such as Redux, Hooks, and Context API.',
    skills: ['React', 'TypeScript', 'CSS', 'HTML', 'Git']
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    company: 'DesignHub',
    location: 'San Francisco, CA',
    salary: '$90,000 - $110,000',
    type: 'Full-time',
    posted: '1 day ago',
    description: 'We are seeking a talented UX/UI Designer to create amazing user experiences. The ideal candidate should have an eye for clean and artful design, possess superior UI skills and be able to translate high-level requirements into interaction flows and artifacts.',
    skills: ['Figma', 'Adobe XD', 'UI Design', 'User Research', 'Prototyping']
  },
  {
    id: '3',
    title: 'Data Scientist',
    company: 'DataWorks',
    location: 'Remote',
    salary: '$100,000 - $130,000',
    type: 'Full-time',
    posted: '3 days ago',
    description: 'We are looking for a Data Scientist to analyze large amounts of raw information to find patterns that will help improve our company. We seek a data expert to analyze information and create algorithms to help us make better decisions.',
    skills: ['Python', 'Machine Learning', 'SQL', 'Statistics', 'Data Visualization']
  },
  {
    id: '4',
    title: 'Product Manager',
    company: 'ProductLabs',
    location: 'Boston, MA',
    salary: '$110,000 - $140,000',
    type: 'Full-time',
    posted: '5 days ago',
    description: 'We are seeking an experienced Product Manager who will be responsible for the product planning and execution throughout the Product Lifecycle, including gathering and prioritizing product and customer requirements, defining the product vision, and working closely with engineering, sales, marketing, and support.',
    skills: ['Product Strategy', 'Agile', 'Market Research', 'User Stories', 'Roadmapping']
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'CloudSystems',
    location: 'Remote',
    salary: '$95,000 - $120,000',
    type: 'Full-time',
    posted: '6 days ago',
    description: 'We are looking for a DevOps Engineer to help us build and maintain our infrastructure and deployment systems. The ideal candidate will have strong experience with AWS, Docker, and CI/CD pipelines.',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux']
  },
  {
    id: '6',
    title: 'Marketing Specialist',
    company: 'GrowthMarketing',
    location: 'Chicago, IL',
    salary: '$60,000 - $80,000',
    type: 'Full-time',
    posted: '1 week ago',
    description: 'We are seeking a Marketing Specialist to join our team. The ideal candidate will have experience in digital marketing, content creation, and social media management. You will be responsible for developing and implementing marketing strategies to promote our brand.',
    skills: ['Digital Marketing', 'Social Media', 'Content Creation', 'SEO', 'Analytics']
  },
  {
    id: '7',
    title: 'Backend Engineer',
    company: 'ServerTech',
    location: 'Seattle, WA',
    salary: '$85,000 - $110,000',
    type: 'Full-time',
    posted: '3 days ago',
    description: 'We are looking for a Backend Engineer to help us design and build scalable and efficient server-side applications. The ideal candidate will have experience with Node.js, databases, and API design.',
    skills: ['Node.js', 'Express', 'MongoDB', 'RESTful APIs', 'GraphQL']
  },
  {
    id: '8',
    title: 'Content Writer',
    company: 'ContentCreators',
    location: 'Remote',
    salary: '$50,000 - $70,000',
    type: 'Full-time',
    posted: '4 days ago',
    description: 'We are seeking a talented Content Writer to create compelling content for our clients. The ideal candidate will have excellent writing skills, be able to research various topics, and meet deadlines consistently.',
    skills: ['Copywriting', 'SEO', 'Research', 'Editing', 'Content Strategy']
  }
];

// Filter categories
const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
const EXPERIENCE_LEVELS = ['Entry Level', 'Mid Level', 'Senior Level', 'Manager', 'Director'];
const LOCATIONS = ['Remote', 'New York, NY', 'San Francisco, CA', 'Boston, MA', 'Chicago, IL', 'Seattle, WA'];

const JobListings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState([40, 150]);
  const [datePosted, setDatePosted] = useState('any');
  const [sortBy, setSortBy] = useState('relevance');
  const [filteredJobs, setFilteredJobs] = useState(MOCK_JOBS);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter jobs based on search and filters
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    const timeoutId = setTimeout(() => {
      let results = [...MOCK_JOBS];
      
      // Apply search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        results = results.filter(job => {
          return (
            job.title.toLowerCase().includes(query) ||
            job.company.toLowerCase().includes(query) ||
            job.description.toLowerCase().includes(query) ||
            job.skills.some(skill => skill.toLowerCase().includes(query))
          );
        });
      }
      
      // Apply job type filter
      if (selectedJobTypes.length > 0) {
        results = results.filter(job => selectedJobTypes.includes(job.type));
      }
      
      // Apply location filter
      if (selectedLocations.length > 0) {
        results = results.filter(job => {
          return selectedLocations.some(location => job.location.includes(location));
        });
      }
      
      // Apply sort
      if (sortBy === 'recent') {
        // Sort by most recent (posted date)
        results.sort((a, b) => {
          // Convert posting time to numerical value for comparison (lower is more recent)
          const getTimeValue = (posted: string) => {
            if (posted.includes('hour')) return 1;
            if (posted.includes('day')) {
              const days = parseInt(posted.split(' ')[0]);
              return days * 24;
            }
            if (posted.includes('week')) {
              const weeks = parseInt(posted.split(' ')[0]);
              return weeks * 24 * 7;
            }
            return 1000; // Default high value for older posts
          };
          
          return getTimeValue(a.posted) - getTimeValue(b.posted);
        });
      } else if (sortBy === 'salary-high') {
        // Sort by salary (highest first)
        results.sort((a, b) => {
          const getMaxSalary = (salary: string) => {
            const matches = salary.match(/\$(\d+),(\d+)/g);
            if (matches && matches.length > 1) {
              const maxSalary = matches[1].replace(/\$|,/g, '');
              return parseInt(maxSalary);
            }
            return 0;
          };
          
          return getMaxSalary(b.salary) - getMaxSalary(a.salary);
        });
      }
      
      setFilteredJobs(results);
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedJobTypes, selectedExperience, selectedLocations, datePosted, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  const clearFilters = () => {
    setSelectedJobTypes([]);
    setSelectedExperience([]);
    setSelectedLocations([]);
    setSalaryRange([40, 150]);
    setDatePosted('any');
  };

  const toggleJobType = (type: string) => {
    setSelectedJobTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  const toggleExperience = (level: string) => {
    setSelectedExperience(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level) 
        : [...prev, level]
    );
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations(prev => 
      prev.includes(location) 
        ? prev.filter(l => l !== location) 
        : [...prev, location]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters - Desktop */}
            <div className="hidden md:block w-64 shrink-0">
              <AnimatedSection animation="slide-in-right" className="sticky top-24">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold flex items-center">
                        <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
                      </h3>
                      {(selectedJobTypes.length > 0 || selectedExperience.length > 0 || selectedLocations.length > 0) && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={clearFilters}
                          className="text-xs h-8 px-2"
                        >
                          <FilterX className="h-3 w-3 mr-1" /> Clear all
                        </Button>
                      )}
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-6">
                      {/* Job Type Filter */}
                      <div>
                        <h4 className="text-sm font-medium mb-3 flex items-center">
                          <Briefcase className="h-4 w-4 mr-2" /> Job Type
                        </h4>
                        <div className="space-y-2">
                          {JOB_TYPES.map(type => (
                            <div key={type} className="flex items-center">
                              <Checkbox 
                                id={`job-type-${type}`} 
                                checked={selectedJobTypes.includes(type)}
                                onCheckedChange={() => toggleJobType(type)}
                              />
                              <Label 
                                htmlFor={`job-type-${type}`}
                                className="ml-2 text-sm font-normal cursor-pointer"
                              >
                                {type}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Experience Level Filter */}
                      <div>
                        <h4 className="text-sm font-medium mb-3 flex items-center">
                          <UserIcon className="h-4 w-4 mr-2" /> Experience Level
                        </h4>
                        <div className="space-y-2">
                          {EXPERIENCE_LEVELS.map(level => (
                            <div key={level} className="flex items-center">
                              <Checkbox 
                                id={`exp-${level}`} 
                                checked={selectedExperience.includes(level)}
                                onCheckedChange={() => toggleExperience(level)}
                              />
                              <Label 
                                htmlFor={`exp-${level}`}
                                className="ml-2 text-sm font-normal cursor-pointer"
                              >
                                {level}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Location Filter */}
                      <div>
                        <h4 className="text-sm font-medium mb-3 flex items-center">
                          <MapPin className="h-4 w-4 mr-2" /> Location
                        </h4>
                        <div className="space-y-2">
                          {LOCATIONS.map(location => (
                            <div key={location} className="flex items-center">
                              <Checkbox 
                                id={`loc-${location}`} 
                                checked={selectedLocations.includes(location)}
                                onCheckedChange={() => toggleLocation(location)}
                              />
                              <Label 
                                htmlFor={`loc-${location}`}
                                className="ml-2 text-sm font-normal cursor-pointer"
                              >
                                {location}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Salary Range Filter */}
                      <div>
                        <h4 className="text-sm font-medium mb-3 flex items-center">
                          <DollarSign className="h-4 w-4 mr-2" /> Salary Range (K)
                        </h4>
                        <div className="px-2">
                          <Slider
                            value={salaryRange}
                            min={30}
                            max={200}
                            step={5}
                            onValueChange={setSalaryRange}
                          />
                          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                            <span>${salaryRange[0]}K</span>
                            <span>${salaryRange[1]}K</span>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Date Posted Filter */}
                      <div>
                        <h4 className="text-sm font-medium mb-3 flex items-center">
                          <Clock className="h-4 w-4 mr-2" /> Date Posted
                        </h4>
                        <Select value={datePosted} onValueChange={setDatePosted}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select date range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any time</SelectItem>
                            <SelectItem value="day">Past 24 hours</SelectItem>
                            <SelectItem value="week">Past week</SelectItem>
                            <SelectItem value="month">Past month</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <AnimatedSection animation="slide-down" className="mb-6">
                <div className="bg-white rounded-lg shadow-sm border border-border p-4">
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Job title, keyword, or company"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-24 py-6 h-12"
                    />
                    <Button 
                      type="submit" 
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-10"
                    >
                      Search Jobs
                    </Button>
                  </form>

                  <div className="flex flex-wrap items-center justify-between mt-4">
                    <div className="flex items-center">
                      {/* Mobile filters button */}
                      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                        <SheetTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="md:hidden mr-2 h-8"
                          >
                            <SlidersHorizontal className="h-3 w-3 mr-1" /> Filters
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                          <SheetHeader>
                            <SheetTitle>Filters</SheetTitle>
                          </SheetHeader>
                          <div className="py-4 h-[calc(100vh-10rem)] overflow-y-auto">
                            <div className="space-y-6">
                              {/* Job Type Filter */}
                              <div>
                                <h4 className="text-sm font-medium mb-3 flex items-center">
                                  <Briefcase className="h-4 w-4 mr-2" /> Job Type
                                </h4>
                                <div className="space-y-2">
                                  {JOB_TYPES.map(type => (
                                    <div key={type} className="flex items-center">
                                      <Checkbox 
                                        id={`mobile-job-type-${type}`} 
                                        checked={selectedJobTypes.includes(type)}
                                        onCheckedChange={() => toggleJobType(type)}
                                      />
                                      <Label 
                                        htmlFor={`mobile-job-type-${type}`}
                                        className="ml-2 text-sm font-normal cursor-pointer"
                                      >
                                        {type}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <Separator />
                              
                              {/* Experience Level Filter */}
                              <div>
                                <h4 className="text-sm font-medium mb-3 flex items-center">
                                  <UserIcon className="h-4 w-4 mr-2" /> Experience Level
                                </h4>
                                <div className="space-y-2">
                                  {EXPERIENCE_LEVELS.map(level => (
                                    <div key={level} className="flex items-center">
                                      <Checkbox 
                                        id={`mobile-exp-${level}`} 
                                        checked={selectedExperience.includes(level)}
                                        onCheckedChange={() => toggleExperience(level)}
                                      />
                                      <Label 
                                        htmlFor={`mobile-exp-${level}`}
                                        className="ml-2 text-sm font-normal cursor-pointer"
                                      >
                                        {level}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <Separator />
                              
                              {/* Location Filter */}
                              <div>
                                <h4 className="text-sm font-medium mb-3 flex items-center">
                                  <MapPin className="h-4 w-4 mr-2" /> Location
                                </h4>
                                <div className="space-y-2">
                                  {LOCATIONS.map(location => (
                                    <div key={location} className="flex items-center">
                                      <Checkbox 
                                        id={`mobile-loc-${location}`} 
                                        checked={selectedLocations.includes(location)}
                                        onCheckedChange={() => toggleLocation(location)}
                                      />
                                      <Label 
                                        htmlFor={`mobile-loc-${location}`}
                                        className="ml-2 text-sm font-normal cursor-pointer"
                                      >
                                        {location}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <Separator />
                              
                              {/* Salary Range Filter */}
                              <div>
                                <h4 className="text-sm font-medium mb-3 flex items-center">
                                  <DollarSign className="h-4 w-4 mr-2" /> Salary Range (K)
                                </h4>
                                <div className="px-2">
                                  <Slider
                                    value={salaryRange}
                                    min={30}
                                    max={200}
                                    step={5}
                                    onValueChange={setSalaryRange}
                                  />
                                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                                    <span>${salaryRange[0]}K</span>
                                    <span>${salaryRange[1]}K</span>
                                  </div>
                                </div>
                              </div>
                              
                              <Separator />
                              
                              {/* Date Posted Filter */}
                              <div>
                                <h4 className="text-sm font-medium mb-3 flex items-center">
                                  <Clock className="h-4 w-4 mr-2" /> Date Posted
                                </h4>
                                <Select value={datePosted} onValueChange={setDatePosted}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select date range" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="any">Any time</SelectItem>
                                    <SelectItem value="day">Past 24 hours</SelectItem>
                                    <SelectItem value="week">Past week</SelectItem>
                                    <SelectItem value="month">Past month</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                          <SheetFooter className="flex-row justify-between mt-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={clearFilters}
                            >
                              <FilterX className="h-4 w-4 mr-1" /> Clear all
                            </Button>
                            <SheetClose asChild>
                              <Button size="sm">Apply Filters</Button>
                            </SheetClose>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>

                      {/* Show active filters */}
                      <div className="flex flex-wrap gap-2">
                        {selectedJobTypes.map(type => (
                          <Badge 
                            key={`filter-${type}`} 
                            variant="secondary"
                            className="h-8 px-3 text-xs font-normal"
                          >
                            {type}
                            <X 
                              className="ml-1 h-3 w-3 cursor-pointer" 
                              onClick={() => toggleJobType(type)}
                            />
                          </Badge>
                        ))}
                        {selectedLocations.map(location => (
                          <Badge 
                            key={`filter-${location}`} 
                            variant="secondary"
                            className="h-8 px-3 text-xs font-normal"
                          >
                            {location}
                            <X 
                              className="ml-1 h-3 w-3 cursor-pointer" 
                              onClick={() => toggleLocation(location)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Sort options */}
                    <div className="mt-2 sm:mt-0 w-full sm:w-auto">
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full sm:w-[180px] h-8 text-xs">
                          <SelectValue placeholder="Sort by: Relevance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relevance">Sort by: Relevance</SelectItem>
                          <SelectItem value="recent">Sort by: Most Recent</SelectItem>
                          <SelectItem value="salary-high">Sort by: Highest Salary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
              
              {/* Results count */}
              <AnimatedSection animation="fade-in" className="mb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    {isLoading ? 'Searching...' : `${filteredJobs.length} Jobs Found`}
                  </h2>
                </div>
              </AnimatedSection>

              {/* Jobs List */}
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <AnimatedSection key={i} animation="fade-in">
                      <Card className="w-full h-48 animate-pulse">
                        <CardContent className="p-6">
                          <div className="h-6 bg-muted rounded-md w-2/3 mb-4"></div>
                          <div className="h-4 bg-muted rounded-md w-1/2 mb-2"></div>
                          <div className="h-4 bg-muted rounded-md w-1/3 mb-6"></div>
                          <div className="h-20 bg-muted rounded-md w-full"></div>
                        </CardContent>
                      </Card>
                    </AnimatedSection>
                  ))}
                </div>
              ) : filteredJobs.length > 0 ? (
                <div className="space-y-4">
                  {filteredJobs.map((job, index) => (
                    <AnimatedSection 
                      key={job.id} 
                      animation="slide-up" 
                      delay={index * 50}
                      threshold={0.1}
                    >
                      <JobCard {...job} />
                    </AnimatedSection>
                  ))}
                </div>
              ) : (
                <AnimatedSection animation="fade-in" className="py-12 text-center">
                  <div className="bg-muted/30 rounded-lg p-8">
                    <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      We couldn't find any jobs matching your search criteria. Try adjusting your filters or search query.
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-6"
                      onClick={clearFilters}
                    >
                      <FilterX className="mr-2 h-4 w-4" /> Clear all filters
                    </Button>
                  </div>
                </AnimatedSection>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// User icon component
const UserIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
};

export default JobListings;
