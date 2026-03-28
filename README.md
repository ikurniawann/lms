# LMS Sekolah - Sistem Manajemen Pembelajaran

**Ekosistem Sekolah Digital Pintar** - Platform manajemen sekolah modern dengan 3 paket.

---

## **🎯 Paket Produk**

### **🥉 STANDARD (Go Digital Basic)**
**"Sekolah langsung punya website & sistem belajar online"**

**Fitur:**
- ✅ Website sekolah (profil, berita, galeri, kontak)
- ✅ LMS dasar (upload materi, tugas, kuis)
- ✅ Input nilai sederhana
- ✅ Form PPDB online
- ✅ Dashboard dasar

**Target:** Sekolah kecil yang masih manual  
**Harga:** Rp 499.000/bulan

---

### **🥈 PLUS (Operational School System)** ⭐ **PALING LARIS**
**"Semua aktivitas sekolah tertata"**

**Fitur STANDARD + :**
- ✅ LMS lengkap (CBT, bank soal, rapor digital)
- ✅ Absensi (QR code, auto-rekap)
- ✅ Keuangan (billing SPP, QRIS, payment gateway)
- ✅ Portal Orang Tua (nilai, absensi, tugas)
- ✅ Komunikasi (guru ↔ orang tua)
- ✅ Aplikasi mobile (iOS + Android)
- ✅ Manajemen PPDB lengkap

**Target:** Sekolah yang sudah jalan tapi kewalahan administrasi  
**Harga:** Rp 1.499.000/bulan

---

### **🥇 ADVANCE (Smart Digital School Ecosystem)**
**"Sekolah modern, data-driven, unggul kompetitif"**

**Fitur PLUS + :**
- ✅ AI-powered LMS (auto-grading, rekomendasi)
- ✅ AI Tutor untuk siswa
- ✅ Integrasi WhatsApp (notifikasi otomatis)
- ✅ Predictive analytics
- ✅ Absensi face recognition
- ✅ Support multi-sekolah / yayasan
- ✅ Integrasi API (ERP, Dapodik)

**Target:** Sekolah besar / yayasan  
**Harga:** Custom (Mulai Rp 4.999.000/bulan)

---

## **🚀 Teknologi**

- **Frontend:** Next.js 14 + Tailwind CSS + TypeScript
- **Backend:** Node.js + Supabase
- **Database:** PostgreSQL
- **Mobile:** React Native (segera)
- **Deployment:** Vercel
- **AI:** OpenAI / Local LLM

---

## **📋 Roadmap Pengembangan**

### **Fase 1: STANDARD (MVP)** - 2-3 minggu
- [ ] Setup struktur project
- [ ] Database schema
- [ ] Autentikasi (Admin, Guru, Siswa)
- [ ] Website CMS (profil, berita, galeri)
- [ ] LMS basic (materi, tugas, kuis)
- [ ] Form PPDB
- [ ] Deployment

### **Fase 2: PLUS (Core Product)** - 4-6 minggu
- [ ] CBT (Computer Based Test)
- [ ] Bank soal & auto-grading
- [ ] Rapor digital
- [ ] Absensi QR code
- [ ] Billing SPP & payment gateway
- [ ] Portal orang tua
- [ ] Aplikasi mobile
- [ ] In-app messaging

### **Fase 3: ADVANCE (Premium)** - 6-8 minggu
- [ ] AI auto-grading (esai)
- [ ] AI recommendations
- [ ] AI Tutor
- [ ] Integrasi WhatsApp
- [ ] Predictive analytics
- [ ] Face recognition
- [ ] Support multi-sekolah
- [ ] Integrasi API

---

## **🏗️ Struktur Project**

```
lms/
├── apps/
│   ├── web/                    # Aplikasi web Next.js
│   ├── mobile/                 # React Native (nanti)
│   └── admin/                  # Dashboard admin
├── packages/
│   ├── database/               # Schema & migrations Supabase
│   ├── api/                    # API endpoints
│   └── ui/                     # UI components shared
├── docs/
│   ├── product-tiers.md        # Detail paket
│   ├── api-docs.md             # Dokumentasi API
│   └── deployment.md           # Panduan deployment
└── scripts/
    ├── seed.sql                # Data sample
    └── backup.sh               # Script backup
```

---

## **👥 Target Market**

| Paket | Target | Harga | Margin |
|-------|--------|-------|--------|
| **STANDARD** | Sekolah kecil (100-300 siswa) | Rp 499K/bulan | Rendah (market entry) |
| **PLUS** ⭐ | Sekolah menengah (300-1000 siswa) | Rp 1.499K/bulan | **Tinggi (profit utama)** |
| **ADVANCE** | Sekolah besar / yayasan (1000+ siswa) | Custom | **Sangat Tinggi (enterprise)** |

---

## **💰 Proyeksi Pendapatan**

**Target Tahun 1:**
- 50 sekolah × STANDARD = Rp 25M/bulan
- 30 sekolah × PLUS = Rp 45M/bulan
- 5 sekolah × ADVANCE = Rp 25M/bulan
- **Total: Rp 95M/bulan** (Rp 1.14B/tahun)

**Target Tahun 2:**
- 150 sekolah × STANDARD = Rp 75M/bulan
- 80 sekolah × PLUS = Rp 120M/bulan
- 20 sekolah × ADVANCE = Rp 100M/bulan
- **Total: Rp 295M/bulan** (Rp 3.54B/tahun)

---

## **🔧 Memulai**

### **Prasyarat**
- Node.js 18+
- Akun Supabase
- Akun Vercel

### **Instalasi**

```bash
# Clone repository
git clone https://github.com/ikurniawann/lms.git
cd lms

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Jalankan database migrations
npm run db:migrate

# Start development server
npm run dev
```

### **Environment Variables**

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=url_supabase_kamu
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon_key_kamu
SUPABASE_SERVICE_ROLE_KEY=service_role_key_kamu

# Vercel
NEXT_PUBLIC_VERCEL_URL=url_vercel_kamu

# Payment Gateway (Midtrans/Xendit)
NEXT_PUBLIC_PAYMENT_GATEWAY_KEY=key_kamu

# WhatsApp API
WHATSAPP_API_KEY=key_kamu

# AI (OpenAI)
OPENAI_API_KEY=key_kamu
```

---

## **📞 Kontak**

**Ilham Kurniawan**  
Email: [email-kamu@example.com](mailto:email-kamu@example.com)  
Telepon: +62-xxx-xxxx-xxxx

---

## **📄 Lisensi**

Proprietary - Hak cipta dilindungi.

---

**Dibuat dengan ❤️ untuk Sekolah Indonesia**
# Force rebuild

<!-- Force rebuild Sat Mar 28 10:40:24 PM CST 2026 -->
