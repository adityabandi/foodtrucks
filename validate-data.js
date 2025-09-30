const fs = require('fs');
const path = require('path');

function validateFoodTruckData() {
  console.log('🔍 Validating food truck database...\n');
  
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data', 'foodtrucks.json'), 'utf8')
  );
  
  let errors = [];
  let warnings = [];
  
  // Validate metadata
  if (data.foodTrucks.length !== data.metadata.totalTrucks) {
    errors.push(`Metadata mismatch: ${data.foodTrucks.length} trucks found, but metadata says ${data.metadata.totalTrucks}`);
  }
  
  // Validate each truck
  data.foodTrucks.forEach((truck, index) => {
    const prefix = `Truck #${index + 1} (${truck.name}):`;
    
    // Required fields
    if (!truck.id) errors.push(`${prefix} Missing ID`);
    if (!truck.name) errors.push(`${prefix} Missing name`);
    if (!truck.city) errors.push(`${prefix} Missing city`);
    if (!truck.country) errors.push(`${prefix} Missing country`);
    if (!truck.location) errors.push(`${prefix} Missing location`);
    if (!truck.cuisine || truck.cuisine.length === 0) errors.push(`${prefix} Missing cuisine`);
    if (!truck.specialties || truck.specialties.length === 0) errors.push(`${prefix} Missing specialties`);
    if (!truck.rating) errors.push(`${prefix} Missing rating`);
    if (!truck.priceRange) errors.push(`${prefix} Missing price range`);
    if (!truck.operatingHours) errors.push(`${prefix} Missing operating hours`);
    if (!truck.image) errors.push(`${prefix} Missing image`);
    
    // Validate data types and formats
    if (truck.rating && (truck.rating < 0 || truck.rating > 5)) {
      errors.push(`${prefix} Invalid rating (must be 0-5)`);
    }
    
    if (truck.priceRange && !['$', '$$', '$$$'].includes(truck.priceRange)) {
      errors.push(`${prefix} Invalid price range (must be $, $$, or $$$)`);
    }
    
    if (truck.location) {
      if (typeof truck.location.lat !== 'number') warnings.push(`${prefix} Latitude should be a number`);
      if (typeof truck.location.lng !== 'number') warnings.push(`${prefix} Longitude should be a number`);
    }
    
    // Check for duplicates
    const duplicates = data.foodTrucks.filter(t => t.id === truck.id);
    if (duplicates.length > 1) {
      errors.push(`${prefix} Duplicate ID: ${truck.id}`);
    }
  });
  
  // Report results
  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All validations passed!');
    console.log(`📊 Total trucks: ${data.foodTrucks.length}`);
    console.log(`🌍 Cities: ${[...new Set(data.foodTrucks.map(t => t.city))].length}`);
    console.log(`🗺️  Countries: ${[...new Set(data.foodTrucks.map(t => t.country))].length}`);
    console.log(`⭐ Average rating: ${(data.foodTrucks.reduce((sum, t) => sum + t.rating, 0) / data.foodTrucks.length).toFixed(2)}`);
    return true;
  } else {
    if (errors.length > 0) {
      console.log('❌ ERRORS:');
      errors.forEach(err => console.log(`  - ${err}`));
    }
    
    if (warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      warnings.forEach(warn => console.log(`  - ${warn}`));
    }
    
    return errors.length === 0;
  }
}

// Run validation
const isValid = validateFoodTruckData();
process.exit(isValid ? 0 : 1);
