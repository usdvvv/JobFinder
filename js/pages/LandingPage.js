
// Landing Page Component - Vue style

const LandingPageComponent = createComponent({
  template: function(data) {
    return `
      <div class="min-h-screen">
        <div class="background"></div>
        
        <section class="relative pt-24 pb-12 md:pt-32 md:pb-20">
          <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <!-- Hero Content -->
              <div class="text-center md:text-left animate-slide-up">
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                  Find Your Dream Job With <span class="text-gradient">AI-Powered</span> Assistance
                </h1>
                <p class="text-xl mb-8 text-blue-200 md:max-w-lg">
                  JobFinder leverages cutting-edge AI to match your skills with the perfect job opportunities and prepare you for interviews.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <button class="btn btn-primary btn-lg" onclick="navigateTo('/choose-search')">
                    <span>Start Job Search</span>
                    <i data-lucide="arrow-right" class="w-5 h-5"></i>
                  </button>
                  <button class="btn btn-outline btn-lg" onclick="navigateTo('/interview-prep')">
                    <i data-lucide="video" class="w-5 h-5"></i>
                    <span>Practice Interviews</span>
                  </button>
                </div>
              </div>
              
              <!-- 3D Interviewer Avatar -->
              <div class="hidden md:block animate-fade-in">
                <div id="avatar-container" class="relative"></div>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Features Section -->
        <section class="py-16 md:py-24 bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
          <div class="container mx-auto px-4">
            <div class="text-center mb-16">
              <h2 class="text-3xl md:text-4xl font-bold mb-4 text-white">Powered by Advanced AI</h2>
              <p class="text-xl text-blue-200 max-w-2xl mx-auto">
                Our platform uses cutting-edge technology to help you find the perfect job and prepare for interviews.
              </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <!-- Feature 1 -->
              <div class="card p-6 bg-black/40 backdrop-blur-sm border-blue-500/20 transform transition-all hover:translate-y-[-5px] hover:shadow-lg animate-slide-up animate-delay-100">
                <div class="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                  <i data-lucide="search" class="w-6 h-6 text-blue-500"></i>
                </div>
                <h3 class="text-xl font-semibold mb-2 text-white">AI-Powered Job Matching</h3>
                <p class="text-blue-200">
                  Our AI analyzes your skills, experience, and preferences to match you with the most suitable job opportunities.
                </p>
              </div>
              
              <!-- Feature 2 -->
              <div class="card p-6 bg-black/40 backdrop-blur-sm border-blue-500/20 transform transition-all hover:translate-y-[-5px] hover:shadow-lg animate-slide-up animate-delay-200">
                <div class="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                  <i data-lucide="video" class="w-6 h-6 text-blue-500"></i>
                </div>
                <h3 class="text-xl font-semibold mb-2 text-white">Interview Simulator</h3>
                <p class="text-blue-200">
                  Practice interviews with our AI interviewer that provides real-time feedback and personalized coaching.
                </p>
              </div>
              
              <!-- Feature 3 -->
              <div class="card p-6 bg-black/40 backdrop-blur-sm border-blue-500/20 transform transition-all hover:translate-y-[-5px] hover:shadow-lg animate-slide-up animate-delay-300">
                <div class="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                  <i data-lucide="file-text" class="w-6 h-6 text-blue-500"></i>
                </div>
                <h3 class="text-xl font-semibold mb-2 text-white">Resume Builder</h3>
                <p class="text-blue-200">
                  Create an optimized resume with AI suggestions tailored to your target roles and industry standards.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Call to Action -->
        <section class="py-16 md:py-24 bg-[#0f172a]">
          <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Launch Your Career?</h2>
            <p class="text-xl mb-8 text-blue-200 max-w-2xl mx-auto">
              Join thousands of job seekers who have found their dream jobs with JobFinder's AI-powered platform.
            </p>
            <button class="btn btn-primary btn-lg" onclick="navigateTo('/choose-search')">
              <span>Get Started</span>
              <i data-lucide="arrow-right" class="w-5 h-5"></i>
            </button>
          </div>
        </section>
        
        <!-- Footer -->
        <footer class="py-8 px-4 bg-[#1e293b] border-t border-blue-500/20">
          <div class="container mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-center">
              <div class="flex items-center mb-6 md:mb-0">
                <div class="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
                  <span class="text-white font-bold">J</span>
                </div>
                <span class="ml-2 text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">JobFinder</span>
              </div>
              <div class="flex flex-wrap gap-8 justify-center">
                <a href="#/about" class="text-sm text-blue-300 hover:text-blue-100">About Us</a>
                <a href="#/privacy" class="text-sm text-blue-300 hover:text-blue-100">Privacy Policy</a>
                <a href="#/terms" class="text-sm text-blue-300 hover:text-blue-100">Terms of Service</a>
                <a href="#/contact" class="text-sm text-blue-300 hover:text-blue-100">Contact Us</a>
              </div>
            </div>
            <div class="mt-8 text-center text-sm text-blue-300">
              &copy; ${new Date().getFullYear()} JobFinder. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
      
      <script>
        // Initialize 3D avatar
        setTimeout(() => {
          const avatarContainer = document.getElementById('avatar-container');
          if (avatarContainer) {
            avatarContainer.innerHTML = '';
            Interviewer3DAvatarComponent.render(avatarContainer, { 
              speaking: Math.random() > 0.5, 
              size: 400,
              showWellnessData: false
            });
          }
          
          // Initialize icons
          lucide.createIcons();
        }, 100);
      </script>
    `;
  },
  
  mounted() {
    // Initialize any additional functionality
    document.title = "JobFinder - AI-Powered Career Platform";
  }
});
