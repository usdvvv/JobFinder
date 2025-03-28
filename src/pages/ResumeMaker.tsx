
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, FileCheck, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import NavBar from '@/components/NavBar';
import AnimatedSection from '@/components/AnimatedSection';

const ResumeMaker = () => {
  const [activeTab, setActiveTab] = useState("generator");

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="slide-down" className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold">Resume Builder</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Create a professional resume, get feedback on your existing resume, or generate a tailored cover letter
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-in" className="mb-8">
            <Tabs defaultValue="generator" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="generator" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <FileText className="h-4 w-4 mr-2" />
                  Resume Generator
                </TabsTrigger>
                <TabsTrigger value="evaluator" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <FileCheck className="h-4 w-4 mr-2" />
                  Resume Evaluator
                </TabsTrigger>
                <TabsTrigger value="coverletter" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Cover Letter Maker
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="generator" className="mt-6">
                <ResumeGenerator />
              </TabsContent>
              
              <TabsContent value="evaluator" className="mt-6">
                <ResumeEvaluator />
              </TabsContent>
              
              <TabsContent value="coverletter" className="mt-6">
                <CoverLetterMaker />
              </TabsContent>
            </Tabs>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

const ResumeGenerator = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <AnimatedSection animation="slide-up" delay={100}>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Create your resume</CardTitle>
            <CardDescription>
              Build a professional resume step by step
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-md bg-muted/50">
                <h3 className="font-medium mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                  Personal Information
                </h3>
                <p className="text-sm text-muted-foreground">Add your contact details and basic information</p>
              </div>
              
              <div className="p-4 border border-border rounded-md bg-muted/50">
                <h3 className="font-medium mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                  Work Experience
                </h3>
                <p className="text-sm text-muted-foreground">List your work history and achievements</p>
              </div>
              
              <div className="p-4 border border-border rounded-md bg-muted/50">
                <h3 className="font-medium mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                  Education
                </h3>
                <p className="text-sm text-muted-foreground">Add your educational background</p>
              </div>
              
              <div className="p-4 border border-border rounded-md bg-muted/50">
                <h3 className="font-medium mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                  Skills & Certifications
                </h3>
                <p className="text-sm text-muted-foreground">Highlight your key skills and certifications</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              Start Building <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </AnimatedSection>
      
      <AnimatedSection animation="slide-up" delay={200}>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Resume Templates</CardTitle>
            <CardDescription>
              Choose from professional templates tailored for your industry
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-md overflow-hidden hover:border-primary transition-colors cursor-pointer aspect-[0.7]">
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 w-full h-full flex items-center justify-center p-4">
                  <p className="text-center text-sm font-medium">Classic Template</p>
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden hover:border-primary transition-colors cursor-pointer aspect-[0.7]">
                <div className="bg-gradient-to-br from-secondary/20 to-accent/20 w-full h-full flex items-center justify-center p-4">
                  <p className="text-center text-sm font-medium">Modern Template</p>
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden hover:border-primary transition-colors cursor-pointer aspect-[0.7]">
                <div className="bg-gradient-to-br from-accent/20 to-primary/20 w-full h-full flex items-center justify-center p-4">
                  <p className="text-center text-sm font-medium">Creative Template</p>
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden hover:border-primary transition-colors cursor-pointer aspect-[0.7]">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-full h-full flex items-center justify-center p-4">
                  <p className="text-center text-sm font-medium">Executive Template</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Preview All Templates
            </Button>
          </CardFooter>
        </Card>
      </AnimatedSection>
    </div>
  );
};

const ResumeEvaluator = () => {
  return (
    <AnimatedSection animation="fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Evaluate Your Resume</CardTitle>
          <CardDescription>
            Get personalized feedback on your resume and see how it matches with job descriptions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload Your Resume</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop your resume file or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supports PDF, DOCX, TXT (Max 5MB)
            </p>
          </div>
          
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-accent/50 transition-colors">
            <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload Job Description</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop a job description or paste the text
            </p>
            <p className="text-xs text-muted-foreground">
              We'll analyze how well your resume matches the job requirements
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            Analyze Resume <Sparkles className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </AnimatedSection>
  );
};

const CoverLetterMaker = () => {
  return (
    <AnimatedSection animation="fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Generate a Cover Letter</CardTitle>
          <CardDescription>
            Create a customized cover letter that perfectly complements your resume and the job you're applying for
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-medium mb-2">Upload Your Resume</h3>
              <p className="text-xs text-muted-foreground">
                We'll use information from your resume to personalize your cover letter
              </p>
            </div>
            
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-accent/50 transition-colors">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-medium mb-2">Upload Job Description</h3>
              <p className="text-xs text-muted-foreground">
                Your cover letter will be tailored to match the job requirements
              </p>
            </div>
          </div>
          
          <div className="p-4 rounded-md bg-muted/50 space-y-2">
            <h3 className="font-medium text-sm">Customize Your Cover Letter</h3>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Select your tone:</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="text-xs h-7">Professional</Button>
                <Button variant="outline" size="sm" className="text-xs h-7">Confident</Button>
                <Button variant="outline" size="sm" className="text-xs h-7">Enthusiastic</Button>
                <Button variant="outline" size="sm" className="text-xs h-7">Formal</Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            Generate Cover Letter <Sparkles className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </AnimatedSection>
  );
};

export default ResumeMaker;
