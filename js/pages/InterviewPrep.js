// Interview Prep Page Component - Vue style

const InterviewPrepComponent = createComponent({
  template: function(data, methods) {
    const { activeTab, isInterviewing, selectedDifficulty, selectedIndustry } = data;
    
    return `
      <div class="min-h-screen pt-16">
        <div class="bg-[#0f172a] text-white">
          <div class="container mx-auto px-4 py-12 md:py-24">
            <div class="text-center mb-12">
              <h1 class="text-4xl font-bold mb-4">AI Interview Preparation</h1>
              <p class="text-xl text-blue-200 max-w-3xl mx-auto">
                Practice with our AI interviewer for realistic interview experience and real-time feedback.
              </p>
            </div>
            
            ${isInterviewing ? `
              <!-- Interview Mode -->
              <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div class="md:col-span-5">
                  <div class="card bg-black/40 backdrop-blur-sm border-blue-500/20 p-6">
                    <h2 class="text-2xl font-bold mb-4">Interview in Progress</h2>
                    <p class="text-blue-200 mb-6">
                      ${selectedIndustry} - ${selectedDifficulty} Difficulty
                    </p>
                    
                    <div class="space-y-4">
                      <div class="bg-blue-900/30 rounded-lg p-4">
                        <h3 class="text-lg font-semibold mb-2">Interview Transcript</h3>
                        <div class="space-y-2" id="interview-transcript">
                          <div class="flex items-start gap-2">
                            <div class="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-sm">AI</div>
                            <div class="bg-blue-600/20 rounded-lg p-3 text-sm">
                              Hello! I'll be conducting your interview today. Could you briefly introduce yourself and tell me about your background?
                            </div>
                          </div>
                          <div class="flex items-start gap-2">
                            <div class="w-8 h-8 rounded-full bg-blue-300/20 flex-shrink-0 flex items-center justify-center text-sm">You</div>
                            <div class="bg-blue-300/20 rounded-lg p-3 text-sm">
                              Hi, I'm a software engineer with 5 years of experience in web development...
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div class="bg-blue-900/30 rounded-lg p-4">
                        <h3 class="text-lg font-semibold mb-2">Speaking Instructions</h3>
                        <p class="text-sm text-blue-200">
                          Speak clearly into your microphone. The AI interviewer will respond to your answers and ask follow-up questions.
                        </p>
                      </div>
                      
                      <div class="flex flex-col gap-4 mt-6">
                        <button class="btn btn-primary" onclick="InterviewPrepComponent.methods.endInterview()">
                          <i data-lucide="x-circle" class="w-4 h-4 mr-2"></i>
                          End Interview
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="md:col-span-7">
                  <div id="interview-avatar-container"></div>
                </div>
              </div>
            ` : `
              <!-- Preparation Mode -->
              <div class="max-w-4xl mx-auto">
                <div class="bg-black/40 backdrop-blur-sm border-blue-500/20 rounded-lg p-6 mb-8">
                  <div class="mb-6">
                    <h2 class="text-2xl font-bold mb-2">Interview Settings</h2>
                    <p class="text-blue-200">Customize your practice interview session.</p>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Industry Selection -->
                    <div>
                      <label class="block text-sm font-medium mb-2">Industry</label>
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <button 
                          class="btn ${selectedIndustry === 'Technology' ? 'btn-primary' : 'btn-outline'}"
                          onclick="InterviewPrepComponent.methods.selectIndustry('Technology')"
                        >Technology</button>
                        <button 
                          class="btn ${selectedIndustry === 'Finance' ? 'btn-primary' : 'btn-outline'}"
                          onclick="InterviewPrepComponent.methods.selectIndustry('Finance')"
                        >Finance</button>
                        <button 
                          class="btn ${selectedIndustry === 'Healthcare' ? 'btn-primary' : 'btn-outline'}"
                          onclick="InterviewPrepComponent.methods.selectIndustry('Healthcare')"
                        >Healthcare</button>
                        <button 
                          class="btn ${selectedIndustry === 'Marketing' ? 'btn-primary' : 'btn-outline'}"
                          onclick="InterviewPrepComponent.methods.selectIndustry('Marketing')"
                        >Marketing</button>
                      </div>
                    </div>
                    
                    <!-- Difficulty Selection -->
                    <div>
                      <label class="block text-sm font-medium mb-2">Difficulty Level</label>
                      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <button 
                          class="btn ${selectedDifficulty === 'Easy' ? 'btn-primary' : 'btn-outline'}"
                          onclick="InterviewPrepComponent.methods.selectDifficulty('Easy')"
                        >Easy</button>
                        <button 
                          class="btn ${selectedDifficulty === 'Medium' ? 'btn-primary' : 'btn-outline'}"
                          onclick="InterviewPrepComponent.methods.selectDifficulty('Medium')"
                        >Medium</button>
                        <button 
                          class="btn ${selectedDifficulty === 'Hard' ? 'btn-primary' : 'btn-outline'}"
                          onclick="InterviewPrepComponent.methods.selectDifficulty('Hard')"
                        >Hard</button>
                      </div>
                    </div>
                  </div>
                  
                  <div class="mt-8 flex justify-center">
                    <button class="btn btn-primary btn-lg" onclick="InterviewPrepComponent.methods.startInterview()">
                      <i data-lucide="video" class="w-5 h-5 mr-2"></i>
                      Start Practice Interview
                    </button>
                  </div>
                </div>
                
                <!-- Interview Resources -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div class="card bg-black/40 backdrop-blur-sm border-blue-500/20 p-6">
                    <div class="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                      <i data-lucide="list-checks" class="w-6 h-6 text-blue-500"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Common Interview Questions</h3>
                    <p class="text-blue-200 mb-4">
                      Prepare with our database of industry-specific interview questions.
                    </p>
                    <button class="btn btn-outline">View Questions</button>
                  </div>
                  
                  <div class="card bg-black/40 backdrop-blur-sm border-blue-500/20 p-6">
                    <div class="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                      <i data-lucide="video" class="w-6 h-6 text-blue-500"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Interview Tips</h3>
                    <p class="text-blue-200 mb-4">
                      Learn strategies to improve your interview performance.
                    </p>
                    <button class="btn btn-outline">View Tips</button>
                  </div>
                </div>
              </div>
            `}
          </div>
        </div>
      </div>
      
      <script>
        // Initialize icons
        lucide.createIcons();
        
        // Initialize interview avatar if in interview mode
        ${isInterviewing ? `
          setTimeout(() => {
            const avatarContainer = document.getElementById('interview-avatar-container');
            if (avatarContainer) {
              avatarContainer.innerHTML = '';
              Interviewer3DAvatarComponent.render(avatarContainer, { 
                speaking: true, 
                size: 400,
                showWellnessData: true
              });
              
              // Simulate interview conversation
              setTimeout(() => {
                simulateInterview();
              }, 1000);
            }
          }, 100);
        ` : ''}
      </script>
    `;
  },
  
  data: function() {
    return {
      activeTab: 'settings',
      isInterviewing: false,
      selectedDifficulty: 'Medium',
      selectedIndustry: 'Technology'
    };
  },
  
  methods: {
    selectTab(tab) {
      this.data.activeTab = tab;
    },
    
    selectIndustry(industry) {
      this.data.selectedIndustry = industry;
    },
    
    selectDifficulty(difficulty) {
      this.data.selectedDifficulty = difficulty;
    },
    
    startInterview() {
      this.data.isInterviewing = true;
      store.setState({ 
        isInterviewing: true, 
        interviewDifficulty: this.data.selectedDifficulty,
        interviewIndustry: this.data.selectedIndustry,
        currentPage: 'interviewing'
      });
    },
    
    endInterview() {
      this.data.isInterviewing = false;
      store.setState({ 
        isInterviewing: false,
        showWellnessData: false,
        currentPage: 'interview-prep'
      });
    }
  },
  
  mounted() {
    // Set page title
    document.title = "Interview Preparation - JobFinder";
    
    // Keep track of component instance
    if (!InterviewPrepComponent.instances) {
      InterviewPrepComponent.instances = [];
    }
    InterviewPrepComponent.instances.push(this);
    
    // Subscribe to store changes
    store.subscribe((state) => {
      if (this.data.isInterviewing !== state.isInterviewing) {
        this.data.isInterviewing = state.isInterviewing;
        this.update();
      }
    });
  }
});

// Export component methods for global access
InterviewPrepComponent.methods = {
  selectTab: function(tab) {
    const instance = InterviewPrepComponent.instances[0];
    if (instance) {
      instance.methods.selectTab(tab);
    }
  },
  
  selectIndustry: function(industry) {
    const instance = InterviewPrepComponent.instances[0];
    if (instance) {
      instance.methods.selectIndustry(industry);
    }
  },
  
  selectDifficulty: function(difficulty) {
    const instance = InterviewPrepComponent.instances[0];
    if (instance) {
      instance.methods.selectDifficulty(difficulty);
    }
  },
  
  startInterview: function() {
    const instance = InterviewPrepComponent.instances[0];
    if (instance) {
      instance.methods.startInterview();
    }
  },
  
  endInterview: function() {
    const instance = InterviewPrepComponent.instances[0];
    if (instance) {
      instance.methods.endInterview();
    }
  }
};

// Helper function to simulate interview conversation
function simulateInterview() {
  const transcript = document.getElementById('interview-transcript');
  if (!transcript) return;
  
  const questions = [
    "Can you walk me through your most challenging project?",
    "How do you handle disagreements with team members?",
    "Where do you see yourself in five years?",
    "What would your previous manager say about your strengths and weaknesses?"
  ];
  
  const answers = [
    "That's a great question. My most challenging project was...",
    "I believe in open communication when dealing with disagreements...",
    "I'm looking to grow into a leadership role where I can...",
    "My previous manager would say my strength is attention to detail..."
  ];
  
  let questionIndex = 0;
  
  function addQuestion() {
    if (questionIndex >= questions.length) return;
    
    const question = questions[questionIndex];
    const answer = answers[questionIndex];
    
    // Add AI question
    const questionElement = document.createElement('div');
    questionElement.className = 'flex items-start gap-2';
    questionElement.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-sm">AI</div>
      <div class="bg-blue-600/20 rounded-lg p-3 text-sm">
        ${question}
      </div>
    `;
    transcript.appendChild(questionElement);
    
    // Scroll to bottom
    transcript.scrollTop = transcript.scrollHeight;
    
    // Add user answer after delay
    setTimeout(() => {
      const answerElement = document.createElement('div');
      answerElement.className = 'flex items-start gap-2';
      answerElement.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-blue-300/20 flex-shrink-0 flex items-center justify-center text-sm">You</div>
        <div class="bg-blue-300/20 rounded-lg p-3 text-sm">
          ${answer}
        </div>
      `;
      transcript.appendChild(answerElement);
      
      // Scroll to bottom
      transcript.scrollTop = transcript.scrollHeight;
      
      questionIndex++;
      
      // Continue interview
      if (questionIndex < questions.length) {
        setTimeout(addQuestion, 5000);
      }
    }, 3000);
  }
  
  // Start interview simulation
  addQuestion();
}
