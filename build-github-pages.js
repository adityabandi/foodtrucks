#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://adityabandi.github.io/foodtrucks';
const BUILD_DIR = './dist';
const PUBLIC_DIR = './public';
const DATA_FILE = './data/foodtrucks.json';

console.log('🚀 Starting build process for GitHub Pages...\n');

// Create build directory
if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR, { recursive: true });
}

// Load food truck data
const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const trucks = data.foodTrucks;

console.log(`📊 Found ${trucks.length} food trucks\n`);

// Copy public files
console.log('📁 Copying public assets...');
copyDirectory(PUBLIC_DIR, BUILD_DIR);

// Create truck directory
const truckDir = path.join(BUILD_DIR, 'truck');
if (!fs.existsSync(truckDir)) {
    fs.mkdirSync(truckDir, { recursive: true });
}

// Read the truck template
const truckTemplate = fs.readFileSync(path.join(PUBLIC_DIR, 'truck.html'), 'utf8');

console.log('📝 Generating individual food truck pages...');

// Generate a page for each truck
let generated = 0;
trucks.forEach((truck, index) => {
    const truckPage = generateTruckPage(truck, truckTemplate);
    const truckPath = path.join(truckDir, truck.id);
    
    // Create directory for the truck
    if (!fs.existsSync(truckPath)) {
        fs.mkdirSync(truckPath, { recursive: true });
    }
    
    // Write index.html for the truck
    fs.writeFileSync(path.join(truckPath, 'index.html'), truckPage);
    
    generated++;
    if (generated % 1000 === 0) {
        console.log(`  Generated ${generated}/${trucks.length} pages...`);
    }
});

console.log(`✅ Generated ${generated} food truck pages\n`);

// Generate sitemap
console.log('🗺️  Generating sitemap...');
const sitemap = generateSitemap(trucks, BASE_URL);
fs.writeFileSync(path.join(BUILD_DIR, 'sitemap.xml'), sitemap);

// Generate robots.txt
console.log('🤖 Generating robots.txt...');
const robots = `User-agent: *
Allow: /
Sitemap: ${BASE_URL}/sitemap.xml
`;
fs.writeFileSync(path.join(BUILD_DIR, 'robots.txt'), robots);

// Create data API endpoints as JSON files
console.log('📡 Creating API endpoints...');
const apiDir = path.join(BUILD_DIR, 'api');
if (!fs.existsSync(apiDir)) {
    fs.mkdirSync(apiDir, { recursive: true });
}

// Main API endpoint
fs.writeFileSync(
    path.join(apiDir, 'foodtrucks.json'),
    JSON.stringify({ total: trucks.length, trucks: trucks }, null, 2)
);

// Individual truck endpoints
const truckApiDir = path.join(apiDir, 'foodtrucks');
if (!fs.existsSync(truckApiDir)) {
    fs.mkdirSync(truckApiDir, { recursive: true });
}

trucks.forEach(truck => {
    fs.writeFileSync(
        path.join(truckApiDir, `${truck.id}.json`),
        JSON.stringify(truck, null, 2)
    );
});

// Cuisines endpoint
const cuisines = [...new Set(trucks.flatMap(t => t.cuisine))].sort();
fs.writeFileSync(
    path.join(apiDir, 'cuisines.json'),
    JSON.stringify(cuisines, null, 2)
);

// Cities endpoint
const cities = [...new Set(trucks.map(t => ({ city: t.city, country: t.country })))];
fs.writeFileSync(
    path.join(apiDir, 'cities.json'),
    JSON.stringify(cities, null, 2)
);

// Stats endpoint
const stats = {
    totalTrucks: trucks.length,
    totalCities: [...new Set(trucks.map(t => t.city))].length,
    totalCountries: [...new Set(trucks.map(t => t.country))].length,
    averageRating: (trucks.reduce((sum, t) => sum + t.rating, 0) / trucks.length).toFixed(2),
    topCuisines: getTopCuisines(trucks),
    topCities: getTopCities(trucks)
};
fs.writeFileSync(
    path.join(apiDir, 'stats.json'),
    JSON.stringify(stats, null, 2)
);

console.log('✅ API endpoints created\n');

// Update app.js to use relative paths
console.log('🔧 Updating JavaScript for GitHub Pages...');
updateJavaScriptForGitHubPages();

console.log('\n✨ Build complete! Your site is ready in the ./dist directory\n');
console.log('📦 Total pages generated:', generated + 1);
console.log('📍 Deploy the ./dist directory to GitHub Pages\n');

// Helper functions

function copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else if (entry.name !== 'truck.html') {
            // Don't copy truck.html to root, it's only a template
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function generateTruckPage(truck, template) {
    // The page will load data client-side, but we can pre-fill some SEO meta tags
    const title = `${truck.name} - ${truck.cuisine.join(', ')} Food Truck in ${truck.city} | StreetEats`;
    const description = `Discover ${truck.name}, a top-rated ${truck.cuisine.join(', ')} food truck in ${truck.city}, ${truck.country}. Known for ${truck.specialties.join(', ')}. Rating: ${truck.rating}⭐ | ${truck.priceRange}`;
    const keywords = `${truck.name}, food truck, ${truck.city}, ${truck.country}, ${truck.cuisine.join(', ')}, street food`;
    const pageUrl = `${BASE_URL}/truck/${truck.id}`;
    const image = truck.image || 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200';
    
    // Replace placeholders in template
    let page = template;
    page = page.replace(/<title id="page-title">.*?<\/title>/, `<title id="page-title">${title}</title>`);
    page = page.replace(/content=""/, `content="${description}"`);
    page = page.replace(/<meta name="keywords".*?>/, `<meta name="keywords" id="page-keywords" content="${keywords}">`);
    page = page.replace(/<link rel="canonical".*?>/, `<link rel="canonical" id="page-canonical" href="${pageUrl}">`);
    
    // Update all the meta tags with actual content
    page = page.replace(/id="og-url" content=""/, `id="og-url" content="${pageUrl}"`);
    page = page.replace(/id="og-title" content=""/, `id="og-title" content="${title}"`);
    page = page.replace(/id="og-description" content=""/, `id="og-description" content="${description}"`);
    page = page.replace(/id="og-image" content=""/, `id="og-image" content="${image}"`);
    
    page = page.replace(/id="twitter-url" content=""/, `id="twitter-url" content="${pageUrl}"`);
    page = page.replace(/id="twitter-title" content=""/, `id="twitter-title" content="${title}"`);
    page = page.replace(/id="twitter-description" content=""/, `id="twitter-description" content="${description}"`);
    page = page.replace(/id="twitter-image" content=""/, `id="twitter-image" content="${image}"`);
    
    return page;
}

function generateSitemap(trucks, baseUrl) {
    const now = new Date().toISOString();
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;
    
    trucks.forEach(truck => {
        xml += `  <url>
    <loc>${baseUrl}/truck/${truck.id}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    });
    
    xml += `</urlset>`;
    return xml;
}

function getTopCuisines(trucks) {
    const cuisineCount = {};
    trucks.forEach(truck => {
        truck.cuisine.forEach(cuisine => {
            cuisineCount[cuisine] = (cuisineCount[cuisine] || 0) + 1;
        });
    });
    return Object.entries(cuisineCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([cuisine, count]) => ({ cuisine, count }));
}

function getTopCities(trucks) {
    const cityCount = {};
    trucks.forEach(truck => {
        cityCount[truck.city] = (cityCount[truck.city] || 0) + 1;
    });
    return Object.entries(cityCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([city, count]) => ({ city, count }));
}

function updateJavaScriptForGitHubPages() {
    // Update app.js for static API
    const appJsPath = path.join(BUILD_DIR, 'app.js');
    let appJs = fs.readFileSync(appJsPath, 'utf8');
    
    // Replace API calls to use .json files
    appJs = appJs.replace(
        /const API_BASE = window\.location\.origin;/,
        `const API_BASE = '${BASE_URL}';`
    );
    appJs = appJs.replace(
        /fetch\(\`\$\{API_BASE\}\/api\/foodtrucks\`\)/g,
        `fetch(\`\${API_BASE}/api/foodtrucks.json\`)`
    );
    appJs = appJs.replace(
        /fetch\(\`\$\{API_BASE\}\/api\/foodtrucks\/\$\{truckId\}\`\)/g,
        `fetch(\`\${API_BASE}/api/foodtrucks/\${truckId}.json\`)`
    );
    appJs = appJs.replace(
        /fetch\(\`\$\{API_BASE\}\/api\/stats\`\)/g,
        `fetch(\`\${API_BASE}/api/stats.json\`)`
    );
    appJs = appJs.replace(
        /fetch\(\`\$\{API_BASE\}\/api\/cuisines\`\)/g,
        `fetch(\`\${API_BASE}/api/cuisines.json\`)`
    );
    appJs = appJs.replace(
        /fetch\(\`\$\{API_BASE\}\/api\/cities\`\)/g,
        `fetch(\`\${API_BASE}/api/cities.json\`)`
    );
    
    fs.writeFileSync(appJsPath, appJs);
    
    // Update truck.js for static API
    const truckJsPath = path.join(BUILD_DIR, 'truck.js');
    let truckJs = fs.readFileSync(truckJsPath, 'utf8');
    
    truckJs = truckJs.replace(
        /const API_BASE = window\.location\.origin;/,
        `const API_BASE = '${BASE_URL}';`
    );
    truckJs = truckJs.replace(
        /fetch\(\`\$\{API_BASE\}\/api\/foodtrucks\/\$\{truckId\}\`\)/g,
        `fetch(\`\${API_BASE}/api/foodtrucks/\${truckId}.json\`)`
    );
    truckJs = truckJs.replace(
        /fetch\(\`\$\{API_BASE\}\/api\/foodtrucks\?cuisine=\$\{truck\.cuisine\[0\]\}&limit=3\`\)/g,
        `fetch(\`\${API_BASE}/api/foodtrucks.json\`).then(r => r.json()).then(data => ({ trucks: data.trucks.filter(t => t.cuisine.includes(truck.cuisine[0])).slice(0, 3) }))`
    );
    truckJs = truckJs.replace(
        /fetch\(\`\$\{API_BASE\}\/api\/foodtrucks\?city=\$\{encodeURIComponent\(truck\.city\)\}&limit=4\`\)/g,
        `fetch(\`\${API_BASE}/api/foodtrucks.json\`).then(r => r.json()).then(data => ({ trucks: data.trucks.filter(t => t.city === truck.city).slice(0, 4) }))`
    );
    
    // Fix the related trucks function
    truckJs = truckJs.replace(
        /async function loadRelatedTrucks\(truck\) \{[\s\S]*?\n\}/,
        `async function loadRelatedTrucks(truck) {
    try {
        const response = await fetch(\`\${API_BASE}/api/foodtrucks.json\`);
        const data = await response.json();
        const relatedTrucks = data.trucks
            .filter(t => t.id !== truck.id && t.cuisine.some(c => truck.cuisine.includes(c)))
            .slice(0, 3);
        
        if (relatedTrucks.length === 0) {
            document.getElementById('related-trucks').innerHTML = '<p>No similar trucks found</p>';
            return;
        }
        
        const html = relatedTrucks.map(t => \`
            <a href="/foodtrucks/truck/\${t.id}" class="related-truck-item">
                <div class="related-truck-name">\${t.name}</div>
                <div class="related-truck-meta">
                    <span>⭐ \${t.rating}</span>
                    <span>\${t.city}</span>
                </div>
            </a>
        \`).join('');
        
        document.getElementById('related-trucks').innerHTML = html;
    } catch (error) {
        console.error('Error loading related trucks:', error);
    }
}`
    );
    
    // Fix the city trucks function
    truckJs = truckJs.replace(
        /async function loadCityTrucks\(truck\) \{[\s\S]*?\n\}/,
        `async function loadCityTrucks(truck) {
    try {
        const response = await fetch(\`\${API_BASE}/api/foodtrucks.json\`);
        const data = await response.json();
        const cityTrucks = data.trucks
            .filter(t => t.id !== truck.id && t.city === truck.city)
            .slice(0, 3);
        
        if (cityTrucks.length === 0) {
            document.getElementById('city-trucks').innerHTML = '<p>No other trucks found in this city</p>';
            return;
        }
        
        const html = cityTrucks.map(t => \`
            <div class="truck-card" onclick="window.location.href='/foodtrucks/truck/\${t.id}'">
                <img src="\${t.image}" alt="\${t.name}" class="truck-image" 
                     onerror="this.src='https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400'">
                <div class="truck-content">
                    <div class="truck-header">
                        <div>
                            <h3 class="truck-name">\${t.name}</h3>
                            <div class="truck-location">
                                📍 \${t.city}, \${t.country}
                            </div>
                        </div>
                        <div class="truck-rating">
                            ⭐ \${t.rating}
                        </div>
                    </div>
                    
                    <div class="truck-cuisines">
                        \${t.cuisine.map(c => \`<span class="cuisine-tag">\${c}</span>\`).join('')}
                    </div>
                    
                    <div class="truck-footer">
                        <span class="price-range">\${t.priceRange}</span>
                        \${t.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
                    </div>
                </div>
            </div>
        \`).join('');
        
        document.getElementById('city-trucks').innerHTML = html;
    } catch (error) {
        console.error('Error loading city trucks:', error);
    }
}`
    );
    
    fs.writeFileSync(truckJsPath, truckJs);
}

console.log('Build script completed successfully!');
