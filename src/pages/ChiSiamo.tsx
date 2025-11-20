import { Award, Users, Target, Heart } from 'lucide-react';

export default function ChiSiamo() {
  return (
    <div className="bg-[#F2EFE7]">
      <div
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold">Chi Siamo</h1>
            <p className="text-xl md:text-2xl mt-4">La nostra storia, i nostri valori</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-4xl font-bold text-[#006A71] mb-6">La Nostra Storia</h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Nautic Service nasce nel 2010 dalla passione per il mare e dalla volontà di
              offrire un servizio completo e professionale nel settore nautico. Quello che è
              iniziato come un piccolo punto vendita è cresciuto fino a diventare un punto di
              riferimento nella zona.
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Nel corso degli anni abbiamo ampliato la nostra offerta, includendo vendita,
              noleggio, assistenza tecnica e una vasta gamma di accessori. Il nostro successo
              si basa sulla fiducia che i nostri clienti ripongono in noi, anno dopo anno.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Oggi siamo orgogliosi di essere partner ufficiali dei migliori marchi del
              settore e di contare su un team di professionisti appassionati e competenti.
            </p>
          </div>

          <div
            className="h-[500px] bg-cover bg-center rounded-lg shadow-lg"
            style={{
              backgroundImage:
                'url(https://images.pexels.com/photos/2506900/pexels-photo-2506900.jpeg?auto=compress&cs=tinysrgb&w=800)',
            }}
          ></div>
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-[#006A71] mb-12">
            I Nostri Valori
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="bg-[#9ACBD0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-[#006A71]" />
              </div>
              <h3 className="text-xl font-bold text-[#006A71] mb-3">Qualità</h3>
              <p className="text-gray-700">
                Selezioniamo solo i migliori prodotti e offriamo servizi di alta qualità.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="bg-[#9ACBD0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[#006A71]" />
              </div>
              <h3 className="text-xl font-bold text-[#006A71] mb-3">Professionalità</h3>
              <p className="text-gray-700">
                Un team esperto e sempre aggiornato, pronto ad assisterti in ogni esigenza.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="bg-[#9ACBD0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-[#006A71]" />
              </div>
              <h3 className="text-xl font-bold text-[#006A71] mb-3">Trasparenza</h3>
              <p className="text-gray-700">
                Chiarezza nei prezzi e nelle condizioni, per un rapporto basato sulla fiducia.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="bg-[#9ACBD0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-[#006A71]" />
              </div>
              <h3 className="text-xl font-bold text-[#006A71] mb-3">Passione</h3>
              <p className="text-gray-700">
                Amiamo il nostro lavoro e mettiamo il cuore in tutto ciò che facciamo.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-12">
          <h2 className="text-4xl font-bold text-center text-[#006A71] mb-8">Il Nostro Team</h2>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
            Il nostro punto di forza è il team: professionisti qualificati con anni di
            esperienza nel settore nautico, sempre pronti ad offrire consulenza personalizzata
            e assistenza completa. Dalla vendita alla post-vendita, ci prendiamo cura di te e
            della tua imbarcazione.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div
                className="w-48 h-48 mx-auto bg-cover bg-center rounded-full mb-4 shadow-lg"
                style={{
                  backgroundImage:
                    'url(https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400)',
                }}
              ></div>
              <h3 className="text-xl font-bold text-[#006A71]">Marco Rossi</h3>
              <p className="text-gray-600">Fondatore & CEO</p>
            </div>

            <div className="text-center">
              <div
                className="w-48 h-48 mx-auto bg-cover bg-center rounded-full mb-4 shadow-lg"
                style={{
                  backgroundImage:
                    'url(https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400)',
                }}
              ></div>
              <h3 className="text-xl font-bold text-[#006A71]">Laura Bianchi</h3>
              <p className="text-gray-600">Responsabile Vendite</p>
            </div>

            <div className="text-center">
              <div
                className="w-48 h-48 mx-auto bg-cover bg-center rounded-full mb-4 shadow-lg"
                style={{
                  backgroundImage:
                    'url(https://images.pexels.com/photos/2092390/pexels-photo-2092390.jpeg?auto=compress&cs=tinysrgb&w=400)',
                }}
              ></div>
              <h3 className="text-xl font-bold text-[#006A71]">Giuseppe Verdi</h3>
              <p className="text-gray-600">Responsabile Tecnico</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
