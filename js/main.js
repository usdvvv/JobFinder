
// Main application entry point

onDocumentReady(() => {
  // Initialize theme
  ThemeManager.init();
  
  // Initialize icons
  initIcons();
  
  // Create and mount global components
  const navbarComponent = NavBarComponent.render('#navbar-component');
  const themeToggle = ThemeToggleComponent.render('#theme-toggle-component');
  
  // Set up router
  Router
    .addRoute('/', LandingPageComponent)
    .addRoute('/interview-prep', InterviewPrepComponent)
    .addRoute('/entertainment', EntertainmentComponent)
    .addRoute('/about', AboutUsComponent)
    .init();
  
  // Listen for state changes
  store.subscribe((state) => {
    if (state.currentPage === 'interviewing' && state.isInterviewing) {
      // Show wellness data after a short delay to simulate AI interviewing
      setTimeout(() => {
        store.setState({ showWellnessData: true });
      }, 2000);
    }
  });
  
  console.log('JobFinder App Initialized 🚀');
});
