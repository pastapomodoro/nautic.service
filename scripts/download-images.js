import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Leggi il file ricambi.json
const ricambiPath = path.join(__dirname, '..', 'public', 'ricambi.json');
const ricambiData = JSON.parse(fs.readFileSync(ricambiPath, 'utf8'));

// Crea la cartella per le immagini se non esiste
const imagesDir = path.join(__dirname, '..', 'public', 'ricambi-images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Funzione per scaricare un'immagine
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Segui i redirect
        return downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${url} - Status: ${response.statusCode}`));
        return;
      }
      
      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(filepath);
      });
      
      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Estrai tutti gli URL delle immagini unici
const imageUrls = [...new Set(ricambiData.map(product => product.image_url).filter(Boolean))];

console.log(`Trovate ${imageUrls.length} immagini uniche da scaricare`);

// Scarica tutte le immagini
let downloaded = 0;
let failed = 0;

async function downloadAll() {
  for (let i = 0; i < imageUrls.length; i++) {
    const url = imageUrls[i];
    try {
      // Estrai il nome del file dall'URL
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const filename = path.basename(pathname).split('?')[0] || `image-${i + 1}`;
      
      // Determina l'estensione dal Content-Type o dall'URL
      let ext = path.extname(filename);
      if (!ext) {
        ext = '.jpg'; // default
      }
      
      const filepath = path.join(imagesDir, `${i + 1}-${filename}`);
      
      console.log(`[${i + 1}/${imageUrls.length}] Scaricando: ${filename}`);
      await downloadImage(url, filepath);
      downloaded++;
      
      // Piccola pausa per non sovraccaricare il server
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Errore scaricando ${url}:`, error.message);
      failed++;
    }
  }
  
  console.log(`\nCompletato!`);
  console.log(`- Scaricate: ${downloaded}`);
  console.log(`- Fallite: ${failed}`);
  console.log(`- Cartella: ${imagesDir}`);
}

downloadAll().catch(console.error);

