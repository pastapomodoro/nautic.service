import { useState, useEffect } from 'react';
import { ChevronRight, Filter, X } from 'lucide-react';

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

export default function RicambiFilterMenu({ products, onFilterChange }: RicambiFilterMenuProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  // Estrai categorie uniche - gestisce sia "Ricambi - X" che "X"
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

  // Estrai tutte le categorie uniche dai prodotti
  const categories = Array.from(
    new Set(products.map((p) => getDisplayCategory(p.category || 'Altri')))
  ).sort();

  // Estrai tutti i brand disponibili da tutti i prodotti
  const getAllBrands = (): string[] => {
    const brandSet = new Set<string>();
    products.forEach((product) => {
      const brands = extractBrands(product.name);
      brands.forEach((brand) => brandSet.add(brand));
    });
    return Array.from(brandSet).sort();
  };

  // Estrai categorie per brand selezionato
  const getCategoriesForBrand = (brand: string | null): string[] => {
    if (!brand) return categories;
    
    const categorySet = new Set<string>();
    products.forEach((product) => {
      const productBrands = extractBrands(product.name);
      if (productBrands.includes(brand)) {
        const displayCategory = getDisplayCategory(product.category || 'Altri');
        categorySet.add(displayCategory);
      }
    });
    
    return Array.from(categorySet).sort();
  };

  // Estrai brand per categoria selezionata
  const getBrandsForCategory = (category: string | null): string[] => {
    if (!category) return getAllBrands();
    
    const brandSet = new Set<string>();
    products.forEach((product) => {
      const displayCategory = getDisplayCategory(product.category || 'Altri');
      if (displayCategory === category) {
        const brands = extractBrands(product.name);
        brands.forEach((brand) => brandSet.add(brand));
      }
    });
    
    return Array.from(brandSet).sort();
  };

  const availableBrands = selectedCategory 
    ? getBrandsForCategory(selectedCategory) 
    : getAllBrands();
  
  const availableCategories = selectedBrand 
    ? getCategoriesForBrand(selectedBrand) 
    : categories;

  // Reset categoria quando cambia brand (opzionale)
  useEffect(() => {
    if (selectedBrand && selectedCategory) {
      // Verifica se la categoria è ancora valida per il brand selezionato
      const validCategories = getCategoriesForBrand(selectedBrand);
      if (!validCategories.includes(selectedCategory)) {
        setSelectedCategory(null);
      }
    }
  }, [selectedBrand]);

  // Reset brand quando cambia categoria (opzionale)
  useEffect(() => {
    if (selectedCategory && selectedBrand) {
      // Verifica se il brand è ancora valido per la categoria selezionata
      const validBrands = getBrandsForCategory(selectedCategory);
      if (!validBrands.includes(selectedBrand)) {
        setSelectedBrand(null);
      }
    }
  }, [selectedCategory]);

  // Notifica i cambiamenti al parent
  useEffect(() => {
    onFilterChange(selectedCategory, selectedBrand);
  }, [selectedCategory, selectedBrand, onFilterChange]);

  const handleBrandSelect = (brand: string) => {
    if (selectedBrand === brand) {
      setSelectedBrand(null);
    } else {
      setSelectedBrand(brand);
    }
  };

  const handleCategorySelect = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
  };

  const hasActiveFilters = selectedCategory || selectedBrand;

  return (
    <>
      {/* Mobile: Bottone per aprire/chiudere il menu */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full px-4 py-3 flex items-center justify-between bg-[#00D9CC] text-[#0E0E0E] font-semibold hover:bg-[#1FA9A0] transition-colors"
          aria-label="Toggle menu filtri"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <span>Filtri</span>
            {hasActiveFilters && (
              <span className="bg-[#0E0E0E] text-white rounded-full px-2 py-0.5 text-xs font-bold min-w-[20px] text-center">
                {(selectedCategory ? 1 : 0) + (selectedBrand ? 1 : 0)}
              </span>
            )}
          </div>
          <ChevronRight
            className={`h-5 w-5 transition-transform ${isMobileMenuOpen ? 'rotate-90' : ''}`}
          />
        </button>
      </div>

      {/* Menu Sidebar - Desktop sempre visibile, Mobile collassabile */}
      <aside
        className={`
          bg-white border-r border-gray-200 overflow-y-auto
          lg:sticky lg:top-0 lg:h-screen
          ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}
          w-full lg:w-80 xl:w-96
          z-30
        `}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#00D9CC] to-[#1FA9A0] text-[#0E0E0E] p-4 lg:p-6 z-10 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl lg:text-2xl font-bold flex items-center gap-2">
              <Filter className="h-5 w-5 lg:h-6 lg:w-6" />
              Filtri Ricambi
            </h2>
            {hasActiveFilters && (
              <button
                onClick={handleReset}
                className="text-xs lg:text-sm px-2 py-1 bg-white/20 hover:bg-white/30 rounded transition-colors font-medium"
                aria-label="Reset filtri"
              >
                Reset
              </button>
            )}
          </div>
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedBrand && (
                <span className="bg-white/90 text-[#0E0E0E] px-2 py-1 rounded text-xs font-semibold">
                  {selectedBrand}
                </span>
              )}
              {selectedCategory && (
                <span className="bg-white/90 text-[#0E0E0E] px-2 py-1 rounded text-xs font-semibold">
                  {selectedCategory}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Sezione Brand - Prima */}
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <h3 className="text-sm lg:text-base font-semibold text-[#0E0E0E] uppercase tracking-wide">
              Brand
            </h3>
            {selectedCategory && (
              <span className="text-xs text-gray-500">
                {selectedCategory}
              </span>
            )}
          </div>
          
          {availableBrands.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {availableBrands.map((brand) => {
                const isSelected = selectedBrand === brand;
                return (
                  <button
                    key={brand}
                    onClick={() => handleBrandSelect(brand)}
                    className={`
                      px-3 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all
                      ${isSelected
                        ? 'bg-[#00D9CC] text-[#0E0E0E] shadow-md font-semibold'
                        : 'bg-gray-100 hover:bg-[#00D9CC]/30 text-[#0E0E0E] hover:shadow-sm'
                      }
                    `}
                  >
                    {brand}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-[#6B6F72] text-xs lg:text-sm">
                {selectedCategory 
                  ? 'Nessun brand disponibile per questa categoria'
                  : 'Nessun brand trovato'}
              </p>
            </div>
          )}
        </div>

        {/* Contenuto Categorie - Dopo */}
        <div className="p-4 lg:p-6">
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <h3 className="text-sm lg:text-base font-semibold text-[#0E0E0E] uppercase tracking-wide">
              Tipo di Ricambio
            </h3>
            {selectedBrand && (
              <span className="text-xs text-gray-500">
                {selectedBrand}
              </span>
            )}
          </div>
          <div className="space-y-2">
            {availableCategories.length > 0 ? (
              availableCategories.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`
                      w-full text-left px-4 py-2.5 rounded-lg transition-all flex items-center justify-between
                      ${isSelected
                        ? 'bg-[#00D9CC] text-[#0E0E0E] font-semibold shadow-md'
                        : 'bg-gray-50 hover:bg-[#00D9CC]/20 text-[#0E0E0E] hover:shadow-sm'
                      }
                    `}
                  >
                    <span className="font-medium text-sm lg:text-base">{category}</span>
                    {isSelected && (
                      <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="text-center py-4">
                <p className="text-[#6B6F72] text-xs lg:text-sm">
                  {selectedBrand 
                    ? 'Nessuna categoria disponibile per questo brand'
                    : 'Nessuna categoria trovata'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info footer */}
        {!selectedBrand && !selectedCategory && (
          <div className="border-t border-gray-200 p-4 lg:p-6 mt-auto">
            <p className="text-xs text-gray-500 text-center">
              Seleziona brand e categoria per filtrare i ricambi
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
