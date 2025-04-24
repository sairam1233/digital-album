import { useCallback, useEffect, useState } from 'react';

export const useFullscreen = (elementRef: React.RefObject<HTMLElement>) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      try {
        if (elementRef.current) {
          await elementRef.current.requestFullscreen();
        }
      } catch (error) {
        console.error('Error attempting to enable fullscreen:', error);
      }
    } else {
      try {
        await document.exitFullscreen();
      } catch (error) {
        console.error('Error attempting to exit fullscreen:', error);
      }
    }
  }, [elementRef]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return { isFullscreen, toggleFullscreen };
};