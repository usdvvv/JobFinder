
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

const EditJobPosting = () => {
  const { id } = useParams();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg px-8 py-10 max-w-xl w-full text-center">
        <Edit className="h-12 w-12 mx-auto text-blue-600 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Edit Job Posting</h1>
        <p className="text-muted-foreground mb-4">
          You are editing Job Posting ID: <span className="font-semibold text-blue-600">{id}</span>
        </p>
        <Button asChild>
          <Link to="/company/jobs">Back to Job Postings</Link>
        </Button>
      </div>
    </div>
  );
};

export default EditJobPosting;
