import { useState, useEffect } from 'react';
import ProductModal from '../components/ProductModal';

type Product = {
  id: string;
  name: string;
  year: string;
  description: string;
  price: string;
  category: string;
  image: string;
};

// Funzione per ottenere il nome del file immagine basato sul nome del prodotto
const getImagePath = (productName: string): string => {
  const imageMap: Record<string, string> = {
    'Spark': 'spark.avif',
    'Spark Trixx': 'spark trixx.avif',
    'GTI': 'gti.avif',
    'GTI SE': 'gti se.avif',
    'GTX': 'gtx.avif',
    'GTX Limited': 'gtx limited.avif',
    'Explorer Pro': 'explorer pro.avif',
    'GTR': 'gtr.avif',
    'RXT-X': 'rxt-x.avif',
    'RXP-X': 'rxp-x.avif',
    'GTR-X': 'gtr-x.avif',
    'Wake Pro': 'wake pro.avif',
    'FishPro Sport': 'fish pro sport.avif'
  };
  
  return `/moto/${imageMap[productName] || 'spark.avif'}`;
};

// Funzione per ottenere il link Sea-Doo basato sul nome del prodotto
const getSeaDooLink = (productName: string): string => {
  const linkMap: Record<string, string> = {
    'Spark': 'https://sea-doo.brp.com/it/it/modello/motos-d-acqua/rec-lite/spark.html',
    'Spark Trixx': 'https://sea-doo.brp.com/it/it/modello/motos-d-acqua/rec-lite/spark-trixx.html',
    'GTI': 'https://sea-doo.brp.com/it/it/modello/motos-d-acqua/divertimento/gti.html',
    'GTI SE': 'https://sea-doo.brp.com/it/it/modello/motos-d-acqua/divertimento/gti-se.html',
    'GTX': 'https://sea-doo.brp.com/it/it/modello/motos-d-acqua/turismo/gtx.html',
    'GTX Limited': 'https://sea-doo.brp.com/it/it/modello/motos-d-acqua/turismo/gtx-limited.html',
    'Explorer Pro': 'https://sea-doo.brp.com/it/it/modello/motos-d-acqua/turismo/explorer-pro.html',
    'GTR': 'https://sea-doo.brp.com/it/it/modello/motos-d-acqua/prestazioni/gtr.html',
    'RXT-X': 'https://sea-doo.brp.com/it/it/modello/motos-d-acqua/prestazioni/rxt-x.html',
    'RXP-X': 'https://sea-doo.brp.com/it/it/modello/motos-d-acqua/prestazioni/rxp-x.html',
    'GTR-X': 'https://sea-doo.brp.com/it/it/modello/motos-d-acqua/prestazioni/gtr-x.html',
    'Wake Pro': 'https://sea-doo.brp.com/it/it/modello/motos-d-acqua/sport-da-traino/wake-pro.html',
    'FishPro Sport': 'https://sea-doo.brp.com/it/it/modello.html' // Link generico se non trovato
  };
  
  return linkMap[productName] || 'https://sea-doo.brp.com/it/it/modello.html';
};

type Category = {
  id: string;
  name: string;
  description: string;
};

type VenditaProps = {
  onNavigate: (page: string) => void;
};

const categories: Category[] = [
  {
    id: 'divertimento',
    name: 'Divertimento',
    description: 'PWC versatili ed efficienti, altamente adattabili a qualsiasi avventura. Il modo perfetto per far divertire tutto l\'equipaggio con una serie di intrattenimenti in acqua. Tantissimo spazio per riporre i bagagli e accessoriarsi facilmente per gli sport da traino e per il divertimento di tutto il giorno.'
  },
  {
    id: 'turismo',
    name: 'Turismo',
    description: 'Espandi i tuoi orizzonti. Le moto d\'acqua Sea-Doo Touring offrono una stabilità leader del settore abbinata a comfort e comodità. È l\'imbarcazione da crociera per 2-3 persone, ideale per le avventure di tutto il giorno.'
  },
  {
    id: 'prestazioni',
    name: 'Prestazioni',
    description: 'Scopri le caratteristiche ispirate alle gare per dominare un giro di boa, nonché la tecnologia avanzata e la convenienza per le esplorazioni in mare aperto. Ciascun modello Performance offre opzioni di motori Rotax dinamici per aggiungere una dose extra di adrenalina.'
  },
  {
    id: 'sport-da-traino',
    name: 'Sport da traino',
    description: 'I modello Sea-Doo Wake Pro sono costruiti appositamente per i tuoi sport da traino preferiti. Dotate di porta tavola, pilone per gli sci e funzioni esclusive come la modalità Sci, sono l\'anima della festa con tanta potenza.'
  },
  {
    id: 'pesca-sportiva',
    name: 'Pesca sportiva',
    description: 'Costruita pensando agli appassionati di pesca, la famiglia di moto d\'acqua Sea-Doo Fish Pro ti permette di essere più vicino che mai all\'azione e include refrigeratori per il pescato, portacanne, Garmin Fish Finder e molto altro.'
  }
];

const products: Product[] = [
  // Divertimento
  {
    id: 'spark-2026',
    name: 'Spark',
    year: '2026',
    description: 'Leggera, divertente e perfetta per gite spontanee. Spark è facile da trainare ed è costruita per portare divertimento ogni volta che si entra in acqua.',
    price: '8.999',
    category: 'divertimento',
    image: getImagePath('Spark')
  },
  {
    id: 'spark-trixx-2026',
    name: 'Spark Trixx',
    year: '2026',
    description: 'Per gli amanti del brivido che vogliono distinguersi, Spark Trixx 2026 porta il divertimento a un livello superiore. Attiva la modalità Trixx e mostra le tue acrobazie acquatiche come un professionista. Basta provarla per capire l\'entusiasmo.',
    price: '11.699',
    category: 'divertimento',
    image: getImagePath('Spark Trixx')
  },
  // Turismo
  {
    id: 'gti-2026',
    name: 'GTI',
    year: '2026',
    description: 'La piattaforma GTI 2026 apre un mondo di possibilità sull\'acqua. Sia che tu cerchi azione, relax o una via di mezzo fra i due, GTI ti regala ogni volta giornate indimenticabili.',
    price: '15.199',
    category: 'turismo',
    image: getImagePath('GTI')
  },
  {
    id: 'gti-se-2026',
    name: 'GTI SE',
    year: '2026',
    description: 'Con la piattaforma da bagno più grande del settore, 2026 GTI SE è pronta per ogni destinazione del tuo viaggio. Comfort e avventura vanno di pari passo ovunque l\'acqua ti conduca.',
    price: '17.899',
    category: 'turismo',
    image: getImagePath('GTI SE')
  },
  {
    id: 'gtx-2026',
    name: 'GTX',
    year: '2026',
    description: 'Per il 2026, GTX continua a mantenere la propria reputazione: comfort di alto livello, prestazioni raffinate e uno stile audace che rende ogni uscita una fuga nel fine settimana.',
    price: '19.799',
    category: 'turismo',
    image: getImagePath('GTX')
  },
  {
    id: 'gtx-limited-2026',
    name: 'GTX Limited',
    year: '2026',
    description: 'Ridefinizione del lusso in acqua. 2026 GTX Limited unisce 325 hp, funzioni intelligenti e comfort di alto livello per offrire un\'esperienza di PWC touring di altissimo livello.',
    price: '30.999',
    category: 'turismo',
    image: getImagePath('GTX Limited')
  },
  {
    id: 'explorer-pro-2026',
    name: 'Explorer Pro',
    year: '2026',
    description: 'La prima PWC del settore veramente creata per l\'avventura. Piattaforma incredibilmente stabile e possibilità di scegliere tra un motore da 170 o 230 hp con capacità di lunga percorrenza. Le caratteristiche pensate per l\'avventura sono create attorno a comodità, comfort e tranquillità per ogni spedizione.',
    price: '24.899',
    category: 'turismo',
    image: getImagePath('Explorer Pro')
  },
  // Prestazioni
  {
    id: 'gtr-2026',
    name: 'GTR',
    year: '2026',
    description: 'Potenza straordinaria e valore eccezionale. La 2026 GTR offre un\'accelerazione sovralimentata e un controllo divertente a un prezzo che rende la guida performante più accessibile che mai.',
    price: '19.499',
    category: 'prestazioni',
    image: getImagePath('GTR')
  },
  {
    id: 'rxt-x-2026',
    name: 'RXT-X',
    year: '2026',
    description: 'RXT-X 2026 unisce prestazioni adrenaliniche alla sicurezza e alla praticità di tutti i giorni. È la migliore moto d\'acqua offshore per piloti che desiderano velocità e controllo in tutte le condizioni',
    price: '29.499',
    category: 'prestazioni',
    image: getImagePath('RXT-X')
  },
  {
    id: 'rxp-x-2026',
    name: 'RXP-X',
    year: '2026',
    description: 'Creata per i piloti alla ricerca delle massime prestazioni. RXP-X 2026 offre potenza collaudata in gara e controllo precisissimo per superare i tuoi limiti a ogni uscita.',
    price: '27.199',
    category: 'prestazioni',
    image: getImagePath('RXP-X')
  },
  {
    id: 'gtr-x-2026',
    name: 'GTR-X',
    year: '2026',
    description: 'GTR-X 300 è una vera e propria PWC ad alte prestazioni creata per i piloti che desiderano potenza, precisione e controllo. Con 300 hp di potenza Rotax sovralimentata e una posizione di guida da competizione, trasforma ogni uscita in un\'esperienza adrenalinica.',
    price: '23.599',
    category: 'prestazioni',
    image: getImagePath('GTR-X')
  },
  // Sport da traino
  {
    id: 'wake-pro-2026',
    name: 'Wake Pro',
    year: '2026',
    description: 'Il modello Wake Pro offre la guida più stabile del settore per gli sport da traino. Con la massima potenza e spazio extra per preparare la tua uscita successiva, questo modello garantisce un\'esperienza senza pari per gli sport acquatici.',
    price: '24.799',
    category: 'sport-da-traino',
    image: getImagePath('Wake Pro')
  },
  // Pesca sportiva
  {
    id: 'fishpro-sport-2026',
    name: 'FishPro Sport',
    year: '2026',
    description: 'Una combinazione di entusiasmo, versatilità e passione in un unico pacchetto. Esplora posti prima irraggiungibili per le tradizionali imbarcazioni da pesca e goditi l\'adattabilità di una delle imbarcazioni più versatili al mondo.',
    price: '22.299',
    category: 'pesca-sportiva',
    image: getImagePath('FishPro Sport')
  }
];

const venditaCategories = [
  { id: 'divertimento', label: 'Divertimento' },
  { id: 'turismo', label: 'Turismo' },
  { id: 'prestazioni', label: 'Prestazioni' },
  { id: 'sport-da-traino', label: 'Sport da traino' },
  { id: 'pesca-sportiva', label: 'Pesca sportiva' },
];

export default function Vendita({ onNavigate }: VenditaProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('divertimento');

  const getProductsByCategory = (categoryId: string) => {
    return products.filter(p => p.category === categoryId);
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Rileva quale categoria è visibile durante lo scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset per il menu sticky

      for (let i = venditaCategories.length - 1; i >= 0; i--) {
        const element = document.getElementById(`category-${venditaCategories[i].id}`);
        if (element) {
          const elementTop = element.offsetTop;
          if (scrollPosition >= elementTop) {
            setActiveCategory(venditaCategories[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Chiama una volta all'inizio per impostare la categoria iniziale

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        {/* Menu delle categorie */}
        <div className="sticky top-20 z-40 mb-8 bg-white rounded-lg shadow-md border-2 border-gray-200 p-4 overflow-x-auto">
          <div className="flex gap-3 md:gap-4 justify-center md:justify-start">
            {venditaCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'text-[#00D9CC]'
                    : 'text-[#0E0E0E] hover:text-[#00D9CC]'
                }`}
              >
                {category.label}
                {activeCategory === category.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00D9CC]"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {categories.map((category) => {
          const categoryProducts = getProductsByCategory(category.id);
          
          return (
            <div key={category.id} id={`category-${category.id}`} className="mb-12 md:mb-16 scroll-mt-20">
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0E0E0E]">{category.name}</h2>
              </div>
              
              <p className="text-lg text-[#0E0E0E] mb-8 leading-relaxed max-w-4xl">
                {category.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {categoryProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md border-2 border-gray-200 overflow-hidden flex flex-col cursor-pointer hover:shadow-xl hover:border-[#00D9CC] transition-all duration-300"
                    onClick={() => {
                      const seaDooLink = getSeaDooLink(product.name);
                      window.open(seaDooLink, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    <div className="h-64 bg-gray-100 overflow-hidden flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={`${product.name} ${product.year}`}
                        className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=800';
                        }}
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-2xl font-bold text-[#0E0E0E]">{product.name}</h3>
                          <span className="text-sm text-gray-500 font-medium">{product.year}</span>
                        </div>
                        <h4 className="text-xl font-semibold text-[#0E0E0E] mb-3">{product.name}</h4>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-xl font-bold text-[#0E0E0E]">Da {product.price} €</span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProduct(product);
                              setIsModalOpen(true);
                            }}
                            className="w-6 h-6 rounded-full border-2 border-[#00D9CC] flex items-center justify-center hover:bg-[#00D9CC] transition-colors"
                            aria-label="Informazioni prodotto"
                            title="Vedi dettagli"
                          >
                            <span className="text-xs text-[#00D9CC] hover:text-white font-bold">i</span>
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed flex-grow line-clamp-3">
                        {product.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="text-center bg-gradient-to-r from-[#00D9CC] to-[#9BE870] rounded-lg p-6 sm:p-8 text-white mt-12">
          <h3 className="text-xl sm:text-2xl font-bold mb-2">Non Trovi Quello che Cerchi?</h3>
          <p className="mb-4 sm:mb-6 text-sm sm:text-base">Contattaci per una consulenza personalizzata o per ordini speciali</p>
          <button
            onClick={() => onNavigate('contatti')}
            className="bg-white text-[#0E0E0E] px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#F4F7F6] active:bg-[#9BE870]/20 transition-colors touch-manipulation"
          >
            Contattaci
          </button>
        </div>
      </div>
      
      {selectedProduct && (
        <ProductModal
          product={{
            id: selectedProduct.id,
            name: `${selectedProduct.name} ${selectedProduct.year}`,
            description: selectedProduct.description,
            price: parseFloat(selectedProduct.price.replace('.', '')),
            image_url: selectedProduct.image,
            category: selectedProduct.category,
            in_stock: true
          }}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}
