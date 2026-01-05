import { useState, useEffect } from 'react';
import ShopifyBuyButton from '../components/ShopifyBuyButton';
import ProductModal from '../components/ProductModal';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  in_stock: boolean;
  created_at?: string;
  shopify_product_id?: string | number;
  handle?: string | null;
};

type VenditaProps = {
  onNavigate: (page: string) => void;
};

export default function Vendita({ onNavigate }: VenditaProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Carica da JSON locale
      console.log('📦 Caricamento prodotti da file JSON locale...');
      const response = await fetch('/products.json');
      if (response.ok) {
        const jsonData = await response.json();
        // Filtra solo prodotti che NON sono ricambi o accessori
        const venditaData = jsonData.filter((p: Product) => 
          p.category && 
          !p.category.toLowerCase().includes('ricambi') && 
          !p.category.toLowerCase().includes('accessori')
        );
        setProducts(venditaData);
      } else {
        console.warn('File products.json non trovato');
        setProducts([]);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
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
    <div className="bg-[#F4F7F6] min-h-screen">
      <div
        className="relative h-[300px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold">Vendita</h1>
            <p className="text-xl md:text-2xl mt-4">
              Scopri la nostra selezione di barche e moto d'acqua
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-semibold transition-colors touch-manipulation ${
                  selectedCategory === category
                    ? 'bg-[#00D9CC] text-white'
                    : 'bg-white text-[#0E0E0E] hover:bg-[#1FA9A0] active:bg-[#00D9CC]'
                }`}
              >
                {category === 'all' ? 'Tutti' : category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00D9CC]"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-lg">
            <p className="text-xl text-gray-600">
              Nessun prodotto disponibile al momento. Contattaci per maggiori informazioni.
            </p>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
              {filteredProducts.map((product) => {
                // Pulisci il nome prodotto rimuovendo codici e numeri eccessivi
                const cleanName = product.name
                  .replace(/\d{6,}/g, '') // Rimuove sequenze di 6+ numeri (probabili codici)
                  .replace(/\s{2,}/g, ' ') // Rimuove spazi multipli
                  .trim();
                
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col cursor-pointer active:shadow-lg transition-shadow touch-manipulation"
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsModalOpen(true);
                    }}
                  >
                    <div
                      className="h-40 sm:h-48 bg-cover bg-center overflow-hidden flex-shrink-0"
                      style={{ backgroundImage: `url(${product.image_url})` }}
                    />
                    <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow min-h-0">
                      <div className="flex items-start justify-between mb-1.5 sm:mb-2 flex-shrink-0">
                        <h3 className="text-base sm:text-lg font-bold text-[#0E0E0E] line-clamp-2 flex-1 pr-2">
                          {cleanName || product.name}
                        </h3>
                        {product.in_stock && (
                          <span className="bg-green-100 text-green-800 text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex-shrink-0">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mb-1.5 sm:mb-2 flex-shrink-0">{product.category}</p>
                      <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4 line-clamp-2 flex-shrink-0 min-h-[2rem] sm:min-h-[2.5rem]">
                        {product.description}
                      </p>
                      <div className="flex flex-col gap-2 sm:gap-3 mt-auto flex-shrink-0">
                        <div className="flex items-center justify-between">
                          <span className="text-lg sm:text-xl font-bold text-[#0E0E0E]">
                            €{product.price.toLocaleString()}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(product);
                            setIsModalOpen(true);
                          }}
                          className="bg-[#00D9CC] hover:bg-[#1FA9A0] active:bg-[#1FA9A0] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium flex items-center justify-center gap-2 transition-colors touch-manipulation w-full"
                        >
                          Acquista
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center bg-gradient-to-r from-[#00D9CC] to-[#9BE870] rounded-lg p-6 sm:p-8 text-white">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Non Trovi Quello che Cerchi?</h3>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base">Contattaci per una consulenza personalizzata o per ordini speciali</p>
              <button
                className="bg-white text-[#0E0E0E] px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#F4F7F6] active:bg-[#9BE870]/20 transition-colors touch-manipulation"
              >
                Contattaci
              </button>
            </div>
          </div>
        )}
      </div>
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
      />
    </div>
  );
}
