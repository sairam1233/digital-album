import React from 'react';
import { Album } from '../../types/album';
import "./index.css"

interface AlbumCoverProps {
  album: Album;
}

const AlbumCover: React.FC<AlbumCoverProps> = ({ album }) => {
  return (
    <div className="img h-full w-full flex flex-col relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${album.coverImageUrl})` }}
      >
        <div className="absolute inset-0 "></div>
      </div>
    </div>
  );
};

export default AlbumCover;