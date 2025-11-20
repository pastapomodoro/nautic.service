import { useState, useEffect } from 'react';
import { supabase, type Accessory } from '../lib/supabase';
import ShopifyBuyButton from '../components/ShopifyBuyButton';

export default function Accessori() {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccessories();
  }, []);

  const fetchAccessories = async () => {
    try {
      const { data, error } = await supabase
        .from('accessories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAccessories(data || []);
    } catch (error) {
      console.error('Error fetching accessories:', error);
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
            'url(https://images.pexels.com/photos/1431823/pexels-photo-1431823.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold">Accessori</h1>
            <p className="text-xl md:text-2xl mt-4">
              Tutto per equipaggiare la tua imbarcazione
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-[#006A71] mb-6 text-center">
            Accessori Nautici di Qualità
          </h2>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
            Selezioniamo solo i migliori accessori nautici per garantire sicurezza, comfort e
            prestazioni. Dal salvagente alle attrezzature elettroniche, troverai tutto ciò di
            cui hai bisogno per la tua imbarcazione.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#006A71]"></div>
          </div>
        ) : accessories.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-lg">
            <p className="text-xl text-gray-600">
              Nessun accessorio disponibile al momento. Contattaci per maggiori informazioni
              sui prodotti disponibili o per ordini speciali.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {accessories.map((accessory) => (
              <div
                key={accessory.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${accessory.image_url})` }}
                ></div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-[#006A71] line-clamp-2">
                      {accessory.name}
                    </h3>
                    {accessory.in_stock && (
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded shrink-0">
                        Disponibile
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                    {accessory.description}
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-[#006A71]">
                        €{accessory.price.toLocaleString()}
                      </span>
                    </div>
                    {(accessory as any).shopify_product_id ? (
                      <ShopifyBuyButton 
                        productId={(accessory as any).shopify_product_id} 
                        className="w-full"
                      />
                    ) : (
                      <button className="bg-[#006A71] hover:bg-[#48A6A7] text-white px-3 py-2 rounded-lg flex items-center justify-center gap-1 transition-colors text-sm">
                        Acquista
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-[#006A71] mb-6 text-center">
            Categorie Principali
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-[#F2EFE7] rounded-lg hover:bg-[#9ACBD0] transition-colors cursor-pointer">
              <h3 className="font-semibold text-[#006A71]">Sicurezza</h3>
              <p className="text-sm text-gray-600 mt-1">Salvagenti, estintori, razzi</p>
            </div>
            <div className="text-center p-4 bg-[#F2EFE7] rounded-lg hover:bg-[#9ACBD0] transition-colors cursor-pointer">
              <h3 className="font-semibold text-[#006A71]">Elettronica</h3>
              <p className="text-sm text-gray-600 mt-1">GPS, radar, radio</p>
            </div>
            <div className="text-center p-4 bg-[#F2EFE7] rounded-lg hover:bg-[#9ACBD0] transition-colors cursor-pointer">
              <h3 className="font-semibold text-[#006A71]">Ormeggio</h3>
              <p className="text-sm text-gray-600 mt-1">Cime, ancore, parabordi</p>
            </div>
            <div className="text-center p-4 bg-[#F2EFE7] rounded-lg hover:bg-[#9ACBD0] transition-colors cursor-pointer">
              <h3 className="font-semibold text-[#006A71]">Comfort</h3>
              <p className="text-sm text-gray-600 mt-1">Cuscineria, tende, tavoli</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
