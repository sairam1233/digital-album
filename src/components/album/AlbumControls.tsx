import React, { useState, useRef, useEffect } from 'react';
import { Maximize, Minimize, Share2, MessageCircle, Music } from 'lucide-react';
import { useAlbumStore } from '../../store/albumStore';
import IconButton from '../ui/IconButton';

interface AlbumControlsProps {
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

const AlbumControls: React.FC<AlbumControlsProps> = ({ onToggleFullscreen, isFullscreen }) => {
  const { album } = useAlbumStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null); // Using ref to keep track of the audio element

  useEffect(() => {
    // Play music automatically on component mount
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, []); // Empty array means this effect will run only once on mount

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

  const handleWhatsApp = () => {
    const phoneNumber = '916304274299'; // Replace with your number
    const message = encodeURIComponent(`Hello! I'm viewing your album: ${album.title}`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleMusicToggle = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause(); // Pause music
        audioRef.current.currentTime = 0; // Reset to the beginning of the song
      } else {
        audioRef.current.play(); // Play music
      }
      setIsPlaying(!isPlaying); // Toggle the playing state
    }
  };

  return (
    <div className="absolute top-4 right-4 flex flex-row items-center space-x-3 pointer-events-auto">
      <IconButton
        onClick={handleShare}
        ariaLabel="Share album"
        className="text-neutral-700 hover:text-primary-700"
      >
        <Share2 size={20} />
      </IconButton>

      <IconButton
        onClick={onToggleFullscreen}
        ariaLabel={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        className="text-neutral-700 hover:text-primary-700"
      >
        {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
      </IconButton>

      <IconButton
        onClick={handleWhatsApp}
        ariaLabel="Contact on WhatsApp"
        className="text-green-600 hover:text-green-800"
      >
        <MessageCircle size={20} />
      </IconButton>

      <IconButton
        onClick={handleMusicToggle}
        ariaLabel={isPlaying ? "Stop music" : "Play music"}
        className="text-blue-600 hover:text-blue-800"
      >
        <Music size={20} />
      </IconButton>

      {/* Audio element with loop */}
      <audio ref={audioRef} src="/Gopikamma - Mukunda _ Varun Tej _ Telugu Song.mp3" style={{ display: 'none' }} loop />
    </div>
  );
};

export default AlbumControls;
