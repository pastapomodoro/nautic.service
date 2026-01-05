import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0088AA] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-sm text-gray-200">
              Il tuo partner di fiducia per barche, moto d'acqua e servizi nautici.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contatti</h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:+393278992159" className="hover:underline">+39 327.8992159</a>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:+393478239844" className="hover:underline">+39 347.8239844</a>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:info@nautic-service.it" className="hover:underline">info@nautic-service.it</a>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Via Venezia 9, Castelnuovo del Garda (VR)</span>
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
              <li>Lun - Sab: 8.30 - 12.30 e 14 - 18</li>
              <li>Domenica: Chiuso</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#00D9CC] mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 Nautic Service. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
}
