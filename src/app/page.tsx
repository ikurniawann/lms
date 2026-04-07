'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Users, Award, Clock, CheckCircle, 
  ArrowRight, Star, Building2, GraduationCap, 
  MessageCircle, Smartphone, BarChart3, Shield,
  Zap, Heart, ChevronLeft, ChevronRight, Sparkles,
  Target, Lightbulb, Globe
} from 'lucide-react';

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

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
      title: 'Mobile Ready',
      description: 'Akses dimana saja, kapan saja melalui browser mobile. Responsive design.',
      color: 'text-teal-500',
      bgColor: 'bg-teal-500/10'
    }
  ];

  const highlights = [
    {
      icon: Zap,
      title: 'Setup Cepat',
      description: 'Siap pakai dalam hitungan menit. Tidak perlu instalasi software.',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      icon: Shield,
      title: 'Aman & Terpercaya',
      description: 'Data terenkripsi dan backup otomatis. Privasi terjaga.',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    },
    {
      icon: Heart,
      title: 'Support Penuh',
      description: 'Tim support siap membantu kapan saja. Tutorial lengkap tersedia.',
      color: 'text-rose-500',
      bgColor: 'bg-rose-500/10'
    }
  ];

  const infoSlides = [
    {
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop',
      title: 'Transformasi Digital Pendidikan',
      subtitle: 'Masa depan pendidikan Indonesia',
      description: 'Bergabunglah dengan ribuan sekolah yang telah beralih ke sistem digital. Tingkatkan efisiensi, transparansi, dan kualitas belajar-mengajar.'
    },
    {
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop',
      title: 'Belajar Lebih Interaktif',
      subtitle: 'Materi digital & kuis online',
      description: 'Guru dapat mengupload materi pembelajaran, membuat kuis interaktif, dan siswa dapat belajar kapan saja, di mana saja.'
    },
    {
      image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=400&fit=crop',
      title: 'Kolaborasi Orang Tua & Sekolah',
      subtitle: 'Pantau perkembangan anak real-time',
      description: 'Orang tua dapat memantau nilai, absensi, dan aktivitas anak secara langsung. Komunikasi antara guru dan orang tua menjadi lebih mudah.'
    }
  ];

  const testimonials = [
    {
      name: 'Drs. Ahmad Fauzi, M.Pd',
      role: 'Kepala Sekolah',
      content: 'Sejak pakai LMS ini, administrasi sekolah jadi lebih rapi. Guru dan siswa sangat terbantu dengan sistem belajar online.',
      avatar: 'AF',
      rating: 5
    },
    {
      name: 'Siti Nurhaliza, S.Pd',
      role: 'Guru Matematika',
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

  const achievements = [
    { icon: Building2, label: 'Partner Sekolah', value: 'Terpercaya' },
    { icon: Users, label: 'Pengguna Aktif', value: 'Ribuan' },
    { icon: GraduationCap, label: 'Tenaga Pengajar', value: 'Terintegrasi' },
    { icon: Award, label: 'Uptime', value: 'Terjamin' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % infoSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [infoSlides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % infoSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + infoSlides.length) % infoSlides.length);

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
              <Link href="#info" className="text-gray-600 hover:text-gray-900 transition-colors">Informasi</Link>
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
                Coba Gratis
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
                <Sparkles className="w-4 h-4" />
                <span>Platform Modern untuk Pendidikan</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Solusi Digital{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Sekolah Modern
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Platform terintegrasi untuk mengelola pembelajaran, absensi, 
                keuangan, dan komunikasi sekolah dalam satu sistem yang mudah digunakan.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  href="/register" 
                  className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 text-lg"
                >
                  <span>Mulai Sekarang</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="#features" 
                  className="inline-flex items-center justify-center space-x-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all text-lg"
                >
                  <span>Lihat Fitur</span>
                </Link>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Gratis Coba</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Setup Mudah</span>
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
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop" 
                  alt="Siswa menggunakan laptop untuk belajar" 
                  className="rounded-3xl shadow-2xl w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30" />
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Generic */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-lg font-semibold text-blue-600 mb-1">{item.value}</div>
                  <div className="text-gray-600">{item.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info Slider Section */}
      <section id="info" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Globe className="w-4 h-4" />
              <span>Informasi Terkini</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Transformasi Pendidikan Digital
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ikuti perkembangan terbaru dalam dunia pendidikan digital
            </p>
          </div>

          {/* Slider */}
          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {infoSlides.map((slide, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="grid md:grid-cols-2">
                      <div className="h-80 md:h-96">
                        <img 
                          src={slide.image} 
                          alt={slide.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
                        <p className="text-blue-600 font-semibold mb-2">{slide.subtitle}</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{slide.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{slide.description}</p>
                        
                        <Link 
                          href="#features"
                          className="inline-flex items-center text-blue-600 font-semibold mt-6 hover:underline"
                        >
                          Pelajari Lebih Lanjut <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {infoSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Target className="w-4 h-4" />
              <span>Fitur Unggulan</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Semua yang Anda Butuhkan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Platform lengkap untuk mengelola seluruh aktivitas sekolah dalam satu tempat
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
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

      {/* Highlights Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Lightbulb className="w-4 h-4" />
              <span>Mengapa Memilih Kami?</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Keunggulan Platform Kami
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Dirancang khusus untuk memudahkan pengelolaan sekolah Anda
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${item.bgColor} mb-6`}>
                    <Icon className={`w-7 h-7 ${item.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-blue-100 leading-relaxed">{item.description}</p>
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
            <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4 fill-yellow-700" />
              <span>Testimoni Pengguna</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Apa Kata Mereka?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Testimoni dari sekolah-sekolah yang telah menggunakan platform kami
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
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            <span>Siap Memulai?</span>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Transformasi Sekolah Anda Sekarang
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan sekolah-sekolah yang telah beralih ke sistem digital. 
            Mulai gratis, tanpa kartu kredit.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register" 
              className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-xl text-lg"
            >
              <span>Coba Gratis Sekarang</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all text-lg"
            >
              <span>Hubungi Kami</span>
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
                Platform manajemen sekolah modern untuk meningkatkan kualitas pendidikan. 
                Solusi terintegrasi untuk sekolah di Indonesia.
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
                <li><Link href="#info" className="hover:text-white transition-colors">Informasi</Link></li>
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
            <p>&copy; 2026 LMS Sekolah. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
