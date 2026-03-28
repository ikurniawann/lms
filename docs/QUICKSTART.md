# Panduan Cepat - LMS Sekolah

## **🚀 Mulai dalam 10 Menit**

### **Langkah 1: Clone Repository**
```bash
git clone https://github.com/ikurniawann/lms.git
cd lms
```

### **Langkah 2: Install Dependencies**
```bash
npm install
```

### **Langkah 3: Setup Supabase**

1. Buka [https://supabase.com](https://supabase.com)
2. Buat project baru
3. Copy URL project dan API keys kamu

4. Buat file `.env.local`:
```bash
cp .env.example .env.local
```

5. Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://project-kamu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon-key-kamu
SUPABASE_SERVICE_ROLE_KEY=service-role-key-kamu
```

### **Langkah 4: Setup Database**

```bash
# Jalankan migrations
npm run db:migrate

# Atau manual di Supabase SQL Editor:
# Copy paste database/schema.sql
```

### **Langkah 5: Jalankan Development Server**
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## **📁 Struktur Project**

```
lms/
├── apps/
│   ├── web/                    # Aplikasi utama Next.js
│   │   ├── app/
│   │   │   ├── page.tsx        # Landing page
│   │   │   ├── login/          # Halaman login
│   │   │   ├── dashboard/      # Dashboard user
│   │   │   ├── lms/            # Fitur LMS
│   │   │   ├── absensi/        # Absensi
│   │   │   ├── keuangan/       # Keuangan
│   │   │   └── ppdb/           # PPDB
│   │   ├── components/         # Components React
│   │   └── lib/                # Utilities
│   └── mobile/                 # React Native (nanti)
├── database/
│   ├── schema.sql              # Schema database
│   └── seed.sql                # Data sample
├── docs/
│   ├── PRODUCT_TIERS.md        # Detail paket
│   └── API.md                  # Dokumentasi API
├── public/                     # File statis
└── package.json
```

---

## **🎯 Langkah Selanjutnya**

### **Untuk Development:**
1. Baca `database/schema.sql` - Pahami struktur data
2. Cek `docs/PRODUCT_TIERS.md` - Detail fitur
3. Mulai bangun landing page
4. Implementasi autentikasi

### **Untuk Sales:**
1. Baca `docs/PRODUCT_TIERS.md` - Pahami fitur
2. Siapkan demo environment
3. Buat sales deck
4. Mulai outreach ke sekolah

---

## **🆘 Butuh Bantuan?**

**Dokumentasi:**
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

**Kontak:**
- Email: support@lms.co.id
- GitHub Issues: [Buat issue](https://github.com/ikurniawann/lms/issues)

---

## **📋 Checklist - Setup Pertama**

- [ ] Repository Git cloned
- [ ] Node.js terinstall (v18+)
- [ ] Akun Supabase dibuat
- [ ] Environment variables dikonfigurasi
- [ ] Database schema deployed
- [ ] Development server running
- [ ] Bisa akses localhost:3000

---

**Selamat Coding!** 🚀
