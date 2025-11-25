import { useState, useEffect } from 'react';
import ShopifyBuyButton from '../components/ShopifyBuyButton';
import ProductModal from '../components/ProductModal';
import { Search } from 'lucide-react';

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

export default function Ricambi() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Carica da JSON locale
      console.log('📦 Caricamento ricambi da file JSON locale...');
      const response = await fetch('/ricambi.json');
      console.log('Response status:', response.status, response.statusText);
      console.log('Response URL:', response.url);
      
      if (response.ok) {
        const jsonData = await response.json();
        console.log('✅ Dati caricati con successo:', jsonData.length, 'prodotti');
        setProducts(jsonData);
      } else {
        console.warn('❌ File ricambi.json non trovato. Status:', response.status);
        console.warn('Response text:', await response.text());
        setProducts([]);
      }
    } catch (error) {
      console.error('❌ Error loading products:', error);
      setProducts([]);
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

  // Debug logging
  useEffect(() => {
    console.log('🔍 Debug Ricambi:');
    console.log('- Prodotti totali:', products.length);
    console.log('- Categoria selezionata:', selectedCategory);
    console.log('- Termine di ricerca:', searchTerm);
    console.log('- Prodotti filtrati:', filteredProducts.length);
    console.log('- Categorie disponibili:', categories);
  }, [products, selectedCategory, searchTerm, filteredProducts.length, categories]);

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Search Bar */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cerca ricambi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 rounded-lg border-2 border-gray-300 focus:border-[#006A71] focus:outline-none text-sm sm:text-base md:text-lg"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 active:text-gray-800 touch-manipulation"
                aria-label="Cancella ricerca"
              >
                ✕
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="text-center mt-2 sm:mt-4 text-sm sm:text-base text-gray-600">
              Trovati {filteredProducts.length} ricambi per "{searchTerm}"
            </p>
          )}
        </div>

        {/* Category Filters */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-semibold transition-colors touch-manipulation ${
                  selectedCategory === category
                    ? 'bg-[#006A71] text-white'
                    : 'bg-white text-[#006A71] hover:bg-[#9ACBD0] active:bg-[#9ACBD0]'
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
                    <div className="h-56 sm:h-64 md:h-72 bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 p-4 relative">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain product-image-white-bg"
                        crossOrigin="anonymous"
                        style={{
                          backgroundColor: '#f3f4f6',
                          padding: '8px'
                        }}
                        onLoad={(e) => {
                          const img = e.currentTarget;
                          try {
                            const canvas = document.createElement('canvas');
                            const ctx = canvas.getContext('2d', { willReadFrequently: true });
                            if (!ctx) return;
                            
                            canvas.width = img.naturalWidth;
                            canvas.height = img.naturalHeight;
                            ctx.drawImage(img, 0, 0);
                            
                            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                            const data = imageData.data;
                            
                            for (let i = 0; i < data.length; i += 4) {
                              const r = data[i];
                              const g = data[i + 1];
                              const b = data[i + 2];
                              
                              // Calcola la luminosità
                              const brightness = (r + g + b) / 3;
                              
                              // Rimuovi pixel blu/verde scuri (blu dominante)
                              if (b > r + 15 && b > g + 15) {
                                // Se è blu dominante, rendilo bianco
                                if (brightness < 200 || (b > r + 25 && b > g + 25)) {
                                  data[i] = 255;     // R -> bianco
                                  data[i + 1] = 255; // G -> bianco
                                  data[i + 2] = 255; // B -> bianco
                                }
                              }
                            }
                            
                            ctx.putImageData(imageData, 0, 0);
                            img.src = canvas.toDataURL();
                            img.style.mixBlendMode = 'normal';
                            img.style.filter = 'none';
                          } catch (error) {
                            // Se c'è un errore CORS, usa solo il filtro CSS
                            console.log('CORS error, using CSS filter only');
                          }
                        }}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=800';
                        }}
                      />
                    </div>
                    <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow min-h-0">
                      <div className="flex items-start justify-between mb-1.5 sm:mb-2 flex-shrink-0">
                        <h3 className="text-base sm:text-lg font-bold text-[#006A71] line-clamp-2 flex-1 pr-2">
                          {cleanName || product.name}
                        </h3>
                        {product.in_stock && (
                          <span className="bg-green-100 text-green-800 text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex-shrink-0">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mb-1.5 sm:mb-2 flex-shrink-0">
                        {product.category?.startsWith('Ricambi - ') 
                          ? product.category.replace('Ricambi - ', '')
                          : product.category === 'Ricambi' 
                          ? 'Altri'
                          : product.category || 'Altri'}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4 line-clamp-2 flex-shrink-0 min-h-[2rem] sm:min-h-[2.5rem]">
                        {product.description}
                      </p>
                      <div className="flex flex-col gap-2 sm:gap-3 mt-auto flex-shrink-0">
                        <div className="flex items-center justify-between">
                          <span className="text-lg sm:text-xl font-bold text-[#006A71]">
                            €{product.price.toLocaleString()}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(product);
                            setIsModalOpen(true);
                          }}
                          className="bg-[#006A71] hover:bg-[#48A6A7] active:bg-[#005a61] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium flex items-center justify-center gap-2 transition-colors touch-manipulation w-full"
                        >
                          Acquista
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center bg-gradient-to-r from-[#48A6A7] to-[#006A71] rounded-lg p-6 sm:p-8 text-white">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Non Trovi il Ricambio che Cerchi?</h3>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base">Contattaci per una consulenza personalizzata o per ordini speciali</p>
              <button
                className="bg-white text-[#006A71] px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
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

