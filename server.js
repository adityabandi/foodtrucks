const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Load food truck data
const loadFoodTrucks = () => {
  const data = fs.readFileSync(path.join(__dirname, 'data', 'foodtrucks.json'), 'utf8');
  return JSON.parse(data);
};

// API Routes
app.get('/api/foodtrucks', (req, res) => {
  try {
    const data = loadFoodTrucks();
    const { city, country, cuisine, minRating, priceRange, search } = req.query;
    
    let trucks = data.foodTrucks;
    
    // Filter by city
    if (city) {
      trucks = trucks.filter(truck => 
        truck.city.toLowerCase() === city.toLowerCase()
      );
    }
    
    // Filter by country
    if (country) {
      trucks = trucks.filter(truck => 
        truck.country.toLowerCase() === country.toLowerCase()
      );
    }
    
    // Filter by cuisine
    if (cuisine) {
      trucks = trucks.filter(truck => 
        truck.cuisine.some(c => c.toLowerCase().includes(cuisine.toLowerCase()))
      );
    }
    
    // Filter by minimum rating
    if (minRating) {
      trucks = trucks.filter(truck => truck.rating >= parseFloat(minRating));
    }
    
    // Filter by price range
    if (priceRange) {
      trucks = trucks.filter(truck => truck.priceRange === priceRange);
    }
    
    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      trucks = trucks.filter(truck => 
        truck.name.toLowerCase().includes(searchLower) ||
        truck.cuisine.some(c => c.toLowerCase().includes(searchLower)) ||
        truck.specialties.some(s => s.toLowerCase().includes(searchLower)) ||
        truck.city.toLowerCase().includes(searchLower)
      );
    }
    
    res.json({
      total: trucks.length,
      trucks: trucks
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load food trucks' });
  }
});

// Get single food truck by ID
app.get('/api/foodtrucks/:id', (req, res) => {
  try {
    const data = loadFoodTrucks();
    const truck = data.foodTrucks.find(t => t.id === req.params.id);
    
    if (truck) {
      res.json(truck);
    } else {
      res.status(404).json({ error: 'Food truck not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to load food truck' });
  }
});

// Get all cities
app.get('/api/cities', (req, res) => {
  try {
    const data = loadFoodTrucks();
    const cities = [...new Set(data.foodTrucks.map(t => ({
      city: t.city,
      country: t.country
    })))];
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load cities' });
  }
});

// Get all cuisines
app.get('/api/cuisines', (req, res) => {
  try {
    const data = loadFoodTrucks();
    const cuisines = [...new Set(data.foodTrucks.flatMap(t => t.cuisine))].sort();
    res.json(cuisines);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load cuisines' });
  }
});

// Statistics endpoint
app.get('/api/stats', (req, res) => {
  try {
    const data = loadFoodTrucks();
    const stats = {
      totalTrucks: data.foodTrucks.length,
      totalCities: [...new Set(data.foodTrucks.map(t => t.city))].length,
      totalCountries: [...new Set(data.foodTrucks.map(t => t.country))].length,
      averageRating: (data.foodTrucks.reduce((sum, t) => sum + t.rating, 0) / data.foodTrucks.length).toFixed(2),
      topCuisines: getTopCuisines(data.foodTrucks),
      topCities: getTopCities(data.foodTrucks)
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load statistics' });
  }
});

function getTopCuisines(trucks) {
  const cuisineCount = {};
  trucks.forEach(truck => {
    truck.cuisine.forEach(cuisine => {
      cuisineCount[cuisine] = (cuisineCount[cuisine] || 0) + 1;
    });
  });
  return Object.entries(cuisineCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([cuisine, count]) => ({ cuisine, count }));
}

function getTopCities(trucks) {
  const cityCount = {};
  trucks.forEach(truck => {
    cityCount[truck.city] = (cityCount[truck.city] || 0) + 1;
  });
  return Object.entries(cityCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([city, count]) => ({ city, count }));
}

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚚 StreetEats server running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api/foodtrucks`);
});
