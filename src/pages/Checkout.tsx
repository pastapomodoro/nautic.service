import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

type CheckoutProps = {
  onNavigate: (page: string) => void;
};

declare global {
  interface Window {
    ShopifyBuy?: {
      buildClient: (config: { domain: string; storefrontAccessToken: string }) => any;
      UI: {
        onReady: (client: any) => Promise<any>;
      };
    };
  }
}

export default function Checkout({ onNavigate }: CheckoutProps) {
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const cartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

    function loadScript() {
      const script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
      script.onload = initializeShopifyCart;
    }

    function initializeShopifyCart() {
      if (!window.ShopifyBuy || !window.ShopifyBuy.UI) {
        console.warn('ShopifyBuy not available');
        return;
      }

      const client = window.ShopifyBuy.buildClient({
        domain: 'nautica-5-0.myshopify.com',
        storefrontAccessToken: '34cbc97a30d14bb80e18107b8d407771',
      });

      window.ShopifyBuy.UI.onReady(client).then(function (ui: any) {
        if (!cartContainerRef.current) return;

        // Pulisci il container
        cartContainerRef.current.innerHTML = '';

        // Crea il componente cart
        ui.createComponent('cart', {
          node: cartContainerRef.current,
          moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
          options: {
            cart: {
              styles: {
                button: {
                  ':hover': {
                    'background-color': '#139696',
                  },
                  'background-color': '#15a7a7',
                  ':focus': {
                    'background-color': '#139696',
                  },
                },
              },
              text: {
                total: 'Totale',
                button: 'Checkout',
              },
            },
            toggle: {
              styles: {
                toggle: {
                  'background-color': '#15a7a7',
                  ':hover': {
                    'background-color': '#139696',
                  },
                  ':focus': {
                    'background-color': '#139696',
                  },
                },
              },
            },
          },
        });

        // Aggiungi prodotti al carrello Shopify
        items.forEach((item) => {
          if (item.shopify_product_id || item.handle) {
            // Usa l'API Shopify per aggiungere al carrello
            const productId = item.shopify_product_id || item.handle;
            if (productId) {
              // Il carrello Shopify verrà popolato automaticamente quando l'utente clicca sui pulsanti "Add to cart"
              // Per ora, mostriamo solo il carrello vuoto che l'utente può popolare
            }
          }
        });
      });
    }

    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        initializeShopifyCart();
      } else {
        loadScript();
      }
    } else {
      loadScript();
    }
  }, [items]);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsLoading(true);
    try {
      // Crea un checkout URL Shopify con tutti i prodotti
      const lineItems = items
        .filter((item) => item.shopify_product_id || item.handle)
        .map((item) => ({
          variantId: item.shopify_product_id || item.handle,
          quantity: item.quantity,
        }));

      if (lineItems.length === 0) {
        alert('Alcuni prodotti non hanno un ID Shopify valido. Usa i pulsanti "Acquista" direttamente sui prodotti.');
        setIsLoading(false);
        return;
      }

      // Reindirizza al checkout Shopify
      // Per ora, reindirizziamo allo store Shopify dove l'utente può completare l'ordine
      window.location.href = 'https://nautica-5-0.myshopify.com/cart';
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Errore durante il checkout. Riprova più tardi.');
    } finally {
      setIsLoading(false);
    }
  };

  if (itemCount === 0) {
    return (
      <div className="bg-[#F4F7F6] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => onNavigate('home')}
            className="mb-6 text-[#0E0E0E] hover:text-[#00D9CC] font-semibold flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Torna alla Home
          </button>
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#0E0E0E] mb-4">Il tuo carrello è vuoto</h2>
            <p className="text-[#6B6F72] mb-8">
              Aggiungi alcuni prodotti al carrello per iniziare lo shopping
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('ricambi')}
              className="bg-[#00D9CC] hover:bg-[#1FA9A0] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Vai allo Shopping
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F7F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => onNavigate('home')}
          className="mb-6 text-[#0E0E0E] hover:text-[#00D9CC] font-semibold flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Torna alla Home
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista prodotti */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-[#0E0E0E] mb-6">
                Carrello ({itemCount} {itemCount === 1 ? 'prodotto' : 'prodotti'})
              </h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-24 h-24 object-contain rounded-lg bg-gray-100"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=200';
                      }}
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-[#0E0E0E] mb-1">{item.name}</h3>
                      <p className="text-sm text-[#6B6F72] line-clamp-2 mb-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded hover:bg-gray-100"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded hover:bg-gray-100"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-[#0E0E0E]">
                            €{(item.price * item.quantity).toLocaleString()}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <button
                onClick={clearCart}
                className="mt-4 text-red-500 hover:text-red-700 text-sm font-semibold"
              >
                Svuota carrello
              </button>
            </div>
          </div>

          {/* Riepilogo ordine */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-[#0E0E0E] mb-6">Riepilogo Ordine</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-[#6B6F72]">Subtotale</span>
                  <span className="font-semibold">€{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6F72]">Spedizione</span>
                  <span className="font-semibold">Calcolata al checkout</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-[#0E0E0E]">Totale</span>
                    <span className="text-lg font-bold text-[#0E0E0E]">€{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Shopify Cart Component */}
              <div ref={cartContainerRef} className="mb-4"></div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                disabled={isLoading || items.length === 0}
                className="w-full bg-[#00D9CC] hover:bg-[#1FA9A0] disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Caricamento...
                  </>
                ) : (
                  <>
                    Procedi al Checkout
                    <ShoppingCart className="h-5 w-5" />
                  </>
                )}
              </motion.button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Il pagamento verrà completato tramite Shopify
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

