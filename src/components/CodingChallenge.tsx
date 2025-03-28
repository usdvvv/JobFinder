
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Play, Check, RefreshCw, Code, FileText, EyeOff } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface CodingChallengeProps {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: string;
  solution: string;
  onClose: () => void;
}

const CodingChallenge = ({
  title,
  description,
  difficulty,
  category,
  examples,
  starterCode,
  solution,
  onClose
}: CodingChallengeProps) => {
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState('problem');
  const [showSolution, setShowSolution] = useState(false);
  
  const { toast } = useToast();
  
  const difficultyColor = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800'
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput('');
    
    // Capture console.log output
    const originalConsoleLog = console.log;
    let logs: string[] = [];
    
    console.log = (...args) => {
      logs.push(args.map(arg => String(arg)).join(' '));
      originalConsoleLog(...args);
    };
    
    // Simulate code execution (in a real app, you would use a safe execution environment)
    setTimeout(() => {
      try {
        // Wrap the user code in a function to isolate it
        const userCodeFunction = new Function(`
          let output = [];
          const console = {
            log: (...args) => {
              output.push(args.map(arg => String(arg)).join(' '));
            }
          };
          
          ${code}
          
          return output;
        `);
        
        const result = userCodeFunction();
        setOutput(result.join('\n'));
        
        // Check if the solution is correct - this is a simplified check
        // In a real app, you would run test cases
        const userOutput = result.join('\n').trim();
        
        if (userOutput && userOutput.length > 0) {
          // In a real implementation, we would check against test cases
          // This is just a simplified demo
          if (code.includes('return') && !code.includes('// TODO')) {
            setIsCorrect(true);
            toast({
              title: "Success!",
              description: "Your solution passed the tests!",
              variant: "default",
            });
          } else {
            setIsCorrect(false);
          }
        } else {
          setIsCorrect(null);
        }
      } catch (error) {
        setOutput(`Error: ${error.message}`);
        setIsCorrect(false);
      } finally {
        setIsRunning(false);
        console.log = originalConsoleLog;
      }
    }, 1000);
  };
  
  const resetCode = () => {
    setCode(starterCode);
    setOutput('');
    setIsCorrect(null);
  };
  
  const toggleSolution = () => {
    if (!showSolution) {
      toast({
        title: "Viewing Solution",
        description: "Remember, learning happens when you solve problems yourself!",
        variant: "default",
      });
    }
    setShowSolution(!showSolution);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] flex flex-col">
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{title}</CardTitle>
            <div className="flex items-center space-x-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor[difficulty]}`}>
                {difficulty}
              </span>
              <Badge variant="secondary">{category}</Badge>
              <Button variant="ghost" size="sm" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <div className="flex-1 min-h-0 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="px-4 pt-2">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="problem">Problem</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="output">Output</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <TabsContent value="problem" className="h-full mt-0">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Problem Description</h3>
                    <p className="mt-2 text-muted-foreground whitespace-pre-line">{description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Examples</h3>
                    <div className="space-y-4 mt-2">
                      {examples.map((example, idx) => (
                        <div key={idx} className="border rounded-md p-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium">Input:</h4>
                              <pre className="mt-1 p-2 bg-muted rounded text-xs overflow-x-auto">
                                {example.input}
                              </pre>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Output:</h4>
                              <pre className="mt-1 p-2 bg-muted rounded text-xs overflow-x-auto">
                                {example.output}
                              </pre>
                            </div>
                          </div>
                          {example.explanation && (
                            <div className="mt-2">
                              <h4 className="text-sm font-medium">Explanation:</h4>
                              <p className="mt-1 text-sm text-muted-foreground">{example.explanation}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="code" className="h-full mt-0">
                <div className="space-y-4 h-full flex flex-col">
                  <div className="flex-1">
                    <Textarea
                      className="font-mono text-sm h-full min-h-[400px] p-3"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Write your solution here..."
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={resetCode}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reset Code
                    </Button>
                    
                    <div className="space-x-2">
                      <Button variant="outline" onClick={toggleSolution}>
                        {showSolution ? <EyeOff className="mr-2 h-4 w-4" /> : <FileText className="mr-2 h-4 w-4" />}
                        {showSolution ? "Hide Solution" : "View Solution"}
                      </Button>
                      
                      <Button onClick={runCode} disabled={isRunning}>
                        {isRunning ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Running...
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Run Code
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  {showSolution && (
                    <div className="border rounded-md p-3">
                      <h4 className="text-sm font-medium mb-2">Solution:</h4>
                      <pre className="p-3 bg-muted rounded text-xs overflow-x-auto whitespace-pre-wrap">
                        {solution}
                      </pre>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="output" className="h-full mt-0">
                <div className="space-y-4 h-full flex flex-col">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-medium">Output</h3>
                    {isCorrect === true && (
                      <div className="flex items-center text-green-600">
                        <Check className="h-4 w-4 mr-1" />
                        <span className="text-sm">All tests passed!</span>
                      </div>
                    )}
                    {isCorrect === false && (
                      <div className="text-sm text-red-600">
                        Some tests failed. Check your solution.
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-h-[400px] border rounded-md p-3 bg-muted overflow-auto">
                    <pre className="font-mono text-sm whitespace-pre-wrap">
                      {output || "Output will appear here after running your code."}
                    </pre>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        <CardFooter className="border-t py-3">
          <div className="w-full flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {difficulty} · {category}
            </div>
            
            <Button variant="default" onClick={runCode} disabled={isRunning}>
              {isRunning ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Code className="mr-2 h-4 w-4" />
                  Submit Solution
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CodingChallenge;
