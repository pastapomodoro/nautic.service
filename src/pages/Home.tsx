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
          {/* Logo e Bottone insieme */}
          <div 
            className="flex flex-col items-center justify-center animate-[fadeIn_1.5s_ease-out_forwards] opacity-0"
            style={{ 
              animationDelay: '0.3s',
              paddingTop: '0px',
              paddingBottom: '0px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
              marginTop: '0px',
              marginBottom: '0px',
              boxSizing: 'content-box',
              maxHeight: '100%',
              clipPath: 'inset(0 0 0 0)',
            }}
          >
            <img
              src="/nautic.png"
              alt="Nautic Service Logo"
              className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl h-auto object-contain"
              style={{
                height: 'fit-content',
                transform: 'rotate(360deg)',
                minWidth: '672px',
                width: 'fit-content',
                overflow: 'hidden',
                borderRadius: '0px 366px 0px 0px',
                borderTopRightRadius: '366px',
              }}
            />
            {/* Bottone */}
            <div className="animate-[fadeIn_1.5s_ease-out_forwards] opacity-0 m-0" style={{ animationDelay: '0.6s' }}>
              <button
                onClick={() => onNavigate('vendita')}
                className="text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-base sm:text-lg font-semibold transition-all touch-manipulation m-0"
                style={{
                  background: 'linear-gradient(90deg, #1FA9A0 0%, #7EDB8A 100%)',
                  boxSizing: 'border-box',
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
              {/* Loghi Partner */}
              <div className="flex items-center justify-start gap-4 sm:gap-6 md:gap-8 mt-6 flex-wrap">
                <img
                  src="/loghi/logoseadoo.jpg"
                  alt="Sea-Doo Logo"
                  className="h-12 sm:h-16 md:h-20 w-auto object-contain"
                />
              </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
