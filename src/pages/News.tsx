import { useState, useEffect } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

type NewsArticle = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image_url: string;
  published_at: string;
  created_at?: string;
};

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      // Carica da JSON locale
      console.log('📦 Caricamento articoli news da file JSON locale...');
      const response = await fetch('/news.json');
      if (response.ok) {
        const jsonData = await response.json();
        // Ordina per data di pubblicazione (più recenti prima)
        const sortedData = jsonData.sort((a: NewsArticle, b: NewsArticle) => 
          new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
        );
        setArticles(sortedData);
      } else {
        console.warn('File news.json non trovato');
        setArticles([]);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (selectedArticle) {
    return (
      <div className="bg-[#F4F7F6] min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          <button
            onClick={() => setSelectedArticle(null)}
            className="mb-4 sm:mb-6 text-[#0E0E0E] hover:text-[#00D9CC] active:text-[#0E0E0E] font-semibold flex items-center gap-2 text-sm sm:text-base touch-manipulation"
          >
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 rotate-180" />
            Torna alle News
          </button>

          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div
              className="h-48 sm:h-64 md:h-80 lg:h-96 bg-cover bg-center"
              style={{ backgroundImage: `url(${selectedArticle.image_url})` }}
            />
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex items-center text-[#6B6F72] text-xs sm:text-sm mb-3 sm:mb-4">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                <span>{formatDate(selectedArticle.published_at)}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0E0E0E] mb-4 sm:mb-6">
                {selectedArticle.title}
              </h1>
              <div className="text-sm sm:text-base md:text-lg text-[#0E0E0E] leading-relaxed whitespace-pre-line">
                {selectedArticle.content}
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F7F6] min-h-screen">
      <div
        className="relative h-[250px] sm:h-[300px] md:h-[350px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1430676/pexels-photo-1430676.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">News</h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mt-2 sm:mt-4">
              Le ultime novità dal mondo della nautica
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00D9CC]"></div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-lg">
            <p className="text-lg sm:text-xl text-[#6B6F72]">
              Nessuna notizia disponibile al momento. Torna presto per le ultime novità dal mondo nautico.
            </p>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {articles[0] && (
              <div
                onClick={() => setSelectedArticle(articles[0])}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl active:shadow-lg transition-shadow cursor-pointer touch-manipulation"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <div
                    className="h-48 sm:h-56 md:h-64 lg:h-80 bg-cover bg-center"
                    style={{ backgroundImage: `url(${articles[0].image_url})` }}
                  />
                  <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center text-[#6B6F72] text-xs sm:text-sm mb-2 sm:mb-3">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      <span>{formatDate(articles[0].published_at)}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0E0E0E] mb-3 sm:mb-4">
                      {articles[0].title}
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-[#0E0E0E] mb-4 sm:mb-6 leading-relaxed">
                      {articles[0].excerpt}
                    </p>
                    <div className="flex items-center text-[#0E0E0E] hover:text-[#00D9CC] active:text-[#0E0E0E] font-semibold text-sm sm:text-base">
                      Leggi di più
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 ml-2" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {articles.slice(1).map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl active:shadow-lg transition-shadow cursor-pointer h-full flex flex-col touch-manipulation"
                >
                  <div
                    className="h-40 sm:h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${article.image_url})` }}
                  />
                  <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-[#6B6F72] text-xs sm:text-sm mb-2">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      <span>{formatDate(article.published_at)}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0E0E0E] mb-2 sm:mb-3">
                      {article.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#0E0E0E] mb-3 sm:mb-4 line-clamp-3 flex-grow">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center text-[#0E0E0E] hover:text-[#00D9CC] active:text-[#0E0E0E] font-semibold text-xs sm:text-sm">
                      Leggi di più
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
