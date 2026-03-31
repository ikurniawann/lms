-- ============================================
-- LMS SEKOLAH - SEED DATA
-- ============================================
-- Run this after schema.sql and rls_policies.sql

-- ============================================
-- 1. ACADEMIC YEARS & SEMESTERS
-- ============================================

INSERT INTO academic_years (year_name, start_date, end_date, is_active) VALUES
('2025/2026', '2025-07-01', '2026-06-30', true),
('2026/2027', '2026-07-01', '2027-06-30', false);

INSERT INTO semesters (academic_year_id, semester_name, start_date, end_date, is_active) 
SELECT 
    id as academic_year_id,
    'Ganjil' as semester_name,
    '2025-07-01'::date as start_date,
    '2025-12-31'::date as end_date,
    true as is_active
FROM academic_years WHERE year_name = '2025/2026';

INSERT INTO semesters (academic_year_id, semester_name, start_date, end_date, is_active) 
SELECT 
    id as academic_year_id,
    'Genap' as semester_name,
    '2026-01-01'::date as start_date,
    '2026-06-30'::date as end_date,
    false as is_active
FROM academic_years WHERE year_name = '2025/2026';

-- ============================================
-- 2. SUBJECTS (MATA PELAJARAN)
-- ============================================

INSERT INTO subjects (subject_code, subject_name, description, credit_hours) VALUES
('MTK', 'Matematika', 'Pelajaran matematika dasar dan lanjutan', 4),
('BID', 'Bahasa Indonesia', 'Bahasa Indonesia', 4),
('BIG', 'Bahasa Inggris', 'Bahasa Inggris', 3),
('IPA', 'Ilmu Pengetahuan Alam', 'IPA (Fisika, Biologi, Kimia dasar)', 4),
('IPS', 'Ilmu Pengetahuan Sosial', 'IPS (Sejarah, Geografi, Ekonomi, Sosiologi)', 3),
('PAI', 'Pendidikan Agama Islam', 'Pendidikan Agama Islam', 3),
('POR', 'Pendidikan Agama Kristen', 'Pendidikan Agama Kristen', 3),
('PKN', 'Pendidikan Kewarganegaraan', 'Pendidikan Kewarganegaraan', 3),
('PJO', 'Pendidikan Jasmani', 'Pendidikan Jasmani dan Olahraga', 2),
('SEN', 'Seni Budaya', 'Seni dan Budaya', 2),
('TIK', 'Teknologi Informasi', 'TIK dan Komputer', 2),
('PRA', 'Prakarya', 'Keterampilan dan Prakarya', 2),
('BKA', 'Bahasa Daerah', 'Bahasa Jawa/Sunda/daerah lain', 2);

-- ============================================
-- 3. CLASSES
-- ============================================

INSERT INTO classes (class_name, grade_level, academic_year_id, max_students, room_number, is_active)
SELECT 
    '7A', 7, id, 32, 'R-101', true
FROM academic_years WHERE year_name = '2025/2026';

INSERT INTO classes (class_name, grade_level, academic_year_id, max_students, room_number, is_active)
SELECT 
    '7B', 7, id, 32, 'R-102', true
FROM academic_years WHERE year_name = '2025/2026';

INSERT INTO classes (class_name, grade_level, academic_year_id, max_students, room_number, is_active)
SELECT 
    '7C', 7, id, 32, 'R-103', true
FROM academic_years WHERE year_name = '2025/2026';

INSERT INTO classes (class_name, grade_level, academic_year_id, max_students, room_number, is_active)
SELECT 
    '8A', 8, id, 32, 'R-201', true
FROM academic_years WHERE year_name = '2025/2026';

INSERT INTO classes (class_name, grade_level, academic_year_id, max_students, room_number, is_active)
SELECT 
    '8B', 8, id, 32, 'R-202', true
FROM academic_years WHERE year_name = '2025/2026';

INSERT INTO classes (class_name, grade_level, academic_year_id, max_students, room_number, is_active)
SELECT 
    '8C', 8, id, 32, 'R-203', true
FROM academic_years WHERE year_name = '2025/2026';

INSERT INTO classes (class_name, grade_level, academic_year_id, max_students, room_number, is_active)
SELECT 
    '9A', 9, id, 32, 'R-301', true
FROM academic_years WHERE year_name = '2025/2026';

INSERT INTO classes (class_name, grade_level, academic_year_id, max_students, room_number, is_active)
SELECT 
    '9B', 9, id, 32, 'R-302', true
FROM academic_years WHERE year_name = '2025/2026';

INSERT INTO classes (class_name, grade_level, academic_year_id, max_students, room_number, is_active)
SELECT 
    '9C', 9, id, 32, 'R-303', true
FROM academic_years WHERE year_name = '2025/2026';

-- ============================================
-- 4. GRADE CATEGORIES
-- ============================================

INSERT INTO grade_categories (category_name, weight_percentage, description) VALUES
('Tugas Harian', 25, 'Nilai dari tugas-tugas harian'),
('Ulangan Harian', 20, 'Nilai dari ulangan harian/PR'),
('PTS', 25, 'Nilai Penilaian Tengah Semester'),
('PAS', 30, 'Nilai Penilaian Akhir Semester');

-- ============================================
-- 5. SPP RATES
-- ============================================

INSERT INTO spp_rates (grade_level, amount, academic_year_id, description, is_active)
SELECT 
    7 as grade_level, 
    450000 as amount, 
    id as academic_year_id,
    'SPP Kelas 7' as description,
    true as is_active
FROM academic_years WHERE year_name = '2025/2026';

INSERT INTO spp_rates (grade_level, amount, academic_year_id, description, is_active)
SELECT 
    8 as grade_level, 
    450000 as amount, 
    id as academic_year_id,
    'SPP Kelas 8' as description,
    true as is_active
FROM academic_years WHERE year_name = '2025/2026';

INSERT INTO spp_rates (grade_level, amount, academic_year_id, description, is_active)
SELECT 
    9 as grade_level, 
    450000 as amount, 
    id as academic_year_id,
    'SPP Kelas 9' as description,
    true as is_active
FROM academic_years WHERE year_name = '2025/2026';

-- ============================================
-- 6. SAMPLE SCHEDULES (for 7A)
-- ============================================

INSERT INTO schedules (class_id, subject_id, teacher_id, day_of_week, start_time, end_time, room_number, semester_id, is_active)
SELECT 
    c.id as class_id,
    s.id as subject_id,
    NULL as teacher_id,
    1 as day_of_week,
    '07:00:00'::time as start_time,
    '08:30:00'::time as end_time,
    c.room_number,
    sem.id as semester_id,
    true as is_active
FROM classes c
CROSS JOIN subjects s
CROSS JOIN semesters sem
WHERE c.class_name = '7A' AND s.subject_code = 'MTK'
AND sem.semester_name = 'Ganjil' AND sem.is_active = true
LIMIT 1;

-- ============================================
-- 7. SAMPLE MATERIALS
-- ============================================

INSERT INTO materials (title, description, subject_id, class_id, file_url, file_type, is_published, published_at, academic_year_id, semester_id)
SELECT 
    'Pengantar Aljabar' as title,
    'Materi pengantar tentang aljabar dasar untuk kelas 7' as description,
    s.id as subject_id,
    c.id as class_id,
    'https://example.com/materials/aljabar.pdf' as file_url,
    'PDF' as file_type,
    true as is_published,
    NOW() as published_at,
    ay.id as academic_year_id,
    sem.id as semester_id
FROM subjects s, classes c, academic_years ay, semesters sem
WHERE s.subject_code = 'MTK' AND c.class_name = '7A'
AND ay.year_name = '2025/2026' AND sem.semester_name = 'Ganjil' AND sem.is_active = true
LIMIT 1;

INSERT INTO materials (title, description, subject_id, class_id, file_url, file_type, is_published, published_at, academic_year_id, semester_id)
SELECT 
    'Sistem Pencernaan Manusia' as title,
    'Materi IPA tentang sistem pencernaan' as description,
    s.id as subject_id,
    c.id as class_id,
    'https://example.com/materials/pencernaan.pdf' as file_url,
    'PDF' as file_type,
    true as is_published,
    NOW() as published_at,
    ay.id as academic_year_id,
    sem.id as semester_id
FROM subjects s, classes c, academic_years ay, semesters sem
WHERE s.subject_code = 'IPA' AND c.class_name = '7A'
AND ay.year_name = '2025/2026' AND sem.semester_name = 'Ganjil' AND sem.is_active = true
LIMIT 1;

-- ============================================
-- 8. SAMPLE ANNOUNCEMENTS
-- ============================================

INSERT INTO announcements (title, content, category, priority, target_roles, is_published, published_at)
VALUES (
    'Pengumuman Awal Tahun Ajaran 2025/2026',
    'Selamat datang di tahun ajaran baru 2025/2026. Semua kegiatan pembelajaran akan dimulai pada tanggal 15 Juli 2025. Mohon untuk mengunduh jadwal pelajaran masing-masing.',
    'academic',
    'high',
    ARRAY['all'],
    true,
    NOW()
);

INSERT INTO announcements (title, content, category, priority, target_roles, is_published, published_at)
VALUES (
    'Pembayaran SPP Bulan Juli',
    'Pembayaran SPP bulan Juli dapat dilakukan mulai tanggal 1-10 Juli 2025. Pembayaran dapat dilakukan via transfer bank atau langsung di kantor sekolah.',
    'finance',
    'normal',
    ARRAY['parent', 'siswa'],
    true,
    NOW()
);

INSERT INTO announcements (title, content, category, priority, target_roles, is_published, published_at)
VALUES (
    'Jadwal Ujian Tengah Semester',
    'Ujian Tengah Semester akan dilaksanakan pada tanggal 7-14 Oktober 2025. Jadwal lengkap dapat dilihat di dashboard masing-masing.',
    'academic',
    'urgent',
    ARRAY['guru', 'siswa', 'parent'],
    true,
    NOW()
);

-- ============================================
-- 9. SAMPLE ASSIGNMENTS
-- ============================================

INSERT INTO assignments (title, description, subject_id, class_id, due_date, max_score, assignment_type, is_published, academic_year_id, semester_id)
SELECT 
    'Latihan Soal Aljabar' as title,
    'Kerjakan soal-soal aljabar di halaman 25-30 buku paket' as description,
    s.id as subject_id,
    c.id as class_id,
    (NOW() + INTERVAL '7 days')::timestamptz as due_date,
    100 as max_score,
    'regular' as assignment_type,
    true as is_published,
    ay.id as academic_year_id,
    sem.id as semester_id
FROM subjects s, classes c, academic_years ay, semesters sem
WHERE s.subject_code = 'MTK' AND c.class_name = '7A'
AND ay.year_name = '2025/2026' AND sem.semester_name = 'Ganjil' AND sem.is_active = true
LIMIT 1;

INSERT INTO assignments (title, description, subject_id, class_id, due_date, max_score, assignment_type, is_published, academic_year_id, semester_id)
SELECT 
    'Teks Eksposisi tentang Lingkungan' as title,
    'Buatlah teks eksposisi minimal 300 kata tentang pentingnya menjaga lingkungan' as description,
    s.id as subject_id,
    c.id as class_id,
    (NOW() + INTERVAL '5 days')::timestamptz as due_date,
    100 as max_score,
    'project' as assignment_type,
    true as is_published,
    ay.id as academic_year_id,
    sem.id as semester_id
FROM subjects s, classes c, academic_years ay, semesters sem
WHERE s.subject_code = 'BID' AND c.class_name = '7A'
AND ay.year_name = '2025/2026' AND sem.semester_name = 'Ganjil' AND sem.is_active = true
LIMIT 1;

-- ============================================
-- NOTE: PROFILES, GURU, SISWA, ORANG_TUA
-- Need to be created after user registration via Supabase Auth
-- The trigger will automatically create profile entries
-- ============================================

-- Create a function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role, is_active)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        COALESCE(NEW.raw_user_meta_data->>'role', 'siswa'),
        true
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on signup
-- Uncomment when ready:
-- CREATE TRIGGER on_auth_user_created
--     AFTER INSERT ON auth.users
--     FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
