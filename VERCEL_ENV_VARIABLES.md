# 🔐 Vercel Environment Variables

Vercel дээр дараах environment variables оруулах хэрэгтэй:

---

## ✅ ЗААВАЛ ОРУУЛАХ (Required)

### 1. Supabase Configuration

#### NEXT_PUBLIC_SUPABASE_URL
```
https://xdywicnxzgtstrslhvcu.supabase.co
```
- **Type**: Plain Text
- **Environment**: Production, Preview, Development

#### NEXT_PUBLIC_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeXdpY254emd0c3Ryc2xodmN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNTcyNTIsImV4cCI6MjA5NDgzMzI1Mn0.3dfx6dsQM93WJErqx39xdiGUpMlS4_DBppQVZCf1VAg
```
- **Type**: Plain Text
- **Environment**: Production, Preview, Development

#### SUPABASE_SERVICE_ROLE_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeXdpY254emd0c3Ryc2xodmN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTI1NzI1MiwiZXhwIjoyMDk0ODMzMjUyfQ.Ta-3b1-_TFJP_-z0NLQ5rLnS8antIzzByRhUrIIklho
```
- **Type**: Secret
- **Environment**: Production, Preview, Development

### 2. JWT Configuration

#### JWT_SECRET
```
indra-cyber-super-secret-jwt-key-2026-production
```
- **Type**: Secret
- **Environment**: Production, Preview, Development

#### JWT_EXPIRES_IN
```
7d
```
- **Type**: Plain Text
- **Environment**: Production, Preview, Development

### 3. Application Configuration

#### NEXT_PUBLIC_APP_URL
```
https://your-project-name.vercel.app
```
⚠️ **АНХААР**: Deploy хийсний дараа Vercel-с өгсөн domain-ийг оруулах!

- **Type**: Plain Text
- **Environment**: Production, Preview, Development

#### NODE_ENV
```
production
```
- **Type**: Plain Text
- **Environment**: Production

---

## 📋 БҮРЭН ЖАГСААЛТ (Copy-Paste)

Vercel Dashboard → Project → Settings → Environment Variables дээр дараах variables нэмэх:

| Variable Name | Value | Type | Environments |
|---------------|-------|------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xdywicnxzgtstrslhvcu.supabase.co` | Plain Text | All |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Plain Text | All |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Secret | All |
| `JWT_SECRET` | `indra-cyber-super-secret-jwt-key-2026-production` | Secret | All |
| `JWT_EXPIRES_IN` | `7d` | Plain Text | All |
| `NEXT_PUBLIC_APP_URL` | `https://your-project.vercel.app` | Plain Text | All |
| `NODE_ENV` | `production` | Plain Text | Production |

---

## 🚀 Хэрхэн оруулах вэ?

### Vercel Dashboard дээр:

1. **Project Settings нээх**
   - Vercel Dashboard → Your Project → Settings

2. **Environment Variables руу орох**
   - Зүүн талын menu → "Environment Variables"

3. **Variable нэмэх**
   - "Add New" товч дарах
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://xdywicnxzgtstrslhvcu.supabase.co`
   - Environments: Production, Preview, Development сонгох
   - "Save" дарах

4. **Бусад variables-ийг давтах**
   - Дээрх жагсаалтын дагуу бүгдийг нэмэх

5. **Redeploy хийх**
   - Deployments → Latest → "Redeploy"
   - Эсвэл шинээр git push хийх

---

## ⚠️ АНХААРАХ ЗҮЙЛС

### 1. NEXT_PUBLIC_APP_URL
Deploy хийсний **ДАРАА** Vercel domain-ийг оруулах:

```
# Өмнө (local)
NEXT_PUBLIC_APP_URL=http://localhost:3001

# Дараа (Vercel)
NEXT_PUBLIC_APP_URL=https://indra-cyber-home.vercel.app
```

**Яаж олох вэ?**
- Deploy хийсний дараа Vercel "Visit" товч дарах
- URL-ийг copy хийх
- Environment Variables дээр шинэчлэх
- Redeploy хийх

### 2. Secret vs Plain Text

**Secret** (нууцлах):
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`
- `DATABASE_URL` (хэрэв ашиглавал)

**Plain Text** (харагдаж болно):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL`
- `JWT_EXPIRES_IN`

### 3. Environments

**Production**: Үндсэн сайт  
**Preview**: Pull Request preview  
**Development**: Local development

Бүгдэд нэмэх: "Production, Preview, Development" сонгох

---

## 🔍 Шалгах

### 1. Environment Variables зөв эсэхийг шалгах

Deploy хийсний дараа:

```javascript
// Browser Console дээр
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
// → https://xdywicnxzgtstrslhvcu.supabase.co

console.log(process.env.NEXT_PUBLIC_APP_URL);
// → https://your-project.vercel.app
```

### 2. API шалгах

```
https://your-project.vercel.app/api/students
```

Хэрэв 200 OK буцаавал бүх зүйл зөв!

### 3. Login шалгах

```
https://your-project.vercel.app/admin/login
```

Username: `admin`  
Password: `admin123`

---

## 📝 Хурдан Copy-Paste

Vercel CLI ашиглавал:

```bash
# Vercel CLI суулгах
npm install -g vercel

# Нэвтрэх
vercel login

# Project folder руу орох
cd indra-cyber-home/indra-home

# Environment variables нэмэх
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Value: https://xdywicnxzgtstrslhvcu.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

vercel env add SUPABASE_SERVICE_ROLE_KEY production
# Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

vercel env add JWT_SECRET production
# Value: indra-cyber-super-secret-jwt-key-2026-production

vercel env add JWT_EXPIRES_IN production
# Value: 7d

vercel env add NEXT_PUBLIC_APP_URL production
# Value: https://your-project.vercel.app

vercel env add NODE_ENV production
# Value: production

# Deploy хийх
vercel --prod
```

---

## 🎯 Дүгнэлт

**Заавал оруулах 7 variables:**

1. ✅ `NEXT_PUBLIC_SUPABASE_URL`
2. ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. ✅ `SUPABASE_SERVICE_ROLE_KEY`
4. ✅ `JWT_SECRET`
5. ✅ `JWT_EXPIRES_IN`
6. ✅ `NEXT_PUBLIC_APP_URL` (deploy хийсний дараа)
7. ✅ `NODE_ENV`

Эдгээрийг оруулсны дараа систем бүрэн ажиллана! 🚀

---

## 📞 Тусламж

Хэрэв environment variables алдаа гарвал:

1. Vercel Dashboard → Deployments → Latest → "View Function Logs"
2. Алдааны мэдээллийг уншаад үзэх
3. Environment variables дахин шалгах
4. Redeploy хийх

**Амжилт хүсье!** 🎉
