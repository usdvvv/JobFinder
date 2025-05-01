
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from "@/components/ui/toaster";
import Index from '@/pages/Index';
import LandingPage from '@/pages/LandingPage';
import JobListings from '@/pages/JobListings';
import AIJobSearch from '@/pages/AIJobSearch';
import AILiveAssistant from '@/pages/AILiveAssistant';
import ResumeMaker from '@/pages/ResumeMaker';
import PeerChatAI from '@/pages/PeerChatAI';
import InterviewPrep from '@/pages/InterviewPrep';
import AboutUs from '@/pages/AboutUs';
import ContactUs from '@/pages/ContactUs';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import NotFound from '@/pages/NotFound';
import AITherapist from '@/pages/AITherapist';
import Entertainment from '@/pages/Entertainment';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import ElevenLabsApiProvider from '@/components/ElevenLabsProvider';

// Company routes
import ApplicationsManager from '@/pages/company/ApplicationsManager';
import CompanyDashboard from '@/pages/company/CompanyDashboard';
import CompanyJobs from '@/pages/company/CompanyJobs';
import CompanyLogin from '@/pages/company/CompanyLogin';
import CompanySignup from '@/pages/company/CompanySignup';
import CreateJobPosting from '@/pages/company/CreateJobPosting';
import ViewJobPosting from '@/pages/company/ViewJobPosting';
import EditJobPosting from '@/pages/company/EditJobPosting';
import CompanyProfile from '@/pages/company/CompanyProfile';
import CompanyPeerChat from '@/pages/company/CompanyPeerChat';
import CompanyAITherapist from '@/pages/company/CompanyAITherapist';
import CompanyEntertainment from '@/pages/company/CompanyEntertainment';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ElevenLabsApiProvider>
        <Routes>
          {/* Main routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/ai-job-search" element={<AIJobSearch />} />
          <Route path="/ai-assistant" element={<AILiveAssistant />} />
          <Route path="/resume-maker" element={<ResumeMaker />} />
          <Route path="/peer-chat" element={<PeerChatAI />} />
          <Route path="/interview" element={<InterviewPrep />} />
          <Route path="/therapist" element={<AITherapist />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Company routes */}
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/company/jobs" element={<CompanyJobs />} />
          <Route path="/company/applications" element={<ApplicationsManager />} />
          <Route path="/company/login" element={<CompanyLogin />} />
          <Route path="/company/signup" element={<CompanySignup />} />
          <Route path="/company/post-job" element={<CreateJobPosting />} />
          <Route path="/company/jobs/:id" element={<ViewJobPosting />} />
          <Route path="/company/jobs/:id/edit" element={<EditJobPosting />} />
          <Route path="/company/profile" element={<CompanyProfile />} />
          <Route path="/company/peer-chat" element={<CompanyPeerChat />} />
          <Route path="/company/therapist" element={<CompanyAITherapist />} />
          <Route path="/company/entertainment" element={<CompanyEntertainment />} />
          
          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </ElevenLabsApiProvider>
    </ThemeProvider>
  );
}

export default App;
