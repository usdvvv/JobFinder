
// Utility functions for our Vue-styled JobFinder app

// Theme management
const ThemeManager = {
  theme: localStorage.getItem('theme') || 'dark',
  
  init() {
    // Apply theme on initialization
    this.applyTheme();
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      this.theme = e.matches ? 'dark' : 'light';
      this.applyTheme();
    });
  },
  
  toggle() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme();
    return this.theme;
  },
  
  applyTheme() {
    document.documentElement.classList.toggle('dark', this.theme === 'dark');
    localStorage.setItem('theme', this.theme);
    
    // Dispatch an event so components can react to theme changes
    document.dispatchEvent(new CustomEvent('themeChange', { detail: this.theme }));
  }
};

// Vue-like reactive state management
class ReactiveState {
  constructor(initialState = {}) {
    this.state = initialState;
    this.listeners = [];
  }
  
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notifyListeners();
  }
  
  getState() {
    return this.state;
  }
  
  subscribe(listener) {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
  
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }
}

// Global state store
const store = new ReactiveState({
  user: null,
  isAuthenticated: false,
  currentPage: 'landing',
  isInterviewing: false,
  interviewDifficulty: 'medium',
  interviewIndustry: 'general',
  showWellnessData: false
});

// Helper to create Vue-like components
function createComponent(options) {
  const { template, data, methods, mounted, props } = options;
  
  return {
    render(container, propsData = {}) {
      // Create component instance
      const instance = {
        el: document.createElement('div'),
        data: typeof data === 'function' ? data() : (data || {}),
        methods: methods || {},
        props: propsData || {},
        
        // Reactive rendering
        update() {
          if (typeof template === 'function') {
            this.el.innerHTML = template.call(this, this.data, this.methods, this.props);
          } else {
            this.el.innerHTML = template;
          }
          
          // Execute any script tags
          const scripts = this.el.querySelectorAll('script');
          scripts.forEach(script => {
            eval(script.innerText);
          });
        }
      };
      
      // Set up reactivity
      const originalSetData = instance.data;
      instance.data = new Proxy(instance.data, {
        set(target, key, value) {
          target[key] = value;
          instance.update();
          return true;
        }
      });
      
      // Bind methods to instance
      if (instance.methods) {
        Object.keys(instance.methods).forEach(key => {
          instance.methods[key] = instance.methods[key].bind(instance);
        });
      }
      
      // Initial render
      instance.update();
      
      // Mount to container
      if (container) {
        if (typeof container === 'string') {
          document.querySelector(container).appendChild(instance.el);
        } else {
          container.appendChild(instance.el);
        }
      }
      
      // Call mounted hook
      if (mounted) {
        mounted.call(instance);
      }
      
      return instance;
    }
  };
}

// Router for handling page changes
const Router = {
  routes: {},
  currentRoute: window.location.hash.slice(1) || '/',
  
  init() {
    // Handle route changes
    window.addEventListener('hashchange', () => {
      this.currentRoute = window.location.hash.slice(1) || '/';
      this.render();
    });
    
    // Initial render
    this.render();
  },
  
  addRoute(path, component) {
    this.routes[path] = component;
    return this;
  },
  
  navigate(path) {
    window.location.hash = path;
  },
  
  render() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    
    // Add transition classes
    container.classList.add('page-leave-active');
    setTimeout(() => {
      container.classList.remove('page-leave-active');
      container.classList.add('page-enter-active');
      
      const component = this.routes[this.currentRoute] || this.routes['/'];
      if (component) {
        component.render(container);
      }
      
      // Set current page in store
      store.setState({ currentPage: this.currentRoute });
      
      setTimeout(() => {
        container.classList.remove('page-enter-active');
      }, 300);
    }, 300);
  }
};

// Initialize Lucide icons
function initIcons() {
  lucide.createIcons();
}

// Format date helper
function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

// Document ready helper
function onDocumentReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}
