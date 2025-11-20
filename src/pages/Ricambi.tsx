import { useState, useEffect } from 'react';
import { supabase, type Product } from '../lib/supabase';
import AnimatedCard from '../components/AnimatedCard';
import ShopifyBuyButton from '../components/ShopifyBuyButton';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export default function Ricambi() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Prova a caricare da Supabase
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseAnonKey) {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          // Filtra solo i prodotti che sono ricambi
          const ricambiData = data.filter((p: Product) => 
            p.category && p.category.toLowerCase().includes('ricambi')
          );
          setProducts(ricambiData);
          setLoading(false);
          return;
        }
      }

      // Fallback: carica da JSON locale
      console.log('📦 Caricamento ricambi da file JSON locale...');
      const response = await fetch('/ricambi.json');
      if (response.ok) {
        const jsonData = await response.json();
        setProducts(jsonData);
      } else {
        console.warn('File ricambi.json non trovato');
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Ultimo tentativo: carica da JSON
      try {
        const response = await fetch('/ricambi.json');
        if (response.ok) {
          const jsonData = await response.json();
          setProducts(jsonData);
        }
      } catch (jsonError) {
        console.error('Error loading JSON fallback:', jsonError);
        setProducts([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Estrai le categorie senza il prefisso "Ricambi - " o "Ricambi"
  const getDisplayCategory = (category: string) => {
    if (!category) return 'Altri';
    if (category.startsWith('Ricambi - ')) {
      return category.replace('Ricambi - ', '');
    }
    if (category === 'Ricambi') {
      return 'Altri';
    }
    return category;
  };

  const categories = ['all', ...Array.from(new Set(products.map((p) => getDisplayCategory(p.category))))];
  
  // Filtra per categoria e ricerca
  const filteredProducts = products.filter((p) => {
    const displayCategory = getDisplayCategory(p.category);
    const matchesCategory = selectedCategory === 'all' || displayCategory === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      displayCategory.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#F2EFE7] min-h-screen">
      <div
        className="relative h-[300px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/4488662/pexels-photo-4488662.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold">Ricambi</h1>
            <p className="text-xl md:text-2xl mt-4">
              Ricambi originali e di qualità per la tua imbarcazione
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cerca ricambi per nome, descrizione o categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#006A71] focus:outline-none text-lg"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="text-center mt-4 text-gray-600">
              Trovati {filteredProducts.length} ricambi per "{searchTerm}"
            </p>
          )}
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#006A71] text-white'
                    : 'bg-white text-[#006A71] hover:bg-[#9ACBD0]'
                }`}
              >
                {category === 'all' ? 'Tutti' : category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#006A71]"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-lg">
            <p className="text-xl text-gray-600">
              {searchTerm 
                ? `Nessun ricambio trovato per "${searchTerm}". Prova con altri termini.`
                : 'Nessun ricambio disponibile al momento. Contattaci per maggiori informazioni.'}
            </p>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {filteredProducts.map((product, index) => (
                <AnimatedCard key={product.id} delay={index * 0.1}>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
                    <motion.div
                      className="h-48 bg-cover bg-center overflow-hidden flex-shrink-0"
                      style={{ backgroundImage: `url(${product.image_url})` }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="p-6 flex flex-col flex-grow min-h-0">
                      <div className="flex items-start justify-between mb-2 flex-shrink-0">
                        <h3 className="text-lg font-bold text-[#006A71] line-clamp-2 flex-1 pr-2">{product.name}</h3>
                        {product.in_stock && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded flex-shrink-0"
                          >
                            Disponibile
                          </motion.span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mb-2 flex-shrink-0">
                        {product.category?.startsWith('Ricambi - ') 
                          ? product.category.replace('Ricambi - ', '')
                          : product.category === 'Ricambi' 
                          ? 'Altri'
                          : product.category || 'Altri'}
                      </p>
                      <p className="text-sm text-gray-700 mb-4 line-clamp-2 flex-shrink-0 min-h-[2.5rem]">{product.description}</p>
                      <div className="flex flex-col gap-3 mt-auto flex-shrink-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-[#006A71]">
                            €{product.price.toLocaleString()}
                          </span>
                        </div>
                        {(product.shopify_product_id || (product as any).handle) ? (
                          <ShopifyBuyButton 
                            productId={product.shopify_product_id}
                            productHandle={(product as any).handle}
                            className="w-full"
                          />
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#006A71] hover:bg-[#48A6A7] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                          >
                            Acquista
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center bg-gradient-to-r from-[#48A6A7] to-[#006A71] rounded-lg p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-2">Non Trovi il Ricambio che Cerchi?</h3>
              <p className="mb-6">Contattaci per una consulenza personalizzata o per ordini speciali</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#006A71] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
              >
                Contattaci
              </motion.button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

