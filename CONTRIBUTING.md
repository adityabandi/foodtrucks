# Contributing to StreetEats 🚚

Thank you for your interest in contributing to StreetEats! This guide will help you add food trucks to our global database.

## Ways to Contribute

1. **Add New Food Trucks** - Share your local favorites
2. **Update Existing Data** - Fix outdated information
3. **Improve Documentation** - Help others understand the project
4. **Report Issues** - Let us know about problems
5. **Suggest Features** - Ideas for improvements

## Adding a Food Truck

### Prerequisites

Before adding a food truck, ensure:
- ✅ It's a mobile food vendor (truck, cart, or stand)
- ✅ It operates regularly (not a one-time event)
- ✅ You have accurate, verifiable information
- ✅ It's not already in the database

### Food Truck Data Template

```json
{
  "id": "ft###",
  "name": "Food Truck Name",
  "city": "City Name",
  "country": "Country Name",
  "location": {
    "address": "Street Address or Common Location",
    "lat": 0.0000,
    "lng": 0.0000
  },
  "cuisine": ["Cuisine Type 1", "Cuisine Type 2"],
  "specialties": ["Signature Dish 1", "Signature Dish 2", "Signature Dish 3"],
  "rating": 4.5,
  "priceRange": "$$",
  "operatingHours": {
    "monday": "HH:MM-HH:MM",
    "tuesday": "HH:MM-HH:MM",
    "wednesday": "HH:MM-HH:MM",
    "thursday": "HH:MM-HH:MM",
    "friday": "HH:MM-HH:MM",
    "saturday": "HH:MM-HH:MM",
    "sunday": "HH:MM-HH:MM"
  },
  "contact": {
    "phone": "+1-XXX-XXX-XXXX",
    "website": "https://example.com",
    "twitter": "@handle"
  },
  "image": "https://example.com/image.jpg",
  "verified": true
}
```

### Field Guidelines

#### Required Fields

**id** (string)
- Format: `ft` + 3-digit number
- Use next available number
- Example: `ft031`, `ft032`

**name** (string)
- Official business name
- Capitalize properly
- Example: "The Taco Truck" not "the taco truck"

**city** (string)
- Major city where truck operates
- Use common English name
- Example: "New York" not "NYC"

**country** (string)
- Full country name
- Standard English name
- Example: "USA", "United Kingdom", "Japan"

**location** (object)
- **address**: Primary location or "Multiple locations"
- **lat**: Latitude (decimal degrees)
- **lng**: Longitude (decimal degrees)
- Use [Google Maps](https://maps.google.com) to find coordinates

**cuisine** (array of strings)
- 1-3 cuisine types
- Common categories: American, Mexican, Asian, Italian, etc.
- Specific: Korean, Japanese, Chinese (not just "Asian")
- Include "Street Food" if applicable

**specialties** (array of strings)
- 2-5 signature dishes
- Use official menu names
- Be specific: "Korean BBQ Tacos" not just "Tacos"

**rating** (number)
- Scale: 1.0 to 5.0
- Use average from Yelp, Google, or similar
- Minimum 4.0 for inclusion

**priceRange** (string)
- Options: `$`, `$$`, `$$$`
- `$`: Under $10 per meal
- `$$`: $10-20 per meal
- `$$$`: Over $20 per meal

**operatingHours** (object)
- Use 24-hour format (HH:MM)
- Example: "11:00-21:00"
- Use "Closed" for closed days
- Use "Varies" if schedule changes frequently

**contact** (object)
- At least one contact method required
- **phone**: International format (+country-area-number)
- **website**: Full URL including https://
- **twitter**: Handle including @ symbol
- Add **instagram** or **facebook** if available

**image** (string)
- High-quality photo (minimum 400px width)
- Use Unsplash, official website, or your own
- Ensure proper licensing
- Default: Use food category placeholder

**verified** (boolean)
- `true` if you've confirmed all information
- `false` if any information is uncertain

### How to Submit

#### Method 1: GitHub Pull Request (Recommended)

1. **Fork the Repository**
   ```bash
   # Click "Fork" button on GitHub
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/StreetEats.git
   cd StreetEats
   ```

3. **Create a Branch**
   ```bash
   git checkout -b add-food-truck-name
   ```

4. **Edit the Database**
   - Open `data/foodtrucks.json`
   - Add your entry to the `foodTrucks` array
   - Update the `totalTrucks` count in metadata
   - Ensure valid JSON (use [JSONLint](https://jsonlint.com/))

5. **Test Locally**
   ```bash
   npm install
   npm start
   # Visit http://localhost:3000
   # Verify your truck appears correctly
   ```

6. **Commit and Push**
   ```bash
   git add data/foodtrucks.json
   git commit -m "Add [Food Truck Name] in [City]"
   git push origin add-food-truck-name
   ```

7. **Create Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Fill out the template (see below)

#### Method 2: Issue Submission

If you can't create a PR, [open an issue](../../issues/new) with:
- Food truck name and location
- All available information
- Sources for verification
- Photos (if available)

We'll add it for you!

### Pull Request Template

```markdown
## Adding Food Truck: [Name]

### Basic Information
- **Name**: 
- **Location**: [City, Country]
- **Cuisine**: 
- **Website**: 

### Verification
- [ ] Information verified from official source
- [ ] Coordinates are accurate
- [ ] Operating hours are current
- [ ] Contact information tested
- [ ] Image is properly licensed
- [ ] JSON is valid
- [ ] Tested locally

### Sources
- 

### Additional Notes

```

## Updating Existing Data

### When to Update
- Hours have changed
- Truck has moved
- Phone number changed
- Truck has closed permanently
- Better photo available
- Rating needs updating

### How to Update
1. Follow same PR process as adding
2. In commit message: `Update [Food Truck Name]: [what changed]`
3. Explain changes in PR description

### Removing Closed Trucks
- Change `verified` to `false`
- Add note in PR: "Truck permanently closed"
- Keep data for historical purposes

## Data Quality Standards

### Verification Sources (in order of preference)
1. ✅ Official website
2. ✅ Verified social media account
3. ✅ Google Maps / Google Business listing
4. ✅ Yelp business page
5. ✅ Recent reviews (< 3 months old)
6. ⚠️ News articles or blog posts
7. ❌ Unverified sources

### Image Guidelines
- **Resolution**: Minimum 400px width, prefer 800px+
- **Format**: JPG or PNG
- **Content**: Show the food truck or signature dish
- **License**: Must have permission to use
- **Sources**:
  - Official website/social media
  - Unsplash (free license)
  - Your own photos
  - Flickr Creative Commons

### Coordinate Accuracy
- Use Google Maps right-click → coordinates
- 4 decimal places minimum (e.g., 40.7614)
- Verify the pin is in the correct location
- For mobile trucks: use most common location

## Code Style

### JSON Formatting
- 2-space indentation
- No trailing commas
- UTF-8 encoding
- Alphabetical order by ID

### Running Linter
```bash
# We'll add JSON validation
npm run validate
```

## Testing Your Contribution

### Local Testing Checklist
- [ ] Server starts without errors
- [ ] Food truck appears in the list
- [ ] All filters work with new entry
- [ ] Search finds the truck
- [ ] Detail modal opens correctly
- [ ] All information displays properly
- [ ] Links work (phone, website)
- [ ] Image loads correctly

### Test Commands
```bash
# Start server
npm start

# Test API directly
curl http://localhost:3000/api/foodtrucks | grep "Your Truck Name"

# Test filtering
curl "http://localhost:3000/api/foodtrucks?city=YourCity"
```

## Review Process

### What We Check
1. ✅ All required fields present
2. ✅ Data is accurate and verified
3. ✅ JSON is valid
4. ✅ No duplicates
5. ✅ Image works and is appropriate
6. ✅ Coordinates are correct
7. ✅ Follows formatting guidelines

### Timeline
- Initial review: Within 7 days
- Feedback: Within 3 days of review
- Merge: Within 24 hours of approval

## Community Guidelines

### Be Respectful
- Kind and constructive feedback
- Assume good intentions
- Help newcomers

### Be Accurate
- Only submit verified information
- Include sources
- Admit uncertainty

### Be Collaborative
- Discuss changes before large PRs
- Accept feedback gracefully
- Help review others' contributions

## Recognition

Contributors will be:
- 🌟 Listed in CONTRIBUTORS.md
- 🏆 Credited in release notes
- 💼 Can list contribution on resume/LinkedIn

## Questions?

- 💬 Open a [Discussion](../../discussions)
- 📧 Email: contribute@streeteats.com
- 🐛 Report bugs: [Issues](../../issues)

## License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers the project.

---

**Thank you for helping build the world's best food truck database! 🙏🚚**
