
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import AutomationMonitor from '@/components/AutomationMonitor';
import { Loader2Icon } from 'lucide-react';

const JobAutomationMonitor = () => {
  const { search } = useLocation();
  const [jobTitle, setJobTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Parse job title from URL query parameters
    const params = new URLSearchParams(search);
    const title = params.get('jobTitle');
    
    if (title) {
      setJobTitle(title);
    } else {
      // Fallback title if not provided
      setJobTitle('Software Engineer');
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2Icon className="w-10 h-10 text-primary animate-spin mb-4" />
            <h3 className="text-lg font-medium">Connecting to automation service...</h3>
          </div>
        ) : (
          <AutomationMonitor />
        )}
      </main>
    </div>
  );
};

export default JobAutomationMonitor;
