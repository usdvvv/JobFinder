
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, FileText, FileSearch, PlusCircle, Users, ArrowUpRight, Briefcase } from 'lucide-react';
import CompanyNavBar from '@/components/company/CompanyNavBar';
import AnimatedSection from '@/components/AnimatedSection';

// Dummy data for job postings
const jobPostings = [
  { id: 1, title: 'Senior Frontend Developer', applications: 12, status: 'active', createdAt: '2023-06-15' },
  { id: 2, title: 'Product Manager', applications: 24, status: 'active', createdAt: '2023-06-10' },
  { id: 3, title: 'UX Designer', applications: 8, status: 'closed', createdAt: '2023-05-20' },
  { id: 4, title: 'Backend Engineer', applications: 15, status: 'active', createdAt: '2023-06-05' },
];

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Stats for the overview
  const stats = [
    { title: 'Active Jobs', value: jobPostings.filter(job => job.status === 'active').length, icon: <Briefcase className="h-5 w-5" />, color: 'bg-blue-100 text-blue-700' },
    { title: 'Total Applications', value: jobPostings.reduce((acc, job) => acc + job.applications, 0), icon: <FileText className="h-5 w-5" />, color: 'bg-emerald-100 text-emerald-700' },
    { title: 'Candidates Viewed', value: 32, icon: <Users className="h-5 w-5" />, color: 'bg-violet-100 text-violet-700' },
    { title: 'Plagiarism Checks', value: 5, icon: <FileSearch className="h-5 w-5" />, color: 'bg-amber-100 text-amber-700' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <CompanyNavBar />
      
      <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Company Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your job postings and applications</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
            <Button asChild variant="outline" className="bg-white">
              <Link to="/company/applications">
                <FileSearch className="mr-2 h-4 w-4" />
                View Applications
              </Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/company/jobs/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Post New Job
              </Link>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Job Postings</TabsTrigger>
            <TabsTrigger value="company">Company Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <AnimatedSection animation="fade-in" delay={100}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <Card key={index} className="border border-border/40 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                          <p className="text-3xl font-bold mt-1">{stat.value}</p>
                        </div>
                        <div className={`p-3 rounded-full ${stat.color}`}>
                          {stat.icon}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-up" delay={200}>
              <Card className="border border-border/40 shadow-sm">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Recent Job Postings</CardTitle>
                    <Link to="/company/jobs" className="text-sm font-medium text-blue-600 hover:underline flex items-center">
                      View All <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/40">
                          <th className="text-left pb-3 font-medium text-muted-foreground">Job Title</th>
                          <th className="text-left pb-3 font-medium text-muted-foreground">Applications</th>
                          <th className="text-left pb-3 font-medium text-muted-foreground">Status</th>
                          <th className="text-left pb-3 font-medium text-muted-foreground">Created</th>
                          <th className="text-right pb-3 font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobPostings.map((job) => (
                          <tr key={job.id} className="border-b border-border/20 hover:bg-muted/50">
                            <td className="py-3 font-medium">{job.title}</td>
                            <td className="py-3">{job.applications}</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                job.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-3 text-muted-foreground">{job.createdAt}</td>
                            <td className="py-3 text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm" asChild>
                                  <Link to={`/company/jobs/${job.id}`}>
                                    View
                                  </Link>
                                </Button>
                                <Button variant="ghost" size="sm" asChild>
                                  <Link to={`/company/applications?job=${job.id}`}>
                                    Applications
                                  </Link>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </TabsContent>
          
          <TabsContent value="jobs">
            <AnimatedSection animation="fade-in">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>All Job Postings</CardTitle>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                      <Link to="/company/jobs/create">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Post New Job
                      </Link>
                    </Button>
                  </div>
                  <CardDescription>
                    Manage all your job listings in one place
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/40">
                          <th className="text-left pb-3 font-medium text-muted-foreground">Job Title</th>
                          <th className="text-left pb-3 font-medium text-muted-foreground">Applications</th>
                          <th className="text-left pb-3 font-medium text-muted-foreground">Status</th>
                          <th className="text-left pb-3 font-medium text-muted-foreground">Created</th>
                          <th className="text-right pb-3 font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobPostings.map((job) => (
                          <tr key={job.id} className="border-b border-border/20 hover:bg-muted/50">
                            <td className="py-3 font-medium">{job.title}</td>
                            <td className="py-3">{job.applications}</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                job.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-3 text-muted-foreground">{job.createdAt}</td>
                            <td className="py-3 text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm" asChild>
                                  <Link to={`/company/jobs/${job.id}/edit`}>
                                    Edit
                                  </Link>
                                </Button>
                                <Button variant="ghost" size="sm" asChild>
                                  <Link to={`/company/applications?job=${job.id}`}>
                                    Applications
                                  </Link>
                                </Button>
                                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </TabsContent>
          
          <TabsContent value="company">
            <AnimatedSection animation="fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Company Profile</CardTitle>
                  <CardDescription>
                    Update your company details and profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-8">
                    <div className="h-24 w-24 bg-blue-100 rounded-lg flex items-center justify-center mr-6">
                      <Building2 className="h-12 w-12 text-blue-700" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Acme Corporation</h2>
                      <p className="text-muted-foreground">Technology</p>
                      <p className="mt-1 text-blue-600">https://www.acmecorp.example.com</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">About</h3>
                      <p className="text-muted-foreground">
                        Acme Corporation is a technology company focused on creating innovative solutions for businesses of all sizes. 
                        Founded in 2010, we have grown to become a leader in our space with clients worldwide.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                      <p className="text-muted-foreground">
                        <strong>Email:</strong> info@acmecorp.example.com<br />
                        <strong>Phone:</strong> (555) 123-4567<br />
                        <strong>Address:</strong> 123 Tech Street, San Francisco, CA 94107
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Edit Profile
                  </Button>
                </CardFooter>
              </Card>
            </AnimatedSection>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompanyDashboard;
