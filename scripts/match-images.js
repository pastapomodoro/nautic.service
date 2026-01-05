import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Leggi il file JSON dei prodotti
const jsonPath = path.join(__dirname, '..', 'public', 'ricambi.json');
console.log('📖 Leggendo ricambi.json...');
const products = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
console.log(`📊 Totale prodotti: ${products.length}`);

// Leggi tutti i file nella cartella ricambi-images
const imagesDir = path.join(__dirname, '..', 'public', 'ricambi-images');
const imageFiles = fs.readdirSync(imagesDir);
console.log(`🖼️  Totale immagini nella cartella: ${imageFiles.length}`);

// Crea una mappa di tutti i possibili match
// Key: nome file senza prefisso numerico, Value: nome file completo
const imageMap = new Map();

imageFiles.forEach(fileName => {
  // Rimuovi il prefisso numerico se presente (es: "1-3_xxx.png" -> "3_xxx.png")
  const match = fileName.match(/^(\d+-)?(.+)$/);
  if (match) {
    const baseName = match[2]; // Nome senza prefisso
    // Se non esiste già o se questo è il match esatto (senza prefisso), usalo
    if (!imageMap.has(baseName) || !fileName.includes('-')) {
      imageMap.set(baseName, fileName);
    }
  }
});

console.log(`🗺️  Mappa immagini creata: ${imageMap.size} chiavi uniche`);

// Funzione per estrarre il nome del file da un URL Shopify
function extractFileNameFromUrl(url) {
  if (!url) return null;
  
  // Pattern per URL Shopify: /files/1/0689/1087/4891/files/filename.ext o /files/1/0689/1087/4891/products/filename.ext
  // Cerca l'ultimo /files/ o /products/ e prendi tutto dopo fino a ?
  const match = url.match(/\/(?:files|products)\/([^\/]+\/[^\/]+\/[^\/]+\/[^\/]+\/(?:files|products)\/)?([^?]+)/);
  if (match && match[2]) {
    return match[2];
  }
  
  // Pattern alternativo: cerca direttamente il nome del file dopo l'ultimo /
  const lastSlashIndex = url.lastIndexOf('/');
  if (lastSlashIndex !== -1) {
    const afterSlash = url.substring(lastSlashIndex + 1);
    return afterSlash.split('?')[0];
  }
  
  return null;
}

// Aggiorna ogni prodotto con il percorso locale dell'immagine
let matched = 0;
let notMatched = 0;
let alreadyLocal = 0;

products.forEach((product, index) => {
  let shopifyUrl = product.image_url;
  
  // Se è già un percorso locale, estrai il nome del file
  let fileName;
  if (shopifyUrl.startsWith('/ricambi-images/')) {
    fileName = shopifyUrl.replace('/ricambi-images/', '');
    // Rimuovi il prefisso numerico se presente
    const match = fileName.match(/^(\d+-)?(.+)$/);
    if (match) {
      fileName = match[2];
    }
    alreadyLocal++;
  } else {
    fileName = extractFileNameFromUrl(shopifyUrl);
  }
  
  if (!fileName) {
    notMatched++;
    return;
  }
  
  // Cerca prima il match esatto
  let localFileName = imageMap.get(fileName);
  
  // Se non trovato e il file è .jpg, prova con .png
  if (!localFileName && fileName.endsWith('.jpg')) {
    const pngFileName = fileName.replace(/\.jpg$/, '.png');
    localFileName = imageMap.get(pngFileName);
  }
  
  // Se non trovato e il file è .png, prova con .jpg
  if (!localFileName && fileName.endsWith('.png')) {
    const jpgFileName = fileName.replace(/\.png$/, '.jpg');
    localFileName = imageMap.get(jpgFileName);
  }
  
  if (localFileName) {
    product.image_url = `/ricambi-images/${localFileName}`;
    matched++;
    
    if (index < 10) {
      console.log(`✅ Match ${index + 1}: ${fileName} -> ${localFileName}`);
    }
  } else {
    notMatched++;
    if (notMatched <= 10) {
      console.log(`❌ Nessun match per: ${fileName} (prodotto: ${product.name.substring(0, 50)}...)`);
    }
  }
});

console.log(`\n📊 Risultati:`);
console.log(`✅ Match trovati: ${matched}`);
console.log(`📍 Già locali: ${alreadyLocal}`);
console.log(`❌ Nessun match: ${notMatched}`);
console.log(`📈 Percentuale match: ${((matched / products.length) * 100).toFixed(1)}%`);

// Salva il JSON aggiornato
fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2), 'utf-8');
console.log(`\n💾 File ricambi.json aggiornato con i percorsi locali delle immagini!`);

