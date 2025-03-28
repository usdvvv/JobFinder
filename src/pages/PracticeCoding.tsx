
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Code, 
  Play, 
  BookOpen, 
  Star, 
  Filter, 
  SortDesc, 
  Check, 
  X, 
  ChevronRight, 
  FileText,
  Eye
} from 'lucide-react';
import NavBar from '@/components/NavBar';
import AnimatedSection from '@/components/AnimatedSection';
import { Badge } from "@/components/ui/badge";

const PracticeCoding = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleDifficultySelect = (difficulty: string) => {
    setSelectedDifficulty(difficulty === selectedDifficulty ? null : difficulty);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="slide-down" className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold">Practice Coding</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Sharpen your coding skills with practice problems and challenges
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <AnimatedSection animation="slide-up" className="lg:col-span-1">
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <Filter className="h-5 w-5 mr-2" />
                      Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Difficulty</h3>
                      <div className="space-y-2">
                        <button 
                          className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                            selectedDifficulty === 'easy' 
                              ? 'bg-primary/10 text-primary' 
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => handleDifficultySelect('easy')}
                        >
                          <span>Easy</span>
                          {selectedDifficulty === 'easy' && <Check className="h-4 w-4" />}
                        </button>
                        <button 
                          className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                            selectedDifficulty === 'medium' 
                              ? 'bg-primary/10 text-primary' 
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => handleDifficultySelect('medium')}
                        >
                          <span>Medium</span>
                          {selectedDifficulty === 'medium' && <Check className="h-4 w-4" />}
                        </button>
                        <button 
                          className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                            selectedDifficulty === 'hard' 
                              ? 'bg-primary/10 text-primary' 
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => handleDifficultySelect('hard')}
                        >
                          <span>Hard</span>
                          {selectedDifficulty === 'hard' && <Check className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Categories</h3>
                      <div className="space-y-2">
                        <button 
                          className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                            selectedCategory === 'arrays' 
                              ? 'bg-primary/10 text-primary' 
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => handleCategorySelect('arrays')}
                        >
                          <span>Arrays & Strings</span>
                          {selectedCategory === 'arrays' && <Check className="h-4 w-4" />}
                        </button>
                        <button 
                          className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                            selectedCategory === 'linked-lists' 
                              ? 'bg-primary/10 text-primary' 
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => handleCategorySelect('linked-lists')}
                        >
                          <span>Linked Lists</span>
                          {selectedCategory === 'linked-lists' && <Check className="h-4 w-4" />}
                        </button>
                        <button 
                          className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                            selectedCategory === 'trees' 
                              ? 'bg-primary/10 text-primary' 
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => handleCategorySelect('trees')}
                        >
                          <span>Trees & Graphs</span>
                          {selectedCategory === 'trees' && <Check className="h-4 w-4" />}
                        </button>
                        <button 
                          className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                            selectedCategory === 'dp' 
                              ? 'bg-primary/10 text-primary' 
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => handleCategorySelect('dp')}
                        >
                          <span>Dynamic Programming</span>
                          {selectedCategory === 'dp' && <Check className="h-4 w-4" />}
                        </button>
                        <button 
                          className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                            selectedCategory === 'sorting' 
                              ? 'bg-primary/10 text-primary' 
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => handleCategorySelect('sorting')}
                        >
                          <span>Sorting & Searching</span>
                          {selectedCategory === 'sorting' && <Check className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      Reset Filters <X className="ml-2 h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <Star className="h-5 w-5 mr-2 text-yellow-500" />
                      Your Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Problems Solved</span>
                      <span className="font-medium">12/150</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '8%' }}></div>
                    </div>
                    
                    <div className="pt-2 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Easy</span>
                      <span className="text-xs font-medium">7/50</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: '14%' }}></div>
                    </div>
                    
                    <div className="pt-1 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Medium</span>
                      <span className="text-xs font-medium">4/70</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: '6%' }}></div>
                    </div>
                    
                    <div className="pt-1 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Hard</span>
                      <span className="text-xs font-medium">1/30</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: '3%' }}></div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" size="sm" className="w-full text-xs">
                      View Solved Problems
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-up" delay={100} className="lg:col-span-3">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Coding Problems</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <SortDesc className="h-3 w-3 mr-1" />
                        Sort By
                      </Button>
                      <Button size="sm" className="text-xs">
                        Random Problem
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    Choose a problem to solve and practice your coding skills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ProblemCard 
                      title="Two Sum" 
                      difficulty="Easy" 
                      categories={["Arrays", "Hash Table"]} 
                      description="Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target."
                      solvedRate="89%"
                    />
                    
                    <ProblemCard 
                      title="Longest Substring Without Repeating Characters" 
                      difficulty="Medium" 
                      categories={["String", "Sliding Window", "Hash Table"]} 
                      description="Given a string s, find the length of the longest substring without repeating characters."
                      solvedRate="73%"
                    />
                    
                    <ProblemCard 
                      title="Median of Two Sorted Arrays" 
                      difficulty="Hard" 
                      categories={["Arrays", "Binary Search", "Divide & Conquer"]} 
                      description="Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays."
                      solvedRate="34%"
                    />
                    
                    <ProblemCard 
                      title="Valid Parentheses" 
                      difficulty="Easy" 
                      categories={["String", "Stack"]} 
                      description="Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid."
                      solvedRate="92%"
                    />
                    
                    <ProblemCard 
                      title="Merge K Sorted Lists" 
                      difficulty="Hard" 
                      categories={["Linked List", "Heap", "Divide & Conquer"]} 
                      description="You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list."
                      solvedRate="45%"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full flex justify-center">
                    <div className="flex items-center space-x-1">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">1</Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">2</Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">3</Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">...</Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">15</Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
              
              <AnimatedSection animation="slide-up" delay={200} className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Coding Interview Patterns</CardTitle>
                    <CardDescription>
                      Learn essential patterns that are commonly used to solve coding problems
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2 justify-start">
                        <FileText className="h-6 w-6 mb-1" />
                        <span className="text-sm font-medium">Sliding Window</span>
                        <span className="text-xs text-muted-foreground">8 problems</span>
                      </Button>
                      
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2 justify-start">
                        <FileText className="h-6 w-6 mb-1" />
                        <span className="text-sm font-medium">Two Pointers</span>
                        <span className="text-xs text-muted-foreground">12 problems</span>
                      </Button>
                      
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2 justify-start">
                        <FileText className="h-6 w-6 mb-1" />
                        <span className="text-sm font-medium">Fast & Slow Pointers</span>
                        <span className="text-xs text-muted-foreground">6 problems</span>
                      </Button>
                      
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2 justify-start">
                        <FileText className="h-6 w-6 mb-1" />
                        <span className="text-sm font-medium">Merge Intervals</span>
                        <span className="text-xs text-muted-foreground">7 problems</span>
                      </Button>
                      
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2 justify-start">
                        <FileText className="h-6 w-6 mb-1" />
                        <span className="text-sm font-medium">Cyclic Sort</span>
                        <span className="text-xs text-muted-foreground">5 problems</span>
                      </Button>
                      
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2 justify-start">
                        <FileText className="h-6 w-6 mb-1" />
                        <span className="text-sm font-medium">BFS/DFS</span>
                        <span className="text-xs text-muted-foreground">14 problems</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProblemCardProps {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  categories: string[];
  description: string;
  solvedRate: string;
}

const ProblemCard = ({ title, difficulty, categories, description, solvedRate }: ProblemCardProps) => {
  const difficultyColor = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800'
  };

  return (
    <div className="border rounded-md p-4 hover:border-primary/50 hover:shadow-sm transition-all">
      <div className="flex justify-between">
        <div>
          <h3 className="font-medium hover:text-primary transition-colors">{title}</h3>
          <div className="flex items-center mt-1 flex-wrap gap-1">
            <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor[difficulty]}`}>
              {difficulty}
            </span>
            {categories.map((category, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs font-normal">
                {category}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="sm" className="h-8">
            <Code className="h-4 w-4 mr-1" />
            Solve
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{description}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center text-xs text-muted-foreground">
          <BookOpen className="h-3.5 w-3.5 mr-1" />
          Solution Rate: {solvedRate}
        </div>
        <div className="flex items-center text-xs">
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
            <Star className="h-3.5 w-3.5 mr-1 text-yellow-500" />
            Add to Favorites
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PracticeCoding;
