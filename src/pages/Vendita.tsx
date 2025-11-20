import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, type Product } from '../lib/supabase';
import AnimatedCard from '../components/AnimatedCard';
import ShopifyBuyButton from '../components/ShopifyBuyButton';

type VenditaProps = {
  onNavigate: (page: string) => void;
};

export default function Vendita({ onNavigate }: VenditaProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))];
  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-[#F2EFE7] min-h-screen">
      <div
        className="relative h-[300px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold">Vendita</h1>
            <p className="text-xl md:text-2xl mt-4">
              Scopri la nostra selezione di barche e moto d'acqua
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              Nessun prodotto disponibile al momento. Contattaci per maggiori informazioni.
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
                      <p className="text-xs text-gray-500 mb-2 flex-shrink-0">{product.category}</p>
                      <p className="text-sm text-gray-700 mb-4 line-clamp-2 flex-shrink-0 min-h-[2.5rem]">{product.description}</p>
                      <div className="flex flex-col gap-3 mt-auto flex-shrink-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-[#006A71]">
                            €{product.price.toLocaleString()}
                          </span>
                        </div>
                        {product.shopify_product_id ? (
                          <ShopifyBuyButton 
                            productId={product.shopify_product_id} 
                            className="w-full"
                          />
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onNavigate('payment')}
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
              <h3 className="text-2xl font-bold mb-2">Non Trovi Quello che Cerchi?</h3>
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
