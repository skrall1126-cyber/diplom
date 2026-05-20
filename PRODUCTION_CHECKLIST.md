# Production Deployment Checklist

## 🔴 ЗААВАЛ хийх шаардлагатай

### 1. Environment Variables (.env.local)

```bash
# Database
DATABASE_URL="postgresql://user:password@host:port/database"
DIRECT_URL="postgresql://user:password@host:port/database"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# JWT Secret - ЗААВАЛ солих!
JWT_SECRET="your-super-secret-production-key-min-32-characters-long"
JWT_EXPIRES_IN="1h"

# App URL
NEXT_PUBLIC_APP_URL="https://your-domain.com"

# Node Environment
NODE_ENV="production"
```

**⚠️ АНХААРАХ:**
- JWT_SECRET-ийг production-д ЗААВАЛ солих (32+ тэмдэгт)
- Database credentials-ийг production database-тай солих
- NEXT_PUBLIC_APP_URL-ийг бодит domain-тай солих

### 2. Security Configuration

#### a) JWT Secret солих
```bash
# Хүчтэй JWT secret үүсгэх
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### b) CORS тохиргоо
**File**: `next.config.js`
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://your-domain.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};
```

#### c) Rate Limiting нэмэх
```bash
npm install express-rate-limit
```

**File**: `lib/rate-limit.ts`
```typescript
import rateLimit from 'express-rate-limit';

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: 'Хэт олон оролдлого хийлээ. 15 минутын дараа дахин оролдоно уу.',
});

export const apiRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // 100 requests
  message: 'Хэт олон хүсэлт илгээлээ. Түр хүлээнэ үү.',
});
```

#### d) Helmet.js нэмэх (Security headers)
```bash
npm install helmet
```

### 3. Database Migration

```bash
# Production database-д migration ажиллуулах
cd indra-cyber-home/indra-home

# Prisma generate
npx prisma generate

# Database schema sync
npx prisma db push

# Эсвэл SQL script ашиглах
# Supabase dashboard дээр prisma/migrations/init.sql ажиллуулах
```

### 4. Build & Test

```bash
# Production build
npm run build

# Build амжилттай болсон эсэхийг шалгах
npm run start

# Port 3000 дээр ажиллаж байгаа эсэхийг шалгах
curl http://localhost:3000
```

### 5. Environment-specific Code

#### a) API Base URL
**File**: `lib/api.ts`
```typescript
// Development болон Production-д өөр өөр URL
const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://your-domain.com' 
    : 'http://localhost:3001');
```

#### b) Console.log устгах
```bash
# Production build-д console.log автоматаар устгах
# next.config.js дээр нэмэх:
```

**File**: `next.config.js`
```javascript
module.exports = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};
```

### 6. Error Handling & Logging

#### a) Error logging service нэмэх
```bash
# Sentry эсвэл бусад error tracking
npm install @sentry/nextjs
```

#### b) API error responses
```typescript
// Production-д detailed error message харуулахгүй байх
if (process.env.NODE_ENV === 'production') {
  return NextResponse.json(
    { error: 'Алдаа гарлаа' }, // Generic message
    { status: 500 }
  );
} else {
  return NextResponse.json(
    { error: error.message, stack: error.stack }, // Detailed for dev
    { status: 500 }
  );
}
```

### 7. Performance Optimization

#### a) Image Optimization
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['your-cdn-domain.com'],
    formats: ['image/avif', 'image/webp'],
  },
};
```

#### b) Bundle Analysis
```bash
npm install @next/bundle-analyzer
```

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // ... other config
});
```

### 8. Database Optimization

#### a) Connection Pooling
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    db: {
      schema: 'public',
    },
    auth: {
      persistSession: false, // Server-side
    },
    global: {
      headers: {
        'x-application-name': 'indra-home',
      },
    },
  }
);
```

#### b) Database Indexes
```sql
-- Frequently queried columns дээр index нэмэх
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_students_student_id ON students(student_id);
CREATE INDEX idx_payments_student_id ON payments(student_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_salaries_teacher_id ON salaries(teacher_id);
```

### 9. Monitoring & Analytics

#### a) Health Check Endpoint
**File**: `app/api/health/route.ts`
```typescript
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Database check
    const { error } = await supabase.from('users').select('count').limit(1);
    
    if (error) throw error;
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        error: error.message,
      },
      { status: 503 }
    );
  }
}
```

#### b) Uptime Monitoring
- UptimeRobot
- Pingdom
- StatusCake

### 10. Backup Strategy

#### a) Database Backup
```bash
# Supabase automatic backups enabled эсэхийг шалгах
# Manual backup:
pg_dump -h host -U user -d database > backup.sql
```

#### b) Code Backup
```bash
# Git repository
git remote add production https://github.com/your-org/indra-home.git
git push production main
```

---

## 🟡 Сайжруулах (Recommended)

### 11. Cookie-based Authentication

**File**: `lib/auth-cookies.ts`
```typescript
import { cookies } from 'next/headers';

export function setAuthCookie(token: string) {
  cookies().set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60, // 1 hour
    path: '/',
  });
}

export function setRefreshCookie(refreshToken: string) {
  cookies().set('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export function clearAuthCookies() {
  cookies().delete('auth_token');
  cookies().delete('refresh_token');
}
```

### 12. HTTPS Enforcement

**File**: `middleware.ts`
```typescript
// HTTPS redirect
if (process.env.NODE_ENV === 'production' && 
    request.headers.get('x-forwarded-proto') !== 'https') {
  return NextResponse.redirect(
    `https://${request.headers.get('host')}${request.nextUrl.pathname}`,
    301
  );
}
```

### 13. Audit Logging

**File**: `lib/audit-log.ts`
```typescript
import { supabase } from './supabase';

export async function logAudit(data: {
  user_id: string;
  action: string;
  resource: string;
  details?: any;
  ip_address?: string;
}) {
  await supabase.from('audit_logs').insert({
    ...data,
    timestamp: new Date().toISOString(),
  });
}
```

### 14. Email Service

```bash
npm install nodemailer
# эсвэл
npm install @sendgrid/mail
```

**File**: `lib/email.ts`
```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(to: string, subject: string, html: string) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html,
  });
}
```

### 15. CDN Configuration

```javascript
// next.config.js
module.exports = {
  assetPrefix: process.env.NODE_ENV === 'production' 
    ? 'https://cdn.your-domain.com' 
    : '',
};
```

---

## 🟢 Deployment Options

### Option 1: Vercel (Recommended for Next.js)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Environment variables Vercel dashboard дээр нэмэх
```

**Vercel Environment Variables:**
- DATABASE_URL
- DIRECT_URL
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- JWT_SECRET
- NEXT_PUBLIC_APP_URL

### Option 2: Docker + VPS

**File**: `Dockerfile`
```dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

**File**: `docker-compose.yml`
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env.production
    restart: unless-stopped
    depends_on:
      - postgres

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: indra_home
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
```

### Option 3: AWS / DigitalOcean / Heroku

```bash
# Build
npm run build

# Start
npm run start

# PM2 for process management
npm install -g pm2
pm2 start npm --name "indra-home" -- start
pm2 save
pm2 startup
```

---

## 📋 Pre-Deployment Checklist

### Security:
- [ ] JWT_SECRET солигдсон
- [ ] Database credentials production-тай
- [ ] CORS тохируулагдсан
- [ ] Rate limiting нэмэгдсэн
- [ ] HTTPS enabled
- [ ] Security headers (Helmet.js)
- [ ] Environment variables secured

### Performance:
- [ ] Production build амжилттай
- [ ] Images optimized
- [ ] Bundle size шалгагдсан
- [ ] Database indexes нэмэгдсэн
- [ ] Connection pooling тохируулагдсан
- [ ] CDN configured (optional)

### Monitoring:
- [ ] Health check endpoint
- [ ] Error logging (Sentry)
- [ ] Uptime monitoring
- [ ] Analytics (Google Analytics)
- [ ] Audit logging

### Backup:
- [ ] Database backup strategy
- [ ] Code repository backup
- [ ] Automated backups enabled

### Testing:
- [ ] All features tested
- [ ] Authentication flows tested
- [ ] Authorization rules tested
- [ ] API endpoints tested
- [ ] Error handling tested
- [ ] Mobile responsive tested

### Documentation:
- [ ] API documentation
- [ ] Deployment guide
- [ ] Environment variables documented
- [ ] Troubleshooting guide

---

## 🚀 Deployment Commands

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma client
npx prisma generate

# 3. Run database migrations
npx prisma db push

# 4. Build for production
npm run build

# 5. Test production build locally
npm run start

# 6. Deploy to Vercel
vercel --prod

# OR Deploy with Docker
docker-compose up -d --build
```

---

## 🔧 Post-Deployment

### 1. Verify Deployment
```bash
# Health check
curl https://your-domain.com/api/health

# Login test
curl -X POST https://your-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### 2. Monitor Logs
```bash
# Vercel
vercel logs

# Docker
docker-compose logs -f app

# PM2
pm2 logs indra-home
```

### 3. Performance Testing
```bash
# Load testing
npm install -g artillery
artillery quick --count 10 --num 100 https://your-domain.com
```

---

## 📞 Support

Асуулт байвал:
- Email: admin@indra.edu.mn
- GitHub: https://github.com/your-org/indra-home
- Documentation: /docs
