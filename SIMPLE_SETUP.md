# 🚀 Хялбар тохиргоо (3 алхам)

## Алхам 1: Supabase SQL Editor руу орох

Энэ холбоос руу орно уу:
```
https://supabase.com/dashboard/project/xdywicnxzgtstrslhvcu/sql
```

Эсвэл:
1. https://supabase.com/dashboard орно уу
2. Төслөө сонгоно уу
3. Зүүн цэснээс **SQL Editor** сонгоно уу

## Алхам 2: SQL кодыг ажиллуулах

1. `scripts/create-admin-simple.sql` файлыг нээнэ үү
2. **Бүх агуулгыг хуулна уу** (Ctrl+A, Ctrl+C)
3. Supabase SQL Editor дээр **буулгана уу** (Ctrl+V)
4. **Run** товч дээр дарна уу

✅ Амжилттай бол хэрэглэгчдийн жагсаалт гарна:

```
username        | email                  | role           | status
----------------|------------------------|----------------|--------
admin           | admin@indra.edu.mn     | SUPER_ADMIN    | ACTIVE
training_admin  | training@indra.edu.mn  | TRAINING_ADMIN | ACTIVE
finance_admin   | finance@indra.edu.mn   | FINANCE_ADMIN  | ACTIVE
teacher1        | teacher@indra.edu.mn   | TEACHER        | ACTIVE
student1        | student@indra.edu.mn   | STUDENT        | ACTIVE
```

## Алхам 3: Нэвтрэх

1. Серверийг эхлүүлнэ үү:
   ```bash
   npm run dev
   ```

2. Нэвтрэх хуудас руу орно уу:
   ```
   http://localhost:3000/admin/login
   ```

3. Нэвтрэх:
   - **Хэрэглэгчийн нэр:** `admin`
   - **Нууц үг:** `admin123`

## 🎉 Бэлэн!

Та одоо системд нэвтэрч болно!

### 🔑 Бүх нэвтрэх мэдээлэл:

| Эрх | Username | Password |
|-----|----------|----------|
| 🔴 Супер Админ | `admin` | `admin123` |
| 📚 Сургалтын Админ | `training_admin` | `training123` |
| 💰 Санхүүгийн Админ | `finance_admin` | `finance123` |
| 👨‍🏫 Багш | `teacher1` | `teacher123` |
| 👨‍🎓 Оюутан | `student1` | `student123` |

---

**Анхааруулга:** Service role key-г одоохондоо ашиглахгүй. SQL-ээр шууд хэрэглэгч үүсгэж байна.
