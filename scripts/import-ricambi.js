import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Funzione per pulire l'HTML dalla descrizione
function stripHtml(html) {
  if (!html) return '';
  let doc = html.replace(/<[^>]*>/g, '');
  doc = doc.replace(/&nbsp;/g, ' ');
  doc = doc.replace(/&amp;/g, '&');
  doc = doc.replace(/&quot;/g, '"');
  doc = doc.replace(/&#x2019;/g, "'");
  doc = doc.replace(/&#x201C;/g, '"');
  doc = doc.replace(/&#x201D;/g, '"');
  doc = doc.replace(/&#x2013;/g, '-');
  doc = doc.replace(/&#x2022;/g, '-');
  doc = doc.replace(/&#x201A;/g, ',');
  doc = doc.replace(/&#x201E;/g, '"');
  doc = doc.replace(/&#x2026;/g, '...');
  doc = doc.replace(/&#xFEFF;/g, '');
  doc = doc.replace(/\s+/g, ' ').trim();
  return doc;
}

// Funzione per determinare la sottocategoria (senza prefisso "Ricambi")
function getSubCategory(title) {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('elica') || titleLower.includes('propeller')) {
    return 'Eliche';
  }
  if (titleLower.includes('motore') || titleLower.includes('motor')) {
    return 'Motore';
  }
  if (titleLower.includes('candela') || titleLower.includes('spark plug')) {
    return 'Candele';
  }
  if (titleLower.includes('filtro')) {
    return 'Filtri';
  }
  if (titleLower.includes('pompa')) {
    return 'Pompe';
  }
  if (titleLower.includes('sensore')) {
    return 'Sensori';
  }
  if (titleLower.includes('guarnizione')) {
    return 'Guarnizioni';
  }
  if (titleLower.includes('kit')) {
    return 'Kit';
  }
  if (titleLower.includes('carburatore') || titleLower.includes('carburator')) {
    return 'Carburatori';
  }
  
  return 'Altri';
}

// Leggi il file CSV
const csvPath = path.join(__dirname, '..', '..', 'products_export.csv');
console.log('📖 Leggendo CSV...');

const fileContent = fs.readFileSync(csvPath, 'utf-8');

const records = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
  relax_column_count: true,
});

console.log(`📊 Totale righe nel CSV: ${records.length}`);

const products = [];
const seenHandles = new Set();

// Processa ogni record
for (const row of records) {
  const handle = row['Handle']?.trim();
  const title = row['Title']?.trim();
  const body = row['Body (HTML)']?.trim();
  const priceStr = row['Variant Price']?.trim();
  const imageUrl = row['Image Src']?.trim();
  const status = row['Status']?.trim();

  // Skip se mancano dati essenziali
  if (!title || !priceStr) continue;

  // Skip varianti duplicate
  if (handle && seenHandles.has(handle)) {
    continue;
  }
  if (handle) {
    seenHandles.add(handle);
  }

  // Converti prezzo
  const price = parseFloat(priceStr);
  if (isNaN(price) || price <= 0) continue;

  // Pulisci descrizione HTML
  let description = stripHtml(body);
  if (!description || description.length < 10) {
    description = title;
  }
  // Limita lunghezza
  if (description.length > 1000) {
    description = description.substring(0, 997) + '...';
  }

  // Determina categoria (tutti vanno in Ricambi)
  const category = getSubCategory(title);

  // Determina disponibilità
  const inStock = status?.toLowerCase() === 'active' || !status;

  // Immagine di default se mancante
  const image = imageUrl || 'https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=800';

  products.push({
    id: `local-${products.length + 1}`,
    name: title,
    description: description,
    price: price,
    image_url: image,
    category: category,
    in_stock: inStock,
    handle: handle || null,
    created_at: new Date().toISOString(),
  });
}

console.log(`✅ Processati ${products.length} prodotti`);

// Genera file JSON
const jsonOutputPath = path.join(__dirname, '..', 'public', 'ricambi.json');
fs.writeFileSync(jsonOutputPath, JSON.stringify(products, null, 2), 'utf-8');
console.log(`📄 File JSON generato: ${jsonOutputPath}`);

// Genera SQL
const sqlStatements = [];
sqlStatements.push('-- Import prodotti Ricambi da CSV');
sqlStatements.push('-- Generato automaticamente');
sqlStatements.push('');

products.forEach((product, index) => {
  if (index % 100 === 0) {
    sqlStatements.push(`-- Batch ${Math.floor(index / 100) + 1}`);
  }

  const escapeSql = (str) => {
    if (str === null || str === undefined) return '';
    return String(str).replace(/'/g, "''");
  };

  const sql = `INSERT INTO products (name, description, price, image_url, category, in_stock) VALUES (
    '${escapeSql(product.name)}',
    '${escapeSql(product.description)}',
    ${product.price},
    '${escapeSql(product.image_url)}',
    '${escapeSql(product.category)}',
    ${product.in_stock}
  ) ON CONFLICT DO NOTHING;`;

  sqlStatements.push(sql);
});

// Salva il file SQL
const sqlOutputPath = path.join(__dirname, '..', 'supabase', 'migrations', `20251120000000_import_ricambi_from_csv.sql`);
fs.writeFileSync(sqlOutputPath, sqlStatements.join('\n'), 'utf-8');

console.log(`✅ SQL file generato: ${sqlOutputPath}`);
console.log(`📦 Totale prodotti: ${products.length}`);
console.log(`\n💡 I prodotti sono disponibili anche localmente in public/ricambi.json`);

