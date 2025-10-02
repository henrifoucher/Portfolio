// Debug utility to check video and texture issues
export const debugVideoTextures = () => {
  console.log('=== VIDEO TEXTURE DEBUG ===');
  
  // Check if videos are loading
  const videos = document.querySelectorAll('video');
  console.log('Videos in DOM:', videos.length);
  
  videos.forEach((video, index) => {
    console.log(`Video ${index}:`, {
      src: video.src,
      readyState: video.readyState,
      videoWidth: video.videoWidth,
      videoHeight: video.videoHeight,
      paused: video.paused,
      currentTime: video.currentTime,
      duration: video.duration,
      error: video.error
    });
  });
  
  // Check canvas elements
  const canvases = document.querySelectorAll('canvas');
  console.log('Canvases in DOM:', canvases.length);
  
  canvases.forEach((canvas, index) => {
    console.log(`Canvas ${index}:`, {
      id: canvas.id,
      width: canvas.width,
      height: canvas.height,
      clientWidth: canvas.clientWidth,
      clientHeight: canvas.clientHeight
    });
  });
  
  // Check WebGL context
  const webglCanvas = document.getElementById('infinite-grid-menu-canvas');
  if (webglCanvas) {
    const gl = webglCanvas.getContext('webgl2');
    if (gl) {
      console.log('WebGL context:', {
        version: gl.getParameter(gl.VERSION),
        vendor: gl.getParameter(gl.VENDOR),
        renderer: gl.getParameter(gl.RENDERER),
        maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE)
      });
    } else {
      console.error('No WebGL2 context available');
    }
  }
  
  // Check if projects.json loaded
  fetch('/projects.json')
    .then(res => res.json())
    .then(data => {
      console.log('Projects data:', data.length, 'items');
      data.forEach((item, index) => {
        console.log(`Project ${index}:`, {
          title: item.title,
          video: item.video,
          image: item.image,
          hasVideo: !!item.video,
          hasImage: !!item.image
        });
      });
    })
    .catch(err => console.error('Failed to load projects.json:', err));
};

// Auto-run debug after a delay
setTimeout(debugVideoTextures, 3000);