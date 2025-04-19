
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const LOCAL_STORAGE_KEY = "company_job_postings";

function getJobById(id) {
  const jobs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
  return jobs.find(j => String(j.id) === String(id));
}

function updateJob(updatedJob) {
  const jobs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
  const idx = jobs.findIndex(j => String(j.id) === String(updatedJob.id));
  if (idx !== -1) {
    jobs[idx] = updatedJob;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(jobs));
    return true;
  }
  return false;
}

const EditJobPosting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = getJobById(id);

  const [form, setForm] = useState(job ? {
    title: job.title,
    location: job.location,
    type: job.type,
    level: job.level,
    status: job.status,
  } : null);

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-background">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg px-8 py-10 max-w-xl w-full text-center">
          <Edit className="h-12 w-12 mx-auto text-red-600 mb-4" />
          <h1 className="text-2xl font-bold mb-2 text-red-500">Job Not Found</h1>
          <p className="text-muted-foreground mb-4">
            No job posting was found for ID: <span className="font-semibold text-red-600">{id}</span>
          </p>
          <Button asChild>
            <Link to="/company/jobs">Back to Job Postings</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleStatusToggle = () => {
    setForm(f => ({
      ...f,
      status: f.status === "active" ? "closed" : "active"
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const updated = { ...job, ...form };
    const success = updateJob(updated);
    if (success) {
      toast({
        title: "Job Updated",
        description: "The job posting has been successfully updated.",
      });
      navigate(`/company/jobs/${job.id}`);
    } else {
      toast({
        title: "Error",
        description: "Failed to update job posting.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg px-8 py-10 max-w-xl w-full text-left">
        <div className="flex items-center gap-2 mb-4">
          <Edit className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold">Edit Job Posting</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-muted-foreground">Job Title</label>
            <Input name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-muted-foreground">Location</label>
            <Input name="location" value={form.location} onChange={handleChange} required />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-muted-foreground">Job Type</label>
            <Input name="type" value={form.type} onChange={handleChange} required />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-muted-foreground">Experience Level</label>
            <Input name="level" value={form.level} onChange={handleChange} required />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-muted-foreground">Status</label><br />
            <Button type="button" 
              className={form.status === "active" 
                ? "bg-green-100 text-green-800 hover:bg-green-200" 
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"}
              onClick={handleStatusToggle}
            >
              {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
            </Button>
            <span className="ml-2 text-xs text-muted-foreground">(Click to toggle)</span>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button asChild variant="outline" type="button">
              <Link to={`/company/jobs/${job.id}`}>Cancel</Link>
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobPosting;
