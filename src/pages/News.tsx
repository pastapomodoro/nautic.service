import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, type NewsArticle } from '../lib/supabase';
import { Calendar, ArrowRight } from 'lucide-react';
import AnimatedCard from '../components/AnimatedCard';

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
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
      <div className="bg-[#F2EFE7] min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.button
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            onClick={() => setSelectedArticle(null)}
            className="mb-6 text-[#006A71] hover:text-[#48A6A7] font-semibold flex items-center gap-2"
          >
            <ArrowRight className="h-5 w-5 rotate-180" />
            Torna alle News
          </motion.button>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <motion.div
              className="h-[400px] bg-cover bg-center"
              style={{ backgroundImage: `url(${selectedArticle.image_url})` }}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="p-8">
              <div className="flex items-center text-gray-600 mb-4">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{formatDate(selectedArticle.published_at)}</span>
              </div>
              <h1 className="text-4xl font-bold text-[#006A71] mb-6">
                {selectedArticle.title}
              </h1>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                {selectedArticle.content.split('\n\n').map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-4"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F2EFE7] min-h-screen">
      <div
        className="relative h-[300px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-full flex items-center justify-center text-center text-white px-4"
        >
          <div>
            <h1 className="text-5xl md:text-6xl font-bold">News</h1>
            <p className="text-xl md:text-2xl mt-4">
              Le ultime novità dal mondo nautico
            </p>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block"
            >
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#006A71]"></div>
            </motion.div>
          </div>
        ) : articles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white rounded-lg shadow-lg"
          >
            <p className="text-xl text-gray-600">
              Nessuna notizia disponibile al momento. Torna presto per le ultime novità dal
              mondo nautico.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {articles[0] && (
              <AnimatedCard delay={0}>
                <motion.div
                  onClick={() => setSelectedArticle(articles[0])}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    <motion.div
                      className="h-[400px] bg-cover bg-center"
                      style={{ backgroundImage: `url(${articles[0].image_url})` }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center text-gray-600 mb-3">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span>{formatDate(articles[0].published_at)}</span>
                      </div>
                      <h2 className="text-3xl font-bold text-[#006A71] mb-4">
                        {articles[0].title}
                      </h2>
                      <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                        {articles[0].excerpt}
                      </p>
                      <div className="flex items-center text-[#006A71] hover:text-[#48A6A7] font-semibold">
                        Leggi di più
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatedCard>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.slice(1).map((article, index) => (
                <AnimatedCard key={article.id} delay={(index + 1) * 0.1}>
                  <motion.div
                    onClick={() => setSelectedArticle(article)}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col"
                  >
                    <motion.div
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${article.image_url})` }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{formatDate(article.published_at)}</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#006A71] mb-3">
                        {article.title}
                      </h3>
                      <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">{article.excerpt}</p>
                      <div className="flex items-center text-[#006A71] hover:text-[#48A6A7] font-semibold text-sm">
                        Leggi di più
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </div>
                    </div>
                  </motion.div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
