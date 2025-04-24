import React, { useRef, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { useAlbumStore } from '../../store/albumStore';
import AlbumCover from './AlbumCover';
import AlbumPage from './AlbumPage';
import AlbumControls from './AlbumControls';
import PageThumbnails from './PageThumbnails';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { useFullscreen } from '../../hooks/useFullscreen';
import { useElementSize } from '../../hooks/useElementSize';
import useSound from 'use-sound';
import "./index.css";

const PhotoAlbum: React.FC = () => {
  const { album, currentPage, setCurrentPage } = useAlbumStore();
  const albumRef = useRef<HTMLDivElement>(null);
  const flipBookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useElementSize(containerRef);
  const { isFullscreen, toggleFullscreen } = useFullscreen(albumRef);
  const [playFlipSound] = useSound('https://assets.mixkit.co/sfx/preview/mixkit-light-page-turn-1337.mp3', { volume: 0.5 });

  useKeyboardNavigation();

  useEffect(() => {
    const lockOrientation = async () => {
      if (width < 768) {
        try {
          if (screen.orientation && (screen.orientation as any).lock) {
            await (screen.orientation as any).lock('landscape');
          }
        } catch {
          console.log('Orientation lock not supported');
        }
      }
    };

    lockOrientation();

    const handleOrientationChange = () => {
      if (width < 768 && window.orientation !== 90 && window.orientation !== -90) {
        const message = document.createElement('div');
        message.className = 'fixed inset-0 bg-black text-white flex items-center justify-center z-50 text-center p-4';
        message.innerHTML = 'Please rotate your device to landscape mode for the best experience';
        document.body.appendChild(message);
      } else {
        const message = document.querySelector('.fixed.inset-0.bg-black');
        if (message) message.remove();
      }
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    handleOrientationChange();

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [width]);

  useEffect(() => {
    if (flipBookRef.current && flipBookRef.current.pageFlip()) {
      flipBookRef.current.pageFlip().turnToPage(currentPage);
    }
  }, [currentPage]);

  const handlePageFlip = (e: any) => {
    playFlipSound();
    setCurrentPage(e.data);
  };

  const getBookSize = () => {
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    if (isMobile) {
      const w = width - 20;
      return { width: w, height: w * 0.7 };
    } else if (isTablet) {
      const w = width - 40;
      return { width: w, height: w * 0.65 };
    } else {
      const w = Math.min(width * 0.98, 1600);
      return { width: w, height: w * 0.65 };
    }
  };

  const { width: bookWidth, height: bookHeight } = getBookSize();

  return (
    <div 
      ref={albumRef} 
      className={`w-full h-full flex items-center justify-center bg-neutral-100 overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
    >
      <div 
        ref={containerRef}
        className="w-full h-full flex items-center justify-center p-0 m-0"
      >
        <div className="w-full max-w-[1600px]">
          <HTMLFlipBook
            ref={flipBookRef}
            width={bookWidth}
            height={bookHeight}
            size="stretch"
            minWidth={300}
            maxWidth={1600}
            minHeight={400}
            maxHeight={1100}
            maxShadowOpacity={0.3}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={handlePageFlip}
            className="album-flipbook"
            startPage={currentPage}
            drawShadow={true}
            flippingTime={1000}
            usePortrait={false}
            startZIndex={5}
            autoSize={true}
            showPageCorners={true}
            disableFlipByClick={false}
            style={{}}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
          >
            <div className="page">
              <AlbumCover album={album} />
            </div>

            {album.pages.map((page, index) => (
              <div key={page.id} className="page">
                <AlbumPage page={page} isRightPage={index % 2 === 1} />
              </div>
            ))}
          </HTMLFlipBook>
        </div>
        
        <AlbumControls 
          onToggleFullscreen={toggleFullscreen} 
          isFullscreen={isFullscreen} 
        />
        
        <PageThumbnails />
      </div>
    </div>
  );
};

export default PhotoAlbum;
