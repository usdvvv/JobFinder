// Theme Toggle Component - Vue style

const ThemeToggleComponent = createComponent({
  template: function(data) {
    const isDark = ThemeManager.theme === 'dark';
    
    return `
      <button class="theme-toggle btn btn-ghost rounded-full p-2 transition-all duration-300" onclick="ThemeToggleComponent.methods.toggleTheme()">
        <div class="relative w-10 h-5 rounded-full bg-gray-300 dark:bg-slate-700 transition-colors duration-300">
          <div class="absolute ${isDark ? 'translate-x-5' : 'translate-x-0'} left-0 top-0 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center">
            ${isDark ? 
              '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-500"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>' : 
              '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-500"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>'
            }
          </div>
        </div>
      </button>
    `;
  },

  methods: {
    toggleTheme() {
      const newTheme = ThemeManager.toggle();
      const instance = ThemeToggleComponent.instances[0];
      if (instance) {
        instance.update();
      }
    }
  },
  
  mounted() {
    // Keep track of component instance
    if (!ThemeToggleComponent.instances) {
      ThemeToggleComponent.instances = [];
    }
    ThemeToggleComponent.instances.push(this);
    
    // Listen for theme changes
    document.addEventListener('themeChange', () => {
      this.update();
    });
  }
});

// Export component methods for global access
ThemeToggleComponent.methods = {
  toggleTheme: function() {
    const newTheme = ThemeManager.toggle();
    const instance = ThemeToggleComponent.instances[0];
    if (instance) {
      instance.update();
    }
  }
};
