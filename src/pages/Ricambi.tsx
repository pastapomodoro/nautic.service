import { useState, useEffect } from 'react';
import React from 'react';
import ProductModal from '../components/ProductModal';
import RicambiFilterMenu from '../components/RicambiFilterMenu';
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

// Lista dei brand comuni da cercare nei nomi (ordinati dalla stringa più lunga alla più corta)
const BRAND_KEYWORDS = [
  'SEA DOO',
  'SEA-DOO',
  'MERCURISER',
  'EVINRUDE',
  'KAWASAKI',
  'YAMAHA',
  'JOHNSON',
  'TOHATSU',
  'CHAMPION',
  'MERCURY',
  'CUMMINS',
  'YANMAR',
  'SUZUKI',
  'RECMAR',
  'HONDA',
  'VOLVO',
  'BRP',
  'NGK',
];

// Funzione per estrarre i brand dal nome del prodotto
const extractBrands = (productName: string): string[] => {
  const upperName = productName.toUpperCase();
  const foundBrands: string[] = [];

  BRAND_KEYWORDS.forEach((brand) => {
    if (upperName.includes(brand)) {
      const normalizedBrand = brand === 'SEA-DOO' ? 'SEA DOO' : brand;
      if (!foundBrands.includes(normalizedBrand)) {
        foundBrands.push(normalizedBrand);
      }
    }
  });

  return foundBrands;
};

// Componente per gestire il caricamento delle immagini con fallback per prefissi numerici
// Usa SOLO immagini dalla cartella ricambi-images, senza fallback a Shopify
const LocalImageWithFallback = ({ shopifyUrl, alt, className, style }: { shopifyUrl: string; alt: string; className: string; style?: React.CSSProperties }) => {
  // Se il percorso è già locale, usalo direttamente
  if (shopifyUrl && shopifyUrl.startsWith('/ricambi-images/')) {
    return (
      <img
        src={shopifyUrl}
        alt={alt}
        className={className}
        style={{ 
          background: 'transparent', 
          backgroundColor: 'transparent',
          backgroundImage: 'none',
          filter: 'none',
          isolation: 'isolate',
          mixBlendMode: 'normal',
          ...style 
        }}
      />
    );
  }

  // Altrimenti, estrai il nome del file dall'URL Shopify e cerca nella cartella locale
  const extractFileName = (url: string): string => {
    if (!url) return '';
    
    // Se è già un percorso locale
    if (url.startsWith('/ricambi-images/')) {
      return url.replace('/ricambi-images/', '');
    }
    
    // Estrai da URL Shopify
    const urlMatch = url.match(/\/files\/[^\/]+\/([^?]+)/);
    if (urlMatch) {
      return urlMatch[1];
    }
    
    // Fallback: prendi l'ultima parte dell'URL
    const fileName = url.split('/').pop()?.split('?')[0] || '';
    return fileName;
  };

  const fileName = extractFileName(shopifyUrl);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const [attempt, setAttempt] = useState<number>(0);
  const maxAttempts = 300;

  // Calcola il percorso dell'immagine basato sul tentativo corrente
  const getImagePath = React.useCallback((currentAttempt: number): string => {
    if (!fileName) return '';
    
    if (currentAttempt === 0) {
      return `/ricambi-images/${fileName}`;
    } else if (currentAttempt <= maxAttempts) {
      return `/ricambi-images/${currentAttempt}-${fileName}`;
    }
    return '';
  }, [fileName, maxAttempts]);

  // Inizializza con il primo tentativo
  useEffect(() => {
    if (fileName) {
      const initialPath = getImagePath(0);
      setCurrentSrc(initialPath);
      setAttempt(0);
    }
  }, [fileName, getImagePath]);

  const handleError = () => {
    const nextAttempt = attempt + 1;
    if (nextAttempt <= maxAttempts) {
      const nextPath = getImagePath(nextAttempt);
      setCurrentSrc(nextPath);
      setAttempt(nextAttempt);
    }
  };

  if (!fileName || !currentSrc) {
    return null;
  }

  return (
    <img
      key={`img-${fileName}-${attempt}`}
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      style={{ 
        background: 'transparent', 
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        filter: 'none',
        isolation: 'isolate',
        mixBlendMode: 'normal',
        ...style 
      }}
    />
  );
};

export default function Ricambi() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuCategory, setMenuCategory] = useState<string | null>(null);
  const [menuBrand, setMenuBrand] = useState<string | null>(null);
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

  // Handler per la navigazione del menu
  const handleFilterChange = (category: string | null, brand: string | null) => {
    setMenuCategory(category);
    setMenuBrand(brand);
  };
  
  // Filtra per categoria, brand e ricerca
  const filteredProducts = products.filter((p) => {
    const displayCategory = getDisplayCategory(p.category);
    
    // Filtro categoria (dal menu)
    let matchesCategory = true;
    if (menuCategory) {
      matchesCategory = displayCategory === menuCategory;
    }
    
    // Filtro brand (dal menu)
    let matchesBrand = true;
    if (menuBrand) {
      const productBrands = extractBrands(p.name);
      matchesBrand = productBrands.includes(menuBrand);
    }
    
    // Filtro ricerca
    const matchesSearch = searchTerm === '' || 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      displayCategory.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesBrand && matchesSearch;
  });

  // Debug logging
  useEffect(() => {
    console.log('🔍 Debug Ricambi:');
    console.log('- Prodotti totali:', products.length);
    console.log('- Categoria menu:', menuCategory);
    console.log('- Brand menu:', menuBrand);
    console.log('- Termine di ricerca:', searchTerm);
    console.log('- Prodotti filtrati:', filteredProducts.length);
  }, [products, menuCategory, menuBrand, searchTerm, filteredProducts.length]);

  return (
    <div className="bg-[#F4F7F6] min-h-screen">
      {/* Menu a tendina filtri */}
      <RicambiFilterMenu 
        products={products} 
        onFilterChange={handleFilterChange}
      />
      
      <div
        className="relative h-[300px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/4488662/pexels-photo-4488662.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
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
              className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 rounded-lg border-2 border-gray-300 focus:border-[#00D9CC] focus:outline-none text-sm sm:text-base md:text-lg"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#6B6F72] active:text-gray-800 touch-manipulation"
                aria-label="Cancella ricerca"
              >
                ✕
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="text-center mt-2 sm:mt-4 text-sm sm:text-base text-[#6B6F72]">
              Trovati {filteredProducts.length} ricambi per "{searchTerm}"
            </p>
          )}
        </div>

        {/* Mostra selezione attiva dal menu */}
        {(menuCategory || menuBrand) && (
          <div className="mb-4 sm:mb-6 md:mb-8">
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center items-center">
              <span className="text-sm font-semibold text-gray-700">Visualizzando:</span>
              {menuCategory && (
                <span className="px-4 py-2 rounded-full bg-[#00D9CC] text-white text-sm font-semibold">
                  {menuCategory}
                </span>
              )}
              {menuBrand && (
                <span className="px-4 py-2 rounded-full bg-[#00D9CC] text-white text-sm font-semibold">
                  {menuBrand}
                </span>
              )}
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00D9CC]"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-lg">
            <p className="text-xl text-[#6B6F72]">
              {searchTerm 
                ? `Nessun ricambio trovato per "${searchTerm}". Prova con altri termini.`
                : (menuCategory || menuBrand)
                ? `Nessun ricambio trovato per la selezione corrente. Prova a cambiare tipo o brand dal menu.`
                : 'Seleziona un tipo di ricambio e un brand dal menu per iniziare la ricerca.'}
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
                      className="h-40 sm:h-48 flex items-center justify-center overflow-hidden flex-shrink-0 p-4" 
                      style={{ 
                        backgroundColor: '#F4F7F6',
                        background: '#F4F7F6',
                        backgroundImage: 'none',
                        isolation: 'isolate'
                      }}
                    >
                      <LocalImageWithFallback
                        shopifyUrl={product.image_url}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain"
                        style={{
                          mixBlendMode: 'normal',
                          isolation: 'isolate'
                        }}
                      />
                    </div>
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
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Non Trovi il Ricambio che Cerchi?</h3>
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

