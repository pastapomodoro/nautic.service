import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  category: string;
  [key: string]: any;
};

type RicambiFilterMenuProps = {
  products: Product[];
  onFilterChange: (category: string | null, brand: string | null) => void;
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
      // Normalizza i brand (es. SEA DOO e SEA-DOO sono lo stesso)
      const normalizedBrand = brand === 'SEA-DOO' ? 'SEA DOO' : brand;
      if (!foundBrands.includes(normalizedBrand)) {
        foundBrands.push(normalizedBrand);
      }
    }
  });

  return foundBrands;
};

export default function RicambiFilterMenu({ products, onFilterChange }: RicambiFilterMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  // Estrai categorie uniche
  const categories = Array.from(new Set(products.map((p) => p.category || 'Altri'))).sort();

  // Estrai brand per categoria selezionata
  const getBrandsForCategory = (category: string | null): string[] => {
    if (!category) return [];
    
    const categoryProducts = products.filter(
      (p) => (p.category || 'Altri') === category
    );
    
    const brandSet = new Set<string>();
    categoryProducts.forEach((product) => {
      const brands = extractBrands(product.name);
      brands.forEach((brand) => brandSet.add(brand));
    });
    
    return Array.from(brandSet).sort();
  };

  const availableBrands = getBrandsForCategory(selectedCategory);

  // Reset brand quando cambia categoria
  useEffect(() => {
    if (selectedCategory) {
      setSelectedBrand(null);
    }
  }, [selectedCategory]);

  // Notifica i cambiamenti al parent
  useEffect(() => {
    onFilterChange(selectedCategory, selectedBrand);
  }, [selectedCategory, selectedBrand, onFilterChange]);

  const handleCategorySelect = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setSelectedBrand(null);
    } else {
      setSelectedCategory(category);
      setSelectedBrand(null);
    }
  };

  const handleBrandSelect = (brand: string) => {
    if (selectedBrand === brand) {
      // Se clicchi di nuovo sullo stesso brand, deseleziona e chiudi
      setSelectedBrand(null);
      setIsOpen(false);
    } else {
      // Seleziona il brand e chiudi il menu per avviare la ricerca
      setSelectedBrand(brand);
      setIsOpen(false);
    }
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
  };

  return (
    <>
      {/* Pulsante per aprire il menu */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-2 sm:left-4 top-20 z-[60] bg-[#006A71] text-white p-2.5 sm:p-3 rounded-lg shadow-lg hover:bg-[#48A6A7] active:bg-[#005a61] transition-colors flex items-center gap-2 touch-manipulation"
        aria-label="Apri menu ricambi"
      >
        <Menu className="h-5 w-5" />
        <span className="hidden sm:inline text-sm font-medium">Menu</span>
        {(selectedCategory || selectedBrand) && (
          <span className="bg-white text-[#006A71] rounded-full px-2 py-0.5 text-xs font-bold min-w-[20px] text-center">
            {(selectedCategory ? 1 : 0) + (selectedBrand ? 1 : 0)}
          </span>
        )}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60]"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu a tendina da sinistra */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed left-0 top-0 h-full bg-white shadow-2xl z-[60] flex ${
                selectedCategory ? 'w-[90vw] sm:w-[600px] md:w-[700px]' : 'w-[85vw] sm:w-80 md:w-96 max-w-sm'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Colonna Categorie */}
              <div className={`flex-shrink-0 border-r border-gray-200 overflow-y-auto ${
                selectedCategory ? 'w-[50%]' : 'w-full'
              }`}>
                {/* Header */}
                <div className="sticky top-0 bg-[#006A71] text-white p-4 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    {selectedCategory && (
                      <button
                        onClick={handleReset}
                        className="p-1 hover:bg-[#48A6A7] rounded transition-colors"
                        aria-label="Torna indietro"
                      >
                        <ChevronRight className="h-5 w-5 rotate-180" />
                      </button>
                    )}
                    <h2 className="text-xl font-bold">Cerca Ricambi</h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-[#48A6A7] rounded transition-colors"
                    aria-label="Chiudi menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Contenuto Categorie */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#006A71] mb-3">
                    Tipo di Ricambio
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => {
                      const isSelected = selectedCategory === category;
                      return (
                        <button
                          key={category}
                          onClick={() => handleCategorySelect(category)}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#006A71] text-white'
                              : 'bg-gray-50 hover:bg-[#9ACBD0] text-gray-700'
                          }`}
                        >
                          <span className="font-medium">{category}</span>
                          {isSelected && (
                            <ChevronRight className="h-5 w-5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Colonna Brand (solo se categoria selezionata) */}
              {selectedCategory && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 w-[50%] overflow-y-auto"
                >
                  {/* Header Brand */}
                  <div className="sticky top-0 bg-[#48A6A7] text-white p-4 z-10">
                    <h3 className="text-lg font-semibold">Brand</h3>
                    <p className="text-sm opacity-90 mt-1">{selectedCategory}</p>
                  </div>

                  {/* Contenuto Brand */}
                  <div className="p-4">
                    {availableBrands.length > 0 ? (
                      <div className="space-y-2">
                        {availableBrands.map((brand) => {
                          const isSelected = selectedBrand === brand;
                          return (
                            <button
                              key={brand}
                              onClick={() => handleBrandSelect(brand)}
                              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                                isSelected
                                  ? 'bg-[#006A71] text-white font-semibold'
                                  : 'bg-gray-50 hover:bg-[#9ACBD0] text-gray-700'
                              }`}
                            >
                              {brand}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 text-sm">
                          Nessun brand disponibile per questa categoria
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

