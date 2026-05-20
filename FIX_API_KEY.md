# 🔑 API Key засах заавар

## ⚠️ Асуудал

Таны `.env.local` файл дахь Supabase API key-нүүд таслагдсан байна:

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...PYx8xm725oH3gi-rBLtNqA_BwyqZld9  ❌ Таслагдсан
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...8zg0vI7KgdV_RLm2mlI8_A_8uYD7wbe  ❌ Таслагдсан
```

## ✅ Шийдэл

### Алхам 1: Supabase Settings руу орох

1. Энэ холбоос руу орно уу:
   ```
   https://supabase.com/dashboard/project/xdywicnxzgtstrslhvcu/settings/api
   ```

2. Эсвэл:
   - https://supabase.com/dashboard орно уу
   - Төслөө сонгоно уу
   - Зүүн цэснээс **Settings** → **API** сонгоно уу

### Алхам 2: API Keys-ийг хуулах

**Project API keys** хэсэгт 2 key байна:

#### 1. `anon` `public` key:
- Энэ key-г бүтнээр хуулна уу
- Маш урт байх ёстой (200+ тэмдэгт)
- `eyJ` гэж эхэлж, урт тоо үсэг дараалал байна

#### 2. `service_role` `secret` key:
- **👁️ Reveal** товч дээр дарж харуулна уу
- Энэ key-г бүтнээр хуулна уу
- Мөн маш урт байх ёстой

### Алхам 3: .env.local файлыг засах

`.env.local` файлыг нээгээд дараах мөрүүдийг солино уу:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xdywicnxzgtstrslhvcu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ЭНЭ_БҮРЭН_ANON_KEY_ОРУУЛАХ
SUPABASE_SERVICE_ROLE_KEY=ЭНЭ_БҮРЭН_SERVICE_ROLE_KEY_ОРУУЛАХ
```

**Жишээ нь:**
```env
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeXdpY254emd0c3Ryc2xodmN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2NzQ0NzAsImV4cCI6MjA1MDI1MDQ3MH0.PYx8xm725oH3gi-rBLtNqA_BwyqZld9БҮРЭН_ҮРГЭЛЖЛЭЛ
```

### Алхам 4: Серверийг дахин эхлүүлэх

```bash
# Одоо ажиллаж байгаа серверийг зогсоох (Ctrl+C)
# Дахин эхлүүлэх:
npm run dev
```

### Алхам 5: Дахин шалгах

```bash
node scripts/check-users.js
```

Хэрэв амжилттай бол:
```
✅ Нийт X хэрэглэгч олдлоо
```

## 🔒 Анхааруулга

- `service_role` key нь **маш чухал нууц** мэдээлэл!
- Энэ key-г хэн нэгэнд өгч болохгүй
- GitHub дээр push хийхдээ `.env.local` файл `.gitignore` дотор байгаа эсэхийг шалгана уу

## 🆘 Тусламж

Хэрэв API key олдохгүй байвал:
1. Supabase төсөл идэвхтэй эсэхийг шалгана уу
2. Эрх хүрэлцэхгүй байвал төслийн эзэнтэй холбогдоно уу
3. Шинэ төсөл үүсгэх шаардлагатай байж магадгүй

---

**Дараагийн алхам:** API key-г засаад `npm run dev` ажиллуулна уу!
