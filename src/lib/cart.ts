export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  type: 'product' | 'rental' | 'accessory';
};

export type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
};
