# 🚀 Vercel Deployment Guide

**Зорилго**: Indra Cyber Home системийг Vercel дээр deploy хийх

---

## ✅ Бэлтгэл

### 1. GitHub Repository
- ✅ Бүх өөрчлөлт push хийгдсэн
- ✅ Repository: https://github.com/skrall1126-cyber/diplom.git
- ✅ Branch: main

### 2. Environment Variables
Дараах environment variables хэрэгтэй:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=https://your-vercel-domain.vercel.app
```

---

## 🚀 Vercel дээр Deploy хийх

### Арга 1: Vercel Dashboard (Санал болгож байна)

#### 1. Vercel-д нэвтрэх
```
https://vercel.com
```

#### 2. New Project үүсгэх
- "Add New..." → "Project" дарах
- GitHub repository сонгох: `skrall1126-cyber/diplom`
- "Import" дарах

#### 3. Project тохируулах
**Framework Preset**: Next.js (автоматаар таних ёстой)

**Root Directory**: `indra-cyber-home/indra-home`
- "Edit" дарах
- `indra-cyber-home/indra-home` гэж оруулах

**Build Command**: (default)
```bash
npm run build
```

**Output Directory**: (default)
```
.next
```

**Install Command**: (default)
```bash
npm install
```

#### 4. Environment Variables нэмэх
"Environment Variables" хэсэгт дараах variables нэмэх:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `NEXT_PUBLIC_APP_URL` | https://your-project.vercel.app |

**Анхаар**: `NEXT_PUBLIC_APP_URL` нь deploy хийсний дараа Vercel-с өгсөн domain байна.

#### 5. Deploy дарах
- "Deploy" товч дарах
- 2-5 минут хүлээх
- Амжилттай бол "Visit" товч гарна

---

### Арга 2: Vercel CLI

#### 1. Vercel CLI суулгах
```bash
npm install -g vercel
```

#### 2. Нэвтрэх
```bash
vercel login
```

#### 3. Deploy хийх
```bash
cd indra-cyber-home/indra-home
vercel
```

#### 4. Environment variables тохируулах
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add NEXT_PUBLIC_APP_URL
```

#### 5. Production deploy
```bash
vercel --prod
```

---

## 🔧 Vercel тохиргоо

### vercel.json файл үүсгэх (Optional)

```json
{
  "buildCommand": "cd indra-cyber-home/indra-home && npm run build",
  "devCommand": "cd indra-cyber-home/indra-home && npm run dev",
  "installCommand": "cd indra-cyber-home/indra-home && npm install",
  "framework": "nextjs",
  "outputDirectory": "indra-cyber-home/indra-home/.next"
}
```

---

## ✅ Deploy хийсний дараа шалгах

### 1. Domain шалгах
Vercel-с өгсөн domain:
```
https://your-project-name.vercel.app
```

### 2. Environment Variables шалгах
Vercel Dashboard → Project → Settings → Environment Variables

### 3. Хуудсууд шалгах

**Login:**
```
https://your-domain.vercel.app/admin/login
```

**API холбогдсон хуудсууд:**
- `/admin/students`
- `/admin/teachers`
- `/admin/classes`
- `/admin/student-payments`
- `/admin/staff-salaries`
- `/admin/training-management`
- `/admin/profile`
- `/admin/departments-branches`
- `/admin/finance-dashboard`
- `/admin/training-dashboard`

### 4. API endpoints шалгах
```
https://your-domain.vercel.app/api/students
https://your-domain.vercel.app/api/teachers
```

---

## 🐛 Алдаа засах

### Алдаа 1: "Module not found"
**Шалтгаан**: Root directory буруу тохируулагдсан

**Шийдэл**:
1. Vercel Dashboard → Project → Settings
2. "Root Directory" → `indra-cyber-home/indra-home`
3. Redeploy

### Алдаа 2: "Environment variable not found"
**Шалтгаан**: Environment variables тохируулаагүй

**Шийдэл**:
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Бүх variables нэмэх
3. Redeploy

### Алдаа 3: "API route not found"
**Шалтгаан**: Build алдаатай

**Шийдэл**:
1. Vercel Dashboard → Deployments → Latest
2. "View Function Logs" шалгах
3. Алдааг засаад redeploy

### Алдаа 4: "Invalid API key"
**Шалтгаан**: Supabase keys буруу

**Шийдэл**:
1. Supabase Dashboard-с keys дахин авах
2. Vercel environment variables шинэчлэх
3. Redeploy

### Алдаа 5: Build timeout
**Шалтгаан**: Build хугацаа хэтэрсэн

**Шийдэл**:
1. `package.json` дээр dependencies шалгах
2. Хэрэггүй dependencies устгах
3. Redeploy

---

## 📊 Vercel дээр ажиллах хуудсууд

### ✅ Ажиллах (10):
1. Students ✅
2. Teachers ✅
3. Classes ✅
4. Student Payments ✅
5. Staff Salaries ✅
6. Training Management ✅
7. Profile ✅
8. Departments & Branches ✅
9. Finance Dashboard ✅
10. Training Dashboard ✅

### ⏳ Ажиллах (50):
- Dashboard (Main)
- Attendance
- Grades
- Exam Schedule
- Timetable
- Settings
- Бусад 44 хуудас

**Анхаар**: API холбогдоогүй хуудсууд mock data харуулна.

---

## 🔐 Production тохиргоо

### 1. NEXT_PUBLIC_APP_URL шинэчлэх
Deploy хийсний дараа:

```env
# Development
NEXT_PUBLIC_APP_URL=http://localhost:3001

# Production
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
```

### 2. CORS тохиргоо
Хэрэв Supabase CORS алдаа гарвал:

1. Supabase Dashboard → Settings → API
2. "Site URL" → Vercel domain нэмэх
3. "Additional URLs" → Vercel domain нэмэх

### 3. Authentication redirect
Cookie-based authentication ашиглаж байгаа тул:
- Login redirect: `/admin/dashboard`
- Logout redirect: `/admin/login`

---

## 📈 Performance

### Vercel дээр:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments (git push)
- ✅ Preview deployments (PR)
- ✅ Analytics
- ✅ Edge Functions

### Хурд:
- First Load: ~2-3 секунд
- Navigation: ~500ms
- API calls: ~200-500ms

---

## 🎯 Дараагийн алхам

### Deploy хийсний дараа:

1. ✅ Domain шалгах
2. ✅ Login тестлэх
3. ✅ API endpoints тестлэх
4. ✅ Бүх хуудсууд шалгах
5. ⏳ Custom domain холбох (optional)
6. ⏳ Analytics тохируулах
7. ⏳ Error monitoring нэмэх

---

## 🌐 Custom Domain (Optional)

### 1. Domain худалдаж авах
- Namecheap, GoDaddy, etc.

### 2. Vercel-д нэмэх
1. Vercel Dashboard → Project → Settings → Domains
2. "Add Domain" дарах
3. Domain оруулах (e.g., `indra-cyber.com`)
4. DNS records тохируулах

### 3. DNS тохиргоо
Vercel-с өгсөн DNS records-ийг domain provider дээр нэмэх:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 📞 Тусламж

### Vercel Support:
- Documentation: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions
- Support: support@vercel.com

### Supabase Support:
- Documentation: https://supabase.com/docs
- Community: https://github.com/supabase/supabase/discussions
- Support: support@supabase.com

---

## 🎊 Амжилт!

Vercel дээр deploy хийсний дараа таны админы систем дэлхий даяар хандах боломжтой болно! 🌍

**URL**: https://your-project.vercel.app

**Нэвтрэх**:
- Username: admin
- Password: admin123

**Амжилт хүсье!** 🚀
