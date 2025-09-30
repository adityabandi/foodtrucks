# Deployment Guide

## Deployment Options

### 1. Heroku (Easiest)

#### Steps:
```bash
# Install Heroku CLI
# Visit: https://devcenter.heroku.com/articles/heroku-cli

# Login to Heroku
heroku login

# Create a new app
heroku create your-app-name

# Deploy
git push heroku main

# Open your app
heroku open
```

#### Configuration:
- Heroku automatically detects Node.js apps
- No additional configuration needed
- Free tier available

### 2. Vercel (Fast & Free)

#### Steps:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts
```

#### Configuration:
Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

### 3. Railway (Modern)

#### Steps:
1. Visit [Railway.app](https://railway.app/)
2. Connect your GitHub repository
3. Railway auto-deploys on git push
4. Free tier: 500 hours/month

### 4. Render (Recommended)

#### Steps:
1. Visit [Render.com](https://render.com/)
2. Create a new Web Service
3. Connect your GitHub repo
4. Use these settings:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Deploy!

#### Free Tier:
- Free SSL
- Auto-deploy from git
- 750 hours/month free

### 5. DigitalOcean App Platform

#### Steps:
1. Visit [DigitalOcean](https://www.digitalocean.com/products/app-platform)
2. Connect GitHub repository
3. Configure:
   - **Run Command**: `npm start`
   - **HTTP Port**: 3000 (or use $PORT)
4. Deploy

#### Cost:
- $5/month for basic tier
- Free trial available

### 6. AWS (EC2)

#### For More Control:

```bash
# SSH into your EC2 instance
ssh -i your-key.pem ubuntu@your-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone your repo
git clone your-repo-url
cd StreetEats

# Install dependencies
npm install

# Start with PM2
pm2 start server.js --name streeteats
pm2 startup
pm2 save

# Install Nginx (optional)
sudo apt install nginx

# Configure Nginx reverse proxy
sudo nano /etc/nginx/sites-available/streeteats
```

Nginx config:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/streeteats /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Setup SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### 7. Google Cloud Run

#### Steps:

1. Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

2. Create `.dockerignore`:
```
node_modules
npm-debug.log
.git
.gitignore
README.md
```

3. Deploy:
```bash
# Install gcloud CLI
# Visit: https://cloud.google.com/sdk/docs/install

# Login
gcloud auth login

# Set project
gcloud config set project YOUR_PROJECT_ID

# Build and deploy
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/streeteats
gcloud run deploy streeteats \
  --image gcr.io/YOUR_PROJECT_ID/streeteats \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## Environment Variables

For production, set these environment variables:

```bash
NODE_ENV=production
PORT=3000  # or use the platform's $PORT
YELP_API_KEY=your_key_here  # if using Yelp
```

### Setting Environment Variables:

**Heroku:**
```bash
heroku config:set NODE_ENV=production
heroku config:set YELP_API_KEY=your_key
```

**Vercel:**
```bash
vercel env add NODE_ENV production
```

**Render/Railway:**
- Add in the dashboard under Environment Variables

## Domain Setup

### Custom Domain with Cloudflare (Free SSL)

1. Add your domain to Cloudflare
2. Update nameservers at your registrar
3. In your hosting platform:
   - Add custom domain
   - Follow DNS instructions
4. Cloudflare provides:
   - Free SSL
   - CDN
   - DDoS protection
   - Analytics

## Performance Optimization

### 1. Enable Gzip Compression

Add to `server.js`:
```javascript
const compression = require('compression');
app.use(compression());
```

```bash
npm install compression
```

### 2. Add Caching Headers

```javascript
app.use('/api', (req, res, next) => {
  res.set('Cache-Control', 'public, max-age=300'); // 5 minutes
  next();
});
```

### 3. Use CDN for Static Assets

Update image URLs to use:
- Cloudinary
- imgix
- Cloudflare Images

### 4. Database Optimization

If scaling to SQL:
```javascript
// Use connection pooling
const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

## Monitoring & Logging

### 1. PM2 Monitoring
```bash
pm2 monit
pm2 logs
```

### 2. New Relic (Free Tier)
```bash
npm install newrelic
```

### 3. LogRocket
```javascript
// Add to frontend
<script src="https://cdn.lr-ingest.io/LogRocket.min.js"></script>
<script>window.LogRocket && window.LogRocket.init('your-app-id');</script>
```

### 4. Sentry for Error Tracking
```bash
npm install @sentry/node
```

```javascript
const Sentry = require("@sentry/node");
Sentry.init({ dsn: "your-dsn" });
app.use(Sentry.Handlers.errorHandler());
```

## Backup Strategy

### Database Backup (if using DB)
```bash
# Automated daily backups
0 2 * * * pg_dump dbname > /backup/db-$(date +\%Y\%m\%d).sql
```

### Data Directory Backup
```bash
# Backup to S3
aws s3 sync ./data s3://your-bucket/backups/$(date +\%Y\%m\%d)/
```

## Security Best Practices

### 1. Helmet.js
```bash
npm install helmet
```

```javascript
const helmet = require('helmet');
app.use(helmet());
```

### 2. Rate Limiting
```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);
```

### 3. HTTPS Only
```javascript
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }
});
```

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (Nginx, AWS ALB)
- Multiple app instances
- Shared session store (Redis)

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Add caching layer

### CDN for Static Assets
```javascript
// Use environment-based URLs
const CDN_URL = process.env.CDN_URL || '';
const imageUrl = `${CDN_URL}/images/truck.jpg`;
```

## Health Checks

Add health check endpoint:
```javascript
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});
```

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "your-app-name"
          heroku_email: "your-email@example.com"
```

## Cost Estimation

### Free Tier Deployment
- **Heroku**: Free (sleeps after 30min inactivity)
- **Vercel**: Free (100GB bandwidth)
- **Render**: Free (750 hours/month)
- **Railway**: Free (500 hours/month)

### Paid Deployment (Recommended for Production)
- **Render**: $7/month (always on)
- **DigitalOcean**: $5/month
- **Railway**: $5/month

### With Database
- Add $5-15/month for managed PostgreSQL

---

**Recommendation**: Start with Render.com free tier, then upgrade to $7/month when ready for production. It provides excellent performance and auto-SSL certificates.
