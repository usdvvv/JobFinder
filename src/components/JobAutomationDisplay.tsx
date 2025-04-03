
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  PauseIcon, 
  PlayIcon, 
  Square as StopIcon,
  SkipForwardIcon,
  RefreshCw as RefreshIcon,
  MonitorIcon,
  BriefcaseIcon,
  ArrowRightIcon,
  Chrome as ChromeIcon
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { 
  AutomationStatus, 
  AutomationLog, 
  controlAutomation,
  getAutomationStatus,
  getAutomationLogs
} from '@/services/automationService';

interface JobAutomationDisplayProps {
  jobTitle: string;
}

const JobAutomationDisplay = ({ jobTitle }: JobAutomationDisplayProps) => {
  const { toast } = useToast();
  const [status, setStatus] = useState<AutomationStatus>({
    status: 'idle',
    jobsTotal: 0,
    jobsCompleted: 0,
    jobsFailed: 0
  });
  const [logs, setLogs] = useState<AutomationLog[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch initial status and logs
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const statusData = await getAutomationStatus();
        setStatus(statusData);
        setIsPaused(statusData.status === 'paused');
        
        const logsData = await getAutomationLogs();
        setLogs(logsData);
      } catch (error) {
        console.error('Error fetching automation data:', error);
        // In a real app, we'd handle this error properly
        // For now, let's use mock data for demonstration
        mockInitialData();
      }
    };
    
    const mockInitialData = () => {
      // Mocked data for development/demo purposes
      setStatus({
        status: 'running',
        jobsTotal: 25,
        jobsCompleted: 8,
        jobsFailed: 2,
        currentJobId: 9,
        currentJobTitle: 'Senior Software Engineer at Tech Innovations Inc.'
      });
      
      setLogs([
        {
          id: 1,
          type: 'info',
          message: `Started job search for "${jobTitle}" positions`,
          timestamp: new Date().toISOString()
        },
        {
          id: 2,
          type: 'search',
          message: 'Searching LinkedIn for relevant positions...',
          timestamp: new Date().toISOString()
        },
        {
          id: 3,
          type: 'info',
          message: 'Found 25 potential job matches',
          timestamp: new Date().toISOString()
        },
        {
          id: 4,
          type: 'success',
          message: 'Successfully applied to "Frontend Developer" at ABC Company',
          timestamp: new Date().toISOString()
        },
        {
          id: 5,
          type: 'warning',
          message: 'Complex application form detected at XYZ Corp, requiring manual intervention',
          timestamp: new Date().toISOString()
        },
        {
          id: 6,
          type: 'error',
          message: 'Failed to apply at 123 Tech - website error',
          timestamp: new Date().toISOString()
        },
        {
          id: 7,
          type: 'info',
          message: 'Opening Chrome browser for automation...',
          timestamp: new Date().toISOString()
        },
        {
          id: 8,
          type: 'info',
          message: 'Logging into LinkedIn...',
          timestamp: new Date().toISOString()
        }
      ]);
    };
    
    fetchInitialData();
    
    // Set up polling for updates (simulated websocket)
    const intervalId = setInterval(() => {
      if (status.status === 'running') {
        updateMockData();
      }
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, [jobTitle]);
  
  // Function to update mock data (simulates real-time updates)
  const updateMockData = () => {
    // Only update if we're in running state and not refreshing
    if (status.status !== 'running' || isPaused || isRefreshing) return;
    
    setStatus(prev => {
      // Don't update if we've completed all jobs
      if (prev.jobsCompleted + prev.jobsFailed >= prev.jobsTotal) {
        return {
          ...prev,
          status: 'completed'
        };
      }
      
      const newCompleted = Math.min(prev.jobsCompleted + 1, prev.jobsTotal - prev.jobsFailed);
      return {
        ...prev,
        jobsCompleted: newCompleted,
        currentJobId: (prev.currentJobId || 0) + 1,
        currentJobTitle: getRandomJobTitle()
      };
    });
    
    // Add a new log entry
    const logTypes: ('success' | 'warning' | 'error')[] = ['success', 'success', 'success', 'warning', 'error'];
    const logType = logTypes[Math.floor(Math.random() * logTypes.length)];
    
    const newLog: AutomationLog = {
      id: logs.length + 1,
      type: logType,
      message: getLogMessage(logType, status.currentJobTitle || ''),
      timestamp: new Date().toISOString()
    };
    
    setLogs(prev => [...prev, newLog]);
  };
  
  const getRandomJobTitle = () => {
    const companies = ['Google', 'Microsoft', 'Amazon', 'Apple', 'Netflix', 'Spotify', 'Twitter', 'Meta', 'LinkedIn', 'Adobe'];
    const positions = ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'UI/UX Designer', 'Product Manager', 'Data Scientist'];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const position = positions[Math.floor(Math.random() * positions.length)];
    
    return `${position} at ${company}`;
  };
  
  const getLogMessage = (type: 'success' | 'warning' | 'error', jobTitle: string) => {
    switch (type) {
      case 'success':
        return `Successfully applied to "${jobTitle}"`;
      case 'warning':
        return `Application to "${jobTitle}" requires additional information`;
      case 'error':
        return `Failed to apply to "${jobTitle}" - form submission error`;
      default:
        return '';
    }
  };
  
  const handleControlAction = async (action: 'start' | 'pause' | 'resume' | 'stop' | 'skip') => {
    try {
      setIsRefreshing(true);
      
      // In a real app, this would call the backend API
      // const newStatus = await controlAutomation({ action });
      
      // Mock the control actions
      let newStatus: AutomationStatus;
      
      switch (action) {
        case 'pause':
          newStatus = { ...status, status: 'paused' };
          setIsPaused(true);
          toast({
            title: "Automation Paused",
            description: "The application process has been paused. Resume when ready.",
          });
          break;
        case 'resume':
          newStatus = { ...status, status: 'running' };
          setIsPaused(false);
          toast({
            title: "Automation Resumed",
            description: "The application process has been resumed.",
          });
          break;
        case 'stop':
          newStatus = { ...status, status: 'completed' };
          toast({
            title: "Automation Stopped",
            description: "The application process has been stopped.",
          });
          break;
        case 'skip':
          newStatus = { 
            ...status,
            currentJobId: (status.currentJobId || 0) + 1,
            currentJobTitle: getRandomJobTitle()
          };
          toast({
            title: "Job Skipped",
            description: "Skipped to the next job in the queue.",
          });
          break;
        default:
          newStatus = status;
      }
      
      setStatus(newStatus);
      
      // Add a log entry for the action
      const actionLog: AutomationLog = {
        id: logs.length + 1,
        type: 'info',
        message: `User action: ${action} automation`,
        timestamp: new Date().toISOString()
      };
      
      setLogs(prev => [...prev, actionLog]);
    } catch (error) {
      console.error(`Error controlling automation (${action}):`, error);
      toast({
        variant: "destructive",
        title: "Automation Control Failed",
        description: `Failed to ${action} the automation.`,
      });
    } finally {
      setIsRefreshing(false);
    }
  };
  
  const calculateProgress = () => {
    if (status.jobsTotal === 0) return 0;
    return ((status.jobsCompleted + status.jobsFailed) / status.jobsTotal) * 100;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };
  
  const getLogIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <div className="w-4 h-4 rounded-full bg-blue-500 mr-2" />;
      case 'success':
        return <div className="w-4 h-4 rounded-full bg-green-500 mr-2" />;
      case 'warning':
        return <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2" />;
      case 'error':
        return <div className="w-4 h-4 rounded-full bg-red-500 mr-2" />;
      case 'search':
        return <div className="w-4 h-4 rounded-full bg-purple-500 mr-2" />;
      default:
        return <div className="w-4 h-4 rounded-full bg-gray-500 mr-2" />;
    }
  };
  
  // Determine if process is complete
  const isComplete = status.status === 'completed' || 
                     (status.jobsCompleted + status.jobsFailed >= status.jobsTotal && status.jobsTotal > 0);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Job Application Automation</CardTitle>
            <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded text-xs font-medium text-blue-800 dark:text-blue-200">
              <ChromeIcon className="h-3 w-3 mr-1" />
              Using Chrome
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">
                  {isComplete 
                    ? "Process Complete" 
                    : status.status === 'idle'
                      ? "Ready to Start"
                      : status.status === 'paused'
                        ? "Process Paused"
                        : "Applying to Jobs"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {status.jobsTotal > 0 
                    ? `Progress: ${status.jobsCompleted} completed, ${status.jobsFailed} failed out of ${status.jobsTotal} jobs`
                    : "No jobs in queue yet"}
                </p>
              </div>
              
              <div className="flex gap-2">
                {status.status === 'running' && !isPaused && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleControlAction('pause')}
                    >
                      <PauseIcon className="h-4 w-4 mr-1" />
                      Pause
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleControlAction('skip')}
                      disabled={isComplete}
                    >
                      <SkipForwardIcon className="h-4 w-4 mr-1" />
                      Skip
                    </Button>
                  </>
                )}
                
                {status.status === 'paused' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleControlAction('resume')}
                  >
                    <PlayIcon className="h-4 w-4 mr-1" />
                    Resume
                  </Button>
                )}
                
                {!isComplete && status.status !== 'idle' && (
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleControlAction('stop')}
                  >
                    <StopIcon className="h-4 w-4 mr-1" />
                    Stop
                  </Button>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{calculateProgress().toFixed(0)}% Complete</span>
                <span>
                  {status.jobsCompleted} / {status.jobsTotal} Jobs
                </span>
              </div>
              <Progress value={calculateProgress()} className="h-2" />
            </div>
            
            {status.currentJobTitle && !isComplete && (
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-md">
                <p className="text-sm text-muted-foreground mb-1">Currently processing:</p>
                <p className="font-medium">{status.currentJobTitle}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Automation Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-[300px] overflow-y-auto pr-2">
            <div className="space-y-2">
              {logs.length > 0 ? (
                logs.map((log) => (
                  <div key={log.id} className="flex items-start">
                    {getLogIcon(log.type)}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium">{log.message}</p>
                        <span className="text-xs text-muted-foreground">{formatTimestamp(log.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No logs available yet.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobAutomationDisplay;
