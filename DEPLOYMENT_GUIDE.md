# Deployment Guide - Indra Cyber Home

## 🚀 Quick Start - Production Deployment

### Prerequisites
- Node.js 18+ installed
- Supabase account (database)
- Domain name (optional but recommended)
- SSL certificate (Let's Encrypt recommended)

---

## Option 1: Vercel Deployment (Easiest) ⭐

### Step 1: Prepare Environment Variables
```bash
# Copy example file
cp .env.production.example .env.production

# Edit with your values
nano .env.production
```

### Step 2: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 3: Login to Vercel
```bash
vercel login
```

### Step 4: Deploy
```bash
# First deployment
vercel

# Production deployment
vercel --prod
```

### Step 5: Add Environment Variables in Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add all variables from `.env.production`

### Step 6: Redeploy
```bash
vercel --prod
```

**Done! Your app is live at: `https://your-project.vercel.app`**

---

## Option 2: Docker Deployment (VPS/Cloud)

### Step 1: Prepare Server
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose -y

# Verify installation
docker --version
docker-compose --version
```

### Step 2: Clone Repository
```bash
git clone https://github.com/your-org/indra-home.git
cd indra-home/indra-cyber-home/indra-home
```

### Step 3: Configure Environment
```bash
# Copy example file
cp .env.production.example .env.production

# Edit with your values
nano .env.production

# IMPORTANT: Change these values!
# - JWT_SECRET (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
# - DATABASE_URL (your Supabase connection string)
# - NEXT_PUBLIC_APP_URL (your domain)
```

### Step 4: Build and Run
```bash
# Build Docker image
npm run docker:build

# Start containers
npm run docker:run

# Check logs
npm run docker:logs

# Check health
curl http://localhost:3000/api/health
```

### Step 5: Setup Nginx (Optional but Recommended)
```bash
# Install Nginx
sudo apt install nginx -y

# Copy nginx config
sudo cp nginx.conf /etc/nginx/sites-available/indra-home
sudo ln -s /etc/nginx/sites-available/indra-home /etc/nginx/sites-enabled/

# Edit domain name
sudo nano /etc/nginx/sites-available/indra-home
# Change: server_name your-domain.com;

# Test config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Step 6: Setup SSL with Let's Encrypt
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal (already configured by certbot)
sudo certbot renew --dry-run
```

**Done! Your app is live at: `https://your-domain.com`**

---

## Option 3: Manual Deployment (PM2)

### Step 1: Prepare Server
```bash
# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2
```

### Step 2: Clone and Setup
```bash
# Clone repository
git clone https://github.com/your-org/indra-home.git
cd indra-home/indra-cyber-home/indra-home

# Install dependencies
npm install

# Configure environment
cp .env.production.example .env.production
nano .env.production
```

### Step 3: Build
```bash
# Generate Prisma client
npm run prisma:generate

# Build for production
npm run build
```

### Step 4: Start with PM2
```bash
# Start application
pm2 start npm --name "indra-home" -- start

# Save PM2 configuration
pm2 save

# Setup auto-start on reboot
pm2 startup
# Run the command that PM2 outputs

# Check status
pm2 status

# View logs
pm2 logs indra-home
```

### Step 5: Setup Nginx (Same as Option 2)

**Done! Your app is running with PM2**

---

## Post-Deployment Checklist

### 1. Verify Deployment
```bash
# Health check
curl https://your-domain.com/api/health

# Expected response:
# {
#   "status": "healthy",
#   "timestamp": "2024-01-01T00:00:00.000Z",
#   "checks": {
#     "database": {
#       "status": "up",
#       "latency": 50
#     }
#   }
# }
```

### 2. Test Authentication
```bash
# Login test
curl -X POST https://your-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Expected: JWT token in response
```

### 3. Test Protected Endpoints
```bash
# Get students (requires auth)
curl -X GET https://your-domain.com/api/students \
  -H "Authorization: Bearer YOUR_TOKEN"

# Expected: 401 if no token, 200 with data if valid token
```

### 4. Monitor Logs
```bash
# Vercel
vercel logs --follow

# Docker
docker-compose logs -f app

# PM2
pm2 logs indra-home --lines 100
```

### 5. Setup Monitoring
- [ ] Uptime monitoring (UptimeRobot, Pingdom)
- [ ] Error tracking (Sentry)
- [ ] Analytics (Google Analytics)
- [ ] Performance monitoring (Vercel Analytics)

---

## Database Setup

### Run Migrations
```bash
# Option 1: Using Prisma
npm run prisma:push

# Option 2: Using SQL script
# Go to Supabase Dashboard → SQL Editor
# Copy and paste content from: prisma/migrations/init.sql
# Click "Run"
```

### Create Admin User
```sql
-- Already included in init.sql
-- Default credentials:
-- Username: admin
-- Password: admin123
-- Role: SUPER_ADMIN

-- IMPORTANT: Change password after first login!
```

---

## Troubleshooting

### Issue: Build fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Issue: Database connection fails
```bash
# Check environment variables
cat .env.production | grep DATABASE_URL

# Test connection
npx prisma db pull
```

### Issue: 502 Bad Gateway (Nginx)
```bash
# Check if app is running
curl http://localhost:3000/api/health

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# Restart services
sudo systemctl restart nginx
docker-compose restart app
# OR
pm2 restart indra-home
```

### Issue: SSL certificate errors
```bash
# Renew certificate
sudo certbot renew

# Check certificate
sudo certbot certificates
```

### Issue: High memory usage
```bash
# Check memory
free -h

# Restart app
docker-compose restart app
# OR
pm2 restart indra-home

# Increase memory limit (PM2)
pm2 start npm --name "indra-home" --max-memory-restart 1G -- start
```

---

## Maintenance

### Update Application
```bash
# Pull latest code
git pull origin main

# Install dependencies
npm install

# Rebuild
npm run build

# Restart
docker-compose restart app
# OR
pm2 restart indra-home
```

### Backup Database
```bash
# Supabase has automatic backups
# Manual backup:
pg_dump -h your-db-host -U postgres -d indra_home > backup.sql

# Restore:
psql -h your-db-host -U postgres -d indra_home < backup.sql
```

### View Logs
```bash
# Docker
docker-compose logs -f app --tail=100

# PM2
pm2 logs indra-home --lines 100

# Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Monitor Performance
```bash
# Docker stats
docker stats

# PM2 monitoring
pm2 monit

# System resources
htop
```

---

## Security Checklist

- [ ] JWT_SECRET changed from default
- [ ] Strong database password
- [ ] HTTPS enabled
- [ ] Firewall configured (UFW)
- [ ] SSH key authentication only
- [ ] Regular security updates
- [ ] Backup strategy in place
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Environment variables secured

---

## Performance Optimization

### Enable Caching
```nginx
# In nginx.conf
location /_next/static/ {
    proxy_cache_valid 200 365d;
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```

### Enable Gzip Compression
```nginx
# Already in nginx.conf
gzip on;
gzip_types text/plain text/css application/json;
```

### Database Indexes
```sql
-- Already in init.sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_students_student_id ON students(student_id);
```

---

## Support

### Documentation
- [Authentication Setup](./AUTHENTICATION_SETUP.md)
- [Advanced Features](./ADVANCED_AUTH_FEATURES.md)
- [Production Checklist](./PRODUCTION_CHECKLIST.md)

### Contact
- Email: admin@indra.edu.mn
- GitHub: https://github.com/your-org/indra-home
- Issues: https://github.com/your-org/indra-home/issues

---

## Quick Commands Reference

```bash
# Development
npm run dev                    # Start dev server
npm run prisma:studio          # Open Prisma Studio

# Production
npm run build                  # Build for production
npm run start                  # Start production server
npm run test:health            # Test health endpoint

# Docker
npm run docker:build           # Build Docker image
npm run docker:run             # Start containers
npm run docker:stop            # Stop containers
npm run docker:logs            # View logs

# Database
npm run prisma:generate        # Generate Prisma client
npm run prisma:push            # Push schema to database

# Monitoring
pm2 status                     # PM2 status
pm2 logs indra-home            # View logs
pm2 restart indra-home         # Restart app
docker-compose logs -f app     # Docker logs
```

---

**🎉 Congratulations! Your application is now live in production!**
