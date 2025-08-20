# Deployment Guide

This guide covers how to deploy the Stock Prediction Website to various hosting platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Local Development](#local-development)
- [Production Deployment](#production-deployment)
- [Platform-Specific Guides](#platform-specific-guides)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

- Node.js 20.x or higher
- npm or yarn package manager
- Alpha Vantage API key
- Git repository access

## Environment Setup

### Required Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Required
ALPHA_VANTAGE_API_KEY=your_actual_api_key_here

# Optional (with defaults)
PORT=5000
NODE_ENV=production
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=15
```

### API Key Setup

1. **Alpha Vantage API Key** (Required)
   - Visit: https://www.alphavantage.co/support/#api-key
   - Sign up for free account
   - Get instant API key
   - Free tier: 25 calls/day, 5 calls/minute

## Local Development

### Quick Start

```bash
# Clone repository
git clone <your-repo-url>
cd stock-prediction-website

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
# Edit .env with your API keys

# Start development server
npm run dev

# Application runs at http://localhost:5000
```

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## Production Deployment

### Build Process

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Set production environment
export NODE_ENV=production

# Start the server
npm start
```

### Production Environment

Set these environment variables in production:

```bash
NODE_ENV=production
ALPHA_VANTAGE_API_KEY=your_production_api_key
PORT=5000
```

## Platform-Specific Guides

### Replit Deployment (Recommended)

Already configured and working! Your current setup is production-ready.

**Advantages:**
- Zero configuration deployment
- Built-in database support
- Automatic HTTPS
- Environment variable management
- Real-time collaboration

**Current Status**: ✅ **Already Deployed and Working**

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Configure vercel.json**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server/index.ts",
         "use": "@vercel/node"
       },
       {
         "src": "client/package.json",
         "use": "@vercel/static-build",
         "config": {
           "distDir": "dist"
         }
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "server/index.ts"
       },
       {
         "src": "/(.*)",
         "dest": "client/dist/$1"
       }
     ]
   }
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add ALPHA_VANTAGE_API_KEY
   ```

### Railway Deployment

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and Initialize**
   ```bash
   railway login
   railway init
   ```

3. **Configure railway.json**
   ```json
   {
     "$schema": "https://railway.app/railway.schema.json",
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "npm start",
       "healthcheckPath": "/",
       "healthcheckTimeout": 100,
       "restartPolicyType": "ON_FAILURE",
       "restartPolicyMaxRetries": 10
     }
   }
   ```

4. **Deploy**
   ```bash
   railway up
   ```

5. **Add Environment Variables**
   ```bash
   railway variables set ALPHA_VANTAGE_API_KEY=your_key_here
   ```

### Heroku Deployment

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew install heroku/brew/heroku
   
   # Or download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

3. **Configure Buildpacks**
   ```bash
   heroku buildpacks:set heroku/nodejs
   ```

4. **Add Environment Variables**
   ```bash
   heroku config:set ALPHA_VANTAGE_API_KEY=your_key_here
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

### DigitalOcean App Platform

1. **Create App Spec**
   ```yaml
   name: stock-prediction-website
   services:
   - name: web
     source_dir: /
     github:
       repo: your-username/stock-prediction-website
       branch: main
     run_command: npm start
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
     envs:
     - key: ALPHA_VANTAGE_API_KEY
       value: your_api_key_here
       type: SECRET
     - key: NODE_ENV
       value: production
     routes:
     - path: /
   ```

2. **Deploy via Dashboard**
   - Go to DigitalOcean App Platform
   - Import from GitHub
   - Configure environment variables
   - Deploy

## Database Configuration

### SQLite (Current Setup)
- **Development**: In-memory storage
- **Production**: File-based SQLite database
- **Backup**: Regular database file backups recommended

### PostgreSQL (Optional Upgrade)

For higher volume production use:

```bash
# Install PostgreSQL dependencies
npm install pg @types/pg

# Update DATABASE_URL
DATABASE_URL=postgresql://user:password@host:port/database
```

## Performance Optimization

### Caching Strategy

```typescript
// Cache configuration
const CACHE_TTL = 60 * 60 * 1000; // 1 hour
const MAX_CACHE_SIZE = 1000; // Maximum cached analyses
```

### API Rate Limiting

```typescript
// Rate limiting configuration
const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
};
```

## Monitoring and Logging

### Health Check Endpoint

```bash
# Test application health
curl https://your-domain.com/api/health
```

### Error Tracking

Consider integrating:
- **Sentry** for error tracking
- **LogRocket** for session replay
- **DataDog** for performance monitoring

### Basic Monitoring

```bash
# Check application logs
tail -f logs/app.log

# Monitor API response times
curl -w "@curl-format.txt" -s -o /dev/null https://your-domain.com/api/analyze
```

## Security Considerations

### Environment Variables

- Never commit `.env` files to version control
- Use secure secret management in production
- Rotate API keys regularly

### CORS Configuration

```typescript
// Production CORS settings
const corsOptions = {
  origin: ['https://your-domain.com'],
  credentials: true,
  optionsSuccessStatus: 200
};
```

### Rate Limiting

- Implement per-IP rate limiting
- Monitor for API abuse
- Consider API key authentication for high-volume usage

## Backup Strategy

### Database Backups

```bash
# SQLite backup
cp database.db backup-$(date +%Y%m%d).db

# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
cp database.db "backups/backup_$DATE.db"
find backups/ -name "backup_*.db" -mtime +7 -delete
```

### Code Backups

- Use Git with remote repositories
- Tag releases for rollback capability
- Maintain staging environment

## Troubleshooting

### Common Issues

1. **API Key Issues**
   ```bash
   # Check if API key is set
   echo $ALPHA_VANTAGE_API_KEY
   
   # Test API key
   curl "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=$ALPHA_VANTAGE_API_KEY"
   ```

2. **Port Issues**
   ```bash
   # Check if port is in use
   lsof -i :5000
   
   # Kill process using port
   kill -9 $(lsof -t -i:5000)
   ```

3. **Memory Issues**
   ```bash
   # Check memory usage
   free -h
   
   # Monitor Node.js memory
   node --max-old-space-size=1024 server/index.js
   ```

4. **Build Issues**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Remove node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

### Debugging

```bash
# Enable debug mode
DEBUG=* npm run dev

# Check application health
curl http://localhost:5000/api/health

# View logs
tail -f logs/app.log
```

### Performance Issues

1. **API Rate Limits**
   - Monitor Alpha Vantage usage
   - Implement request caching
   - Consider paid API tier

2. **Database Performance**
   - Monitor query performance
   - Implement database indexing
   - Consider database upgrade

3. **Memory Leaks**
   - Monitor memory usage over time
   - Use Node.js profiler
   - Implement garbage collection monitoring

## Support

For deployment issues:

1. Check this documentation
2. Review error logs
3. Test with minimal configuration
4. Check platform-specific documentation
5. Open GitHub issue with deployment details

## Maintenance

### Regular Tasks

- Monitor API usage and costs
- Update dependencies monthly
- Review and rotate API keys quarterly
- Backup database weekly
- Monitor application performance

### Updates

```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```