import { Album } from '../types/album';

export const sampleAlbum: Album = {
  id: 'demo-album',
  title: 'Summer Vacation 2024',
  subtitle: 'Memories from our trip to the Amalfi Coast',
  date: 'June 15-28, 2024',
  coverImageUrl: "/images/9.jpg",
  pages: [
    {
      id: 'page-1',
      imageUrl: 'images/1.jpg',
      alt: 'Amalfi Coast view'
    },
    {
      id: 'page-2',
      imageUrl: 'images/2.jpg',
      alt: 'Beach day'
    },
    {
      id: 'page-3',
      imageUrl: 'images/3.jpg',
      alt: 'Coastal town'
    },
    {
      id: 'page-4',
      imageUrl: 'images/4.jpg',
      alt: 'Historical buildings'
    },
    {
      id: 'page-5',
      imageUrl: 'images/5.jpg',
      alt: 'Italian cuisine'
    },
    {
      id: 'page-6',
      imageUrl: 'images/6.jpg',
      alt: 'Mediterranean sunset'
    },
    {
      id: 'page-7',
      imageUrl: 'images/7.jpg',
      alt: 'Boat trip'
    },
    {
      id: 'page-8',
      imageUrl: 'images/8.jpg',
      alt: 'Family photo'
    },
    {
      id: 'page-9',
      imageUrl: 'images/10.jpg',
      alt: 'Family photo'
    },
    {
      id: 'page-10',
      imageUrl: 'images/11.jpg',
      alt: 'Family photo'
    },
    {
      id: 'page-11',
      imageUrl: 'images/12.jpg',
      alt: 'Family photo'
    }
  ]
};