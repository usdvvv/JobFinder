// Navbar Component - Vue style

const NavBarComponent = createComponent({
  template: function(data) {
    const currentPage = store.getState().currentPage || '/';
    
    return `
      <nav class="navbar">
        <div class="flex items-center">
          <a href="#/" class="flex items-center gap-2">
            <div class="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
              <span class="text-white font-bold">J</span>
            </div>
            <span class="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">JobFinder</span>
          </a>
        </div>
        
        <div class="hidden md:flex items-center space-x-1">
          <a href="#/" class="navbar-item ${currentPage === '/' ? 'bg-accent text-accent-foreground' : ''}">Home</a>
          <a href="#/jobs" class="navbar-item ${currentPage === '/jobs' ? 'bg-accent text-accent-foreground' : ''}">Jobs</a>
          <a href="#/interview-prep" class="navbar-item ${currentPage === '/interview-prep' ? 'bg-accent text-accent-foreground' : ''}">
            Interview Prep
          </a>
          <a href="#/resume" class="navbar-item ${currentPage === '/resume' ? 'bg-accent text-accent-foreground' : ''}">Resume</a>
          <a href="#/entertainment" class="navbar-item ${currentPage === '/entertainment' ? 'bg-accent text-accent-foreground' : ''}">
            Entertainment
          </a>
          <a href="#/about" class="navbar-item ${currentPage === '/about' ? 'bg-accent text-accent-foreground' : ''}">About Us</a>
        </div>
        
        <div class="flex items-center gap-4">
          <button class="btn btn-primary">Sign In</button>
          <button class="md:hidden navbar-item" onclick="NavBarComponent.methods.toggleMobileMenu()">
            <i data-lucide="menu" class="w-5 h-5"></i>
          </button>
        </div>
        
        <!-- Mobile Menu -->
        <div id="mobile-menu" class="fixed inset-0 bg-background/95 z-50 flex flex-col items-center justify-center gap-6 transition-all duration-300 transform ${data.mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}">
          <button class="absolute top-4 right-4 navbar-item" onclick="NavBarComponent.methods.toggleMobileMenu()">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
          
          <a href="#/" class="text-xl font-medium" onclick="NavBarComponent.methods.toggleMobileMenu()">Home</a>
          <a href="#/jobs" class="text-xl font-medium" onclick="NavBarComponent.methods.toggleMobileMenu()">Jobs</a>
          <a href="#/interview-prep" class="text-xl font-medium" onclick="NavBarComponent.methods.toggleMobileMenu()">Interview Prep</a>
          <a href="#/resume" class="text-xl font-medium" onclick="NavBarComponent.methods.toggleMobileMenu()">Resume</a>
          <a href="#/entertainment" class="text-xl font-medium" onclick="NavBarComponent.methods.toggleMobileMenu()">Entertainment</a>
          <a href="#/about" class="text-xl font-medium" onclick="NavBarComponent.methods.toggleMobileMenu()">About Us</a>
        </div>
      </nav>
    `;
  },
  
  data: function() {
    return {
      mobileMenuOpen: false
    };
  },
  
  methods: {
    toggleMobileMenu() {
      this.data.mobileMenuOpen = !this.data.mobileMenuOpen;
    }
  },
  
  mounted() {
    // Keep track of component instance
    if (!NavBarComponent.instances) {
      NavBarComponent.instances = [];
    }
    NavBarComponent.instances.push(this);
    
    // Listen for state changes
    store.subscribe(() => {
      this.update();
    });
    
    // Initialize mobile menu
    this.data.mobileMenuOpen = false;
  }
});

// Export component methods for global access
NavBarComponent.methods = {
  toggleMobileMenu: function() {
    const instance = NavBarComponent.instances[0];
    if (instance) {
      instance.methods.toggleMobileMenu();
    }
  }
};
