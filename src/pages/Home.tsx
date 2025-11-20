import { Ship, Waves, Settings } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type HomeProps = {
  onNavigate: (page: string) => void;
};

export default function Home({ onNavigate }: HomeProps) {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageHeight, setImageHeight] = useState<string>('auto');

  useEffect(() => {
    const updateImageHeight = () => {
      if (textContainerRef.current && imageRef.current) {
        const textHeight = textContainerRef.current.offsetHeight;
        setImageHeight(`${textHeight}px`);
      }
    };

    // Aspetta che il DOM sia completamente renderizzato
    const timer = setTimeout(() => {
      updateImageHeight();
    }, 100);

    window.addEventListener('resize', updateImageHeight);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateImageHeight);
    };
  }, []);
  return (
    <div className="bg-[#F2EFE7]">
      <div
        className="relative h-[400px] sm:h-[500px] md:h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div className="flex flex-col items-center max-w-2xl">
            <div className="flex items-center justify-center mb-6 sm:mb-8">
              <img 
                src="/nautic.png" 
                alt="Nautic Service Logo" 
                className="h-32 sm:h-48 md:h-64 lg:h-80 w-auto"
              />
            </div>
            <button
              onClick={() => onNavigate('vendita')}
              className="bg-[#006A71] hover:bg-[#48A6A7] active:bg-[#005a61] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-base sm:text-lg font-semibold transition-colors touch-manipulation"
            >
              Scopri i Nostri Prodotti
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#006A71] mb-6 sm:mb-8 md:mb-12">
          I Nostri Servizi
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div
            onClick={() => onNavigate('vendita')}
            className="bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl active:shadow-lg transition-shadow cursor-pointer touch-manipulation"
          >
            <div className="bg-[#9ACBD0] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Ship className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#006A71]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#006A71] mb-2 sm:mb-3">Vendita</h3>
            <p className="text-sm sm:text-base text-gray-700">
              Ampia selezione di barche nuove e moto d'acqua delle migliori marche.
            </p>
          </div>

          <div
            onClick={() => onNavigate('noleggio')}
            className="bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl active:shadow-lg transition-shadow cursor-pointer touch-manipulation"
          >
            <div className="bg-[#9ACBD0] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Waves className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#006A71]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#006A71] mb-2 sm:mb-3">Noleggio</h3>
            <p className="text-sm sm:text-base text-gray-700">
              Noleggia la tua barca ideale per una giornata o una vacanza indimenticabile.
            </p>
          </div>

          <div
            onClick={() => onNavigate('ricambi')}
            className="bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl active:shadow-lg transition-shadow cursor-pointer touch-manipulation sm:col-span-2 lg:col-span-1"
          >
            <div className="bg-[#9ACBD0] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Settings className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#006A71]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#006A71] mb-2 sm:mb-3">Ricambi</h3>
            <p className="text-sm sm:text-base text-gray-700">
              Ricambi originali e di qualità per la tua imbarcazione.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            <div className="w-full order-2 md:order-1">
              <img 
                ref={imageRef}
                src="/jet-ski.jpg" 
                alt="Sea Doo Moto d'acqua" 
                className="w-full h-auto object-cover rounded-lg"
                style={{ height: imageHeight }}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=800';
                }}
              />
            </div>
            <div ref={textContainerRef} className="order-1 md:order-2">
              <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed text-gray-700">
                La Nautic Service nasce nel 2003 e ha come obiettivo principale la fornitura di servizi Nautici, riparazione e vendita di Natanti, accessori, ricambi delle migliori marche.
              </p>
              <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed text-gray-700">
                La nostra azienda, dispone di una rilevante struttura operativa, un furgone come officina mobile per fare assistenza dovunque, con sedi dotate di attrezzature specifiche, si avvale di elevate risorse tecnico-strumentali e occupa un organico medio di 2 unità altamente specializzate che le consente di ottenere risultati di riparazione in ogni punto esso sia superiori alla media delle dirette concorrenti, con quotazioni competitive ed opera su tutto il territorio del Lago di Garda.
              </p>
              <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed text-gray-700">
                La caratteristica principale che ci contraddistingue è sicuramente l'affidabilità e la correttezza nello svolgere la nostra attività.
              </p>
              <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed text-gray-700">
                La qualità è garantita con l'impiego di soluzioni e prodotti all'avanguardia che consentono di ottenere nello stesso tempo lavori sicuri e funzionali.
              </p>
              <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed text-gray-700">
                Alla competenza professionale si aggiunge un'adeguata conoscenza ed esperienza in tema normativo, garantendo i più elevati standard di qualità richiesti nella riparazione di ogni tipo di battello e motori, implementandoli con Sistemi di Qualità secondo le norme vigenti.
              </p>
              <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed text-gray-700">
                Il risultato è un'azienda che interviene con serietà e professionalità garantendo affidabilità per tutti i suoi prodotti e tutti i suoi servizi.
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700">
                Che sono allestimenti personalizzati per enti publici e privati, riparazione e vendita di natanti, motori, accessori, ricambi di tutte le marche. Rapresentiamo i marchi principali del settore: Evinrude, Selva, Sea Doo, Joker Boat e Saver
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
