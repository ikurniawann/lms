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
