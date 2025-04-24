import React from 'react';
import { useAlbumStore } from '../../store/albumStore';

const PageThumbnails: React.FC = () => {
  const { album, currentPage, setCurrentPage } = useAlbumStore();
  
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 py-2 px-4 bg-transparent backdrop-blur-md rounded-full shadow-lg">
      <div className="flex space-x-2 items-center max-w-full overflow-x-auto py-1 px-2 no-scrollbar">
        {/* Cover thumbnail */}
        <button 
          onClick={() => setCurrentPage(0)}
          className={`relative flex-shrink-0 w-8 h-8 rounded-full overflow-hidden border-2 transition-all ${currentPage === 0 ? 'border-primary-500 scale-110' : 'border-transparent hover:border-primary-300'}`}
          aria-label="View cover"
        >
          <img src={album.coverImageUrl} alt="Cover" className="w-full h-full object-cover" />
        </button>
        
        {/* Divider */}
        <div className="h-6 w-px bg-neutral-300 mx-1"></div>
        
        {/* Page thumbnails */}
        {album.pages.map((page, index) => (
          <div key={page.id}>
            <button
              onClick={() => setCurrentPage(index + 1)}
              className={`relative flex-shrink-0 w-8 h-8 rounded-sm overflow-hidden border-2 transition-all ${currentPage === index + 1 ? 'border-primary-500 scale-110' : 'border-transparent hover:border-primary-300'}`}
              aria-label={`Go to page ${index + 1}`}
            >
              <img src={page.imageUrl} alt={`Page ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageThumbnails;
