
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface AutomationStatus {
  status: 'idle' | 'running' | 'paused' | 'completed' | 'failed';
  jobsTotal: number;
  jobsCompleted: number;
  jobsFailed: number;
  currentJobId?: number;
  currentJobTitle?: string;
}

export interface AutomationLog {
  id: number;
  type: 'info' | 'success' | 'warning' | 'error' | 'search';
  message: string;
  timestamp: string;
}

export interface AutomationControlAction {
  action: 'start' | 'pause' | 'resume' | 'stop' | 'skip';
  jobTitle?: string;
  jobId?: number;
}

// Start the job search automation
export const startJobSearch = async (jobTitle: string): Promise<AutomationStatus> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/search-jobs`, { jobTitle });
    return response.data;
  } catch (error) {
    console.error('Error starting job search automation:', error);
    throw error;
  }
};

// Get current automation status
export const getAutomationStatus = async (): Promise<AutomationStatus> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/job-status`);
    return response.data;
  } catch (error) {
    console.error('Error getting automation status:', error);
    throw error;
  }
};

// Get automation logs
export const getAutomationLogs = async (): Promise<AutomationLog[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/job-logs`);
    return response.data.logs;
  } catch (error) {
    console.error('Error getting automation logs:', error);
    throw error;
  }
};

// Control the automation (pause/resume/stop/skip)
export const controlAutomation = async (controlAction: AutomationControlAction): Promise<AutomationStatus> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/control`, controlAction);
    return response.data;
  } catch (error) {
    console.error('Error controlling automation:', error);
    throw error;
  }
};

// Set up WebSocket connection for real-time updates
export const setupWebSocketConnection = (
  onStatusUpdate: (status: AutomationStatus) => void,
  onNewLog: (log: AutomationLog) => void
) => {
  // In a real implementation, this would create a WebSocket connection
  // For now, we'll create a mock implementation
  const mockWebSocket = {
    connect: () => {
      console.log('WebSocket connected');
      return true;
    },
    disconnect: () => {
      console.log('WebSocket disconnected');
      return true;
    }
  };
  
  return mockWebSocket;
};
