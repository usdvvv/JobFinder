
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import tempfile
import time
import json

# Mock functions that simulate the behavior of your backend
# In a real implementation, you would import your actual functions
def extract_text_from_file(file_content, file_type):
    """Simulates extracting text from a PDF or DOCX file."""
    # In real implementation, use pdfminer.high_level or python-docx
    return "Extracted CV text would appear here."

def find_matching_jobs(cv_text):
    """Simulates the AI job matching function."""
    # In real implementation, this would call the Ollama API
    # Since we can't run Ollama in this environment, we'll return mock data
    
    job_matches = [
        {
            "id": 1,
            "title": "Senior Frontend Developer",
            "matchScore": 92,
            "whyMatch": "Your extensive React experience and UI/UX skills align perfectly with this role.",
            "responsibilities": [
                "Develop responsive web applications using React",
                "Collaborate with UI/UX designers to implement designs",
                "Optimize application performance and user experience"
            ],
            "whyExcel": "Your portfolio demonstrates exceptional UI work and your experience with performance optimization will be valuable."
        },
        {
            "id": 2,
            "title": "Full Stack Engineer",
            "matchScore": 87,
            "whyMatch": "Your combined frontend and backend experience makes you an ideal candidate.",
            "responsibilities": [
                "Build full-stack web applications",
                "Work with Node.js backends and React frontends",
                "Design and implement database schemas"
            ],
            "whyExcel": "Your GitHub projects show proficiency in both frontend and backend technologies."
        },
        {
            "id": 3,
            "title": "UX/UI Developer",
            "matchScore": 85,
            "whyMatch": "Your design sensibility combined with development skills is perfect for this hybrid role.",
            "responsibilities": [
                "Create wireframes and prototypes",
                "Implement responsive designs in code",
                "Conduct usability testing"
            ],
            "whyExcel": "Your attention to detail and understanding of user experience principles are evident in your work."
        },
        {
            "id": 4,
            "title": "DevOps Engineer",
            "matchScore": 78,
            "whyMatch": "Your experience with CI/CD pipelines and cloud services is relevant for this position.",
            "responsibilities": [
                "Set up and maintain CI/CD pipelines",
                "Manage cloud infrastructure",
                "Optimize deployment workflows"
            ],
            "whyExcel": "Your background in automation and infrastructure as code will be particularly valuable."
        },
        {
            "id": 5,
            "title": "Technical Lead",
            "matchScore": 76,
            "whyMatch": "Your leadership experience and technical expertise qualify you for this role.",
            "responsibilities": [
                "Lead a team of developers",
                "Make architectural decisions",
                "Mentor junior team members"
            ],
            "whyExcel": "Your communication skills and experience mentoring junior developers make you a strong fit."
        }
    ]
    
    return job_matches

def search_jobs_by_title(job_title):
    """Simulates searching for jobs by title on LinkedIn."""
    # In real implementation, this would use Selenium to scrape LinkedIn
    
    # Mock search results
    mock_search_results = [
        {
            "id": 101,
            "title": f"Senior {job_title}",
            "company": "TechCorp Inc.",
            "location": "San Francisco, CA",
            "salary": "$120K - $150K",
            "description": "We are looking for an experienced professional to join our team. You'll be responsible for developing and maintaining high-quality applications, collaborating with cross-functional teams, and ensuring best practices in software development.",
            "posted": "2 days ago",
            "remote": True,
            "link": "https://linkedin.com/jobs/view/123456"
        },
        {
            "id": 102,
            "title": job_title,
            "company": "Innovation Labs",
            "location": "New York, NY",
            "salary": "$110K - $140K",
            "description": "Join our dynamic team working on cutting-edge projects. We're seeking a talented individual who can hit the ground running and contribute to our growing portfolio of products. Experience with agile methodologies and a passion for clean code required.",
            "posted": "1 week ago",
            "remote": False,
            "link": "https://linkedin.com/jobs/view/123457"
        },
        {
            "id": 103,
            "title": f"{job_title} (Mid-level)",
            "company": "Future Technologies",
            "location": "Remote",
            "salary": "$100K - $130K",
            "description": "We're seeking a talented individual to help us build the next generation of products. This role requires strong problem-solving skills, attention to detail, and the ability to work independently. We offer competitive benefits and a flexible work environment.",
            "posted": "3 days ago",
            "remote": True,
            "link": "https://linkedin.com/jobs/view/123458"
        },
        {
            "id": 104,
            "title": f"Lead {job_title}",
            "company": "Digital Solutions",
            "location": "Austin, TX",
            "salary": "$115K - $145K",
            "description": "Be part of a team that's transforming how businesses operate. In this leadership role, you'll guide the development of our core products, mentor junior team members, and collaborate with stakeholders to define technical requirements and expectations.",
            "posted": "5 days ago",
            "remote": False,
            "link": "https://linkedin.com/jobs/view/123459"
        },
        {
            "id": 105,
            "title": f"Junior {job_title}",
            "company": "Tech Innovators",
            "location": "Seattle, WA",
            "salary": "$80K - $100K",
            "description": "Great opportunity for early-career professionals! Work on challenging problems and innovative solutions in a supportive environment. We value fresh perspectives and provide extensive training and mentorship to help you grow your career.",
            "posted": "1 day ago",
            "remote": True,
            "link": "https://linkedin.com/jobs/view/123460"
        },
        {
            "id": 106,
            "title": f"Contract {job_title}",
            "company": "GrowthWorks",
            "location": "Chicago, IL",
            "salary": "$70/hr - $90/hr",
            "description": "6-month contract position with possibility of extension or conversion to full-time. Work with our experienced team to deliver high-quality solutions for our enterprise clients. Requires excellent communication skills and ability to adapt quickly.",
            "posted": "4 days ago",
            "remote": True,
            "link": "https://linkedin.com/jobs/view/123461"
        },
        {
            "id": 107,
            "title": f"{job_title} - Startup Environment",
            "company": "NextGen Startup",
            "location": "Miami, FL",
            "salary": "$90K - $120K + equity",
            "description": "Join our fast-growing startup and make an immediate impact! We're looking for a versatile team player who thrives in a dynamic environment. You'll wear many hats and have significant input into our product development and technical decisions.",
            "posted": "1 week ago",
            "remote": False,
            "link": "https://linkedin.com/jobs/view/123462"
        },
        {
            "id": 108,
            "title": f"{job_title} - Healthcare Focus",
            "company": "HealthTech Solutions",
            "location": "Boston, MA",
            "salary": "$115K - $135K",
            "description": "Use your technical skills to make a difference in healthcare! We're developing innovative solutions that improve patient outcomes and streamline clinical workflows. Prior healthcare experience is a plus but not required.",
            "posted": "2 weeks ago",
            "remote": True,
            "link": "https://linkedin.com/jobs/view/123463"
        }
    ]
    
    return mock_search_results

def apply_to_job(job_id):
    """Simulates applying to a job via LinkedIn Easy Apply or external form."""
    # In real implementation, this would use Selenium to fill out application forms
    
    # Mock application status
    application_status = {
        "id": 1000 + job_id,
        "jobId": job_id,
        "status": "completed" if job_id % 5 != 0 else "failed",  # Simulate some failures
        "logs": [
            "Opening job posting...",
            "Locating apply button...",
            "Filling application form...",
            "Submitting application..."
        ],
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.localtime())
    }
    
    if application_status["status"] == "completed":
        application_status["logs"].append("Application completed successfully!")
    else:
        application_status["logs"].append("Error: Application failed. Could not submit form.")
    
    return application_status

def apply_to_multiple_jobs(job_ids):
    """Simulates applying to multiple jobs in sequence."""
    # In real implementation, this would loop through jobs and apply to each
    
    # Mock batch application results
    applications = []
    for job_id in job_ids:
        status = apply_to_job(job_id)
        applications.append(status)
    
    return applications

# Setup Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/analyze-cv', methods=['POST'])
def analyze_cv():
    """Endpoint to analyze uploaded CV and return job matches."""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        # Check file extension
        file_ext = os.path.splitext(file.filename)[1].lower()
        if file_ext not in ['.pdf', '.docx']:
            return jsonify({'error': 'File must be PDF or DOCX format'}), 400
        
        # Save the file temporarily
        temp_file = tempfile.NamedTemporaryFile(delete=False)
        file.save(temp_file.name)
        
        # Extract text from CV
        cv_text = extract_text_from_file(temp_file.name, file_ext)
        
        # Clean up temp file
        os.unlink(temp_file.name)
        
        # Find matching jobs
        job_matches = find_matching_jobs(cv_text)
        
        # Simulate processing time
        time.sleep(1)
        
        return jsonify({'job_matches': job_matches})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/search-jobs', methods=['POST'])
def search_jobs():
    """Endpoint to search for jobs by title."""
    try:
        data = request.json
        job_title = data.get('jobTitle', '')
        
        if not job_title:
            return jsonify({'error': 'Job title is required'}), 400
        
        # Search for jobs by title
        search_results = search_jobs_by_title(job_title)
        
        # Simulate processing time
        time.sleep(1)
        
        return jsonify({'search_results': search_results})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/apply-job', methods=['POST'])
def apply_job():
    """Endpoint to apply to a single job."""
    try:
        data = request.json
        job_id = data.get('jobId')
        candidate_data = data.get('candidateData')
        
        if not job_id:
            return jsonify({'error': 'Job ID is required'}), 400
        
        # Apply to the job
        application_status = apply_to_job(job_id)
        
        # Simulate processing time
        time.sleep(2)
        
        return jsonify(application_status)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/apply-multiple', methods=['POST'])
def apply_multiple():
    """Endpoint to apply to multiple jobs in batch."""
    try:
        data = request.json
        job_ids = data.get('jobIds', [])
        candidate_data = data.get('candidateData')
        
        if not job_ids:
            return jsonify({'error': 'Job IDs are required'}), 400
        
        # Apply to multiple jobs
        applications = apply_to_multiple_jobs(job_ids)
        
        # Simulate processing time
        time.sleep(len(job_ids) * 0.5)  # Longer processing time for multiple applications
        
        return jsonify({'applications': applications})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/job-status/<int:application_id>', methods=['GET'])
def job_status(application_id):
    """Endpoint to check the status of a job application."""
    try:
        # In real implementation, this would query application status from database
        # For demo, we'll create a mock status
        
        status = {
            "id": application_id,
            "jobId": application_id - 1000,  # Reverse the fake ID we created
            "status": "completed" if application_id % 5 != 0 else "failed",
            "logs": [
                "Opening job posting...",
                "Locating apply button...",
                "Filling application form...",
                "Submitting application...",
                "Application completed successfully!" if application_id % 5 != 0 else "Error: Application failed."
            ],
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.localtime())
        }
        
        return jsonify(status)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
