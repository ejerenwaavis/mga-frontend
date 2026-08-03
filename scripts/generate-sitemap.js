import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple extraction of slugs from the TS file to avoid compiling TS in node
const tsContent = fs.readFileSync(path.resolve(__dirname, '../src/data/services.ts'), 'utf-8');
const slugs = [];
const regex = /slug:\s*["']([^"']+)["']/g;
let match;
while ((match = regex.exec(tsContent)) !== null) {
  slugs.push(match[1]);
}

const baseUrl = 'https://meadgreenautos.com';

const routes = [
  '/',
  '/fleet',
  '/services',
  '/about',
  '/faq',
  '/contact',
  '/policies',
  '/insurance',
  ...slugs.map(slug => `/services/${slug}`)
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.resolve(__dirname, '../public/sitemap.xml'), sitemap);
console.log('sitemap.xml generated in public directory.');

const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

fs.writeFileSync(path.resolve(__dirname, '../public/robots.txt'), robots);
console.log('robots.txt generated in public directory.');
