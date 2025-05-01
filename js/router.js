
// Router configuration - maps routes to page components

onDocumentReady(() => {
  // Define routes
  Router
    .addRoute('/', LandingPageComponent)
    .addRoute('/interview-prep', InterviewPrepComponent)
    .addRoute('/entertainment', EntertainmentComponent)
    .addRoute('/about', AboutUsComponent)
    .addRoute('/jobs', JobListingPageComponent)
    .addRoute('/resume', ResumeBuilderComponent)
    .addRoute('/choose-search', ChooseSearchTypeComponent)
    .addRoute('/ai-job-search', AIJobSearchComponent);
  
  // Function to handle navigation clicks
  window.navigateTo = function(path) {
    Router.navigate(path);
  };
  
  // Initialize router
  Router.init();
});
