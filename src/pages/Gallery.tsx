import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/manualClient';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { Search, X, Download, Maximize, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  useRevealOnScroll();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isLightboxPlaying, setIsLightboxPlaying] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setImages(data || []);
      
      // Extract unique categories from tags
      const allTags = new Set<string>();
      data?.forEach(item => {
        item.tags?.forEach((tag: string) => allTags.add(tag));
      });
      setCategories(['All', ...Array.from(allTags)]);
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredImages = images
    .filter((img) => {
      const matchesCategory = selectedCategory === 'All' || img.tags?.includes(selectedCategory);
      const matchesSearch = img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           img.description?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (sortBy === 'oldest') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

  // Lightbox keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  // Lightbox autoplay
  useEffect(() => {
    if (!isLightboxPlaying || lightboxIndex === null) return;

    const timer = setInterval(() => {
      goToNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [isLightboxPlaying, lightboxIndex]);

  const goToPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  const goToNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
  };

  const downloadImage = (src: string, title: string) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `${title.replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center reveal">
            <span className="eyebrow bg-white/10 text-white">GALLERY</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Our <span className="text-saffron">Journey</span> in Pictures
            </h1>
            <p className="text-xl text-white/90">
              Explore our state-of-the-art facilities, workshops, and student achievements
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="section">
        <div className="container-custom">
          <div className="reveal mb-8">
            <div className="bg-card rounded-2xl shadow-lg p-6">
              <div className="grid md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <input
                    type="text"
                    placeholder="Search images..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">By Title</option>
                </select>
              </div>
            </div>
          </div>

          {/* Images Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((img, index) => (
              <div
                key={img.id}
                className="reveal card-hover group relative overflow-hidden rounded-xl shadow-lg bg-card cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setLightboxIndex(index)}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={img.image_url}
                    alt={img.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-lg mb-1">{img.title}</h3>
                    {img.description && (
                      <p className="text-sm text-white/80 line-clamp-2">{img.description}</p>
                    )}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Maximize className="text-white" size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-16 reveal">
              <p className="text-xl text-muted-foreground">No images found matching your criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close lightbox"
          >
            <X className="text-white" size={24} />
          </button>

          <button
            onClick={goToPrev}
            className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="text-white" size={32} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="text-white" size={32} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
            <button
              onClick={() => setIsLightboxPlaying(!isLightboxPlaying)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              {isLightboxPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={() => downloadImage(filteredImages[lightboxIndex].image_url, filteredImages[lightboxIndex].title)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Download image"
            >
              <Download className="text-white" size={20} />
            </button>
          </div>

          <div className="max-w-6xl max-h-[80vh] animate-fade-in">
            <img
              src={filteredImages[lightboxIndex].image_url}
              alt={filteredImages[lightboxIndex].title}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <div className="text-center text-white mt-4">
              <h3 className="text-2xl font-bold mb-2">{filteredImages[lightboxIndex].title}</h3>
              {filteredImages[lightboxIndex].description && (
                <p className="text-white/90 mb-2">{filteredImages[lightboxIndex].description}</p>
              )}
              <p className="text-white/70">
                {lightboxIndex + 1} / {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
