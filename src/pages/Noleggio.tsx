export default function Noleggio() {

  return (
    <div className="bg-[#F4F7F6] min-h-screen">
      <div
        className="relative h-[300px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1430676/pexels-photo-1430676.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold">Noleggio</h1>
            <p className="text-xl md:text-2xl mt-4">
              Vivi il mare con le nostre imbarcazioni a noleggio
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0E0E0E] mb-8 text-center">
            Noleggio Barche Lago di Garda
          </h2>
          
          <div className="space-y-6 mb-8">
            <p className="text-base sm:text-lg md:text-xl text-[#0E0E0E] leading-relaxed">
              Per il servizio noleggio di barche, gommoni e moto d'acqua per la stagione 2025, Nautic-Service si appoggia al portale:
            </p>
            
            <div className="flex justify-center my-8">
              <img
                src="/rent-booking.png"
                alt="Rent Booking"
                className="max-w-full h-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            
            <div className="bg-[#00D9CC]/10 border-l-4 border-[#00D9CC] p-4 sm:p-6 rounded-lg">
              <p className="text-base sm:text-lg text-[#0E0E0E] leading-relaxed">
                In fase di prenotazione inserendo il <strong className="font-bold text-[#00D9CC]">CODICE SCONTO: MANUEL</strong> potrete usufruire del <strong className="font-bold">5% di sconto complessivo</strong>.
              </p>
            </div>
            
            <p className="text-base sm:text-lg text-[#0E0E0E] leading-relaxed text-center">
              Per accedere alla prenotazione cliccate sul bottone qui sotto:
            </p>
          </div>
          
          <div className="flex justify-center mt-8">
            <a
              href="https://www.rentbooking.it/it/prenota/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <button className="bg-[#00D9CC] hover:bg-[#1FA9A0] active:bg-[#1FA9A0] text-[#0E0E0E] px-8 sm:px-12 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 touch-manipulation">
                Clicca qui per noleggiare
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
