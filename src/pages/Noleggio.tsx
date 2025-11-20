import { useState, useEffect } from 'react';
import { supabase, type Rental } from '../lib/supabase';
import { Calendar, Clock } from 'lucide-react';

export default function Noleggio() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const { data, error } = await supabase
        .from('rentals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRentals(data || []);
    } catch (error) {
      console.error('Error fetching rentals:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F2EFE7] min-h-screen">
      <div
        className="relative h-[300px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1430676/pexels-photo-1430676.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold">Noleggio</h1>
            <p className="text-xl md:text-2xl mt-4">
              Vivi il mare con le nostre imbarcazioni a noleggio
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-[#006A71] mb-6 text-center">
            Come Funziona il Noleggio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#9ACBD0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-[#006A71]" />
              </div>
              <h3 className="text-xl font-bold text-[#006A71] mb-2">1. Prenota</h3>
              <p className="text-gray-700">
                Scegli l'imbarcazione e il periodo desiderato. Contattaci per verificare la
                disponibilità.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#9ACBD0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-[#006A71]" />
              </div>
              <h3 className="text-xl font-bold text-[#006A71] mb-2">2. Ritira</h3>
              <p className="text-gray-700">
                Ritira la tua imbarcazione presso il nostro centro. Ti forniremo tutte le
                istruzioni necessarie.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#9ACBD0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-[#006A71]" />
              </div>
              <h3 className="text-xl font-bold text-[#006A71] mb-2">3. Goditi il Mare</h3>
              <p className="text-gray-700">
                Vivi la tua esperienza in totale sicurezza e riconsegna l'imbarcazione alla
                fine del periodo.
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#006A71]"></div>
          </div>
        ) : rentals.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-lg">
            <p className="text-xl text-gray-600">
              Nessuna imbarcazione disponibile al momento. Contattaci per maggiori
              informazioni.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rentals.map((rental) => (
              <div
                key={rental.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div
                  className="h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${rental.image_url})` }}
                ></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-[#006A71]">{rental.name}</h3>
                    {rental.available && (
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                        Disponibile
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 mb-4">{rental.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-[#006A71]">
                        €{rental.price_per_day.toLocaleString()}
                      </span>
                      <span className="text-gray-600 text-sm ml-1">/giorno</span>
                    </div>
                    <button className="bg-[#006A71] hover:bg-[#48A6A7] text-white px-4 py-2 rounded-lg transition-colors">
                      Prenota
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
