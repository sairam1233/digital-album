import { create } from 'zustand';
import { sampleAlbum } from '../data/sampleAlbum';
import { Album } from '../types/album';

interface AlbumState {
  album: Album;
  currentPage: number;
  isFullscreen: boolean;
  setCurrentPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  toggleFullscreen: () => void;
}

export const useAlbumStore = create<AlbumState>((set) => ({
  album: sampleAlbum,
  currentPage: 0,
  isFullscreen: false,
  setCurrentPage: (page) => set({ currentPage: page }),
  nextPage: () => set((state) => ({ 
    currentPage: state.currentPage < state.album.pages.length ? state.currentPage + 1 : state.currentPage 
  })),
  prevPage: () => set((state) => ({ 
    currentPage: state.currentPage > 0 ? state.currentPage - 1 : state.currentPage 
  })),
  toggleFullscreen: () => set((state) => ({ isFullscreen: !state.isFullscreen })),
}));