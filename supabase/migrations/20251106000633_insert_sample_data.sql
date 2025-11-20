/*
  # Insert Sample Data

  1. Sample Products
  2. Sample Rentals
  3. Sample Used Boats
  4. Sample Services
  5. Sample Accessories
  6. Sample News Articles
*/

INSERT INTO products (name, description, price, image_url, category, in_stock) VALUES
('Barca Motore 35 Piedi', 'Elegante barca con motore potente, perfecta per gite in famiglia o charter', 450000, 'https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=800', 'Barche Motore', true),
('Vela Crociera 40 Piedi', 'Barca a vela moderna con tecnologia avanzata per crociere di lusso', 380000, 'https://images.pexels.com/photos/1430676/pexels-photo-1430676.jpeg?auto=compress&cs=tinysrgb&w=800', 'Barche a Vela', true),
('Moto d''Acqua RX2', 'Moto d''acqua sportiva ad alte prestazioni', 22000, 'https://images.pexels.com/photos/2506900/pexels-photo-2506900.jpeg?auto=compress&cs=tinysrgb&w=800', 'Moto d''Acqua', true),
('Gommone 8.5m', 'Gommone robusto, ideale per escursioni e trasporto passeggeri', 65000, 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800', 'Gommoni', true),
('Barca da Pesca 28 Piedi', 'Struttura solida con ampi spazi, attrezzature da pesca professionali', 185000, 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800', 'Barche Pesca', true),
('Catamarano Lusso 45 Piedi', 'Catamarano di lusso con spazi abitativi ampi e confortevoli', 520000, 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800', 'Catamarani', true),
('Tender Tender 6m', 'Piccola barca d''appoggio perfetta per ancoraggio e trasferimenti', 35000, 'https://images.pexels.com/photos/4488662/pexels-photo-4488662.jpeg?auto=compress&cs=tinysrgb&w=800', 'Tender', true),
('Flybridge Moderno 42 Piedi', 'Motoryacht con flybridge panoramico e tecnologie di navigazione avanzate', 420000, 'https://images.pexels.com/photos/1431823/pexels-photo-1431823.jpeg?auto=compress&cs=tinysrgb&w=800', 'Motoryacht', true) ON CONFLICT DO NOTHING;

INSERT INTO rentals (name, description, price_per_day, image_url, available) VALUES
('Barca 30 Piedi - Comfort', 'Perfetta per famiglie, comfort e sicurezza garantiti', 450, 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Moto d''Acqua Sportiva', 'Adrenalina pura, per gli amanti della velocità', 150, 'https://images.pexels.com/photos/2506900/pexels-photo-2506900.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Vela 35 Piedi - Classica', 'Esperienza di vela autentica nel Mediterraneo', 380, 'https://images.pexels.com/photos/1430676/pexels-photo-1430676.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Gommone 7m - Avventura', 'Escursioni e gite divertenti a portata di mano', 200, 'https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Catamaran Luxury 42 Piedi', 'Lusso e spaziosità per vacanze indimenticabili', 650, 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Barca Pesca 25 Piedi', 'Attrezzature complete per appassionati di pesca', 280, 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800', true) ON CONFLICT DO NOTHING;

INSERT INTO used_boats (name, description, price, year, length, image_url, sold) VALUES
('Beneteau 35 - Usata', 'Barca in ottime condizioni, manutenzione regolare', 185000, 2015, 35, 'https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=800', false),
('Jeanneau 32 - Ottima Occasione', 'Perfetta per famiglia, equipaggiata di tutto', 165000, 2018, 32, 'https://images.pexels.com/photos/1430676/pexels-photo-1430676.jpeg?auto=compress&cs=tinysrgb&w=800', false),
('Bavaria 40 - Affare', 'Crociera comoda, motore recente, vela nuova', 210000, 2014, 40, 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800', false),
('Sunseeker 50 - Premium', 'Motoryacht di lusso, raramente utilizzata', 380000, 2012, 50, 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800', false),
('Lagoon 42 - Catamaran', 'Spazi ampi, bassa manutenzione, perfetta cruiser', 280000, 2016, 42, 'https://images.pexels.com/photos/2506900/pexels-photo-2506900.jpeg?auto=compress&cs=tinysrgb&w=800', false) ON CONFLICT DO NOTHING;

INSERT INTO services (name, description, price, image_url) VALUES
('Manutenzione Motore', 'Revisione completa, cambio olio, filtri e controllo componenti', 850, 'https://images.pexels.com/photos/4488662/pexels-photo-4488662.jpeg?auto=compress&cs=tinysrgb&w=800'),
('Pulizia e Detailing', 'Pulizia profonda interno ed esterno, lucidatura dello scafo', 450, 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800'),
('Riparazione Vetroresina', 'Riparazioni strutturali, sigillature e trattamenti protettivi', 1200, 'https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=800'),
('Diagnostica Elettronica', 'Controllo sistemi elettrici, navigazione e comunicazioni', NULL, 'https://images.pexels.com/photos/1430676/pexels-photo-1430676.jpeg?auto=compress&cs=tinysrgb&w=800'),
('Cambio Motore', 'Sostituzione e installazione motore con garanzia', NULL, 'https://images.pexels.com/photos/2506900/pexels-photo-2506900.jpeg?auto=compress&cs=tinysrgb&w=800'),
('Verniciatura Professionale', 'Verniciatura marina con tecnologie antiossidazione', 2500, 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800') ON CONFLICT DO NOTHING;

INSERT INTO accessories (name, description, price, image_url, in_stock) VALUES
('Ancore Galvanizzate', 'Set di ancore di qualità, vari pesi disponibili', 250, 'https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Cime Marinare 10mm', 'Corde resistenti polyester, lunghezza 50m', 85, 'https://images.pexels.com/photos/2506900/pexels-photo-2506900.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('GPS Navigatore Marino', 'GPS portatile con mappe dettagliate dei fondali', 450, 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Salvagente Rettangolare', 'Certificato internazionale, visibilità notturna', 120, 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Binocolo Marino 7x50', 'Binocolo impermeabile per osservazione del mare', 380, 'https://images.pexels.com/photos/1430676/pexels-photo-1430676.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Tenda Bimini', 'Protezione solare parasole, tessuto Sunbrella', 650, 'https://images.pexels.com/photos/4488662/pexels-photo-4488662.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Estintore Marino', 'Estintore 2kg certificato, facile da maneggiare', 95, 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Cuscineria Nautica', 'Set di cuscini impermeabili per esterno', 320, 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800', true) ON CONFLICT DO NOTHING;

INSERT INTO news (title, content, excerpt, image_url, published_at) VALUES
('Nuova Collezione 2025 Disponibile', 'Scopri le ultime imbarcazioni della stagione 2025 con tecnologie innovative e design rivoluzionario. Le nostre nuove barche combina comfort, performance e sostenibilità. Ogni modello è stato testato dai nostri esperti per garantire la massima affidabilità e soddisfazione dei clienti.', 'Le ultime imbarcazioni della stagione 2025 sono ora disponibili presso il nostro showroom', 'https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=800', NOW()),
('Guida Completa: Manutenzione Estiva', 'La stagione estiva è il periodo ideale per le escursioni in mare. Per godere appieno della tua imbarcazione è fondamentale una corretta manutenzione. Vi consigliamo di controllare periodicamente il motore, i sistemi di raffreddamento e l''impianto elettrico.', 'Consigli e suggerimenti per mantenere la tua barca in perfette condizioni durante l''estate', 'https://images.pexels.com/photos/1430676/pexels-photo-1430676.jpeg?auto=compress&cs=tinysrgb&w=800', NOW() - INTERVAL '5 days'),
('Sfida ai Limiti: Record di Velocità', 'Un nostro cliente ha stabilito il nuovo record di velocità con la Moto d''Acqua RX2 raggiungendo i 95 km/h in condizioni di mare mosso. Questa prestazione testimonia l''eccellenza tecnica dei nostri prodotti e la dedizione del nostro team.', 'Il nuovo record di velocità con la Moto d''Acqua RX2', 'https://images.pexels.com/photos/2506900/pexels-photo-2506900.jpeg?auto=compress&cs=tinysrgb&w=800', NOW() - INTERVAL '10 days'),
('Noleggio Estivo: Approfitta dei Nostri Sconti', 'Se stai pensando di noleggiare una barca per le tue vacanze estive, ora è il momento perfetto. Abbiamo speciali promozioni per noleggi settimanali e mensili. Contattaci oggi per scoprire le offerte disponibili.', 'Speciali sconti per noleggi estivi con flotta rinnovata', 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800', NOW() - INTERVAL '15 days') ON CONFLICT DO NOTHING;