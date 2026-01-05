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
        // Usa minHeight invece di height per non restringere l'immagine
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
    <div className="bg-[#F4F7F6]">
      <div className="relative h-[500px] sm:h-[700px] md:h-[900px] overflow-hidden">
        {/* Video di sfondo */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ minWidth: '100%', minHeight: '100%' }}
        >
          <source src="/landing.mp4" type="video/mp4" />
        </video>
        
        {/* Contenuto */}
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4 z-10">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8 animate-[fadeIn_1.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.3s' }}>
            <img
              src="/nautic.png"
              alt="Nautic Service Logo"
              className="w-full max-w-4xl h-auto object-contain"
            />
          </div>
        </div>
        
        {/* Bottone in basso */}
        <div className="absolute bottom-0 left-0 right-0 w-full flex justify-center pb-8 sm:pb-12 md:pb-16 z-10">
          <div className="animate-[fadeIn_1.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.6s' }}>
            <button
              onClick={() => onNavigate('vendita')}
              className="text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-base sm:text-lg font-semibold transition-all touch-manipulation"
              style={{
                background: 'linear-gradient(90deg, #1FA9A0 0%, #7EDB8A 100%)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(90deg, #1FA9A0 0%, #7EDB8A 100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(90deg, #1FA9A0 0%, #7EDB8A 100%)';
              }}
            >
              Scopri i Nostri Prodotti
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#0E0E0E] mb-6 sm:mb-8 md:mb-12">
          I Nostri Servizi
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div
            onClick={() => onNavigate('vendita')}
            className="bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl active:shadow-lg transition-shadow cursor-pointer touch-manipulation"
          >
            <div className="bg-[#00D9CC] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Ship className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#0E0E0E]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0E0E0E] mb-2 sm:mb-3">Vendita</h3>
            <p className="text-sm sm:text-base text-[#0E0E0E]">
              Ampia selezione di barche nuove e moto d'acqua delle migliori marche.
            </p>
          </div>

          <div
            onClick={() => onNavigate('noleggio')}
            className="bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl active:shadow-lg transition-shadow cursor-pointer touch-manipulation"
          >
            <div className="bg-[#00D9CC] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Waves className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#0E0E0E]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0E0E0E] mb-2 sm:mb-3">Noleggio</h3>
            <p className="text-sm sm:text-base text-[#0E0E0E]">
              Noleggia la tua barca ideale per una giornata o una vacanza indimenticabile.
            </p>
          </div>

          <div
            onClick={() => onNavigate('ricambi')}
            className="bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl active:shadow-lg transition-shadow cursor-pointer touch-manipulation sm:col-span-2 lg:col-span-1"
          >
            <div className="bg-[#00D9CC] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Settings className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#0E0E0E]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0E0E0E] mb-2 sm:mb-3">Ricambi</h3>
            <p className="text-sm sm:text-base text-[#0E0E0E]">
              Ricambi originali e di qualità per la tua imbarcazione.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <div className="w-full order-1 md:order-1">
              <img 
                ref={imageRef}
                src="/jet-ski.jpg" 
                alt="Sea Doo Moto d'acqua" 
                className="w-full h-auto object-contain rounded-lg shadow-md"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=800';
                }}
              />
            </div>
            <div ref={textContainerRef} className="order-2 md:order-2 space-y-4 sm:space-y-5 md:space-y-6">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#0E0E0E]">
                La Nautic Service nasce nel 2003 e ha come obiettivo principale la fornitura di servizi Nautici, riparazione e vendita di Natanti, accessori, ricambi delle migliori marche.
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#0E0E0E]">
                La nostra azienda dispone di una rilevante struttura operativa, un furgone come officina mobile per fare assistenza dovunque, con sedi dotate di attrezzature specifiche. Si avvale di elevate risorse tecnico-strumentali e occupa un organico medio di 2 unità altamente specializzate che le consente di ottenere risultati di riparazione superiori alla media delle dirette concorrenti, con quotazioni competitive ed opera su tutto il territorio del Lago di Garda.
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#0E0E0E]">
                La caratteristica principale che ci contraddistingue è sicuramente l'affidabilità e la correttezza nello svolgere la nostra attività. La qualità è garantita con l'impiego di soluzioni e prodotti all'avanguardia che consentono di ottenere lavori sicuri e funzionali.
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#0E0E0E]">
                Alla competenza professionale si aggiunge un'adeguata conoscenza ed esperienza in tema normativo, garantendo i più elevati standard di qualità richiesti nella riparazione di ogni tipo di battello e motori.
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#0E0E0E] mb-6">
                Rappresentiamo i marchi principali del settore: Evinrude, Selva, Sea Doo, Joker Boat e Saver.
              </p>
              
              {/* Loghi Partner */}
              <div className="flex items-center justify-start gap-4 sm:gap-6 md:gap-8 mt-6 flex-wrap">
                <img
                  src="/loghi/logocanam.png"
                  alt="Can-Am Logo"
                  className="h-12 sm:h-16 md:h-20 w-auto object-contain"
                />
                <img
                  src="/loghi/logoseadoo.jpg"
                  alt="Sea-Doo Logo"
                  className="h-12 sm:h-16 md:h-20 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
