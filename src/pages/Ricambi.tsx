import { useState, useEffect } from 'react';
import React from 'react';
import ProductModal from '../components/ProductModal';
import RicambiFilterMenu from '../components/RicambiFilterMenu';
import { Search, Grid, List } from 'lucide-react';

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

// Funzione migliorata per estrarre i brand dal nome del prodotto
const extractBrands = (productName: string): string[] => {
  if (!productName) return [];
  
  const upperName = productName.toUpperCase().replace(/\s+/g, ' '); // Normalizza spazi multipli
  const foundBrands: string[] = [];

  // Cerca ogni brand (dalla stringa più lunga alla più corta per evitare match parziali)
  BRAND_KEYWORDS.forEach((brand) => {
    // Cerca il brand nel nome (case insensitive)
    // Gestisce anche varianti con spazi o trattini
    const brandUpper = brand.toUpperCase();
    const brandVariants = [
      brandUpper,
      brandUpper.replace(/\s+/g, '-'), // "SEA DOO" -> "SEA-DOO"
      brandUpper.replace(/-/g, ' '),   // "SEA-DOO" -> "SEA DOO"
    ];
    
    for (const variant of brandVariants) {
      if (upperName.includes(variant)) {
        // Normalizza i brand (es. SEA DOO e SEA-DOO sono lo stesso)
        const normalizedBrand = brand === 'SEA-DOO' || brand === 'SEA DOO' ? 'SEA DOO' : brand;
        if (!foundBrands.includes(normalizedBrand)) {
          foundBrands.push(normalizedBrand);
        }
        break; // Trovato, passa al prossimo brand
      }
    }
  });

  return foundBrands;
};

// Componente per gestire il caricamento delle immagini con fallback per prefissi numerici
const LocalImageWithFallback = ({ shopifyUrl, alt, className, style }: { shopifyUrl: string; alt: string; className: string; style?: React.CSSProperties }) => {
  const [imageError, setImageError] = useState(false);

  // Se l'URL è già locale e valido, usalo direttamente SENZA tentare varianti
  if (shopifyUrl && shopifyUrl.startsWith('/ricambi-images/')) {
    return (
      <img
        src={shopifyUrl}
        alt={alt}
        className={className}
        onError={() => setImageError(true)}
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

  // Se è un URL esterno (pexels, ecc.), usalo direttamente
  if (shopifyUrl && (shopifyUrl.startsWith('http://') || shopifyUrl.startsWith('https://'))) {
    return (
      <img
        src={shopifyUrl}
        alt={alt}
        className={className}
        onError={() => setImageError(true)}
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

  // Solo per URL Shopify vecchi, prova a trovare l'immagine locale
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const [attempt, setAttempt] = useState<number>(0);
  const maxAttempts = 10;

  const extractFileName = (url: string): string => {
    if (!url) return '';
    if (url.startsWith('/ricambi-images/')) {
      return url.replace('/ricambi-images/', '');
    }
    const urlMatch = url.match(/\/files\/[^\/]+\/([^?]+)/);
    if (urlMatch) {
      return urlMatch[1];
    }
    const fileName = url.split('/').pop()?.split('?')[0] || '';
    return fileName;
  };

  const fileName = extractFileName(shopifyUrl);

  const getImagePath = React.useCallback((currentAttempt: number): string => {
    if (!fileName) return '';
    if (currentAttempt === 0) {
      return `/ricambi-images/${fileName}`;
    } else if (currentAttempt <= maxAttempts) {
      return `/ricambi-images/${currentAttempt}-${fileName}`;
    }
    return '';
  }, [fileName, maxAttempts]);

  useEffect(() => {
    if (fileName && !imageError) {
      const initialPath = getImagePath(0);
      setCurrentSrc(initialPath);
      setAttempt(0);
      setImageError(false);
    }
  }, [fileName, getImagePath, imageError]);

  const handleError = () => {
    const nextAttempt = attempt + 1;
    if (nextAttempt <= maxAttempts) {
      const nextPath = getImagePath(nextAttempt);
      setCurrentSrc(nextPath);
      setAttempt(nextAttempt);
    } else {
      // Dopo tutti i tentativi, mostra placeholder
      setImageError(true);
    }
  };

  // Se non c'è fileName o c'è un errore, mostra placeholder
  if (!fileName || imageError || (attempt > maxAttempts && !currentSrc)) {
    return (
      <div 
        className={`${className} flex items-center justify-center bg-gray-100 text-gray-400`}
        style={style}
      >
        <div className="text-center p-4">
          <svg 
            className="w-12 h-12 mx-auto mb-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          <p className="text-xs">Immagine non disponibile</p>
        </div>
      </div>
    );
  }

  // Se l'URL è già locale ma non è stato gestito sopra, non dovrebbe arrivare qui
  // Ma per sicurezza, se non c'è currentSrc, mostra placeholder
  if (!currentSrc) {
    return (
      <div 
        className={`${className} flex items-center justify-center bg-gray-100 text-gray-400`}
        style={style}
      >
        <div className="text-center p-4">
          <svg 
            className="w-12 h-12 mx-auto mb-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          <p className="text-xs">Caricamento...</p>
        </div>
      </div>
    );
  }

  if (!currentSrc) {
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
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
    
    // Filtro categoria
    let matchesCategory = true;
    if (menuCategory) {
      matchesCategory = displayCategory === menuCategory;
    }
    
    // Filtro brand
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

  // Debug logging (solo in sviluppo)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Filtri attivi:', {
        categoria: menuCategory,
        brand: menuBrand,
        ricerca: searchTerm,
        prodottiTotali: products.length,
        prodottiFiltrati: filteredProducts.length
      });
    }
  }, [menuCategory, menuBrand, searchTerm, products.length, filteredProducts.length]);

  return (
    <div className="bg-[#F4F7F6] min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[250px] sm:h-[300px] md:h-[400px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/4488662/pexels-photo-4488662.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Ricambi</h1>
            <p className="text-lg sm:text-xl md:text-2xl">
              Ricambi originali e di qualità per la tua imbarcazione
            </p>
          </div>
        </div>
      </div>

      {/* Layout principale: Sidebar + Contenuto */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar Filtri - sempre visibile su desktop */}
        <RicambiFilterMenu 
          products={products} 
          onFilterChange={handleFilterChange}
        />
        
        {/* Contenuto principale */}
        <main className="flex-1 min-w-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Barra di ricerca e controlli */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cerca ricambi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 rounded-lg border-2 border-gray-300 focus:border-[#00D9CC] focus:outline-none text-sm sm:text-base bg-white shadow-sm"
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

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-[#00D9CC] text-[#0E0E0E]'
                        : 'text-gray-600 hover:text-[#0E0E0E]'
                    }`}
                    aria-label="Vista griglia"
                  >
                    <Grid className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'list'
                        ? 'bg-[#00D9CC] text-[#0E0E0E]'
                        : 'text-gray-600 hover:text-[#0E0E0E]'
                    }`}
                    aria-label="Vista lista"
                  >
                    <List className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>

              {/* Info risultati */}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <span className="font-semibold">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'ricambio trovato' : 'ricambi trovati'}
                </span>
                {(menuCategory || menuBrand || searchTerm) && (
                  <>
                    <span>•</span>
                    <span className="text-xs">
                      {menuCategory && <span className="inline-block mr-2">Categoria: <strong>{menuCategory}</strong></span>}
                      {menuBrand && <span className="inline-block mr-2">Brand: <strong>{menuBrand}</strong></span>}
                      {searchTerm && <span className="inline-block">Ricerca: <strong>"{searchTerm}"</strong></span>}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00D9CC]"></div>
                <p className="mt-4 text-gray-600">Caricamento ricambi...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-lg">
                <p className="text-xl text-[#6B6F72] mb-2">
                  {searchTerm 
                    ? `Nessun ricambio trovato per "${searchTerm}"`
                    : (menuCategory || menuBrand)
                    ? `Nessun ricambio trovato per la selezione corrente`
                    : 'Seleziona un tipo di ricambio e un brand dal menu per iniziare'}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Prova a modificare i filtri o la ricerca
                </p>
              </div>
            ) : (
              <>
                {/* Grid View */}
                {viewMode === 'grid' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {filteredProducts.map((product) => {
                      const cleanName = product.name
                        .replace(/\d{6,}/g, '')
                        .replace(/\s{2,}/g, ' ')
                        .trim();
                      
                      return (
                        <div
                          key={product.id}
                          className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsModalOpen(true);
                          }}
                        >
                          <div 
                            className="h-48 sm:h-56 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F4F7F6] to-gray-100 p-4" 
                          >
                            <LocalImageWithFallback
                              shopifyUrl={product.image_url}
                              alt={product.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                          <div className="p-4 sm:p-5 flex flex-col flex-grow">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-base sm:text-lg font-bold text-[#0E0E0E] line-clamp-2 flex-1 pr-2">
                                {cleanName || product.name}
                              </h3>
                              {product.in_stock && (
                                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded flex-shrink-0">
                                  ✓ Disponibile
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#00D9CC] font-medium mb-2">
                              {getDisplayCategory(product.category)}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                              {product.description}
                            </p>
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                              <span className="text-xl sm:text-2xl font-bold text-[#0E0E0E]">
                                €{product.price.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedProduct(product);
                                  setIsModalOpen(true);
                                }}
                                className="bg-[#00D9CC] hover:bg-[#1FA9A0] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
                              >
                                Acquista
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* List View */}
                {viewMode === 'list' && (
                  <div className="space-y-4">
                    {filteredProducts.map((product) => {
                      const cleanName = product.name
                        .replace(/\d{6,}/g, '')
                        .replace(/\s{2,}/g, ' ')
                        .trim();
                      
                      return (
                        <div
                          key={product.id}
                          className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col sm:flex-row"
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsModalOpen(true);
                          }}
                        >
                          <div 
                            className="h-48 sm:h-32 sm:w-48 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F4F7F6] to-gray-100 p-4 flex-shrink-0" 
                          >
                            <LocalImageWithFallback
                              shopifyUrl={product.image_url}
                              alt={product.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                          <div className="p-4 sm:p-5 flex flex-col sm:flex-row flex-grow items-start sm:items-center justify-between gap-4">
                            <div className="flex-grow min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="text-base sm:text-lg font-bold text-[#0E0E0E] line-clamp-2 flex-1 pr-2">
                                  {cleanName || product.name}
                                </h3>
                                {product.in_stock && (
                                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded flex-shrink-0 ml-2">
                                    ✓ Disponibile
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-[#00D9CC] font-medium mb-1">
                                {getDisplayCategory(product.category)}
                              </p>
                              <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                                {product.description}
                              </p>
                            </div>
                            <div className="flex items-center justify-between sm:flex-col sm:items-end gap-4 w-full sm:w-auto">
                              <span className="text-xl sm:text-2xl font-bold text-[#0E0E0E]">
                                €{product.price.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedProduct(product);
                                  setIsModalOpen(true);
                                }}
                                className="bg-[#00D9CC] hover:bg-[#1FA9A0] text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm w-full sm:w-auto"
                              >
                                Acquista
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* CTA Section */}
                <div className="mt-8 sm:mt-12 bg-gradient-to-r from-[#00D9CC] to-[#1FA9A0] rounded-xl p-6 sm:p-8 text-white shadow-lg">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Non Trovi il Ricambio che Cerchi?</h3>
                  <p className="mb-4 sm:mb-6 text-sm sm:text-base opacity-90">
                    Contattaci per una consulenza personalizzata o per ordini speciali
                  </p>
                  <button
                    className="bg-white text-[#0E0E0E] px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#F4F7F6] transition-colors shadow-md"
                  >
                    Contattaci
                  </button>
                </div>
              </>
            )}
          </div>
        </main>
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
