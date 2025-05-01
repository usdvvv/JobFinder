// Wellness User Overview Component - Vue style

const WellnessUserOverviewComponent = createComponent({
  template: function(data, methods, props) {
    const { hideTitle = false, hideCard = false, forceConnected = false } = props;
    const { isConnected, stressLevel, heartRate, focus, energy, connecting } = data;
    
    // If still connecting and not forcing connected
    if (connecting && !forceConnected) {
      return `
        <div class="${!hideCard ? 'card p-4' : ''}">
          ${!hideTitle ? '<h3 class="text-lg font-semibold mb-4">Wellness Monitoring</h3>' : ''}
          <div class="flex flex-col items-center justify-center p-6 text-center">
            <div class="animate-spin rounded-full h-8 w-8 border-2 border-b-transparent border-primary mb-4"></div>
            <p class="text-muted-foreground">Connecting to wellness monitor...</p>
          </div>
        </div>
      `;
    }
    
    // If not connected and not forcing connected
    if (!isConnected && !forceConnected) {
      return `
        <div class="${!hideCard ? 'card p-4' : ''}">
          ${!hideTitle ? '<h3 class="text-lg font-semibold mb-4">Wellness Monitoring</h3>' : ''}
          <div class="flex flex-col items-center justify-center p-6 text-center">
            <div class="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <i data-lucide="heart-off" class="w-6 h-6 text-muted-foreground"></i>
            </div>
            <p class="text-muted-foreground mb-4">No wellness monitor connected</p>
            <button class="btn btn-outline" onclick="WellnessUserOverviewComponent.methods.connect()">Connect Monitor</button>
          </div>
        </div>
      `;
    }
    
    // Connected state
    return `
      <div class="${!hideCard ? 'card p-4' : ''}">
        ${!hideTitle ? '<h3 class="text-lg font-semibold mb-4">Your Wellness Overview</h3>' : ''}
        
        <div class="space-y-4">
          <!-- Stress Level -->
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium">Stress Level</span>
              <span class="text-sm font-medium">${stressLevel}%</span>
            </div>
            <div class="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div class="absolute top-0 left-0 h-full rounded-full ${getStressColor(stressLevel)}" style="width: ${stressLevel}%"></div>
            </div>
          </div>
          
          <!-- Heart Rate -->
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium">Heart Rate</span>
              <span class="text-sm font-medium">${heartRate} bpm</span>
            </div>
            <div class="flex gap-1">
              ${getHeartRateDisplay(heartRate)}
            </div>
          </div>
          
          <!-- Focus -->
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium">Focus</span>
              <span class="text-sm font-medium">${focus}%</span>
            </div>
            <div class="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div class="absolute top-0 left-0 h-full rounded-full bg-blue-500" style="width: ${focus}%"></div>
            </div>
          </div>
          
          <!-- Energy -->
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium">Energy</span>
              <span class="text-sm font-medium">${energy}%</span>
            </div>
            <div class="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div class="absolute top-0 left-0 h-full rounded-full bg-yellow-500" style="width: ${energy}%"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  
  data: function() {
    return {
      isConnected: false,
      connecting: true,
      stressLevel: 42,
      heartRate: 75,
      focus: 68,
      energy: 55
    };
  },
  
  methods: {
    connect() {
      this.data.connecting = true;
      
      // Simulate connection
      setTimeout(() => {
        this.data.isConnected = true;
        this.data.connecting = false;
        this.update();
        
        // Start monitoring updates
        this.startMonitoring();
      }, 2000);
    },
    
    startMonitoring() {
      // Simulate real-time updates
      this.monitoringInterval = setInterval(() => {
        this.data.stressLevel = Math.max(30, Math.min(80, this.data.stressLevel + (Math.random() * 10 - 5)));
        this.data.heartRate = Math.max(60, Math.min(100, this.data.heartRate + (Math.random() * 6 - 3)));
        this.data.focus = Math.max(40, Math.min(90, this.data.focus + (Math.random() * 10 - 5)));
        this.data.energy = Math.max(30, Math.min(90, this.data.energy + (Math.random() * 8 - 4)));
        
        this.update();
      }, 5000);
    }
  },
  
  mounted() {
    // Keep track of component instance
    if (!WellnessUserOverviewComponent.instances) {
      WellnessUserOverviewComponent.instances = [];
    }
    WellnessUserOverviewComponent.instances.push(this);
    
    // If forceConnected, skip connection step
    if (this.props.forceConnected) {
      this.data.isConnected = true;
      this.data.connecting = false;
      this.methods.startMonitoring();
    } else {
      // Simulate initial connection attempt
      setTimeout(() => {
        this.data.connecting = false;
        this.update();
      }, 1500);
    }
  }
});

// Helper functions for wellness component
function getStressColor(value) {
  if (value < 30) return 'bg-green-500';
  if (value < 60) return 'bg-yellow-500';
  return 'bg-red-500';
}

function getHeartRateDisplay(rate) {
  const beats = Math.floor(rate / 10);
  let html = '';
  
  for (let i = 0; i < beats; i++) {
    const delay = i * 0.1;
    html += `<div class="h-4 w-1 bg-red-500 rounded-full animate-pulse" style="animation-delay: ${delay}s"></div>`;
  }
  
  return html;
}

// Initialize wellness overview for the 3D avatar component
function initWellnessOverview(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Create a custom props object with the data
  const props = {
    hideTitle: true,
    hideCard: true,
    forceConnected: true
  };
  
  // Render wellness component in the container
  WellnessUserOverviewComponent.render(container, props);
  
  // Update with the provided data
  const instance = WellnessUserOverviewComponent.instances[WellnessUserOverviewComponent.instances.length - 1];
  if (instance) {
    instance.data = { 
      ...instance.data, 
      ...data, 
      isConnected: true, 
      connecting: false 
    };
    instance.update();
  }
}

// Export component methods for global access
WellnessUserOverviewComponent.methods = {
  connect: function() {
    const instance = WellnessUserOverviewComponent.instances[0];
    if (instance) {
      instance.methods.connect();
    }
  }
};
