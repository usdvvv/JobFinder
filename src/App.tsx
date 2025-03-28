
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";
import AIFloatingAssistant from "./components/AIFloatingAssistant";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <AIFloatingAssistant />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
