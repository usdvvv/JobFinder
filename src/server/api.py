
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
            "title": job_title,
            "company": "TechCorp Inc.",
            "location": "San Francisco, CA",
            "salary": "$120K - $150K",
            "description": "We are looking for an experienced professional to join our team...",
            "posted": "2 days ago",
            "remote": True,
            "link": "#"
        },
        {
            "id": 102,
            "title": job_title,
            "company": "Innovation Labs",
            "location": "New York, NY",
            "salary": "$110K - $140K",
            "description": "Join our dynamic team working on cutting-edge projects...",
            "posted": "1 week ago",
            "remote": False,
            "link": "#"
        },
        {
            "id": 103,
            "title": job_title,
            "company": "Future Technologies",
            "location": "Remote",
            "salary": "$100K - $130K",
            "description": "We're seeking a talented individual to help us build the next generation of products...",
            "posted": "3 days ago",
            "remote": True,
            "link": "#"
        },
        {
            "id": 104,
            "title": job_title,
            "company": "Digital Solutions",
            "location": "Austin, TX",
            "salary": "$115K - $145K",
            "description": "Be part of a team that's transforming how businesses operate...",
            "posted": "5 days ago",
            "remote": False,
            "link": "#"
        },
        {
            "id": 105,
            "title": job_title,
            "company": "Tech Innovators",
            "location": "Seattle, WA",
            "salary": "$125K - $155K",
            "description": "Work on challenging problems and innovative solutions...",
            "posted": "1 day ago",
            "remote": True,
            "link": "#"
        }
    ]
    
    return mock_search_results

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

if __name__ == '__main__':
    app.run(debug=True, port=5000)
