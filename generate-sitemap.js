// Generate sitemap.xml for SEO
const fs = require('fs');
const path = require('path');

// Load food truck data
const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'docs', 'data', 'foodtrucks.json'), 'utf8')
);

const baseUrl = 'https://adityabandi.github.io/foodtrucks';
const today = new Date().toISOString().split('T')[0];

// Generate sitemap XML
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
`;

// Add each food truck page
data.foodTrucks.forEach(truck => {
    const truckUrl = `${baseUrl}/truck/index.html?id=${truck.id}`;
    sitemap += `  <!-- ${truck.name} - ${truck.city} -->
  <url>
    <loc>${truckUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
`;
});

sitemap += `</urlset>`;

// Write sitemap to docs folder
fs.writeFileSync(path.join(__dirname, 'docs', 'sitemap.xml'), sitemap);

console.log(`✅ Sitemap generated with ${data.foodTrucks.length + 1} URLs`);
console.log(`📍 Location: docs/sitemap.xml`);
console.log(`\n🔗 Submit to Google Search Console:`);
console.log(`   ${baseUrl}/sitemap.xml`);
