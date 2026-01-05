import { useEffect, useRef, useState } from 'react';

type ShopifyBuyButtonProps = {
  productId?: string | number;
  productHandle?: string;
  className?: string;
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

export default function ShopifyBuyButton({ productId, productHandle, className }: ShopifyBuyButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const componentIdRef = useRef<string>(`product-component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const [resolvedProductId, setResolvedProductId] = useState<string | number | null>(productId || null);

  // Funzione per ottenere l'ID prodotto dall'handle usando GraphQL
  useEffect(() => {
    const fetchProductId = async () => {
      if (resolvedProductId || !productHandle) return;

      try {
        const query = `
          query getProduct($handle: String!) {
            product(handle: $handle) {
              id
            }
          }
        `;

        const response = await fetch('https://nautica-5-0.myshopify.com/api/2024-01/graphql.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': '34cbc97a30d14bb80e18107b8d407771',
          },
          body: JSON.stringify({
            query,
            variables: { handle: productHandle },
          }),
        });

        const data = await response.json();
        if (data.data?.product?.id) {
          // Estrai solo l'ID numerico (rimuovi "gid://shopify/Product/")
          const fullId = data.data.product.id;
          const numericId = fullId.split('/').pop();
          if (numericId) {
            setResolvedProductId(numericId);
          }
        } else {
          console.warn('Product not found for handle:', productHandle);
        }
      } catch (error) {
        console.error('Error fetching product ID:', error);
      }
    };

    if (productHandle && !resolvedProductId) {
      fetchProductId();
    }
  }, [productHandle]);

  useEffect(() => {
    const componentId = componentIdRef.current;
    const container = containerRef.current;
    const finalProductId = resolvedProductId || productId;

    if (!container || !finalProductId) return;

    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

    function loadScript() {
      const script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
      script.onload = ShopifyBuyInit;
    }

    function ShopifyBuyInit() {
      if (!window.ShopifyBuy || !window.ShopifyBuy.UI) {
        loadScript();
        return;
      }

      const client = window.ShopifyBuy.buildClient({
        domain: 'nautica-5-0.myshopify.com',
        storefrontAccessToken: '34cbc97a30d14bb80e18107b8d407771',
      });

      window.ShopifyBuy.UI.onReady(client).then(function (ui: any) {
        // Pulisci il container prima di aggiungere un nuovo componente
        if (container) {
          container.innerHTML = '';
        }

        // Crea un nuovo container
        const newContainer = document.createElement('div');
        newContainer.id = componentId;
        if (container) {
          container.appendChild(newContainer);
        }

        console.log('Creating Shopify Buy Button for product ID:', finalProductId);
        
        // Aggiungi CSS per nascondere elementi non necessari dopo che il componente è stato creato
        setTimeout(() => {
          const style = document.createElement('style');
          style.id = `shopify-buy-style-${componentId}`;
          style.textContent = `
            #${componentId} .shopify-buy__product__title,
            #${componentId} .shopify-buy__product__price,
            #${componentId} .shopify-buy__product__description,
            #${componentId} .shopify-buy__product__img,
            #${componentId} .shopify-buy__product__img-wrapper,
            #${componentId} .shopify-buy__product__img-carousel,
            #${componentId} .shopify-buy__product__img-carousel-wrapper {
              display: none !important;
            }
            #${componentId} .shopify-buy__btn-wrapper {
              width: 100% !important;
            }
            #${componentId} .shopify-buy__btn {
              width: 100% !important;
            }
          `;
          if (!document.getElementById(`shopify-buy-style-${componentId}`)) {
            document.head.appendChild(style);
          }
        }, 100);
        
        ui.createComponent('product', {
          id: String(finalProductId),
          node: newContainer,
          moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
          options: {
            product: {
              styles: {
                product: {
                  '@media (min-width: 601px)': {
                    'max-width': '100%',
                    'margin-left': '0',
                    'margin-bottom': '0',
                  },
                  'text-align': 'left',
                },
                title: {
                  'display': 'none !important',
                },
                button: {
                  ':hover': {
                    'background-color': '#1FA9A0',
                  },
                  'background-color': '#00D9CC',
                  ':focus': {
                    'background-color': '#1FA9A0',
                  },
                  'width': '100%',
                },
                price: {
                  'display': 'none !important',
                },
                compareAt: {
                  'display': 'none !important',
                },
                unitPrice: {
                  'display': 'none !important',
                },
                description: {
                  'display': 'none !important',
                },
                img: {
                  'display': 'none !important',
                },
                imgWithCarousel: {
                  'display': 'none !important',
                },
              },
              layout: 'vertical',
              contents: {
                img: false,
                imgWithCarousel: false,
                description: false,
                title: false,
                price: false,
                button: true,
                buttonWithQuantity: false,
              },
              width: '100%',
              text: {
                button: 'Acquista',
              },
            },
            productSet: {
              styles: {
                products: {
                  '@media (min-width: 601px)': {
                    'margin-left': '-20px',
                  },
                },
              },
            },
            modalProduct: {
              contents: {
                img: false,
                imgWithCarousel: true,
                button: false,
                buttonWithQuantity: true,
              },
              styles: {
                product: {
                  '@media (min-width: 601px)': {
                    'max-width': '100%',
                    'margin-left': '0px',
                    'margin-bottom': '0px',
                  },
                },
                button: {
                  ':hover': {
                    'background-color': '#1FA9A0',
                  },
                  'background-color': '#00D9CC',
                  ':focus': {
                    'background-color': '#1FA9A0',
                  },
                },
                title: {
                  'font-family': 'Helvetica Neue, sans-serif',
                  'font-weight': 'bold',
                  'font-size': '26px',
                  color: '#4c4c4c',
                },
                price: {
                  'font-family': 'Helvetica Neue, sans-serif',
                  'font-weight': 'normal',
                  'font-size': '18px',
                  color: '#4c4c4c',
                },
                compareAt: {
                  'font-family': 'Helvetica Neue, sans-serif',
                  'font-weight': 'normal',
                  'font-size': '15.299999999999999px',
                  color: '#4c4c4c',
                },
                unitPrice: {
                  'font-family': 'Helvetica Neue, sans-serif',
                  'font-weight': 'normal',
                  'font-size': '15.299999999999999px',
                  color: '#4c4c4c',
                },
              },
              text: {
                button: 'Add to cart',
              },
            },
            option: {},
            cart: {
              styles: {
                button: {
                  ':hover': {
                    'background-color': '#1FA9A0',
                  },
                  'background-color': '#00D9CC',
                  ':focus': {
                    'background-color': '#1FA9A0',
                  },
                },
              },
              text: {
                total: 'Subtotal',
                button: 'Checkout',
              },
            },
            toggle: {
              styles: {
                toggle: {
                  'background-color': '#00D9CC',
                  ':hover': {
                    'background-color': '#1FA9A0',
                  },
                  ':focus': {
                    'background-color': '#1FA9A0',
                  },
                },
              },
            },
          },
        }).catch((error: any) => {
          console.error('Error creating Shopify Buy Button component:', error);
          // Fallback: mostra un link diretto al prodotto
          if (productHandle) {
            newContainer.innerHTML = `
              <a href="https://nautica-5-0.myshopify.com/products/${productHandle}" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 style="display: inline-block; background-color: #00D9CC; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; transition: background-color 0.3s;"
                 onmouseover="this.style.backgroundColor='#1FA9A0'"
                 onmouseout="this.style.backgroundColor='#00D9CC'">
                Acquista
              </a>
            `;
          }
        });
      }).catch((error: any) => {
        console.error('Error initializing Shopify UI:', error);
      });
    }

    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        ShopifyBuyInit();
      } else {
        loadScript();
      }
    } else {
      loadScript();
    }

    // Cleanup
    return () => {
      const element = document.getElementById(componentId);
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
      // Rimuovi anche lo style
      const styleElement = document.getElementById(`shopify-buy-style-${componentId}`);
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [resolvedProductId, productId]);

  // Se non abbiamo né ID né handle, mostra un link diretto
  if (!resolvedProductId && !productId && productHandle) {
    return (
      <a
        href={`https://nautica-5-0.myshopify.com/products/${productHandle}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`bg-[#00D9CC] hover:bg-[#1FA9A0] text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors ${className || ''}`}
      >
        Acquista
      </a>
    );
  }

  if (!resolvedProductId && !productId) {
    return null;
  }

  return <div ref={containerRef} className={className}></div>;
}

