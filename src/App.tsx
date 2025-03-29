
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// User pages
import RoleSelection from "./pages/RoleSelection";
import LandingPage from "./pages/LandingPage";
import ChooseSearchType from "./pages/ChooseSearchType";
import JobListings from "./pages/JobListings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ApplicationForm from "./pages/ApplicationForm";
import ResumeMaker from "./pages/ResumeMaker";
import InterviewPrep from "./pages/InterviewPrep";
import PracticeCoding from "./pages/PracticeCoding";
import AITherapist from "./pages/AITherapist";
import AILiveAssistant from "./pages/AILiveAssistant";
import PeerChatAI from "./pages/PeerChatAI";
import Entertainment from "./pages/Entertainment";

// Company pages
import CompanyLogin from "./pages/company/CompanyLogin";
import CompanySignup from "./pages/company/CompanySignup";
import CompanyDashboard from "./pages/company/CompanyDashboard";
import CompanyJobs from "./pages/company/CompanyJobs";
import CompanyProfile from "./pages/company/CompanyProfile";
import CreateJobPosting from "./pages/company/CreateJobPosting";
import ApplicationsManager from "./pages/company/ApplicationsManager";

// Information pages
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContactUs from "./pages/ContactUs";

// Shared components
import NotFound from "./pages/NotFound";
import AIFloatingAssistant from "./components/AIFloatingAssistant";

const App = () => {
  // Create a new QueryClient inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Role selection - first page */}
            <Route path="/" element={<RoleSelection />} />
            
            {/* User routes */}
            <Route path="/home" element={<LandingPage />} />
            <Route path="/choose" element={<ChooseSearchType />} />
            <Route path="/jobs" element={<JobListings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/apply/:id" element={<ApplicationForm />} />
            <Route path="/resume" element={<ResumeMaker />} />
            <Route path="/interview" element={<InterviewPrep />} />
            <Route path="/practice" element={<PracticeCoding />} />
            <Route path="/therapist" element={<AITherapist />} />
            <Route path="/assistant" element={<AILiveAssistant />} />
            <Route path="/peer-chat" element={<PeerChatAI />} />
            <Route path="/entertainment" element={<Entertainment />} />
            
            {/* Company routes */}
            <Route path="/company/login" element={<CompanyLogin />} />
            <Route path="/company/signup" element={<CompanySignup />} />
            <Route path="/company/dashboard" element={<CompanyDashboard />} />
            <Route path="/company/jobs" element={<CompanyJobs />} />
            <Route path="/company/jobs/create" element={<CreateJobPosting />} />
            <Route path="/company/jobs/:id" element={<CompanyJobs />} />
            <Route path="/company/jobs/:id/edit" element={<CreateJobPosting />} />
            <Route path="/company/applications" element={<ApplicationsManager />} />
            <Route path="/company/profile" element={<CompanyProfile />} />
            
            {/* Information pages */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/contact" element={<ContactUs />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AIFloatingAssistant />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
