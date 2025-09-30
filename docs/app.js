// Static version for GitHub Pages - no backend needed
let allTrucks = [];
let foodTruckData = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadFoodTrucks();
    
    // Add enter key support for search
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            applyFilters();
        }
    });
});

// Load food truck data from JSON file
async function loadFoodTrucks() {
    try {
        const response = await fetch('./data/foodtrucks.json');
        foodTruckData = await response.json();
        allTrucks = foodTruckData.foodTrucks;
        
        // Initialize UI
        loadStatistics();
        loadCuisines();
        loadCities();
        displayTrucks(allTrucks);
        
    } catch (error) {
        console.error('Error loading food trucks:', error);
        document.querySelector('.trucks-grid').innerHTML = 
            '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--cherry-red); font-size: 18px;">Failed to load food trucks. Please refresh the page.</p>';
    }
}

// Load statistics
function loadStatistics() {
    const stats = foodTruckData.metadata;
    
    document.getElementById('totalTrucks').textContent = stats.totalTrucks + '+';
    document.getElementById('totalCities').textContent = stats.cities + '+';
    document.getElementById('totalCountries').textContent = stats.countries + '+';
    
    document.getElementById('statCountries').textContent = stats.countries;
    document.getElementById('statCities').textContent = stats.cities;
    
    // Calculate average rating
    const avgRating = (allTrucks.reduce((sum, t) => sum + t.rating, 0) / allTrucks.length).toFixed(1);
    document.getElementById('avgRating').textContent = avgRating;
    
    // Get top cuisines
    const cuisineCount = {};
    allTrucks.forEach(truck => {
        truck.cuisine.forEach(c => {
            cuisineCount[c] = (cuisineCount[c] || 0) + 1;
        });
    });
    
    const topCuisines = Object.entries(cuisineCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15);
    
    document.getElementById('cuisineCount').textContent = Object.keys(cuisineCount).length + '+';
    
    // Display top cuisines
    const cuisineList = document.getElementById('topCuisines');
    cuisineList.innerHTML = topCuisines
        .map(([cuisine, count]) => `<div class="cuisine-item">${cuisine} (${count})</div>`)
        .join('');
}

// Load cuisines for filter
function loadCuisines() {
    const cuisines = [...new Set(allTrucks.flatMap(t => t.cuisine))].sort();
    const select = document.getElementById('cuisineFilter');
    
    cuisines.forEach(cuisine => {
        const option = document.createElement('option');
        option.value = cuisine;
        option.textContent = cuisine;
        select.appendChild(option);
    });
}

// Load cities for filter
function loadCities() {
    const cities = [...new Set(allTrucks.map(t => t.city))].sort();
    const select = document.getElementById('cityFilter');
    
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        select.appendChild(option);
    });
}

// Apply filters
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedCity = document.getElementById('cityFilter').value;
    const selectedCuisine = document.getElementById('cuisineFilter').value;
    const selectedPrice = document.getElementById('priceFilter').value;
    
    const filtered = allTrucks.filter(truck => {
        const matchesSearch = !searchTerm || 
            truck.name.toLowerCase().includes(searchTerm) ||
            truck.city.toLowerCase().includes(searchTerm) ||
            truck.cuisine.some(c => c.toLowerCase().includes(searchTerm)) ||
            truck.specialties.some(s => s.toLowerCase().includes(searchTerm));
        
        const matchesCity = !selectedCity || truck.city === selectedCity;
        const matchesCuisine = !selectedCuisine || truck.cuisine.includes(selectedCuisine);
        const matchesPrice = !selectedPrice || truck.priceRange === selectedPrice;
        
        return matchesSearch && matchesCity && matchesCuisine && matchesPrice;
    });
    
    displayTrucks(filtered);
}

// Clear all filters
function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('cityFilter').value = '';
    document.getElementById('cuisineFilter').value = '';
    document.getElementById('priceFilter').value = '';
    displayTrucks(allTrucks);
}

// Display trucks
function displayTrucks(trucks) {
    const grid = document.querySelector('.trucks-grid');
    const resultsInfo = document.querySelector('.results-info');
    
    resultsInfo.textContent = `Showing ${trucks.length.toLocaleString()} of ${allTrucks.length.toLocaleString()} Food Trucks`;
    
    if (trucks.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <p style="font-size: 48px; margin-bottom: 20px;">🔍</p>
                <h2 style="font-family: 'Impact', sans-serif; color: var(--cherry-red); margin-bottom: 10px;">No Trucks Found</h2>
                <p style="font-family: 'Courier New', monospace; font-weight: 600;">Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = trucks.map(truck => createTruckCard(truck)).join('');
}

// Create truck card HTML
function createTruckCard(truck) {
    const cuisineHTML = truck.cuisine
        .slice(0, 3)
        .map(c => `<span class="cuisine-tag">${c}</span>`)
        .join('');
    
    const specialtiesHTML = truck.specialties.slice(0, 2).join(' • ');
    
    // Create appropriate link
    let link = '#';
    if (truck.contact.yelp) {
        link = truck.contact.yelp;
    } else if (truck.contact.google) {
        link = truck.contact.google;
    } else if (truck.contact.osm) {
        link = truck.contact.osm;
    }
    
    return `
        <a href="truck/index.html?id=${truck.id}" class="truck-card" style="text-decoration: none; color: inherit;">
            <img src="${truck.image}" alt="${truck.name}" class="truck-image" 
                 onerror="this.src='https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400'">
            <div class="truck-content">
                <div class="truck-header">
                    <div>
                        <h3 class="truck-name">${truck.name}</h3>
                        <div class="truck-location">
                            <span>📍</span>
                            <span>${truck.city}, ${truck.country}</span>
                        </div>
                    </div>
                    <div class="truck-rating">
                        <span>⭐</span>
                        <span>${truck.rating}</span>
                    </div>
                </div>
                <div class="truck-cuisines">
                    ${cuisineHTML}
                </div>
                <p class="truck-specialties">${specialtiesHTML}</p>
                <div class="truck-footer">
                    <span class="price-range">${truck.priceRange}</span>
                    ${truck.verified ? '<span class="verified-badge"><span>✓</span> Verified</span>' : ''}
                </div>
            </div>
        </a>
    `;
}
