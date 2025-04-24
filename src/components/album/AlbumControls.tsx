import React from 'react';
import { ChevronLeft, ChevronRight, Maximize, Minimize, Volume2, VolumeX, Share2, Download } from 'lucide-react';
import { useAlbumStore } from '../../store/albumStore';
import IconButton from '../ui/IconButton';
import useSound from 'use-sound';

interface AlbumControlsProps {
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

const AlbumControls: React.FC<AlbumControlsProps> = ({ onToggleFullscreen, isFullscreen }) => {
  const { prevPage, nextPage, currentPage, album } = useAlbumStore();
  const [isMuted, setIsMuted] = React.useState(true);
  const [play, { stop }] = useSound('https://assets.mixkit.co/music/preview/mixkit-relaxing-in-nature-522.mp3', {
    volume: 0.4,
    loop: true,
  });

  const hasNextPage = currentPage < album.pages.length;
  const hasPrevPage = currentPage > 0;

  React.useEffect(() => {
    if (!isMuted) {
      play();
    } else {
      stop();
    }
    return () => stop();
  }, [isMuted, play, stop]);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: album.title,
        text: album.subtitle,
        url: window.location.href,
      });
    } catch (error) {
      console.log('Sharing failed', error);
    }
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert('Download feature would be implemented here');
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Left navigation arrow */}
      {hasPrevPage && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-auto">
          <IconButton
            onClick={prevPage}
            ariaLabel="Previous page"
            className="text-neutral-700 hover:text-primary-700"
          >
            <ChevronLeft size={24} />
          </IconButton>
        </div>
      )}

      {/* Right navigation arrow */}
      {hasNextPage && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-auto">
          <IconButton
            onClick={nextPage}
            ariaLabel="Next page"
            className="text-neutral-700 hover:text-primary-700"
          >
            <ChevronRight size={24} />
          </IconButton>
        </div>
      )}

      {/* Top right controls */}
      <div className="absolute top-4 right-4 flex space-x-2 pointer-events-auto">
        <IconButton
          onClick={() => setIsMuted(!isMuted)}
          ariaLabel={isMuted ? "Unmute" : "Mute"}
          className="text-neutral-700 hover:text-primary-700"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </IconButton>
        
        <IconButton
          onClick={handleShare}
          ariaLabel="Share album"
          className="text-neutral-700 hover:text-primary-700"
        >
          <Share2 size={18} />
        </IconButton>

        <IconButton
          onClick={handleDownload}
          ariaLabel="Download album"
          className="text-neutral-700 hover:text-primary-700"
        >
          <Download size={18} />
        </IconButton>
        
        <IconButton
          onClick={onToggleFullscreen}
          ariaLabel={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          className="text-neutral-700 hover:text-primary-700"
        >
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </IconButton>
      </div>
    </div>
  );
};

export default AlbumControls