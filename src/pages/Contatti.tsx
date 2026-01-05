import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function Contatti() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: '',
    messaggio: '',
    tipoRichiesta: 'info',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Determina l'email di destinazione in base al tipo di richiesta
    const emailTo = formData.tipoRichiesta === 'preventivo' 
      ? 'preventivo@nautic-service.it'
      : formData.tipoRichiesta === 'referente'
      ? 'manuel@nautic-service.it'
      : 'info@nautic-service.it';

    // Crea il link mailto
    const subject = encodeURIComponent(
      formData.tipoRichiesta === 'preventivo' 
        ? 'Richiesta Preventivo'
        : formData.tipoRichiesta === 'referente'
        ? 'Richiesta per Referente'
        : 'Richiesta Informazioni'
    );
    const body = encodeURIComponent(
      `Nome: ${formData.nome}\nEmail: ${formData.email}\nTelefono: ${formData.telefono}\n\nMessaggio:\n${formData.messaggio}`
    );

    // Apre il client email predefinito
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;

    // Simula invio (in produzione potresti usare un servizio backend)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ nome: '', email: '', telefono: '', messaggio: '', tipoRichiesta: 'info' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-[#F4F7F6]">
      <div
        className="relative h-[300px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">Contatti</h1>
            <p className="text-xl md:text-2xl mt-4">Siamo qui per aiutarti</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Logo dei Marchi */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-[#0E0E0E] mb-8">
            I Marchi che Rappresentiamo
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {/* Can-Am Logo */}
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow">
                <svg
                  width="220"
                  height="100"
                  viewBox="0 0 220 100"
                  className="max-w-[220px] h-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <text
                    x="110"
                    y="55"
                    fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
                    fontSize="36"
                    fontWeight="900"
                    fill="#0E0E0E"
                    textAnchor="middle"
                    letterSpacing="3"
                  >
                    CAN-AM
                  </text>
                </svg>
              </div>
              <p className="mt-3 text-sm font-medium text-[#0E0E0E]">Can-Am</p>
            </div>

            {/* Sea-Doo Logo */}
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow">
                <svg
                  width="220"
                  height="100"
                  viewBox="0 0 220 100"
                  className="max-w-[220px] h-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <text
                    x="110"
                    y="55"
                    fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
                    fontSize="34"
                    fontWeight="900"
                    fill="#0088AA"
                    textAnchor="middle"
                    letterSpacing="2"
                  >
                    SEA-DOO
                  </text>
                </svg>
              </div>
              <p className="mt-3 text-sm font-medium text-[#0E0E0E]">Sea-Doo</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informazioni di Contatto */}
          <div>
            <h2 className="text-3xl font-bold text-[#0E0E0E] mb-8">Informazioni</h2>
            
            <div className="space-y-6">
              {/* Indirizzo */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-[#0E0E0E] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#0E0E0E] mb-2">Sede</h3>
                    <p className="text-[#0E0E0E]">
                      Via Venezia 9<br />
                      37014 Castelnuovo del Garda (VR)
                    </p>
                  </div>
                </div>
              </div>

              {/* Orari */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-[#0E0E0E] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#0E0E0E] mb-2">Orari di Apertura</h3>
                    <p className="text-[#0E0E0E]">
                      <strong>Lunedì – Sabato:</strong> 8.30 – 12.30 e 14 – 18<br />
                      <strong>Domenica:</strong> Chiuso
                    </p>
                  </div>
                </div>
              </div>

              {/* Contatti Email */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-[#0E0E0E] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#0E0E0E] mb-2">Email</h3>
                    <div className="space-y-1 text-[#0E0E0E]">
                      <p>
                        <strong>Referente:</strong>{' '}
                        <a href="mailto:manuel@nautic-service.it" className="text-[#00D9CC] hover:underline">
                          manuel@nautic-service.it
                        </a>
                      </p>
                      <p>
                        <strong>Informazioni:</strong>{' '}
                        <a href="mailto:info@nautic-service.it" className="text-[#00D9CC] hover:underline">
                          info@nautic-service.it
                        </a>
                      </p>
                      <p>
                        <strong>Richiedi Preventivo:</strong>{' '}
                        <a href="mailto:preventivo@nautic-service.it" className="text-[#00D9CC] hover:underline">
                          preventivo@nautic-service.it
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Telefoni */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-[#0E0E0E] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#0E0E0E] mb-2">Telefono</h3>
                    <div className="space-y-1 text-[#0E0E0E]">
                      <p>
                        <strong>Manuel:</strong>{' '}
                        <a href="tel:+393278992159" className="text-[#00D9CC] hover:underline">
                          +39 327.8992159
                        </a>
                      </p>
                      <p>
                        <strong>Domenico:</strong>{' '}
                        <a href="tel:+393478239844" className="text-[#00D9CC] hover:underline">
                          +39 347.8239844
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form di Contatto */}
          <div>
            <h2 className="text-3xl font-bold text-[#0E0E0E] mb-8">Richiedi Informazioni</h2>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 md:p-8 shadow-lg">
              <div className="space-y-6">
                <div>
                  <label htmlFor="tipoRichiesta" className="block text-sm font-medium text-[#0E0E0E] mb-2">
                    Tipo di Richiesta
                  </label>
                  <select
                    id="tipoRichiesta"
                    name="tipoRichiesta"
                    value={formData.tipoRichiesta}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D9CC] focus:border-transparent"
                    required
                  >
                    <option value="info">Informazioni Generali</option>
                    <option value="preventivo">Richiesta Preventivo</option>
                    <option value="referente">Contatto Referente</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-[#0E0E0E] mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D9CC] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#0E0E0E] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D9CC] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-[#0E0E0E] mb-2">
                    Telefono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D9CC] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="messaggio" className="block text-sm font-medium text-[#0E0E0E] mb-2">
                    Messaggio *
                  </label>
                  <textarea
                    id="messaggio"
                    name="messaggio"
                    value={formData.messaggio}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D9CC] focus:border-transparent resize-none"
                  ></textarea>
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    Messaggio inviato con successo! Verrai reindirizzato al tuo client email.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    Si è verificato un errore. Riprova più tardi.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#00D9CC] hover:bg-[#1FA9A0] text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                  {isSubmitting ? 'Invio in corso...' : 'Invia Messaggio'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

