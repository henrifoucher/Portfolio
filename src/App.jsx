import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/Reset.css';
import './styles/Font.css';
import './styles/App.css';
import InfiniteMenu from './components/InfiniteMenu.jsx';
import ProjectDetail from './components/ProjectDetail.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import { applyScrambleToAllText } from './utils/textScramble.js';

function App() {
  const [sampleItems, setSampleItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Memoize items to prevent unnecessary re-renders
  const memoizedItems = useMemo(() => sampleItems, [sampleItems]);

  useEffect(() => {
    const loadProjectsAndAssets = async () => {
      try {
        // Fetch projects data
        const response = await fetch('./projects.json');
        const data = await response.json();
        setSampleItems(data);
        
        // Preload videos and images
        await preloadAssets(data, setLoadingProgress);
        
        // Small delay to ensure smooth transition
        setTimeout(() => {
          setIsLoading(false);
          // Apply text scramble effect to all text elements after loading
          setTimeout(() => {
            applyScrambleToAllText({
              duration: 0.8,
              delay: 0,
              selectors: [
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                'p', 'span', 'a', 'button',
                '.title', '.japanese', '.status',
                '.info__title', '.info__description',
                '.project-title',
                '.project-year', '.project-class',
                '.back-button', '.external-link'
              ],
              excludeSelectors: ['.loading', '.loading-screen *', '.class__name', '.year__number', '.class', '.name', '.face-title']
            });
          }, 200);
        }, 500);
        
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setIsLoading(false);
      }
    };

    loadProjectsAndAssets();
  }, []);

  // Function to preload videos and images
  const preloadAssets = (items, onProgress) => {
    return new Promise((resolve) => {
      const totalAssets = items.length * 2; // Each item has video + image
      let loadedAssets = 0;

      const updateProgress = () => {
        loadedAssets++;
        const progress = (loadedAssets / totalAssets) * 100;
        onProgress(progress);
        
        if (loadedAssets >= totalAssets) {
          resolve();
        }
      };

      items.forEach((item) => {
        // Preload video
        if (item.video) {
          const video = document.createElement('video');
          video.preload = 'metadata';
          video.muted = true;
          video.addEventListener('loadedmetadata', updateProgress);
          video.addEventListener('error', updateProgress);
          video.src = item.video;
        } else {
          updateProgress();
        }

        // Preload image
        if (item.image) {
          const img = new Image();
          img.onload = updateProgress;
          img.onerror = updateProgress;
          img.src = item.image;
        } else {
          updateProgress();
        }
      });

      // Fallback timeout in case some assets don't load
      setTimeout(() => {
        resolve();
      }, 15000); // 15 second timeout
    });
  };
  
  // Memoize the InfiniteMenu component
  const InfiniteMenuComponent = useCallback(() => (
    <div style={{ height: '100vh', width: '100%' }}>
      <InfiniteMenu items={memoizedItems} />
    </div>
  ), [memoizedItems]);

  return (
    <Router>
      <div className="App">
        {isLoading && <LoadingScreen progress={loadingProgress} />}
        <Routes>
          <Route 
            path="/" 
            element={<InfiniteMenuComponent />} 
          />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;