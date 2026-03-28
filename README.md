# School LMS - Learning Management System

**Smart Digital School Ecosystem** - Platform manajemen sekolah modern dengan 3 tier.

---

## **🎯 Product Tiers**

### **🥉 STANDARD (Go Digital Basic)**
**"Sekolah langsung punya website & sistem belajar online"**

**Fitur:**
- ✅ Website sekolah (profil, berita, galeri, kontak)
- ✅ LMS dasar (upload materi, tugas, quiz)
- ✅ Input nilai sederhana
- ✅ PPDB form online
- ✅ Dashboard dasar

**Target:** Sekolah kecil yang masih manual  
**Price:** Rp 499K/month

---

### **🥈 PLUS (Operational School System)** ⭐ **BEST SELLER**
**"Semua aktivitas sekolah tertata"**

**Fitur STANDARD + :**
- ✅ LMS lengkap (CBT, bank soal, rapor digital)
- ✅ Absensi (QR code, auto-rekap)
- ✅ Keuangan (SPP billing, QRIS, payment gateway)
- ✅ Portal Orang Tua (nilai, absensi, tugas)
- ✅ Komunikasi (guru ↔ orang tua)
- ✅ Mobile app (iOS + Android)
- ✅ PPDB management lengkap

**Target:** Sekolah yang sudah jalan tapi kewalahan administrasi  
**Price:** Rp 1.499K/month

---

### **🥇 ADVANCE (Smart Digital School Ecosystem)**
**"Sekolah modern, data-driven, unggul kompetitif"**

**Fitur PLUS + :**
- ✅ AI-powered LMS (auto-grading, recommendations)
- ✅ AI Tutor untuk siswa
- ✅ WhatsApp integration (notifikasi otomatis)
- ✅ Predictive analytics
- ✅ Face recognition absensi
- ✅ Multi-school/yayasan support
- ✅ API integrations (ERP, Dapodik)

**Target:** Sekolah besar / yayasan  
**Price:** Custom (Starting from Rp 4.999K/month)

---

## **🚀 Tech Stack**

- **Frontend:** Next.js 14 + Tailwind CSS + TypeScript
- **Backend:** Node.js + Supabase
- **Database:** PostgreSQL
- **Mobile:** React Native (coming soon)
- **Deployment:** Vercel
- **AI:** OpenAI / Local LLM

---

## **📋 Development Roadmap**

### **Phase 1: STANDARD (MVP)** - 2-3 weeks
- [ ] Setup project structure
- [ ] Database schema
- [ ] Authentication (Admin, Guru, Siswa)
- [ ] Website CMS (profil, berita, galeri)
- [ ] LMS basic (materi, tugas, quiz)
- [ ] PPDB form
- [ ] Deployment

### **Phase 2: PLUS (Core Product)** - 4-6 weeks
- [ ] CBT (Computer Based Test)
- [ ] Bank soal & auto-grading
- [ ] Rapor digital
- [ ] Absensi QR code
- [ ] SPP billing & payment gateway
- [ ] Portal orang tua
- [ ] Mobile app
- [ ] In-app messaging

### **Phase 3: ADVANCE (Premium)** - 6-8 weeks
- [ ] AI auto-grading (esai)
- [ ] AI recommendations
- [ ] AI Tutor
- [ ] WhatsApp integration
- [ ] Predictive analytics
- [ ] Face recognition
- [ ] Multi-school support
- [ ] API integrations

---

## **🏗️ Project Structure**

```
lms/
├── apps/
│   ├── web/                    # Next.js web app
│   ├── mobile/                 # React Native (later)
│   └── admin/                  # Admin dashboard
├── packages/
│   ├── database/               # Supabase schema & migrations
│   ├── api/                    # API endpoints
│   └── ui/                     # Shared UI components
├── docs/
│   ├── product-tiers.md        # Detailed tiers
│   ├── api-docs.md             # API documentation
│   └── deployment.md           # Deployment guide
└── scripts/
    ├── seed.sql                # Sample data
    └── backup.sh               # Backup scripts
```

---

## **👥 Target Market**

| Tier | Target | Price | Margin |
|------|--------|-------|--------|
| **STANDARD** | Sekolah kecil (100-300 siswa) | Rp 499K/month | Low (market entry) |
| **PLUS** ⭐ | Sekolah menengah (300-1000 siswa) | Rp 1.499K/month | **High (main profit)** |
| **ADVANCE** | Sekolah besar / yayasan (1000+ siswa) | Custom | **Very High (enterprise)** |

---

## **💰 Revenue Projection**

**Year 1 Target:**
- 50 schools × STANDARD = Rp 25M/month
- 30 schools × PLUS = Rp 45M/month
- 5 schools × ADVANCE = Rp 25M/month
- **Total: Rp 95M/month** (Rp 1.14B/year)

**Year 2 Target:**
- 150 schools × STANDARD = Rp 75M/month
- 80 schools × PLUS = Rp 120M/month
- 20 schools × ADVANCE = Rp 100M/month
- **Total: Rp 295M/month** (Rp 3.54B/year)

---

## **🔧 Getting Started**

### **Prerequisites**
- Node.js 18+
- Supabase account
- Vercel account

### **Installation**

```bash
# Clone repository
git clone https://github.com/ikurniawann/lms.git
cd lms

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

### **Environment Variables**

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Vercel
NEXT_PUBLIC_VERCEL_URL=your_vercel_url

# Payment Gateway (Midtrans/Xendit)
NEXT_PUBLIC_PAYMENT_GATEWAY_KEY=your_key

# WhatsApp API
WHATSAPP_API_KEY=your_key

# AI (OpenAI)
OPENAI_API_KEY=your_key
```

---

## **📞 Contact**

**Ilham Kurniawan**  
Email: [your-email@example.com](mailto:your-email@example.com)  
Phone: +62-xxx-xxxx-xxxx

---

## **📄 License**

Proprietary - All rights reserved.

---

**Built with ❤️ for Indonesian Schools**
