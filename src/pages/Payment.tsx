import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Truck, Shield, Check, ChevronLeft } from 'lucide-react';

type PaymentProps = {
  onNavigate: (page: string) => void;
};

export default function Payment({ onNavigate }: PaymentProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartItems = [
    { name: 'Barca Motore 35 Piedi', price: 450000, quantity: 1, image: 'https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=200' },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 300000 ? 0 : 500;
  const tax = Math.round(subtotal * 0.22);
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="bg-[#F4F7F6] min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="h-10 w-10 text-green-600" />
          </motion.div>
          <h1 className="text-3xl font-bold text-[#0E0E0E] mb-3">Ordine Confermato!</h1>
          <p className="text-[#6B6F72] mb-2">Grazie per il tuo acquisto</p>
          <p className="text-[#6B6F72] mb-6">
            Riceverai un'email di conferma con i dettagli dell'ordine e i prossimi step
          </p>
          <p className="text-2xl font-bold text-[#0E0E0E] mb-6">
            €{total.toLocaleString()}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('home')}
            className="w-full bg-[#00D9CC] hover:bg-[#1FA9A0] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Torna alla Home
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F7F6] min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => onNavigate('vendita')}
            className="flex items-center gap-2 text-[#0E0E0E] hover:text-[#00D9CC] font-semibold mb-6"
          >
            <ChevronLeft className="h-5 w-5" />
            Torna ai Prodotti
          </button>
          <h1 className="text-4xl font-bold text-[#0E0E0E]">Checkout</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex gap-4 mb-8">
                {[1, 2, 3].map((s) => (
                  <motion.div key={s} className="flex-1">
                    <motion.button
                      onClick={() => s <= step && setStep(s)}
                      className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                        step === s
                          ? 'bg-[#00D9CC] text-white'
                          : s < step
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      Step {s}
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {step === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-[#0E0E0E] mb-6">Informazioni Personali</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="Nome"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="col-span-2 sm:col-span-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00D9CC] outline-none"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Cognome"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="col-span-2 sm:col-span-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00D9CC] outline-none"
                      />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00D9CC] outline-none"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Telefono"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00D9CC] outline-none"
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-[#0E0E0E] mb-6">Indirizzo di Spedizione</h2>
                    <input
                      type="text"
                      name="address"
                      placeholder="Indirizzo"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00D9CC] outline-none"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="Città"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="col-span-2 sm:col-span-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00D9CC] outline-none"
                      />
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="CAP"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="col-span-2 sm:col-span-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00D9CC] outline-none"
                      />
                    </div>
                    <input
                      type="text"
                      name="country"
                      placeholder="Paese"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00D9CC] outline-none"
                    />
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-[#0E0E0E] mb-6">Pagamento</h2>
                    <div className="bg-gradient-to-r from-[#00D9CC] to-[#9BE870] rounded-lg p-6 text-white mb-6">
                      <div className="flex items-center gap-2 mb-4">
                        <CreditCard className="h-6 w-6" />
                        <span>Carta di Credito</span>
                      </div>
                      <input
                        type="text"
                        name="cardName"
                        placeholder="Nome Titolare"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/60 border border-white/30 mb-3"
                      />
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/60 border border-white/30 mb-3 font-mono"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          name="expiry"
                          placeholder="MM/YY"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          className="px-4 py-2 rounded bg-white/20 text-white placeholder-white/60 border border-white/30"
                        />
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="px-4 py-2 rounded bg-white/20 text-white placeholder-white/60 border border-white/30"
                        />
                      </div>
                    </div>

                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 flex gap-3">
                      <Shield className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-900">
                        I tuoi dati sono protetti da crittografia SSL. Il pagamento è sicuro e gestito dai migliori
                        provider.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={handlePrevStep}
                  disabled={step === 1}
                  className="px-6 py-3 border-2 border-[#00D9CC] text-[#0E0E0E] rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F4F7F6]"
                >
                  Indietro
                </button>
                {step < 3 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextStep}
                    className="flex-1 bg-[#00D9CC] hover:bg-[#1FA9A0] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Avanti
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Completa Ordine
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-[#0E0E0E] mb-4">Riepilogo Ordine</h3>

              <div className="space-y-3 mb-6 pb-6 border-b-2 border-gray-200">
                {cartItems.map((item) => (
                  <div key={item.name} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-[#0E0E0E] text-sm">{item.name}</p>
                      <p className="text-[#6B6F72] text-xs">Qty: {item.quantity}</p>
                      <p className="font-bold text-[#0E0E0E]">€{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6 pb-6 border-b-2 border-gray-200">
                <div className="flex justify-between text-[#6B6F72]">
                  <span>Subtotale</span>
                  <span>€{subtotal.toLocaleString()}</span>
                </div>
                {shipping > 0 && (
                  <div className="flex justify-between text-[#6B6F72]">
                    <span>Spedizione</span>
                    <span>€{shipping.toLocaleString()}</span>
                  </div>
                )}
                {shipping === 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Spedizione Gratis</span>
                    <span>€0</span>
                  </div>
                )}
                <div className="flex justify-between text-[#6B6F72]">
                  <span>IVA (22%)</span>
                  <span>€{tax.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-[#0E0E0E]">Totale</span>
                <span className="text-2xl font-bold text-[#0E0E0E]">€{total.toLocaleString()}</span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex gap-3 p-3 bg-[#F4F7F6] rounded">
                  <Truck className="h-5 w-5 text-[#0E0E0E] shrink-0" />
                  <div>
                    <p className="font-semibold text-[#0E0E0E]">Spedizione Rapida</p>
                    <p className="text-[#6B6F72]">Consegna in 3-5 giorni</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-[#F4F7F6] rounded">
                  <Shield className="h-5 w-5 text-[#0E0E0E] shrink-0" />
                  <div>
                    <p className="font-semibold text-[#0E0E0E]">Garanzia Completa</p>
                    <p className="text-[#6B6F72]">12 mesi di protezione</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
