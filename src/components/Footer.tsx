import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#006A71] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/nautic.png" 
                alt="Nautic Service Logo" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-sm text-gray-200">
              Il tuo partner di fiducia per barche, moto d'acqua e servizi nautici.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contatti</h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2" />
                <span>+39 123 456 7890</span>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@nauticservice.it</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Via del Mare, 123 - Italia</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Servizi</h3>
            <ul className="space-y-2 text-sm">
              <li>Vendita Barche</li>
              <li>Noleggio</li>
              <li>Ricambi</li>
              <li>Manutenzione</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Orari</h3>
            <ul className="space-y-2 text-sm">
              <li>Lun - Ven: 9:00 - 18:00</li>
              <li>Sabato: 9:00 - 13:00</li>
              <li>Domenica: Chiuso</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#48A6A7] mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 Nautic Service. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
}
