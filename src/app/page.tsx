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
import { useTranslation } from '@/i18n';

export default function LandingPage() {
  const { locale, t, toggleLanguage } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    { icon: BookOpen, title: t('features.lmsTitle'), description: t('features.lmsDesc'), color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    { icon: CheckCircle, title: t('features.qrTitle'), description: t('features.qrDesc'), color: 'text-green-500', bgColor: 'bg-green-500/10' },
    { icon: BarChart3, title: t('features.reportTitle'), description: t('features.reportDesc'), color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
    { icon: Building2, title: t('features.financeTitle'), description: t('features.financeDesc'), color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
    { icon: MessageCircle, title: t('features.parentTitle'), description: t('features.parentDesc'), color: 'text-pink-500', bgColor: 'bg-pink-500/10' },
    { icon: Smartphone, title: t('features.mobileTitle'), description: t('features.mobileDesc'), color: 'text-teal-500', bgColor: 'bg-teal-500/10' }
  ];

  const infoSlides = [
    { image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop', title: t('landing.infoSlider.slide1Title'), subtitle: t('landing.infoSlider.slide1Subtitle'), description: t('landing.infoSlider.slide1Desc') },
    { image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop', title: t('landing.infoSlider.slide2Title'), subtitle: t('landing.infoSlider.slide2Subtitle'), description: t('landing.infoSlider.slide2Desc') },
    { image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=400&fit=crop', title: t('landing.infoSlider.slide3Title'), subtitle: t('landing.infoSlider.slide3Subtitle'), description: t('landing.infoSlider.slide3Desc') }
  ];

  const testimonials = [
    { name: 'Drs. Ahmad Fauzi, M.Pd', role: 'Kepala Sekolah', content: 'Sejak pakai LMS ini, administrasi sekolah jadi lebih rapi. Guru dan siswa sangat terbantu dengan sistem belajar online.', avatar: 'AF', rating: 5 },
    { name: 'Siti Nurhaliza, S.Pd', role: 'Guru Matematika', content: 'Upload materi dan buat kuis jadi sangat mudah. Nilai otomatis keluar, jadi hemat waktu koreksi.', avatar: 'SN', rating: 5 },
    { name: 'Budi Santoso', role: 'Orang Tua Siswa', content: 'Sekarang bisa pantau nilai dan absensi anak real-time dari HP. Sangat praktis!', avatar: 'BS', rating: 5 }
  ];

  const achievements = [
    { icon: Building2, label: t('stats.partnerSchools'), value: t('stats.trusted') },
    { icon: Users, label: t('stats.activeUsers'), value: t('stats.thousands') },
    { icon: GraduationCap, label: t('stats.teachers'), value: t('stats.integrated') },
    { icon: Award, label: t('stats.uptime'), value: t('stats.guaranteed') }
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
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">{t('navbar.features')}</Link>
              <Link href="#info" className="text-gray-600 hover:text-gray-900 transition-colors">{t('navbar.information')}</Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">{t('navbar.testimonials')}</Link>
              <Link href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">{t('navbar.contact')}</Link>
            </div>

            <div className="flex items-center space-x-4">
              <button onClick={toggleLanguage} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{locale === 'id' ? 'EN' : 'ID'}</span>
              </button>
              <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">{t('common.login')}</Link>
              <Link href="/register" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30">{t('common.tryFree')}</Link>
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
                <span>{t('hero.tagline')}</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                {t('hero.title')}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">{t('hero.description')}</p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/register" className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 text-lg">
                  <span>{t('hero.startNow')}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#features" className="inline-flex items-center justify-center space-x-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all text-lg">
                  <span>{t('hero.seeFeatures')}</span>
                </Link>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2"><CheckCircle className="w-5 h-5 text-green-500" /><span>{t('hero.freeTrial')}</span></div>
                <div className="flex items-center space-x-2"><CheckCircle className="w-5 h-5 text-green-500" /><span>{t('hero.easySetup')}</span></div>
                <div className="flex items-center space-x-2"><CheckCircle className="w-5 h-5 text-green-500" /><span>{t('hero.support247')}</span></div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img src="https://web.komdigi.go.id/resource/ZHJ1cGFsL2tvbWluZm8ta2VtZGlrYnVkLWRpZ2l0YWxpc2FzaS1uYXR1bmEuanBlZw==" alt="Siswa SMP berseragam menggunakan LMS" className="rounded-3xl shadow-2xl w-full h-auto object-cover" />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30" />
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-lg font-semibold text-blue-600 mb-1">{item.value}</div>
                <div className="text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Slider Section */}
      <section id="info" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Globe className="w-4 h-4" />
              <span>{t('landing.infoSlider.currentInfo')}</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('landing.infoSlider.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('landing.infoSlider.subtitle')}</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {infoSlides.map((slide, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="grid md:grid-cols-2">
                      <div className="h-80 md:h-96">
                        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
                        <p className="text-blue-600 font-semibold mb-2">{slide.subtitle}</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{slide.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{slide.description}</p>
                        <Link href="#features" className="inline-flex items-center text-blue-600 font-semibold mt-6 hover:underline">
                          {t('landing.infoSlider.learnMore')} <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {infoSlides.map((_, index) => (
                <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'}`} />
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
              <span>{t('features.tagline')}</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('features.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('features.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${feature.bgColor} mb-6`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
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
            <span>{t('cta.tagline')}</span>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('cta.title')}</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{t('cta.subtitle')}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-xl text-lg">
              <span>{t('cta.tryFreeNow')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all text-lg">
              <span>{t('common.contactUs')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; 2026 LMS Sekolah. {t('footer.allRightsReserved')}.</p>
            <p className="mt-2 text-sm">{t('footer.madeBy')} <span className="text-blue-400 font-semibold">ION Network</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
