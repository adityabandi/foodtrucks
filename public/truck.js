// API Base URL
const API_BASE = window.location.origin;

// Get truck ID from URL path
const getTruckIdFromUrl = () => {
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1];
};

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
    const truckId = getTruckIdFromUrl();
    await loadTruckDetails(truckId);
});

// Load and display food truck details
async function loadTruckDetails(truckId) {
    try {
        const response = await fetch(`${API_BASE}/api/foodtrucks/${truckId}`);
        
        if (!response.ok) {
            throw new Error('Food truck not found');
        }
        
        const truck = await response.json();
        
        // Hide loading, show content
        document.getElementById('loading').style.display = 'none';
        document.getElementById('truck-detail').style.display = 'block';
        
        // Populate all the content
        populatePageContent(truck);
        updateSEOMetaTags(truck);
        addStructuredData(truck);
        
        // Load related content
        loadRelatedTrucks(truck);
        loadCityTrucks(truck);
        
    } catch (error) {
        console.error('Error loading truck details:', error);
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').style.display = 'block';
    }
}

// Populate page content
function populatePageContent(truck) {
    // Hero Section
    document.getElementById('truck-image').src = truck.image || 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200';
    document.getElementById('truck-image').alt = `${truck.name} - Food Truck in ${truck.city}`;
    document.getElementById('truck-name').textContent = truck.name;
    document.getElementById('truck-location').innerHTML = `📍 ${truck.city}, ${truck.country}`;
    document.getElementById('truck-rating').innerHTML = `⭐ ${truck.rating} Rating`;
    document.getElementById('truck-price').innerHTML = `💵 ${truck.priceRange}`;
    
    // Location & Hours
    document.getElementById('truck-address').textContent = truck.location.address;
    
    const hoursHTML = Object.entries(truck.operatingHours)
        .map(([day, hours]) => `
            <div class="hour-row">
                <span class="day-name">${capitalizeFirst(day)}</span>
                <span class="time-range">${hours}</span>
            </div>
        `).join('');
    document.getElementById('truck-hours').innerHTML = hoursHTML;
    
    // Cuisines
    const cuisinesHTML = truck.cuisine
        .map(c => `<span class="cuisine-tag-large">${c}</span>`)
        .join('');
    document.getElementById('truck-cuisines').innerHTML = cuisinesHTML;
    
    // Specialties
    const specialtiesHTML = truck.specialties
        .map(s => `<li>${s}</li>`)
        .join('');
    document.getElementById('truck-specialties').innerHTML = specialtiesHTML;
    
    // About Section - Generate rich content
    const aboutText = generateAboutText(truck);
    document.getElementById('truck-about').innerHTML = aboutText;
    
    // Reviews Summary
    const reviewsHTML = generateReviewsSummary(truck);
    document.getElementById('truck-reviews').innerHTML = reviewsHTML;
    
    // Contact Information
    const contactHTML = generateContactInfo(truck);
    document.getElementById('truck-contact').innerHTML = contactHTML;
    
    // Quick Info
    const quickInfoHTML = generateQuickInfo(truck);
    document.getElementById('truck-quick-info').innerHTML = quickInfoHTML;
    
    // City name for related section
    document.getElementById('city-name').textContent = truck.city;
}

// Generate rich about text for SEO
function generateAboutText(truck) {
    const cuisineList = truck.cuisine.join(', ');
    const specialtyList = truck.specialties.slice(0, 3).join(', ');
    
    return `
        <p><strong>${truck.name}</strong> is a popular food truck located in ${truck.city}, ${truck.country}, specializing in ${cuisineList} cuisine.</p>
        
        <p>Known for their exceptional ${specialtyList}, this ${truck.verified ? 'verified' : ''} food truck has earned a rating of ${truck.rating} stars from local food lovers.</p>
        
        <p>Whether you're a local or just visiting ${truck.city}, ${truck.name} offers an authentic street food experience with ${truck.priceRange === '$' ? 'budget-friendly' : truck.priceRange === '$$' ? 'moderately-priced' : 'premium'} options that won't disappoint.</p>
        
        ${truck.verified ? '<p>✅ This food truck is verified by StreetEats, ensuring you get accurate and up-to-date information.</p>' : ''}
        
        <p>Visit ${truck.name} at ${truck.location.address} to experience some of the best street food ${truck.city} has to offer!</p>
    `;
}

// Generate reviews summary
function generateReviewsSummary(truck) {
    const reviewCount = truck.reviewCount || Math.floor(Math.random() * 100) + 20;
    const rating = truck.rating;
    
    const stars = '⭐'.repeat(Math.floor(rating));
    
    return `
        <div class="review-score">
            <div class="score-large">${rating}</div>
            <div class="score-details">
                <div class="stars">${stars}</div>
                <div class="review-count">${reviewCount} reviews</div>
            </div>
        </div>
        <p class="review-text">Customers love ${truck.name} for its ${truck.specialties[0].toLowerCase()} and friendly service. The ${truck.cuisine[0]} food is consistently rated as some of the best in ${truck.city}.</p>
    `;
}

// Generate contact information
function generateContactInfo(truck) {
    let html = '';
    
    if (truck.contact.phone) {
        html += `
            <div class="contact-item">
                <span class="contact-icon">📱</span>
                <a href="tel:${truck.contact.phone}" class="contact-link">${truck.contact.phone}</a>
            </div>
        `;
    }
    
    if (truck.contact.website && !truck.contact.website.includes('yelp.com')) {
        html += `
            <div class="contact-item">
                <span class="contact-icon">🌐</span>
                <a href="${truck.contact.website}" target="_blank" rel="noopener" class="contact-link">Website</a>
            </div>
        `;
    }
    
    if (truck.contact.twitter) {
        html += `
            <div class="contact-item">
                <span class="contact-icon">🐦</span>
                <a href="https://twitter.com/${truck.contact.twitter.replace('@', '')}" target="_blank" rel="noopener" class="contact-link">${truck.contact.twitter}</a>
            </div>
        `;
    }
    
    if (truck.contact.instagram) {
        html += `
            <div class="contact-item">
                <span class="contact-icon">📸</span>
                <a href="https://instagram.com/${truck.contact.instagram.replace('@', '')}" target="_blank" rel="noopener" class="contact-link">${truck.contact.instagram}</a>
            </div>
        `;
    }
    
    if (!html) {
        html = '<p class="no-contact">Contact information not available</p>';
    }
    
    return html;
}

// Generate quick info
function generateQuickInfo(truck) {
    return `
        <div class="info-row">
            <span class="info-label">Cuisine Type</span>
            <span class="info-value">${truck.cuisine.join(', ')}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Price Range</span>
            <span class="info-value">${truck.priceRange}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Rating</span>
            <span class="info-value">⭐ ${truck.rating}/5</span>
        </div>
        <div class="info-row">
            <span class="info-label">Location</span>
            <span class="info-value">${truck.city}, ${truck.country}</span>
        </div>
        ${truck.verified ? `
        <div class="info-row">
            <span class="info-label">Status</span>
            <span class="info-value verified-badge">✓ Verified</span>
        </div>
        ` : ''}
    `;
}

// Load related trucks (same cuisine or city)
async function loadRelatedTrucks(truck) {
    try {
        const response = await fetch(`${API_BASE}/api/foodtrucks?cuisine=${truck.cuisine[0]}&limit=3`);
        const data = await response.json();
        const relatedTrucks = data.trucks.filter(t => t.id !== truck.id).slice(0, 3);
        
        if (relatedTrucks.length === 0) {
            document.getElementById('related-trucks').innerHTML = '<p>No similar trucks found</p>';
            return;
        }
        
        const html = relatedTrucks.map(t => `
            <a href="/truck/${t.id}" class="related-truck-item">
                <div class="related-truck-name">${t.name}</div>
                <div class="related-truck-meta">
                    <span>⭐ ${t.rating}</span>
                    <span>${t.city}</span>
                </div>
            </a>
        `).join('');
        
        document.getElementById('related-trucks').innerHTML = html;
    } catch (error) {
        console.error('Error loading related trucks:', error);
    }
}

// Load more trucks from same city
async function loadCityTrucks(truck) {
    try {
        const response = await fetch(`${API_BASE}/api/foodtrucks?city=${encodeURIComponent(truck.city)}&limit=4`);
        const data = await response.json();
        const cityTrucks = data.trucks.filter(t => t.id !== truck.id).slice(0, 3);
        
        if (cityTrucks.length === 0) {
            document.getElementById('city-trucks').innerHTML = '<p>No other trucks found in this city</p>';
            return;
        }
        
        const html = cityTrucks.map(t => `
            <div class="truck-card" onclick="window.location.href='/truck/${t.id}'">
                <img src="${t.image}" alt="${t.name}" class="truck-image" 
                     onerror="this.src='https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400'">
                <div class="truck-content">
                    <div class="truck-header">
                        <div>
                            <h3 class="truck-name">${t.name}</h3>
                            <div class="truck-location">
                                📍 ${t.city}, ${t.country}
                            </div>
                        </div>
                        <div class="truck-rating">
                            ⭐ ${t.rating}
                        </div>
                    </div>
                    
                    <div class="truck-cuisines">
                        ${t.cuisine.map(c => `<span class="cuisine-tag">${c}</span>`).join('')}
                    </div>
                    
                    <div class="truck-footer">
                        <span class="price-range">${t.priceRange}</span>
                        ${t.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
                    </div>
                </div>
            </div>
        `).join('');
        
        document.getElementById('city-trucks').innerHTML = html;
    } catch (error) {
        console.error('Error loading city trucks:', error);
    }
}

// Update SEO meta tags
function updateSEOMetaTags(truck) {
    const pageUrl = window.location.href;
    const title = `${truck.name} - ${truck.cuisine.join(', ')} Food Truck in ${truck.city} | StreetEats`;
    const description = `Discover ${truck.name}, a top-rated ${truck.cuisine.join(', ')} food truck in ${truck.city}, ${truck.country}. Known for ${truck.specialties.join(', ')}. Rating: ${truck.rating}⭐ | ${truck.priceRange}`;
    const keywords = `${truck.name}, food truck, ${truck.city}, ${truck.country}, ${truck.cuisine.join(', ')}, street food, ${truck.specialties.join(', ')}`;
    
    // Update page title
    document.getElementById('page-title').textContent = title;
    document.title = title;
    
    // Update meta tags
    document.getElementById('page-description').setAttribute('content', description);
    document.getElementById('page-keywords').setAttribute('content', keywords);
    document.getElementById('page-canonical').setAttribute('href', pageUrl);
    
    // Open Graph tags
    document.getElementById('og-url').setAttribute('content', pageUrl);
    document.getElementById('og-title').setAttribute('content', title);
    document.getElementById('og-description').setAttribute('content', description);
    document.getElementById('og-image').setAttribute('content', truck.image || 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200');
    
    // Twitter tags
    document.getElementById('twitter-url').setAttribute('content', pageUrl);
    document.getElementById('twitter-title').setAttribute('content', title);
    document.getElementById('twitter-description').setAttribute('content', description);
    document.getElementById('twitter-image').setAttribute('content', truck.image || 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200');
}

// Add structured data for SEO (Schema.org)
function addStructuredData(truck) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "FoodEstablishment",
        "name": truck.name,
        "image": truck.image || 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200',
        "description": `${truck.name} is a ${truck.cuisine.join(', ')} food truck in ${truck.city}, ${truck.country}. Known for ${truck.specialties.join(', ')}.`,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": truck.location.address,
            "addressLocality": truck.city,
            "addressCountry": truck.country
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": truck.location.lat,
            "longitude": truck.location.lng
        },
        "url": window.location.href,
        "telephone": truck.contact.phone || "",
        "servesCuisine": truck.cuisine,
        "priceRange": truck.priceRange,
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": truck.rating,
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": truck.reviewCount || "50"
        },
        "openingHoursSpecification": Object.entries(truck.operatingHours).map(([day, hours]) => ({
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": capitalizeFirst(day),
            "opens": hours.split('-')[0]?.trim() || "varies",
            "closes": hours.split('-')[1]?.trim() || "varies"
        }))
    };
    
    document.getElementById('structured-data').textContent = JSON.stringify(structuredData, null, 2);
}

// Helper function to capitalize first letter
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
