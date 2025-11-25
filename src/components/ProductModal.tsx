import { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ShopifyBuyButton from './ShopifyBuyButton';
import { useCart } from '../contexts/CartContext';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  in_stock: boolean;
  shopify_product_id?: string | number;
  handle?: string | null;
};

type ProductModalProps = {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addItem } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image_url: product.image_url,
      shopify_product_id: product.shopify_product_id,
      handle: product.handle,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center z-10">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#006A71] pr-2 line-clamp-2">
                  {product.name.replace(/\d{6,}/g, '').replace(/\s{2,}/g, ' ').trim() || product.name}
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 active:text-gray-900 transition-colors flex-shrink-0 touch-manipulation"
                  aria-label="Chiudi"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-auto rounded-lg object-contain product-image-white-bg"
                      crossOrigin="anonymous"
                      loading="lazy"
                      style={{
                        backgroundColor: '#f3f4f6',
                        padding: '8px'
                      }}
                      onLoad={(e) => {
                        const img = e.currentTarget;
                        try {
                          const canvas = document.createElement('canvas');
                          const ctx = canvas.getContext('2d', { willReadFrequently: true });
                          if (!ctx) return;
                          
                          canvas.width = img.naturalWidth;
                          canvas.height = img.naturalHeight;
                          ctx.drawImage(img, 0, 0);
                          
                          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                          const data = imageData.data;
                          
                          for (let i = 0; i < data.length; i += 4) {
                            const r = data[i];
                            const g = data[i + 1];
                            const b = data[i + 2];
                            
                            // Calcola la luminosità
                            const brightness = (r + g + b) / 3;
                            
                            // Rimuovi pixel blu/verde scuri (blu dominante)
                            if (b > r + 15 && b > g + 15) {
                              // Se è blu dominante, rendilo bianco
                              if (brightness < 200 || (b > r + 25 && b > g + 25)) {
                                data[i] = 255;     // R -> bianco
                                data[i + 1] = 255; // G -> bianco
                                data[i + 2] = 255; // B -> bianco
                              }
                            }
                          }
                          
                          ctx.putImageData(imageData, 0, 0);
                          img.src = canvas.toDataURL();
                          img.style.mixBlendMode = 'normal';
                          img.style.filter = 'none';
                        } catch (error) {
                          // Se c'è un errore CORS, usa solo il filtro CSS
                          console.log('CORS error, using CSS filter only');
                        }
                      }}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                    />
                  </div>

                  <div className="flex flex-col">
                    <div className="mb-3 sm:mb-4 flex flex-wrap gap-2">
                      <span className="inline-block bg-[#9ACBD0] text-[#006A71] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                        {product.category?.startsWith('Ricambi - ') 
                          ? product.category.replace('Ricambi - ', '')
                          : product.category}
                      </span>
                      {product.in_stock && (
                        <span className="inline-block bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                          Disponibile
                        </span>
                      )}
                    </div>

                    <div className="mb-4 sm:mb-6">
                      <p className="text-2xl sm:text-3xl font-bold text-[#006A71] mb-3 sm:mb-4">
                        €{product.price.toLocaleString()}
                      </p>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Descrizione</h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-auto space-y-2 sm:space-y-3">
                      {(product.shopify_product_id || product.handle) ? (
                        <div onClick={(e) => e.stopPropagation()}>
                          <ShopifyBuyButton
                            productId={product.shopify_product_id}
                            productHandle={product.handle}
                            className="w-full"
                          />
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart();
                          }}
                          className="w-full bg-[#006A71] hover:bg-[#48A6A7] active:bg-[#005a61] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-colors touch-manipulation"
                        >
                          Aggiungi al Carrello
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

