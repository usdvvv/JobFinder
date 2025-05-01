// 3D Avatar Component - Vue style

const Interviewer3DAvatarComponent = createComponent({
  template: function(data, methods, props) {
    const { speaking = false, size = 400, showWellnessData = false } = props;
    const { currentTime, interviewerState } = data;
    
    return `
      <div style="width: ${size}px; height: ${size}px; margin: 0 auto; position: relative;">
        ${showWellnessData ? `
          <div class="absolute top-0 left-0 w-full z-30">
            <div class="bg-gradient-to-br from-purple-900/90 to-blue-950/90 backdrop-blur-lg border border-white/10 shadow-lg rounded-md mb-2">
              <div class="wellness-header">
                <i data-lucide="heart-pulse" class="mr-2 text-red-400 animate-pulse"></i>
                <h3 class="text-base font-semibold text-white">Your Wellness Overview</h3>
              </div>
              <div class="p-3 rounded-b-md">
                <div id="wellness-data-container-${size}"></div>
              </div>
              <div class="absolute -right-1 -top-1 w-3 h-3 bg-green-500 rounded-full border border-white shadow-lg"></div>
            </div>
          </div>
        ` : ''}

        <div class="rounded-lg overflow-hidden shadow-lg border border-gray-200" 
             style="width: 100%; height: 100%; position: relative; background: linear-gradient(to bottom, #1e293b, #0f172a);">
          
          <div class="absolute top-0 left-0 right-0 bg-black/70 text-white px-3 py-2 flex justify-between items-center z-10">
            <div class="flex items-center space-x-2">
              <i data-lucide="video" class="w-4 h-4"></i>
              <span class="text-xs font-medium">Interview in progress</span>
            </div>
            <div class="flex items-center space-x-3">
              <i data-lucide="clock" class="w-4 h-4"></i>
              <span class="text-xs">${currentTime}</span>
            </div>
          </div>
          
          <div id="avatar-canvas-container-${size}" class="w-full h-full">
            <!-- Three.js canvas will be rendered here -->
          </div>
          
          <div class="absolute bottom-3 left-3 bg-black/70 rounded-full p-2 z-10">
            ${speaking ? 
              '<i data-lucide="mic" class="text-green-400 w-[18px] h-[18px]"></i>' : 
              '<i data-lucide="mic-off" class="text-gray-400 w-[18px] h-[18px]"></i>'
            }
          </div>
          
          <div class="absolute bottom-3 right-3 bg-primary/80 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium z-10">
            AI Interviewer
          </div>
        </div>
        
        ${speaking ? `
          <div class="absolute bottom-2 left-0 right-0 flex justify-center z-20">
            <div class="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium animate-pulse flex items-center gap-1.5">
              <span class="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Speaking...
            </div>
          </div>
        ` : ''}
      </div>
      <script>
        // Initialize the 3D avatar
        setTimeout(() => {
          initAvatar3D('avatar-canvas-container-${size}', ${speaking});
          
          ${showWellnessData ? `
            // Initialize wellness data
            const wellnessData = {
              stressLevel: 42,
              heartRate: 75,
              focus: 68,
              energy: 55
            };
            initWellnessOverview('wellness-data-container-${size}', wellnessData);
          ` : ''}
        }, 100);
      </script>
    `;
  },
  
  data: function() {
    return {
      currentTime: this.formatTime(),
      interviewerState: 'listening',
      backgroundIndex: 0,
      backgrounds: [
        'linear-gradient(to right, #e6e9f0 0%, #eef1f5 100%)',
        'linear-gradient(to right, #d7d2cc 0%, #304352 100%)',
        'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)'
      ]
    };
  },
  
  methods: {
    formatTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    },
    
    updateTime() {
      this.data.currentTime = this.formatTime();
    }
  },
  
  mounted() {
    // Keep track of component instance
    if (!Interviewer3DAvatarComponent.instances) {
      Interviewer3DAvatarComponent.instances = [];
    }
    Interviewer3DAvatarComponent.instances.push(this);
    
    // Set up time interval
    this.timeInterval = setInterval(() => {
      this.methods.updateTime();
    }, 60000);
    
    // Set up background interval
    this.bgInterval = setInterval(() => {
      this.data.backgroundIndex = (this.data.backgroundIndex + 1) % this.data.backgrounds.length;
      this.update();
    }, 30000);
    
    // Update state based on speaking prop
    if (this.props.speaking) {
      this.data.interviewerState = 'speaking';
    } else {
      this.data.interviewerState = Math.random() > 0.7 ? 'thinking' : 'listening';
    }
  }
});

// Initialize 3D avatar
function initAvatar3D(containerId, speaking) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  try {
    // Set up scene
    const scene = new THREE.Scene();
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 8;
    
    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x505050, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    const spotLight = new THREE.SpotLight(0xffffff, 1.5);
    spotLight.position.set(0, 5, 5);
    spotLight.angle = 0.4;
    spotLight.penumbra = 1;
    spotLight.castShadow = true;
    scene.add(spotLight);
    
    // Create placeholder geometry until model is loaded
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshStandardMaterial({ 
      color: speaking ? 0x60a5fa : 0x3b82f6,
      metalness: 0.5,
      roughness: 0.5
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = -2;
    scene.add(mesh);
    
    // Handle window resize
    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    // Animation
    function animate() {
      requestAnimationFrame(animate);
      
      // Rotate mesh if speaking
      if (speaking) {
        const time = Date.now() * 0.001;
        mesh.rotation.y = Math.sin(time * 0.5) * 0.1;
        mesh.scale.x = 1 + Math.sin(time * 5) * 0.05;
      }
      
      renderer.render(scene, camera);
    }
    
    // Start animation loop
    animate();
    
  } catch (error) {
    console.error("Error initializing 3D avatar:", error);
    // Show fallback UI
    container.innerHTML = `
      <div class="w-full h-full flex items-center justify-center bg-gray-800 text-white p-4 rounded-lg">
        <div class="text-center">
          <p class="text-lg font-semibold mb-2">3D Rendering Error</p>
          <p class="text-sm mb-4">There was a problem loading the 3D model.</p>
          <button class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-sm">
            Try Again
          </button>
        </div>
      </div>
    `;
  }
}
