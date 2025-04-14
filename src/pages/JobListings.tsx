import React, { useState, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Briefcase, MapPin, Clock, Currency, Star, Building2, GraduationCap, FileText, ArrowUp, ArrowDown } from 'lucide-react';
import NavBar from '@/components/NavBar';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: number;
  rating: number;
  education: string;
  experience: string;
  skills: string[];
  posted: string;
  description: string;
}

const initialJobs: Job[] = [
  {
    id: "1",
    title: "Software Engineer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: 120000,
    rating: 4.5,
    education: "Bachelor's Degree",
    experience: "3+ years",
    skills: ["JavaScript", "React", "Node.js", "SQL"],
    posted: "2 days ago",
    description: "We are looking for a skilled software engineer to join our dynamic team..."
  },
  {
    id: "2",
    title: "Data Scientist",
    company: "Analytics Pro",
    location: "New York, NY",
    type: "Full-time",
    salary: 130000,
    rating: 4.2,
    education: "Master's Degree",
    experience: "2+ years",
    skills: ["Python", "Machine Learning", "Data Analysis", "Statistics"],
    posted: "5 days ago",
    description: "Join our team as a Data Scientist and help us make data-driven decisions..."
  },
  {
    id: "3",
    title: "UX Designer",
    company: "Creative Solutions",
    location: "Seattle, WA",
    type: "Contract",
    salary: 60,
    rating: 4.8,
    education: "Bachelor's Degree",
    experience: "4+ years",
    skills: ["UI/UX Design", "Figma", "Adobe XD", "Wireframing"],
    posted: "1 week ago",
    description: "We need a talented UX Designer to create engaging and intuitive user experiences..."
  },
  {
    id: "4",
    title: "Project Manager",
    company: "Global Corp",
    location: "Chicago, IL",
    type: "Full-time",
    salary: 110000,
    rating: 4.0,
    education: "Bachelor's Degree",
    experience: "5+ years",
    skills: ["Project Management", "Agile", "Scrum", "Communication"],
    posted: "2 weeks ago",
    description: "Lead our projects to success as a Project Manager. Strong leadership skills required..."
  },
  {
    id: "5",
    title: "Marketing Specialist",
    company: "Digital Marketing Agency",
    location: "Austin, TX",
    type: "Full-time",
    salary: 90000,
    rating: 4.6,
    education: "Bachelor's Degree",
    experience: "2+ years",
    skills: ["Digital Marketing", "SEO", "Social Media", "Content Creation"],
    posted: "3 weeks ago",
    description: "Drive our marketing efforts as a Marketing Specialist. Creativity and analytical skills are a must..."
  },
  {
    id: "6",
    title: "Frontend Developer",
    company: "Web Solutions Ltd.",
    location: "London, UK",
    type: "Full-time",
    salary: 50000,
    rating: 4.3,
    education: "Bachelor's Degree",
    experience: "2+ years",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    posted: "1 month ago",
    description: "Join our team as a Frontend Developer and build amazing user interfaces..."
  },
  {
    id: "7",
    title: "Backend Developer",
    company: "Data Systems Inc.",
    location: "Berlin, Germany",
    type: "Full-time",
    salary: 55000,
    rating: 4.1,
    education: "Bachelor's Degree",
    experience: "3+ years",
    skills: ["Java", "Python", "SQL", "REST APIs"],
    posted: "6 weeks ago",
    description: "We are looking for a Backend Developer to build and maintain our server-side logic..."
  },
  {
    id: "8",
    title: "Mobile App Developer",
    company: "App Creations",
    location: "Sydney, Australia",
    type: "Full-time",
    salary: 65000,
    rating: 4.7,
    education: "Bachelor's Degree",
    experience: "2+ years",
    skills: ["iOS", "Android", "React Native", "Swift"],
    posted: "2 months ago",
    description: "Create innovative mobile applications as a Mobile App Developer. Experience with both iOS and Android is preferred..."
  },
  {
    id: "9",
    title: "Network Engineer",
    company: "Tech Infrastructure",
    location: "Tokyo, Japan",
    type: "Full-time",
    salary: 60000,
    rating: 4.4,
    education: "Bachelor's Degree",
    experience: "3+ years",
    skills: ["Cisco", "Network Security", "Routing", "Switching"],
    posted: "3 months ago",
    description: "Ensure our network infrastructure is running smoothly as a Network Engineer..."
  },
  {
    id: "10",
    title: "Database Administrator",
    company: "Data Management Solutions",
    location: "Toronto, Canada",
    type: "Full-time",
    salary: 100000,
    rating: 4.5,
    education: "Bachelor's Degree",
    experience: "4+ years",
    skills: ["SQL Server", "MySQL", "Database Management", "Backup and Recovery"],
    posted: "4 months ago",
    description: "Manage and maintain our databases as a Database Administrator. Strong SQL skills are required..."
  }
];

const JobListings = () => {
  const [jobs, setJobs] = useState(initialJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [salaryRange, setSalaryRange] = useState([0, 200000]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('');

  const jobTypes = [...new Set(initialJobs.map(job => job.type))];
  const allSkills = [...new Set(initialJobs.map(job => job.skills).flat())];

  const handleFilterChange = (filters: { term?: string; type?: string; salary?: number[]; skills?: string[] }) => {
    setSearchTerm(filters.term || '');
    setSelectedType(filters.type || '');
    setSalaryRange(filters.salary || [0, 200000]);
    setSelectedSkills(filters.skills || []);
  };

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  const filterJobs = useCallback(() => {
    let filteredJobs = [...initialJobs];

    if (searchTerm) {
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filteredJobs = filteredJobs.filter(job => job.type === selectedType);
    }

    filteredJobs = filteredJobs.filter(job => job.salary >= salaryRange[0] && job.salary <= salaryRange[1]);

    if (selectedSkills.length > 0) {
      filteredJobs = filteredJobs.filter(job =>
        selectedSkills.every(skill => job.skills.includes(skill))
      );
    }

    switch (sortBy) {
      case 'salary-asc':
        filteredJobs.sort((a, b) => a.salary - b.salary);
        break;
      case 'salary-desc':
        filteredJobs.sort((a, b) => b.salary - a.salary);
        break;
      case 'rating-asc':
        filteredJobs.sort((a, b) => a.rating - b.rating);
        break;
      case 'rating-desc':
        filteredJobs.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filteredJobs;
  }, [searchTerm, selectedType, salaryRange, selectedSkills, sortBy]);

  useEffect(() => {
    setJobs(filterJobs());
  }, [filterJobs]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto job-listings">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Job Listings</h1>
        
        <JobsFilterBar 
          onFilterChange={handleFilterChange} 
          onSortChange={handleSortChange}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface JobsFilterBarProps {
  onFilterChange: (filters: { term?: string; type?: string; salary?: number[]; skills?: string[] }) => void;
  onSortChange: (sortOption: string) => void;
}

const JobsFilterBar = ({ onFilterChange, onSortChange }: JobsFilterBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [salaryRange, setSalaryRange] = useState([0, 200000]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const jobTypes = [...new Set(initialJobs.map(job => job.type))];
  const allSkills = [...new Set(initialJobs.map(job => job.skills).flat())];

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    onFilterChange({ term });
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    onFilterChange({ type });
  };

  const handleSalaryChange = (range: number[]) => {
    setSalaryRange(range);
    onFilterChange({ salary: range });
  };

  const handleSkillChange = (skill: string, checked: boolean) => {
    const newSkills = checked
      ? [...selectedSkills, skill]
      : selectedSkills.filter(s => s !== skill);
    setSelectedSkills(newSkills);
    onFilterChange({ skills: newSkills });
  };

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Filter Jobs</CardTitle>
        <CardDescription>Customize your job search</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="search" className="text-sm font-medium leading-none">Search</label>
          <Input
            type="search"
            id="search"
            placeholder="Job title, company, or keyword..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="type" className="text-sm font-medium leading-none">Type</label>
          <Select onValueChange={handleTypeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              {jobTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <label htmlFor="salary" className="text-sm font-medium leading-none">Salary Range</label>
          <div className="flex items-center space-x-2">
            <Currency className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm">{salaryRange[0].toLocaleString()}</span>
            <span className="text-sm"> - </span>
            <Currency className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm">{salaryRange[1].toLocaleString()}</span>
          </div>
          <Slider
            defaultValue={salaryRange}
            max={200000}
            step={1000}
            onValueChange={handleSalaryChange}
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium leading-none">Skills</label>
          <ScrollArea className="h-32 rounded-md border p-2">
            <div className="flex flex-col space-y-1">
              {allSkills.map(skill => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={`skill-${skill}`}
                    checked={selectedSkills.includes(skill)}
                    onCheckedChange={(checked) => handleSkillChange(skill, !!checked)}
                  />
                  <label
                    htmlFor={`skill-${skill}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {skill}
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline" onClick={() => onFilterChange({})}>Reset Filters</Button>
        <SortJobs onSortChange={onSortChange} />
      </CardFooter>
    </Card>
  );
};

interface SortJobsProps {
  onSortChange: (sortOption: string) => void;
}

const SortJobs = ({ onSortChange }: SortJobsProps) => {
  return (
    <Select onValueChange={onSortChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">Relevance</SelectItem>
        <SelectItem value="salary-asc">Salary: Low to High</SelectItem>
        <SelectItem value="salary-desc">Salary: High to Low</SelectItem>
        <SelectItem value="rating-asc">Rating: Low to High</SelectItem>
        <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
      </SelectContent>
    </Select>
  );
};

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{job.title}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm">{job.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm">{job.type}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Currency className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm">{job.salary.toLocaleString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="text-sm">{job.rating}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Building2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm">{job.experience}</span>
        </div>
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm">{job.education}</span>
        </div>
        <div>
          <h4 className="text-sm font-medium">Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {job.skills.map(skill => (
              <span key={skill} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full px-2 py-1 text-xs font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400">Posted {job.posted}</span>
        <Button variant="outline">
          Apply Now <FileText className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobListings;
