import PhotoAlbum from './components/album/PhotoAlbum';

function App() {
  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold text-primary-700">Ditital Album</h1>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-6xl aspect-[4/3] sm:aspect-[16/10] shadow-xl rounded-xl overflow-hidden border border-neutral-200">
          <PhotoAlbum />
        </div>
      </main>
      
      <footer className="bg-white py-3 px-6 border-t border-neutral-200">
        <div className="max-w-6xl mx-auto text-center text-sm text-neutral-500">
          © 2025 Digital Album.
        </div>
      </footer>
    </div>
  );
}

export default App;