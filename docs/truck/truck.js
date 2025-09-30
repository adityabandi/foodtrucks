// Dynamic Food Truck Detail Page Generator
// SEO-optimized single page that generates content on the fly

let truckData = null;
let allTrucks = [];

// Get truck ID from URL
function getTruckIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Load truck data
async function loadTruckData() {
    try {
        const response = await fetch('../data/foodtrucks.json');
        const data = await response.json();
        allTrucks = data.foodTrucks;
        
        const truckId = getTruckIdFromUrl();
        if (!truckId) {
            showError();
            return;
        }
        
        truckData = allTrucks.find(t => t.id === truckId);
        
        if (!truckData) {
            showError();
            return;
        }
        
        renderTruckPage();
        
    } catch (error) {
        console.error('Error loading truck data:', error);
        showError();
    }
}

// Show error state
function showError() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error').style.display = 'block';
}

// Render the truck page
function renderTruckPage() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('truck-details').style.display = 'block';
    
    // Set SEO meta tags
    setSEOMetaTags();
    
    // Populate page content
    setHeroSection();
    setMainContent();
    setSidebar();
    setSEOContent();
    loadSimilarTrucks();
}

// Set SEO meta tags
function setSEOMetaTags() {
    const title = `${truckData.name} - ${truckData.city}, ${truckData.country} | StreetEats Food Trucks`;
    const description = `${truckData.name} in ${truckData.city} serves ${truckData.cuisine.join(', ')}. Rated ${truckData.rating}⭐. Specialties: ${truckData.specialties.slice(0, 3).join(', ')}. Discover authentic street food!`;
    const keywords = `${truckData.name}, food truck ${truckData.city}, ${truckData.cuisine.join(', ')}, street food ${truckData.country}, ${truckData.specialties.join(', ')}, mobile food vendor`;
    
    // Page title
    document.getElementById('page-title').textContent = title;
    document.title = title;
    
    // Meta tags
    document.getElementById('meta-description').setAttribute('content', description);
    document.getElementById('meta-keywords').setAttribute('content', keywords);
    
    // Open Graph
    document.getElementById('og-title').setAttribute('content', title);
    document.getElementById('og-description').setAttribute('content', description);
    document.getElementById('og-image').setAttribute('content', truckData.image);
    
    // Twitter
    document.getElementById('twitter-title').setAttribute('content', title);
    document.getElementById('twitter-description').setAttribute('content', description);
    
    // Schema.org structured data
    const schema = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": truckData.name,
        "image": truckData.image,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": truckData.city,
            "addressCountry": truckData.country
        },
        "servesCuisine": truckData.cuisine,
        "priceRange": truckData.priceRange,
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": truckData.rating,
            "bestRating": "5",
            "worstRating": "1"
        }
    };
    
    document.getElementById('schema-org').textContent = JSON.stringify(schema);
}

// Set hero section
function setHeroSection() {
    document.getElementById('hero-image').src = truckData.image;
    document.getElementById('hero-image').alt = `${truckData.name} - ${truckData.city} Food Truck`;
    
    document.getElementById('breadcrumb-city').textContent = truckData.city;
    document.getElementById('breadcrumb-name').textContent = truckData.name;
    
    document.getElementById('truck-name').textContent = truckData.name;
    document.getElementById('truck-location').textContent = `📍 ${truckData.city}, ${truckData.country}`;
    document.getElementById('truck-rating').textContent = `⭐ ${truckData.rating} Stars`;
    document.getElementById('truck-price').textContent = `💵 ${truckData.priceRange}`;
    
    if (truckData.verified) {
        document.getElementById('verified-badge').style.display = 'inline-flex';
    }
}

// Set main content
function setMainContent() {
    // Truck name references
    document.getElementById('truck-name-2').textContent = truckData.name;
    document.getElementById('truck-name-3').textContent = truckData.name;
    document.getElementById('city-name').textContent = truckData.city;
    
    // About section
    const aboutHTML = `
        <p><strong>${truckData.name}</strong> is a ${truckData.verified ? 'verified' : 'popular'} food truck located in <strong>${truckData.city}, ${truckData.country}</strong>, specializing in authentic <strong>${truckData.cuisine.join(', ')}</strong> cuisine.</p>
        <p>This mobile food vendor has earned a stellar <strong>${truckData.rating} star rating</strong> from customers who appreciate their commitment to quality ingredients and traditional cooking methods.</p>
        <p>Operating in the heart of ${truckData.city}, this food truck has become a local favorite for those seeking genuine street food flavors.</p>
    `;
    document.getElementById('truck-description').innerHTML = aboutHTML;
    
    // Cuisine tags
    document.getElementById('cuisine-tags').innerHTML = truckData.cuisine
        .map(c => `<span class="cuisine-tag">${c}</span>`)
        .join('');
    
    // Specialties
    const specialtiesHTML = truckData.specialties
        .map(specialty => `
            <div class="specialty-item">
                <span class="specialty-icon">🍽️</span>
                <span class="specialty-name">${specialty}</span>
            </div>
        `)
        .join('');
    document.getElementById('specialties-list').innerHTML = specialtiesHTML;
    
    // Why visit
    const whyVisitReasons = [
        `Authentic ${truckData.cuisine[0]} cuisine prepared with traditional methods`,
        `Highly rated (${truckData.rating}⭐) by local food enthusiasts`,
        `Convenient location in ${truckData.city}`,
        `Affordable pricing (${truckData.priceRange})`,
        `${truckData.verified ? 'Verified vendor with proven quality standards' : 'Established presence in the local food scene'}`
    ];
    
    document.getElementById('why-visit').innerHTML = `
        <ul class="why-visit-list">
            ${whyVisitReasons.map(reason => `<li>${reason}</li>`).join('')}
        </ul>
    `;
    
    // Location details
    const locationHTML = `
        <p><strong>${truckData.name}</strong> operates in <strong>${truckData.city}, ${truckData.country}</strong>.</p>
        <p><strong>Address:</strong> ${truckData.location.address}</p>
        <p>This food truck is part of the vibrant street food scene in ${truckData.city}, known for its diverse culinary offerings. 
        ${truckData.city} is famous for its food truck culture, and this vendor represents the best of what the city has to offer.</p>
        <p><strong>Pro tip:</strong> Food trucks can move locations. ${truckData.contact.website || truckData.contact.twitter || truckData.contact.instagram ? 'Check their social media or website for current location updates.' : 'Visit during peak lunch or dinner hours for the best chance of finding them.'}</p>
    `;
    document.getElementById('location-details').innerHTML = locationHTML;
    
    // Rating display
    document.getElementById('rating-display').textContent = truckData.rating;
    document.getElementById('rating-stars').innerHTML = '⭐'.repeat(Math.floor(truckData.rating));
    
    // Review summary
    const reviewSummaryHTML = `
        <p>With a ${truckData.rating} star rating, <strong>${truckData.name}</strong> consistently receives positive feedback from customers who appreciate:</p>
        <ul>
            <li><strong>Food Quality:</strong> Fresh ingredients and authentic preparation methods</li>
            <li><strong>Service:</strong> Friendly staff and efficient order fulfillment</li>
            <li><strong>Value:</strong> Reasonable prices (${truckData.priceRange}) for quality portions</li>
            <li><strong>Atmosphere:</strong> Authentic street food experience</li>
        </ul>
        <p>Customers particularly praise their ${truckData.specialties.slice(0, 2).join(' and ')}, which have become signature dishes in the ${truckData.city} food scene.</p>
    `;
    document.getElementById('review-summary').innerHTML = reviewSummaryHTML;
}

// Set sidebar
function setSidebar() {
    document.getElementById('sidebar-location').textContent = truckData.city;
    document.getElementById('sidebar-country').textContent = truckData.country;
    document.getElementById('sidebar-rating').textContent = `${truckData.rating} ⭐`;
    document.getElementById('sidebar-price').textContent = truckData.priceRange;
    
    // Operating hours
    if (truckData.operatingHours && Object.keys(truckData.operatingHours).length > 0) {
        const hoursHTML = Object.entries(truckData.operatingHours)
            .map(([day, hours]) => `
                <div class="hours-row">
                    <span class="day">${day.charAt(0).toUpperCase() + day.slice(1)}</span>
                    <span class="hours">${hours}</span>
                </div>
            `)
            .join('');
        document.getElementById('operating-hours').innerHTML = hoursHTML;
    } else {
        document.getElementById('hours-card').style.display = 'none';
    }
    
    // Contact links
    const contactLinks = [];
    if (truckData.contact.phone) {
        contactLinks.push(`<a href="tel:${truckData.contact.phone}" class="contact-link">📞 ${truckData.contact.phone}</a>`);
    }
    if (truckData.contact.website) {
        contactLinks.push(`<a href="${truckData.contact.website}" target="_blank" class="contact-link">🌐 Website</a>`);
    }
    if (truckData.contact.twitter) {
        contactLinks.push(`<a href="https://twitter.com/${truckData.contact.twitter}" target="_blank" class="contact-link">🐦 Twitter</a>`);
    }
    if (truckData.contact.instagram) {
        contactLinks.push(`<a href="https://instagram.com/${truckData.contact.instagram}" target="_blank" class="contact-link">📷 Instagram</a>`);
    }
    if (truckData.contact.facebook) {
        contactLinks.push(`<a href="${truckData.contact.facebook}" target="_blank" class="contact-link">👥 Facebook</a>`);
    }
    if (truckData.contact.yelp) {
        contactLinks.push(`<a href="${truckData.contact.yelp}" target="_blank" class="contact-link">⭐ Yelp</a>`);
    }
    if (truckData.contact.google) {
        contactLinks.push(`<a href="${truckData.contact.google}" target="_blank" class="contact-link">🗺️ Google Maps</a>`);
    }
    if (truckData.contact.osm) {
        contactLinks.push(`<a href="${truckData.contact.osm}" target="_blank" class="contact-link">🗺️ OpenStreetMap</a>`);
    }
    
    if (contactLinks.length > 0) {
        document.getElementById('contact-links').innerHTML = contactLinks.join('');
    } else {
        document.getElementById('contact-card').style.display = 'none';
    }
}

// Set SEO content
function setSEOContent() {
    document.getElementById('seo-truck-name').textContent = truckData.name;
    document.getElementById('seo-city').textContent = truckData.city;
    
    const seoHTML = `
        <p>Looking for authentic <strong>${truckData.cuisine.join(', ')}</strong> in <strong>${truckData.city}</strong>? 
        <strong>${truckData.name}</strong> is your destination for genuine street food flavors.</p>
        
        <h3>About ${truckData.cuisine[0]} Food Trucks in ${truckData.city}</h3>
        <p>${truckData.city}, ${truckData.country} has a thriving food truck culture, with vendors offering cuisines from around the world. 
        ${truckData.name} stands out by specializing in ${truckData.cuisine.join(' and ')} dishes, bringing authentic flavors to the streets of ${truckData.city}.</p>
        
        <h3>What Makes ${truckData.name} Special?</h3>
        <p>This food truck isn't just about convenience – it's about experiencing authentic ${truckData.cuisine[0]} cuisine in a casual, accessible setting. 
        Their signature dishes include ${truckData.specialties.slice(0, 3).join(', ')}, each prepared with traditional techniques and quality ingredients.</p>
        
        <h3>Street Food Culture in ${truckData.city}</h3>
        <p>${truckData.city} is known for its diverse food scene, and food trucks play a vital role in making international cuisines accessible to everyone. 
        Whether you're a local or a visitor, exploring the food truck scene is one of the best ways to experience the culinary diversity of ${truckData.city}.</p>
        
        <h3>Visit ${truckData.name} Today</h3>
        <p>With a ${truckData.rating} star rating and prices in the ${truckData.priceRange} range, ${truckData.name} offers excellent value for authentic ${truckData.cuisine[0]} food. 
        ${truckData.verified ? 'As a verified vendor, you can trust in their commitment to quality and food safety.' : 'Join the many satisfied customers who have made this a regular stop for street food.'}</p>
        
        <p><strong>Popular searches:</strong> ${truckData.name}, food trucks ${truckData.city}, ${truckData.cuisine[0]} food truck, 
        street food ${truckData.city}, ${truckData.specialties[0]}, best food trucks ${truckData.country}, 
        ${truckData.city} street food, mobile food vendors ${truckData.city}</p>
    `;
    
    document.getElementById('seo-description').innerHTML = seoHTML;
}

// Load similar trucks
function loadSimilarTrucks() {
    // Find trucks in same city or with same cuisine
    const similar = allTrucks
        .filter(t => 
            t.id !== truckData.id && 
            (t.city === truckData.city || t.cuisine.some(c => truckData.cuisine.includes(c)))
        )
        .slice(0, 5);
    
    if (similar.length === 0) {
        document.getElementById('similar-trucks').innerHTML = '<p>No similar trucks found</p>';
        return;
    }
    
    const similarHTML = similar
        .map(truck => `
            <a href="index.html?id=${truck.id}" class="similar-truck-item">
                <div class="similar-truck-image">
                    <img src="${truck.image}" alt="${truck.name}" onerror="this.src='https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200'">
                </div>
                <div class="similar-truck-info">
                    <h4>${truck.name}</h4>
                    <p>${truck.city}</p>
                    <span class="similar-rating">⭐ ${truck.rating}</span>
                </div>
            </a>
        `)
        .join('');
    
    document.getElementById('similar-trucks').innerHTML = similarHTML;
}

// Initialize page
document.addEventListener('DOMContentLoaded', loadTruckData);
