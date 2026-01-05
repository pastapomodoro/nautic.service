import { MapPin, Phone, Mail, Clock, User, Facebook, Instagram } from 'lucide-react';

export default function Contatti() {
  return (
    <div className="bg-[#F4F7F6]">
      <div
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold">Contatti</h1>
            <p className="text-xl md:text-2xl mt-4">Siamo qui per aiutarti</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-4xl font-bold text-[#0E0E0E] mb-6">Contattaci</h2>
            <p className="text-lg text-[#0E0E0E] mb-8 leading-relaxed">
              Hai domande sui nostri prodotti o servizi? Hai bisogno di assistenza tecnica?
              Non esitare a contattarci. Il nostro team è sempre pronto ad aiutarti con
              professionalità e competenza.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-[#00D9CC] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-[#0E0E0E]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0E0E0E] mb-2">Sede</h3>
                  <p className="text-[#0E0E0E]">
                    Via Venezia 9<br />
                    Castelnuovo del Garda (Vr)
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#00D9CC] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-6 w-6 text-[#0E0E0E]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0E0E0E] mb-2">Referente</h3>
                  <p className="text-[#0E0E0E]">
                    <a href="mailto:manuel@nautic-service.it" className="hover:underline">manuel@nautic-service.it</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#00D9CC] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-[#0E0E0E]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0E0E0E] mb-2">Email</h3>
                  <p className="text-[#0E0E0E] mb-2">
                    <a href="mailto:info@nautic-service.it" className="hover:underline">info@nautic-service.it</a>
                    <span className="text-[#6B6F72] text-sm block mt-1">Informazioni</span>
                  </p>
                  <p className="text-[#0E0E0E]">
                    <a href="mailto:preventivo@nautic-service.it" className="hover:underline">preventivo@nautic-service.it</a>
                    <span className="text-[#6B6F72] text-sm block mt-1">Richiedi Preventivo</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#00D9CC] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-[#0E0E0E]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0E0E0E] mb-2">Telefono</h3>
                  <p className="text-[#0E0E0E] mb-2">
                    <a href="tel:+390456450847" className="hover:underline">045 645 0847</a>
                    <span className="text-[#6B6F72] text-sm block mt-1">Fisso</span>
                  </p>
                  <p className="text-[#0E0E0E] mb-2">
                    <a href="tel:+393278992159" className="hover:underline">+39 327.8992159</a>
                    <span className="text-[#6B6F72] text-sm block mt-1">Manuel</span>
                  </p>
                  <p className="text-[#0E0E0E]">
                    <a href="tel:+393478239844" className="hover:underline">+39 347.8239844</a>
                    <span className="text-[#6B6F72] text-sm block mt-1">Domenico</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#00D9CC] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-[#0E0E0E]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0E0E0E] mb-2">Orari di Apertura</h3>
                  <div className="text-[#0E0E0E] space-y-1">
                    <p>Lunedì – Sabato: 8.30 – 12.30 e 14 – 18</p>
                    <p>Domenica: Chiuso</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center min-h-[400px]">
              <h3 className="text-2xl font-bold text-[#0E0E0E] mb-6 text-center">Contattaci su WhatsApp</h3>
              <p className="text-[#0E0E0E] mb-8 text-center">
                Scrivici direttamente su WhatsApp per una risposta rapida
              </p>
              <a
                href="https://wa.me/393278992159"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="inline-block transition-transform hover:scale-105"
              >
                <img 
                  alt="Chat on WhatsApp" 
                  src="/whatsapp.png"
                  className="w-auto h-auto max-w-full"
                />
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold text-[#0E0E0E] mb-6 text-center">Seguici sui Social</h3>
              <div className="flex gap-6 items-center justify-center">
                <a
                  href="https://www.facebook.com/nauticservicelagodigarda"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visita la nostra pagina Facebook"
                  className="bg-[#1877F2] hover:bg-[#166FE5] active:bg-[#166FE5] text-white p-4 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-md"
                >
                  <Facebook className="h-8 w-8" />
                </a>
                <a
                  href="https://www.instagram.com/nauticservice_/?hl=it"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visita il nostro profilo Instagram"
                  className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] hover:opacity-90 active:opacity-90 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-md"
                >
                  <Instagram className="h-8 w-8" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="w-full h-96">
            <iframe
              src="https://www.google.com/maps?q=Via+Venezia+9,+37014+Cavalcaselle+VR&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
              title="Mappa - Via Venezia 9, Castelnuovo del Garda"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
