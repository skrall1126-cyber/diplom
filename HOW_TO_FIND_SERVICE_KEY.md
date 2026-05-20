# 🔑 Service Role Key хаанаас олох вэ?

## Арга 1: Project Settings → API

### Алхам 1: Project Settings руу орох

Дараах холбоосуудын аль нэгээр орно уу:

**Шууд холбоос:**
```
https://app.supabase.com/project/xdywicnxzgtstrslhvcu/settings/api
```

**Эсвэл гараар:**
1. https://supabase.com/dashboard орно уу
2. Төслөө (xdywicnxzgtstrslhvcu) сонгоно уу
3. Доод талын **⚙️ Project Settings** дээр дарна уу
4. **API** tab сонгоно уу

### Алхам 2: Service Role Key олох

**"Project API keys" хэсэгт 2 key байна:**

```
┌────────────────────────────────────────────────┐
│ Project API keys                               │
├────────────────────────────────────────────────┤
│                                                │
│ 📌 anon public                                 │
│ Used as the supabase_key parameter            │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...       │
│ [Copy]                                         │
│                                                │
│ 🔐 service_role secret                         │
│ Full access to your data, bypassing RLS       │
│ ••••••••••••••••••••••••••••  [👁️ Reveal]     │ ⬅️ ЭНЭ ДЭЭР ДАРНА!
│                                                │
└────────────────────────────────────────────────┘
```

### Алхам 3: Reveal дарж key-г харуулах

1. **"👁️ Reveal"** товч дээр дарна уу
2. Key харагдана: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeXdpY254emd0c3Ryc2xodmN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTI1NzI1MiwiZXhwIjoyMDk0ODMzMjUyfQ.XXXXXXXXXXXXXXXXXXXXXXXXXX`
3. **"Copy"** товч дээр дарж хуулна уу

---

## Арга 2: Database Settings-аас

Хэрэв дээрх арга ажиллахгүй бол:

1. **Project Settings → Database** руу орно уу
2. **Connection string** хэсэгт **URI** сонгоно уу
3. Тэнд password харагдана

---

## Арга 3: Шинэ Project үүсгэх

Хэрэв key олдохгүй бол:

1. Шинэ Supabase project үүсгэнэ үү
2. Project үүсэх үед бүх key-нүүд харагдана
3. Тэдгээрийг хуулж авна уу

---

## ✅ Key олсны дараа:

`.env.local` файлд оруулна уу:

```env
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeXdpY254emd0c3Ryc2xodmN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTI1NzI1MiwiZXhwIjoyMDk0ODMzMjUyfQ.XXXXXXXXXXXXXXXXXXXXXXXXXX
```

Дараа нь:
```bash
# Серверийг дахин эхлүүлэх
npm run dev
```

---

## 🔍 Яагаад олдохгүй байж болох вэ?

1. **Эрх хүрэлцэхгүй байна** - Төслийн эзэн эсвэл админ байх ёстой
2. **Буруу төсөл** - Өөр төсөл нээсэн байж магадгүй
3. **Төсөл устгагдсан** - Төсөл идэвхгүй байж магадгүй

---

## 🆘 Тусламж хэрэгтэй бол:

Supabase дээр screenshot авч ирүүлээрэй, би тусална!
