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
