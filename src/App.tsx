import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import LandingPage from "@/pages/LandingPage";
import ChooseSearchType from "@/pages/ChooseSearchType";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import JobListings from "@/pages/JobListings";
import ApplicationForm from "@/pages/ApplicationForm";
import AIJobSearch from "@/pages/AIJobSearch";
import ResumeMaker from "@/pages/ResumeMaker";
import Entertainment from "@/pages/Entertainment";
import InterviewPrep from "@/pages/InterviewPrep";
import PracticeCoding from "@/pages/PracticeCoding";
import AITherapist from "@/pages/AITherapist";
import AboutUs from "@/pages/AboutUs";
import ContactUs from "@/pages/ContactUs";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import AILiveAssistant from "@/pages/AILiveAssistant";
import PeerChatAI from "@/pages/PeerChatAI";
import RoleSelection from "@/pages/RoleSelection";
import NotFound from "@/pages/NotFound";

// Company pages
import CompanyLogin from "@/pages/company/CompanyLogin";
import CompanySignup from "@/pages/company/CompanySignup";
import CompanyDashboard from "@/pages/company/CompanyDashboard";
import CompanyJobs from "@/pages/company/CompanyJobs";
import CompanyProfile from "@/pages/company/CompanyProfile";
import ApplicationsManager from "@/pages/company/ApplicationsManager";
import CreateJobPosting from "@/pages/company/CreateJobPosting";
import CompanyAITherapist from "@/pages/company/CompanyAITherapist";
import CompanyEntertainment from "@/pages/company/CompanyEntertainment";
import CompanyPeerChat from "@/pages/company/CompanyPeerChat";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/choose" element={<ChooseSearchType />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/apply/:id" element={<ApplicationForm />} />
          <Route path="/resume" element={<ResumeMaker />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/interview" element={<InterviewPrep />} />
          <Route path="/practice" element={<PracticeCoding />} />
          <Route path="/therapist" element={<AITherapist />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/ai-job-search" element={<AIJobSearch />} />
          <Route path="/ai-assistant" element={<AILiveAssistant />} />
          <Route path="/peer-chat" element={<PeerChatAI />} />
          <Route path="/roles" element={<RoleSelection />} />
          <Route path="/company/login" element={<CompanyLogin />} />
          <Route path="/company/signup" element={<CompanySignup />} />
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/company/jobs" element={<CompanyJobs />} />
          <Route path="/company/profile" element={<CompanyProfile />} />
          <Route path="/company/applications" element={<ApplicationsManager />} />
          <Route path="/company/create-job" element={<CreateJobPosting />} />
          <Route path="/company/therapist" element={<CompanyAITherapist />} />
          <Route path="/company/entertainment" element={<CompanyEntertainment />} />
          <Route path="/company/peer-chat" element={<CompanyPeerChat />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
