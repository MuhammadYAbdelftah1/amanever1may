/**
 * Chunk Error Handler
 * Automatically retries failed chunk loads and reloads the page if necessary
 */

if (typeof window !== 'undefined') {
  // Track reload attempts to prevent infinite loops
  const RELOAD_KEY = 'chunk_reload_count';
  const MAX_RELOADS = 3;
  const RELOAD_TIMEOUT = 10000; // 10 seconds

  // Get current reload count
  const getReloadCount = (): number => {
    const stored = sessionStorage.getItem(RELOAD_KEY);
    return stored ? parseInt(stored, 10) : 0;
  };

  // Increment reload count
  const incrementReloadCount = (): void => {
    const count = getReloadCount() + 1;
    sessionStorage.setItem(RELOAD_KEY, count.toString());
  };

  // Reset reload count after successful load
  const resetReloadCount = (): void => {
    sessionStorage.removeItem(RELOAD_KEY);
  };

  // Reset count after timeout
  setTimeout(resetReloadCount, RELOAD_TIMEOUT);

  // Handle chunk load errors
  window.addEventListener('error', (event) => {
    const target = event.target as HTMLScriptElement;
    
    // Check if it's a script loading error
    if (target?.tagName === 'SCRIPT' && target.src) {
      const isChunkError = target.src.includes('/_next/static/chunks/');
      
      if (isChunkError) {
        console.error('Chunk load error detected:', target.src);
        
        const reloadCount = getReloadCount();
        
        if (reloadCount < MAX_RELOADS) {
          console.log(`Reloading page (attempt ${reloadCount + 1}/${MAX_RELOADS})...`);
          incrementReloadCount();
          
          // Add a small delay before reload
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          console.error('Max reload attempts reached. Please clear your browser cache and try again.');
          resetReloadCount();
        }
      }
    }
  }, true);

  // Handle unhandled promise rejections (for dynamic imports)
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason;
    
    if (error?.name === 'ChunkLoadError' || error?.message?.includes('Loading chunk')) {
      console.error('ChunkLoadError in promise:', error);
      
      const reloadCount = getReloadCount();
      
      if (reloadCount < MAX_RELOADS) {
        console.log(`Reloading page due to ChunkLoadError (attempt ${reloadCount + 1}/${MAX_RELOADS})...`);
        incrementReloadCount();
        
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        
        event.preventDefault();
      } else {
        console.error('Max reload attempts reached. Please clear your browser cache and try again.');
        resetReloadCount();
      }
    }
  });
}

export {};
