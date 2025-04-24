import React from 'react';
import { motion } from 'framer-motion';
import { AlbumPage as AlbumPageType } from '../../types/album';
import "./index.css";

interface AlbumPageProps {
  page: AlbumPageType;
  isRightPage?: boolean;
}

const AlbumPage: React.FC<AlbumPageProps> = ({ page, isRightPage = false }) => {
  return (
    <div 
      className={`h-full mb-5 w-full relative bg-neutral-50 ${isRightPage ? 'bg-page-texture bg-cover bg-opacity-5' : ''} overflow-hidden`}
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
      >
        <img 
          src={page.imageUrl} 
          alt={page.alt || 'Album page'} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>
    </div>
  );
};

export default AlbumPage;
