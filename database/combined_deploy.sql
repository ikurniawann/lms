-- ============================================
-- LMS SEKOLAH - COMPLETE DATABASE DEPLOYMENT
-- ============================================
-- This file combines schema, RLS policies, and seed data
-- Run this in Supabase SQL Editor

-- ============================================
-- PART 1: SCHEMA
-- ============================================

-- ============================================
-- LMS SEKOLAH - DATABASE SCHEMA
-- ============================================
-- Created: 2026-03-31
-- Target: Supabase PostgreSQL

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. USERS & AUTHENTICATION
-- ============================================

-- Profiles table (extends Supabase Auth)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    avatar_url TEXT,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'guru', 'siswa', 'parent')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Guru details
CREATE TABLE guru (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    nip VARCHAR(50) UNIQUE,
    nuptk VARCHAR(50),
    gelar_depan VARCHAR(20),
    gelar_belakang VARCHAR(20),
    mata_pelajaran VARCHAR(100)[],
    tanggal_lahir DATE,
    tempat_lahir VARCHAR(100),
    jenis_kelamin VARCHAR(10) CHECK (jenis_kelamin IN ('L', 'P')),
    alamat TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Siswa details
CREATE TABLE siswa (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    nis VARCHAR(50) UNIQUE NOT NULL,
    nisn VARCHAR(50) UNIQUE,
    class_id UUID REFERENCES classes(id),
    tanggal_lahir DATE,
    tempat_lahir VARCHAR(100),
    jenis_kelamin VARCHAR(10) CHECK (jenis_kelamin IN ('L', 'P')),
    alamat TEXT,
    parent_id UUID REFERENCES profiles(id),
    enrollment_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'graduated', 'transferred')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orang Tua details
CREATE TABLE orang_tua (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    nik VARCHAR(50),
    pekerjaan VARCHAR(100),
    hubungan VARCHAR(20) CHECK (hubungan IN ('ayah', 'ibu', 'wali')),
    anak_ids UUID[] REFERENCES siswa(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. ACADEMIC STRUCTURE
-- ============================================

-- Academic Years
CREATE TABLE academic_years (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year_name VARCHAR(20) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Semesters
CREATE TABLE semesters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academic_year_id UUID REFERENCES academic_years(id) ON DELETE CASCADE,
    semester_name VARCHAR(20) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Classes
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_name VARCHAR(50) NOT NULL,
    grade_level INTEGER NOT NULL CHECK (grade_level BETWEEN 7 AND 9),
    academic_year_id UUID REFERENCES academic_years(id),
    homeroom_teacher_id UUID REFERENCES guru(id),
    max_students INTEGER DEFAULT 32,
    room_number VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subjects (Mata Pelajaran)
CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_code VARCHAR(20) UNIQUE NOT NULL,
    subject_name VARCHAR(100) NOT NULL,
    description TEXT,
    credit_hours INTEGER DEFAULT 2,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Class Schedule
CREATE TABLE schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES guru(id),
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room_number VARCHAR(20),
    semester_id UUID REFERENCES semesters(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Teacher-Subject-Class assignments
CREATE TABLE teacher_class_subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID REFERENCES guru(id) ON DELETE CASCADE,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    semester_id UUID REFERENCES semesters(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(teacher_id, class_id, subject_id, semester_id)
);

-- ============================================
-- 3. LEARNING MATERIALS
-- ============================================

-- Materials (Materi Pembelajaran)
CREATE TABLE materials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    subject_id UUID REFERENCES subjects(id),
    class_id UUID REFERENCES classes(id),
    teacher_id UUID REFERENCES guru(id),
    file_url TEXT,
    file_type VARCHAR(50),
    file_size INTEGER,
    download_count INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    academic_year_id UUID REFERENCES academic_years(id),
    semester_id UUID REFERENCES semesters(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. ASSIGNMENTS & ASSESSMENTS
-- ============================================

-- Assignments (Tugas)
CREATE TABLE assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    subject_id UUID REFERENCES subjects(id),
    class_id UUID REFERENCES classes(id),
    teacher_id UUID REFERENCES guru(id),
    due_date TIMESTAMPTZ NOT NULL,
    max_score INTEGER DEFAULT 100,
    assignment_type VARCHAR(20) DEFAULT 'regular' CHECK (assignment_type IN ('regular', 'project', 'quiz')),
    file_url TEXT,
    is_published BOOLEAN DEFAULT false,
    academic_year_id UUID REFERENCES academic_years(id),
    semester_id UUID REFERENCES semesters(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assignment Submissions
CREATE TABLE assignment_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE,
    student_id UUID REFERENCES siswa(id) ON DELETE CASCADE,
    file_url TEXT,
    submission_text TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    score INTEGER,
    feedback TEXT,
    status VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('submitted', 'graded', 'returned')),
    graded_by UUID REFERENCES guru(id),
    graded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(assignment_id, student_id)
);

-- Exams (Ujian)
CREATE TABLE exams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    subject_id UUID REFERENCES subjects(id),
    class_id UUID REFERENCES classes(id),
    teacher_id UUID REFERENCES guru(id),
    exam_type VARCHAR(20) NOT NULL CHECK (exam_type IN ('PTS', 'PAS', 'PH', 'tryout', 'practice')),
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER NOT NULL,
    max_score INTEGER DEFAULT 100,
    passing_score INTEGER DEFAULT 70,
    is_published BOOLEAN DEFAULT false,
    academic_year_id UUID REFERENCES academic_years(id),
    semester_id UUID REFERENCES semesters(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Exam Questions
CREATE TABLE exam_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
    question_number INTEGER NOT NULL,
    question_text TEXT NOT NULL,
    question_type VARCHAR(20) NOT NULL CHECK (question_type IN ('multiple_choice', 'essay', 'true_false', 'fill_blank')),
    options JSONB,
    correct_answer TEXT,
    score INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Exam Submissions
CREATE TABLE exam_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
    student_id UUID REFERENCES siswa(id) ON DELETE CASCADE,
    started_at TIMESTAMPTZ,
    submitted_at TIMESTAMPTZ,
    score INTEGER,
    is_graded BOOLEAN DEFAULT false,
    graded_by UUID REFERENCES guru(id),
    graded_at TIMESTAMPTZ,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'submitted', 'graded')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(exam_id, student_id)
);

-- Exam Answers
CREATE TABLE exam_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID REFERENCES exam_submissions(id) ON DELETE CASCADE,
    question_id UUID REFERENCES exam_questions(id) ON DELETE CASCADE,
    answer_text TEXT,
    score INTEGER,
    is_correct BOOLEAN,
    feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(submission_id, question_id)
);

-- ============================================
-- 5. GRADES & REPORTS
-- ============================================

-- Grade Categories (Bobot Nilai)
CREATE TABLE grade_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_name VARCHAR(50) NOT NULL,
    weight_percentage INTEGER NOT NULL CHECK (weight_percentage BETWEEN 0 AND 100),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Student Grades
CREATE TABLE grades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES siswa(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id),
    class_id UUID REFERENCES classes(id),
    teacher_id UUID REFERENCES guru(id),
    semester_id UUID REFERENCES semesters(id),
    category_id UUID REFERENCES grade_categories(id),
    assignment_score DECIMAL(5,2),
    mid_exam_score DECIMAL(5,2),
    final_exam_score DECIMAL(5,2),
    final_score DECIMAL(5,2),
    grade_letter VARCHAR(2),
    notes TEXT,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, subject_id, semester_id, category_id)
);

-- Report Cards (Rapor)
CREATE TABLE report_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES siswa(id) ON DELETE CASCADE,
    class_id UUID REFERENCES classes(id),
    semester_id UUID REFERENCES semesters(id),
    homeroom_teacher_id UUID REFERENCES guru(id),
    average_score DECIMAL(5,2),
    rank INTEGER,
    attendance_count INTEGER DEFAULT 0,
    sick_leave INTEGER DEFAULT 0,
    permission_leave INTEGER DEFAULT 0,
    absent_without_permission INTEGER DEFAULT 0,
    personality_scores JSONB,
    extracurricular JSONB,
    notes TEXT,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    parent_acknowledged BOOLEAN DEFAULT false,
    parent_acknowledged_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, semester_id)
);

-- ============================================
-- 6. ATTENDANCE
-- ============================================

-- Daily Attendance
CREATE TABLE attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID REFERENCES classes(id),
    subject_id UUID REFERENCES subjects(id),
    teacher_id UUID REFERENCES guru(id),
    date DATE NOT NULL,
    schedule_id UUID REFERENCES schedules(id),
    is_substitute BOOLEAN DEFAULT false,
    substitute_teacher_id UUID REFERENCES guru(id),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES profiles(id)
);

-- Student Attendance Records
CREATE TABLE attendance_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attendance_id UUID REFERENCES attendance(id) ON DELETE CASCADE,
    student_id UUID REFERENCES siswa(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('present', 'absent', 'sick', 'permission', 'late')),
    check_in_time TIME,
    check_out_time TIME,
    notes TEXT,
    qr_code_scanned BOOLEAN DEFAULT false,
    location_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(attendance_id, student_id)
);

-- ============================================
-- 7. FINANCE (SPP)
-- ============================================

-- SPP Rates
CREATE TABLE spp_rates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    grade_level INTEGER NOT NULL CHECK (grade_level BETWEEN 7 AND 9),
    amount DECIMAL(10,2) NOT NULL,
    academic_year_id UUID REFERENCES academic_years(id),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SPP Payments
CREATE TABLE spp_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES siswa(id) ON DELETE CASCADE,
    month INTEGER NOT NULL CHECK (month BETWEEN 1 AND 12),
    year INTEGER NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATE DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'unpaid' CHECK (status IN ('unpaid', 'pending', 'paid', 'overdue', 'waived')),
    payment_method VARCHAR(50),
    transaction_id VARCHAR(255),
    payment_proof_url TEXT,
    paid_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, month, year)
);

-- ============================================
-- 8. COMMUNICATION
-- ============================================

-- Announcements
CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(20) DEFAULT 'general' CHECK (category IN ('general', 'academic', 'finance', 'event', 'urgent')),
    priority VARCHAR(10) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    author_id UUID REFERENCES profiles(id),
    target_roles VARCHAR(20)[] DEFAULT ARRAY['all'],
    target_class_ids UUID[] REFERENCES classes(id),
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    expiry_date DATE,
    attachment_urls TEXT[],
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    subject VARCHAR(255),
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMPTZ,
    parent_message_id UUID REFERENCES messages(id),
    attachment_urls TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 9. NOTIFICATIONS
-- ============================================

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    type VARCHAR(30) NOT NULL CHECK (type IN ('assignment', 'exam', 'grade', 'attendance', 'finance', 'announcement', 'message', 'system')),
    reference_id UUID,
    reference_table VARCHAR(50),
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMPTZ,
    action_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 10. ACTIVITY LOGS
-- ============================================

-- Activity Logs
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id),
    action VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,
    old_data JSONB,
    new_data JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_siswa_class_id ON siswa(class_id);
CREATE INDEX idx_siswa_nis ON siswa(nis);
CREATE INDEX idx_guru_nip ON guru(nip);

CREATE INDEX idx_schedules_class_id ON schedules(class_id);
CREATE INDEX idx_schedules_teacher_id ON schedules(teacher_id);
CREATE INDEX idx_schedules_day_of_week ON schedules(day_of_week);

CREATE INDEX idx_materials_class_id ON materials(class_id);
CREATE INDEX idx_materials_teacher_id ON materials(teacher_id);
CREATE INDEX idx_materials_subject_id ON materials(subject_id);

CREATE INDEX idx_assignments_class_id ON assignments(class_id);
CREATE INDEX idx_assignments_due_date ON assignments(due_date);

CREATE INDEX idx_assignment_submissions_student_id ON assignment_submissions(student_id);
CREATE INDEX idx_assignment_submissions_assignment_id ON assignment_submissions(assignment_id);

CREATE INDEX idx_exams_class_id ON exams(class_id);
CREATE INDEX idx_exams_start_time ON exams(start_time);

CREATE INDEX idx_exam_submissions_student_id ON exam_submissions(student_id);
CREATE INDEX idx_exam_submissions_exam_id ON exam_submissions(exam_id);

CREATE INDEX idx_grades_student_id ON grades(student_id);
CREATE INDEX idx_grades_subject_id ON grades(subject_id);
CREATE INDEX idx_grades_semester_id ON grades(semester_id);

CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_attendance_class_id ON attendance(class_id);

CREATE INDEX idx_attendance_records_student_id ON attendance_records(student_id);
CREATE INDEX idx_attendance_records_status ON attendance_records(status);

CREATE INDEX idx_spp_payments_student_id ON spp_payments(student_id);
CREATE INDEX idx_spp_payments_status ON spp_payments(status);

CREATE INDEX idx_announcements_category ON announcements(category);
CREATE INDEX idx_announcements_is_published ON announcements(is_published);

CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX idx_messages_is_read ON messages(is_read);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_materials_updated_at BEFORE UPDATE ON materials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assignments_updated_at BEFORE UPDATE ON assignments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_grades_updated_at BEFORE UPDATE ON grades
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- PART 2: RLS POLICIES
-- ============================================

-- ============================================
-- LMS SEKOLAH - ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE guru ENABLE ROW LEVEL SECURITY;
ALTER TABLE siswa ENABLE ROW LEVEL SECURITY;
ALTER TABLE orang_tua ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE semesters ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_class_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE grade_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE spp_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE spp_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PROFILES
-- ============================================

-- Everyone can read all profiles (for display purposes)
CREATE POLICY "Profiles are viewable by everyone" ON profiles
    FOR SELECT USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Only admins can insert/delete profiles
CREATE POLICY "Only admins can insert profiles" ON profiles
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Only admins can delete profiles" ON profiles
    FOR DELETE USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================
-- GURU (TEACHERS)
-- ============================================

CREATE POLICY "Guru are viewable by everyone" ON guru
    FOR SELECT USING (true);

CREATE POLICY "Guru can update own record" ON guru
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Only admins can manage guru" ON guru
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================
-- SISWA (STUDENTS)
-- ============================================

CREATE POLICY "Siswa are viewable by teachers and admins" ON siswa
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'guru'))
        OR auth.uid() = id
        OR EXISTS (
            SELECT 1 FROM orang_tua 
            WHERE id = auth.uid() AND id = ANY(
                SELECT parent_id FROM siswa WHERE siswa.id = siswa.id
            )
        )
    );

CREATE POLICY "Siswa can view own record" ON siswa
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Parents can view their children" ON siswa
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM orang_tua WHERE id = auth.uid() AND id = ANY(ARRAY[siswa.parent_id]))
    );

CREATE POLICY "Only admins can manage siswa" ON siswa
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================
-- ACADEMIC YEARS & SEMESTERS
-- ============================================

CREATE POLICY "Academic years are viewable by everyone" ON academic_years
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage academic years" ON academic_years
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Semesters are viewable by everyone" ON semesters
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage semesters" ON semesters
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================
-- CLASSES
-- ============================================

CREATE POLICY "Classes are viewable by everyone" ON classes
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage classes" ON classes
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================
-- SUBJECTS
-- ============================================

CREATE POLICY "Subjects are viewable by everyone" ON subjects
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage subjects" ON subjects
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================
-- SCHEDULES
-- ============================================

CREATE POLICY "Schedules are viewable by everyone" ON schedules
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage schedules" ON schedules
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================
-- MATERIALS
-- ============================================

CREATE POLICY "Materials are viewable by students and teachers" ON materials
    FOR SELECT USING (
        is_published = true
        OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'guru'))
    );

CREATE POLICY "Teachers can manage own materials" ON materials
    FOR ALL USING (
        teacher_id = auth.uid()
        OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================
-- ASSIGNMENTS
-- ============================================

CREATE POLICY "Assignments are viewable by students in class" ON assignments
    FOR SELECT USING (
        is_published = true
        OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'guru'))
    );

CREATE POLICY "Teachers can manage own assignments" ON assignments
    FOR ALL USING (
        teacher_id = auth.uid()
        OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================
-- ASSIGNMENT SUBMISSIONS
-- ============================================

CREATE POLICY "Students can view own submissions" ON assignment_submissions
    FOR SELECT USING (
        student_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM assignments a 
            WHERE a.id = assignment_submissions.assignment_id 
            AND a.teacher_id = auth.uid()
        )
        OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Students can create own submissions" ON assignment_submissions
    FOR INSERT WITH CHECK (
        student_id = auth.uid()
    );

CREATE POLICY "Students can update own submissions" ON assignment_submissions
    FOR UPDATE USING (
        student_id = auth.uid()
        AND status = 'submitted'
    );

CREATE POLICY "Teachers can grade submissions" ON assignment_submissions
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM assignments a 
            WHERE a.id = assignment_submissions.assignment_id 
            AND a.teacher_id = auth.uid()
        )
        OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================
-- EXAMS
-- ============================================

CREATE POLICY "Exams are viewable by students in class" ON exams
    FOR SELECT USING (
        is_published = true
        OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'guru'))
    );

CREATE POLICY "Teachers can manage own exams" ON exams
    FOR ALL USING (
        teacher_id = auth.uid()
        OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================
-- EXAM QUESTIONS
-- ============================================

CREATE POLICY "Exam questions are viewable by students during exam" ON exam_questions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM exams e 
            WHERE e.id = exam_questions.exam_id 
            AND e.is_published = true
        )
        OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'guru'))
    );

CREATE POLICY "Teachers can manage own exam questions" ON exam_questions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM exams e 
            WHERE e.id = exam_questions.exam_id 
            AND e.teacher_id = auth.uid()
        )
        OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================
-- EXAM SUBMISSIONS
-- ============================================

CREATE POLICY "Students can view own exam submissions" ON exam_submissions
    FOR SELECT USING (
        student_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM exams e 
            WHERE e.id = exam_submissions.exam_id 
            AND e.teacher_id = auth.uid()
        )
        OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Students can create own exam submissions" ON exam_submissions
    FOR INSERT WITH CHECK (
        student_id = auth.uid()
    );

CREATE POLICY "Students can update own exam submissions" ON exam_submissions
    FOR UPDATE USING (
        student_id = auth.uid()
        AND status IN ('draft', 'in_progress')
    );

-- ============================================
-- GRADES
-- ============================================

CREATE POLICY "Students can view own grades" ON grades
    FOR SELECT USING (
        student_id = auth.uid()
        OR is_published = true
        OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'guru'))
    );

CREATE POLICY "Teachers can manage grades for their classes" ON grades
    FOR ALL USING (
        teacher_id = auth.uid()
        OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================
-- REPORT CARDS
-- ============================================

CREATE POLICY "Students and parents can view report cards" ON report_cards
    FOR SELECT USING (
        student_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM orang_tua ot
            JOIN siswa s ON ot.id = s.parent_id
            WHERE s.id = report_cards.student_id
            AND ot.id = auth.uid()
        )
        OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'guru'))
    );

CREATE POLICY "Only admins can manage report cards" ON report_cards
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================
-- ATTENDANCE
-- ============================================

CREATE POLICY "Attendance is viewable by teachers and students" ON attendance
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'guru'))
    );

CREATE POLICY "Teachers can create attendance" ON attendance
    FOR INSERT WITH CHECK (
        teacher_id = auth.uid()
        OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Teachers can update attendance" ON attendance
    FOR UPDATE USING (
        teacher_id = auth.uid()
        OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================
-- ATTENDANCE RECORDS
-- ============================================

CREATE POLICY "Students can view own attendance" ON attendance_records
    FOR SELECT USING (
        student_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM attendance a
            JOIN profiles p ON a.teacher_id = p.id
            WHERE a.id = attendance_records.attendance_id
            AND p.id = auth.uid()
            AND p.role IN ('admin', 'guru')
        )
    );

CREATE POLICY "Teachers can manage attendance records" ON attendance_records
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM attendance a
            WHERE a.id = attendance_records.attendance_id
            AND a.teacher_id = auth.uid()
        )
        OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================
-- SPP (FINANCE)
-- ============================================

CREATE POLICY "SPP rates are viewable by everyone" ON spp_rates
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage SPP rates" ON spp_rates
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Students and parents can view own SPP" ON spp_payments
    FOR SELECT USING (
        student_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM siswa s
            WHERE s.id = spp_payments.student_id
            AND s.parent_id = auth.uid()
        )
        OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Only admins can manage SPP payments" ON spp_payments
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================
-- ANNOUNCEMENTS
-- ============================================

CREATE POLICY "Announcements are viewable by everyone" ON announcements
    FOR SELECT USING (
        is_published = true
        OR author_id = auth.uid()
        OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Teachers and admins can create announcements" ON announcements
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'guru'))
    );

CREATE POLICY "Authors can update own announcements" ON announcements
    FOR UPDATE USING (
        author_id = auth.uid()
        OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================
-- MESSAGES
-- ============================================

CREATE POLICY "Users can view own messages" ON messages
    FOR SELECT USING (
        sender_id = auth.uid()
        OR receiver_id = auth.uid()
    );

CREATE POLICY "Users can send messages" ON messages
    FOR INSERT WITH CHECK (
        sender_id = auth.uid()
    );

CREATE POLICY "Users can update own messages (mark as read)" ON messages
    FOR UPDATE USING (
        receiver_id = auth.uid()
    );

-- ============================================
-- NOTIFICATIONS
-- ============================================

CREATE POLICY "Users can view own notifications" ON notifications
    FOR SELECT USING (
        user_id = auth.uid()
    );

CREATE POLICY "System can create notifications" ON notifications
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own notifications" ON notifications
    FOR UPDATE USING (
        user_id = auth.uid()
    );

-- ============================================
-- ACTIVITY LOGS
-- ============================================

CREATE POLICY "Activity logs are viewable by admins" ON activity_logs
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "System can create activity logs" ON activity_logs
    FOR INSERT WITH CHECK (true);

-- ============================================
-- PART 3: SEED DATA
-- ============================================

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
