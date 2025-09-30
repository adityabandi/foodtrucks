#!/usr/bin/env node

/**
 * Generate lightweight truck pages for GitHub Pages
 * Creates individual directories with redirect index.html files
 */

const fs = require('fs');
const path = require('path');

// Load food truck data
const dataPath = path.join(__dirname, 'docs/data/foodtrucks.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const trucks = data.foodTrucks;

console.log(`🚚 Generating pages for ${trucks.length} food trucks...`);

const truckDir = path.join(__dirname, 'docs/truck');

// Template for individual truck pages
function generateTruckHTML(truck) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="0; url=./?id=${truck.id}">
    <link rel="canonical" href="./?id=${truck.id}">
    
    <!-- SEO Meta Tags -->
    <title>${truck.name} - ${truck.city}, ${truck.country} | StreetEats</title>
    <meta name="description" content="${truck.name} in ${truck.city}, ${truck.country}. ${truck.specialties.slice(0, 3).join(', ')}. ${truck.cuisine.slice(0, 3).join(', ')} cuisine. Rating: ${truck.rating}/5.0">
    <meta name="keywords" content="${truck.name}, food truck, ${truck.city}, ${truck.country}, ${truck.cuisine.join(', ')}, street food">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${truck.name} - ${truck.city}">
    <meta property="og:description" content="${truck.specialties.slice(0, 2).join(' • ')}">
    <meta property="og:image" content="${truck.image}">
    <meta property="og:type" content="restaurant">
    <meta property="og:url" content="https://adityabandi.github.io/foodtrucks/truck/${truck.id}/">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${truck.name}">
    <meta name="twitter:description" content="${truck.specialties.slice(0, 2).join(' • ')}">
    <meta name="twitter:image" content="${truck.image}">
    
    <!-- Schema.org markup for Google -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": "${truck.name.replace(/"/g, '\\"')}",
        "image": "${truck.image}",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "${truck.location.address.replace(/"/g, '\\"')}",
            "addressLocality": "${truck.city}",
            "addressCountry": "${truck.country}"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "${truck.rating}",
            "bestRating": "5.0"
        },
        "servesCuisine": ${JSON.stringify(truck.cuisine)},
        "priceRange": "${truck.priceRange}"
    }
    </script>
    
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .loading {
            text-align: center;
        }
        .truck-icon {
            font-size: 80px;
            animation: bounce 1s infinite;
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        h1 {
            font-size: 24px;
            margin: 20px 0 10px;
        }
        p {
            opacity: 0.9;
        }
        a {
            color: white;
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="loading">
        <div class="truck-icon">🚚</div>
        <h1>${truck.name}</h1>
        <p>${truck.city}, ${truck.country}</p>
        <p style="margin-top: 30px;">Redirecting...</p>
        <p style="font-size: 14px;"><a href="./?id=${truck.id}">Click here if not redirected</a></p>
    </div>
    <script>
        // Immediate redirect for browsers that don't support meta refresh
        window.location.href = './?id=${truck.id}';
    </script>
</body>
</html>`;
}

// Create directory for each truck
let created = 0;
let skipped = 0;

for (const truck of trucks) {
    const truckPath = path.join(truckDir, truck.id);
    const indexPath = path.join(truckPath, 'index.html');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(truckPath)) {
        fs.mkdirSync(truckPath, { recursive: true });
    }
    
    // Generate and write HTML
    const html = generateTruckHTML(truck);
    fs.writeFileSync(indexPath, html);
    created++;
    
    if (created % 1000 === 0) {
        console.log(`  ✓ Generated ${created} pages...`);
    }
}

console.log(`\n✅ Complete!`);
console.log(`   Created: ${created} truck pages`);
console.log(`   Location: docs/truck/`);
console.log(`\n📝 Each page includes:`);
console.log(`   - SEO meta tags`);
console.log(`   - Schema.org structured data`);
console.log(`   - Open Graph tags`);
console.log(`   - Instant redirect to dynamic page`);
console.log(`\n🚀 Ready for GitHub Pages deployment!`);
