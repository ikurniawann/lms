# Quick Start Guide - School LMS

## **🚀 Get Started in 10 Minutes**

### **Step 1: Clone Repository**
```bash
git clone https://github.com/ikurniawann/lms.git
cd lms
```

### **Step 2: Install Dependencies**
```bash
npm install
```

### **Step 3: Setup Supabase**

1. Go to [https://supabase.com](https://supabase.com)
2. Create new project
3. Copy your project URL and API keys

4. Create `.env.local` file:
```bash
cp .env.example .env.local
```

5. Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### **Step 4: Setup Database**

```bash
# Run migrations
npm run db:migrate

# Or manually in Supabase SQL Editor:
# Copy paste database/schema.sql
```

### **Step 5: Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## **📁 Project Structure**

```
lms/
├── apps/
│   ├── web/                    # Main Next.js app
│   │   ├── app/
│   │   │   ├── page.tsx        # Landing page
│   │   │   ├── login/          # Login page
│   │   │   ├── dashboard/      # User dashboard
│   │   │   ├── lms/            # LMS features
│   │   │   ├── attendance/     # Absensi
│   │   │   ├── finance/        # Keuangan
│   │   │   └── ppdb/           # PPDB
│   │   ├── components/         # React components
│   │   └── lib/                # Utilities
│   └── mobile/                 # React Native (later)
├── database/
│   ├── schema.sql              # Database schema
│   └── seed.sql                # Sample data
├── docs/
│   ├── PRODUCT_TIERS.md        # Product tiers
│   └── API.md                  # API docs
├── public/                     # Static files
└── package.json
```

---

## **🎯 Next Steps**

### **For Development:**
1. Read `database/schema.sql` - Understand data model
2. Check `docs/PRODUCT_TIERS.md` - Feature details
3. Start building landing page
4. Implement authentication

### **For Sales:**
1. Read `docs/PRODUCT_TIERS.md` - Know the features
2. Prepare demo environment
3. Create sales deck
4. Start outreach to schools

---

## **🆘 Need Help?**

**Documentation:**
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

**Contact:**
- Email: support@lms.co.id
- GitHub Issues: [Create issue](https://github.com/ikurniawann/lms/issues)

---

## **📋 Checklist - First Time Setup**

- [ ] Git repository cloned
- [ ] Node.js installed (v18+)
- [ ] Supabase account created
- [ ] Environment variables configured
- [ ] Database schema deployed
- [ ] Development server running
- [ ] Can access localhost:3000

---

**Happy Coding!** 🚀
