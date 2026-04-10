// LMS Sekolah - Landing Page
// Updated: 2026-04-09 - Trigger redeploy

'use client';

import Link from 'next/link';
import { 
  BookOpen, Users, Award, Clock, CheckCircle, 
  ArrowRight, Star, Building2, GraduationCap, 
  MessageCircle, Smartphone, BarChart3
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: BookOpen,
      title: 'LMS Lengkap',
      description: 'Upload materi, buat tugas & kuis online. Belajar jadi lebih mudah dan efisien.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: CheckCircle,
      title: 'Absensi QR Code',
      description: 'Sistem absensi otomatis dengan QR code. Rekap hadir, sakit, izin jadi mudah.',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: BarChart3,
      title: 'Rapor Digital',
      description: 'Nilai otomatis, rapor digital siap cetak. Orang tua bisa pantau real-time.',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: Building2,
      title: 'Manajemen Keuangan',
      description: 'Billing SPP otomatis, pembayaran QRIS, laporan keuangan lengkap.',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
    {
      icon: MessageCircle,
      title: 'Portal Orang Tua',
      description: 'Orang tua bisa lihat nilai, absensi, dan komunikasi dengan guru.',
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10'
    },
    {
      icon: Smartphone,
      title: 'Mobile App',
      description: 'Aplikasi mobile untuk siswa dan orang tua. Akses dimana saja, kapan saja.',
      color: 'text-teal-500',
      bgColor: 'bg-teal-500/10'
    }
  ];

  const pricingPlans = [
    {
      name: 'STANDARD',
      tagline: 'Go Digital Basic',
      price: '499.000',
      period: '/bulan',
      description: 'Untuk sekolah kecil yang baru mulai go digital',
      features: [
        'Website sekolah profesional',
        'LMS dasar (materi, tugas, kuis)',
        'Form PPDB online',
        'Dashboard admin sederhana',
        'Hingga 300 siswa',
        'Email support'
      ],
      cta: 'Mulai Sekarang',
      popular: false,
      color: 'blue'
    },
    {
      name: 'PLUS',
      tagline: 'Operational School System',
      price: '1.499.000',
      period: '/bulan',
      description: 'Paling laris! Semua aktivitas sekolah tertata',
      features: [
        'Semua fitur STANDARD',
        'CBT (Computer Based Test)',
        'Absensi QR Code',
        'Billing SPP & Payment Gateway',
        'Portal Orang Tua',
        'Aplikasi Mobile (iOS + Android)',
        'Hingga 1.000 siswa',
        'Priority support'
      ],
      cta: 'Paling Laris',
      popular: true,
      color: 'red'
    },
    {
      name: 'ADVANCE',
      tagline: 'Smart Digital School',
      price: '4.999.000',
      period: '/bulan',
      description: 'Untuk sekolah besar yang ingin unggul kompetitif',
      features: [
        'Semua fitur PLUS',
        'AI Auto-Grading & AI Tutor',
        'Integrasi WhatsApp',
        'Face Recognition Absensi',
        'Predictive Analytics',
        'Multi-School / Yayasan',
        'Siswa Unlimited',
        '24/7 Priority Support',
        'Custom Development'
      ],
      cta: 'Hubungi Kami',
      popular: false,
      color: 'purple'
    }
  ];

  const stats = [
    { number: '50+', label: 'Sekolah Mitra', icon: Building2 },
    { number: '15.000+', label: 'Siswa Aktif', icon: Users },
    { number: '1.200+', label: 'Guru Pengguna', icon: GraduationCap },
    { number: '99.9%', label: 'Uptime', icon: Award }
  ];

  const testimonials = [
    {
      name: 'Drs. Ahmad Fauzi, M.Pd',
      role: 'Kepala SMPN 1 Jakarta',
      content: 'Sejak pakai LMS ini, administrasi sekolah jadi lebih rapi. Guru dan siswa sangat terbantu dengan sistem belajar online.',
      avatar: 'AF',
      rating: 5
    },
    {
      name: 'Siti Nurhaliza, S.Pd',
      role: 'Guru Matematika SMPN 2 Bandung',
      content: 'Upload materi dan buat kuis jadi sangat mudah. Nilai otomatis keluar, jadi hemat waktu koreksi.',
      avatar: 'SN',
      rating: 5
    },
    {
      name: 'Budi Santoso',
      role: 'Orang Tua Siswa',
      content: 'Sekarang bisa pantau nilai dan absensi anak real-time dari HP. Sangat praktis!',
      avatar: 'BS',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">LMS Sekolah</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Fitur</Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimoni</Link>
              <Link href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Kontak</Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link 
                href="/login" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Masuk
              </Link>
              <Link 
                href="/register" 
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30"
              >
                Daftar Gratis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4 fill-blue-700" />
                <span>4.9/5 dari 50+ Sekolah</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Platform #1 untuk{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Sekolah Digital
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                LMS lengkap untuk SD/SMP Negeri. Kelola belajar, absensi, keuangan, 
                dan komunikasi dalam satu platform modern.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  href="/register" 
                  className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 text-lg"
                >
                  <span>Mulai Gratis</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="#demo" 
                  className="inline-flex items-center justify-center space-x-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all text-lg"
                >
                  <span>Lihat Demo</span>
                </Link>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Tanpa Kartu Kredit</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Setup 5 Menit</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Support 24/7</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://web.komdigi.go.id/resource/ZHJ1cGFsL2tvbWluZm8ta2VtZGlrYnVkLWRpZ2l0YWxpc2FzaS1uYXR1bmEuanBlZw==" 
                  alt="Siswa SMP berseragam menggunakan LMS" 
                  className="rounded-3xl shadow-2xl w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob" />
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fitur Lengkap untuk Sekolah Modern
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Semua yang sekolah butuhkan dalam satu platform terintegrasi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${feature.bgColor} mb-6`}>
                    <Icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Apa Kata Mereka?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dari 50+ sekolah yang sudah menggunakan LMS kami
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all border border-gray-100">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Siap Transformasi Sekolah Anda?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Bergabung dengan 50+ sekolah yang sudah go digital bersama kami. 
            Mulai gratis, tanpa kartu kredit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register" 
              className="inline-flex items-center justify-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-xl text-lg"
            >
              <span>Mulai Gratis Sekarang</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center space-x-2 bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-800 transition-all border-2 border-white/30 text-lg"
            >
              <span>Hubungi Sales</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">LMS Sekolah</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Platform manajemen sekolah modern untuk SD/SMP Negeri di Indonesia. 
                Transformasi digital sekolah Anda bersama kami.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Produk</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-white transition-colors">Fitur</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Harga</Link></li>
                <li><Link href="/demo" className="hover:text-white transition-colors">Demo</Link></li>
                <li><Link href="/changelog" className="hover:text-white transition-colors">Changelog</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Perusahaan</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">Tentang Kami</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Kontak</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2026 LMS Sekolah. All rights reserved. Dibuat dengan ❤️ untuk Indonesia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
