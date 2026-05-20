# 🔑 Supabase API Keys авах заавар

## Алхам 1: Supabase Dashboard руу нэвтрэх

1. Энэ холбоос руу орно уу:
   ```
   https://supabase.com/dashboard
   ```

2. Өөрийн бүртгэлээр нэвтэрнэ үү (Google, GitHub гэх мэт)

## Алхам 2: Төслөө сонгох

1. Dashboard дээр төслүүдийн жагсаалт харагдана
2. **"xdywicnxzgtstrslhvcu"** эсвэл **"indra-cyber-home"** төслийг сонгоно уу

## Алхам 3: Settings → API руу орох

### Арга 1: Шууд холбоос
```
https://app.supabase.com/project/xdywicnxzgtstrslhvcu/settings/api
```

### Арга 2: Гараар
1. Зүүн доод буланд **⚙️ Project Settings** дээр дарна уу
2. Зүүн цэснээс **API** сонгоно уу

## Алхам 4: API Keys хуулах

**"Project API keys" хэсэгт 2 key байна:**

### 1️⃣ anon (public) key

```
┌─────────────────────────────────────────────────┐
│ anon                                    public  │
│ Used as the supabase_key parameter             │
│                                                 │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3... │
│                                                 │
│ [Copy]                                          │
└─────────────────────────────────────────────────┘
```

**"Copy" товч дээр дарж хуулна уу**

### 2️⃣ service_role (secret) key

```
┌─────────────────────────────────────────────────┐
│ service_role                           secret   │
│ Full access to your data, bypassing RLS        │
│                                                 │
│ ••••••••••••••••••••••••••••  [👁️ Reveal]      │ ⬅️ ЭНЭ ДЭЭР ДАРНА!
│                                                 │
└─────────────────────────────────────────────────┘
```

**Алхам:**
1. **"👁️ Reveal"** товч дээр дарна уу
2. Key харагдана
3. **"Copy"** товч дээр дарж хуулна уу

## Алхам 5: .env.local файлд оруулах

VS Code дээр `.env.local` файлыг нээгээд дараах мөрүүдийг солино уу:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xdywicnxzgtstrslhvcu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ЭНЭ_ANON_KEY_ОРУУЛАХ
SUPABASE_SERVICE_ROLE_KEY=ЭНЭ_SERVICE_ROLE_KEY_ОРУУЛАХ
```

### ⚠️ Чухал:
- Key-нүүд **маш урт** байх ёстой (200+ тэмдэгт)
- `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.` гэж эхэлнэ
- Дунд нь `.` байна
- Төгсгөлд ч урт тэмдэгтүүд байна

### Жишээ (бүрэн биш):
```env
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeXdpY254emd0c3Ryc2xodmN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNTcyNTIsImV4cCI6MjA5NDgzMzI1Mn0.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeXdpY254emd0c3Ryc2xodmN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTI1NzI1MiwiZXhwIjoyMDk0ODMzMjUyfQ.YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
```

## Алхам 6: Серверийг дахин эхлүүлэх

```bash
# Одоо ажиллаж байгаа серверийг зогсоох (Ctrl+C)
npm run dev
```

## Алхам 7: Шалгах

```bash
node scripts/test-connection.js
```

Амжилттай бол:
```
✅ Холболт амжилттай!
```

---

## 🖼️ Зураг дээр харуулбал:

```
Supabase Dashboard
├── Project Settings (⚙️)
│   └── API
│       ├── Project URL
│       │   └── https://xdywicnxzgtstrslhvcu.supabase.co
│       │
│       └── Project API keys
│           ├── anon public [Copy] ⬅️ Энийг хуулна
│           │   └── eyJhbGci...
│           │
│           └── service_role secret [👁️ Reveal] [Copy] ⬅️ Reveal дараад хуулна
│               └── eyJhbGci...
```

---

## 🆘 Асуудал гарвал:

### "Reveal товч олдохгүй байна"
- Эрх хүрэлцэхгүй байж магадгүй
- Төслийн эзэн эсвэл админ байх ёстой

### "Key хуулагдахгүй байна"
- Гараар сонгоод Ctrl+C дарж хуулна уу
- Бүх key-г бүтнээр хуулах ёстой

### "Төсөл олдохгүй байна"
- Зөв бүртгэлээр нэвтэрсэн эсэхийг шалгана уу
- Төсөл устгагдсан эсэхийг шалгана уу

---

**Дараагийн алхам:** Key-нүүдийг хуулаад `.env.local` дээр оруулна уу!
