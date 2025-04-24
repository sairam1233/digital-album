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

  // Attempt orientation lock when in fullscreen
  useEffect(() => {
    const lockOrientation = async () => {
      if (width < 768 && isFullscreen) {
        try {
          if (screen.orientation && (screen.orientation as any).lock) {
            await (screen.orientation as any).lock('landscape');
          }
        } catch (err) {
          console.log('Orientation lock not supported or permission denied');
        }
      }
    };

    lockOrientation();
  }, [width, isFullscreen]);

  // Handle portrait orientation warning
  useEffect(() => {
    const handleOrientationChange = () => {
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      const existingMessage = document.getElementById("rotate-message");

      if (width < 768 && isPortrait) {
        if (!existingMessage) {
          const message = document.createElement('div');
          message.id = 'rotate-message';
          message.className = 'fixed inset-0 bg-black bg-opacity-90 text-white text-lg flex items-center justify-center z-50 text-center p-6';
          message.innerHTML = 'Please rotate your device to landscape mode for the best experience. After that refresh the page.';
          document.body.appendChild(message);
        }
      } else {
        if (existingMessage) {
          existingMessage.remove();
        }
      }
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange); // Also trigger on resize

    handleOrientationChange();

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
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
            style={{ margin: '0 auto' }}
            startPage={currentPage}
            drawShadow={true}
            flippingTime={1000}
            usePortrait={false}
            startZIndex={5}
            autoSize={true}
            showPageCorners={true}
            disableFlipByClick={false}
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
