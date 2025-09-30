// API Base URL
const API_BASE = window.location.origin;

let allTrucks = [];
let filteredTrucks = [];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadStatistics();
    loadCuisines();
    loadCities();
    loadFoodTrucks();
    
    // Add enter key support for search
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            applyFilters();
        }
    });
});

// Load statistics
async function loadStatistics() {
    try {
        const response = await fetch(`${API_BASE}/api/stats`);
        const stats = await response.json();
        
        document.getElementById('totalTrucks').textContent = stats.totalTrucks + '+';
        document.getElementById('totalCities').textContent = stats.totalCities + '+';
        document.getElementById('totalCountries').textContent = stats.totalCountries + '+';
        
        document.getElementById('statCountries').textContent = stats.totalCountries;
        document.getElementById('statCities').textContent = stats.totalCities;
        document.getElementById('avgRating').textContent = stats.averageRating;
        document.getElementById('cuisineCount').textContent = stats.topCuisines.length + '+';
        
        // Display top cuisines
        const cuisineList = document.getElementById('topCuisines');
        cuisineList.innerHTML = stats.topCuisines
            .map(item => `<div class="cuisine-item">${item.cuisine} (${item.count})</div>`)
            .join('');
    } catch (error) {
        console.error('Error loading statistics:', error);
    }
}

// Load cuisines for filter
async function loadCuisines() {
    try {
        const response = await fetch(`${API_BASE}/api/cuisines`);
        const cuisines = await response.json();
        
        const select = document.getElementById('cuisineFilter');
        cuisines.forEach(cuisine => {
            const option = document.createElement('option');
            option.value = cuisine;
            option.textContent = cuisine;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading cuisines:', error);
    }
}

// Load cities for filter
async function loadCities() {
    try {
        const response = await fetch(`${API_BASE}/api/cities`);
        const cities = await response.json();
        
        const select = document.getElementById('cityFilter');
        const uniqueCities = [...new Set(cities.map(c => c.city))].sort();
        
        uniqueCities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading cities:', error);
    }
}

// Load all food trucks
async function loadFoodTrucks() {
    try {
        document.getElementById('resultsCount').textContent = 'Loading food trucks...';
        
        const response = await fetch(`${API_BASE}/api/foodtrucks`);
        const data = await response.json();
        
        allTrucks = data.trucks;
        filteredTrucks = allTrucks;
        displayTrucks(filteredTrucks);
        updateResultsCount(filteredTrucks.length);
    } catch (error) {
        console.error('Error loading food trucks:', error);
        document.getElementById('resultsCount').textContent = 'Error loading food trucks';
    }
}

// Apply filters
async function applyFilters() {
    const search = document.getElementById('searchInput').value;
    const cuisine = document.getElementById('cuisineFilter').value;
    const city = document.getElementById('cityFilter').value;
    const priceRange = document.getElementById('priceFilter').value;
    const minRating = document.getElementById('ratingFilter').value;
    
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (cuisine) params.append('cuisine', cuisine);
    if (city) params.append('city', city);
    if (priceRange) params.append('priceRange', priceRange);
    if (minRating) params.append('minRating', minRating);
    
    try {
        const response = await fetch(`${API_BASE}/api/foodtrucks?${params}`);
        const data = await response.json();
        
        filteredTrucks = data.trucks;
        displayTrucks(filteredTrucks);
        updateResultsCount(filteredTrucks.length);
    } catch (error) {
        console.error('Error applying filters:', error);
    }
}

// Clear all filters
function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('cuisineFilter').value = '';
    document.getElementById('cityFilter').value = '';
    document.getElementById('priceFilter').value = '';
    document.getElementById('ratingFilter').value = '';
    
    filteredTrucks = allTrucks;
    displayTrucks(filteredTrucks);
    updateResultsCount(filteredTrucks.length);
}

// Display food trucks
function displayTrucks(trucks) {
    const grid = document.getElementById('trucksGrid');
    
    if (trucks.length === 0) {
        grid.innerHTML = `
            <div class="loading" style="grid-column: 1/-1;">
                No food trucks found matching your criteria. Try adjusting your filters.
            </div>
        `;
        return;
    }
    
    grid.innerHTML = trucks.map(truck => `
        <div class="truck-card" onclick="showTruckDetails('${truck.id}')">
            <img src="${truck.image}" alt="${truck.name}" class="truck-image" 
                 onerror="this.src='https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400'">
            <div class="truck-content">
                <div class="truck-header">
                    <div>
                        <h3 class="truck-name">${truck.name}</h3>
                        <div class="truck-location">
                            📍 ${truck.city}, ${truck.country}
                        </div>
                    </div>
                    <div class="truck-rating">
                        ⭐ ${truck.rating}
                    </div>
                </div>
                
                <div class="truck-cuisines">
                    ${truck.cuisine.map(c => `<span class="cuisine-tag">${c}</span>`).join('')}
                </div>
                
                <div class="truck-specialties">
                    🍽️ ${truck.specialties.join(', ')}
                </div>
                
                <div class="truck-footer">
                    <span class="price-range">${truck.priceRange}</span>
                    ${truck.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Update results count
function updateResultsCount(count) {
    const text = count === 1 ? '1 food truck found' : `${count} food trucks found`;
    document.getElementById('resultsCount').textContent = text;
}

// Show truck details in modal
async function showTruckDetails(truckId) {
    try {
        const response = await fetch(`${API_BASE}/api/foodtrucks/${truckId}`);
        const truck = await response.json();
        
        const modal = document.getElementById('truckModal');
        const modalBody = document.getElementById('modalBody');
        
        modalBody.innerHTML = `
            <img src="${truck.image}" alt="${truck.name}" class="modal-header-image"
                 onerror="this.src='https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800'">
            
            <div class="modal-body">
                <h2 class="modal-title">${truck.name}</h2>
                
                <div class="modal-location">
                    📍 ${truck.location.address}, ${truck.city}, ${truck.country}
                </div>
                
                <div class="modal-rating-price">
                    <div class="modal-rating">
                        ⭐ ${truck.rating} Rating
                    </div>
                    <div class="modal-price">
                        💵 ${truck.priceRange}
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3>🍽️ Cuisine Types</h3>
                    <div class="modal-cuisines">
                        ${truck.cuisine.map(c => `<span class="cuisine-tag">${c}</span>`).join('')}
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3>⭐ Specialties</h3>
                    <ul class="modal-specialties">
                        ${truck.specialties.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3>⏰ Operating Hours</h3>
                    <div class="hours-grid">
                        ${Object.entries(truck.operatingHours).map(([day, hours]) => `
                            <div class="hour-item">
                                <span class="day">${day}</span>
                                <span class="time">${hours}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3>📞 Contact Information</h3>
                    <div class="contact-info">
                        ${truck.contact.phone ? `
                            <div class="contact-item">
                                📱 <a href="tel:${truck.contact.phone}">${truck.contact.phone}</a>
                            </div>
                        ` : ''}
                        ${truck.contact.website ? `
                            <div class="contact-item">
                                🌐 <a href="${truck.contact.website}" target="_blank">${truck.contact.website}</a>
                            </div>
                        ` : ''}
                        ${truck.contact.twitter ? `
                            <div class="contact-item">
                                🐦 <a href="https://twitter.com/${truck.contact.twitter.replace('@', '')}" target="_blank">${truck.contact.twitter}</a>
                            </div>
                        ` : ''}
                    </div>
                </div>
                
                ${truck.verified ? `
                    <div class="modal-section">
                        <div class="verified-badge" style="justify-content: center; font-size: 16px; padding: 10px;">
                            ✓ This is a verified food truck
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } catch (error) {
        console.error('Error loading truck details:', error);
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('truckModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('truckModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});
