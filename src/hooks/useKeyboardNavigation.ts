import { useEffect } from 'react';
import { useAlbumStore } from '../store/albumStore';

export const useKeyboardNavigation = () => {
  const { nextPage, prevPage } = useAlbumStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        prevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nextPage, prevPage]);
};