'use client';

import Link from 'next/link';
import { ArrowLeft, Users, Award, Target, Heart } from 'lucide-react';

export default function AboutPage() {
  const team = [
    { name: 'Dr. Ahmad Fauzi', role: 'Kepala Sekolah', image: 'AF' },
    { name: 'Siti Aminah, S.Pd', role: 'Waka Kurikulum', image: 'SA' },
    { name: 'Budi Santoso, S.Pd', role: 'Waka Kesiswaan', image: 'BS' },
    { name: 'Dewi Lestari, S.Pd', role: 'Waka Sarpras', image: 'DL' },
  ];

  const vision = {
    title: 'Visi',
    content: 'Menjadi sekolah unggulan yang menghasilkan generasi berakhlak mulia, berprestasi, dan siap menghadapi tantangan global.'
  };

  const mission = [
    'Menyelenggarakan pendidikan berkualitas dengan kurikulum modern',
    'Mengembangkan potensi siswa secara akademik dan non-akademik',
    'Membangun karakter siswa yang berakhlak mulia dan bertanggung jawab',
    'Meningkatkan kompetensi guru dan tenaga kependidikan',
    'Mewujudkan lingkungan sekolah yang kondusif dan inovatif'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5"/>
            <span className="font-medium">Kembali</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LMS</span>
            </div>
            <span className="font-bold text-gray-900">SMP Negeri 1</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Tentang SMP Negeri 1</h1>
          <p className="text-xl text-gray-600 mb-8">
            Sekolah berkualitas dengan fasilitas modern dan tenaga pengajar profesional
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-8 h-8"/>
                <h2 className="text-2xl font-bold">Visi</h2>
              </div>
              <p className="text-lg text-blue-100">{vision.content}</p>
            </div>

            {/* Mission */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <Award className="w-8 h-8"/>
                <h2 className="text-2xl font-bold">Misi</h2>
              </div>
              <ul className="space-y-2">
                {mission.map((item, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-purple-200 mt-1">•</span>
                    <span className="text-purple-100">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-2">1,234</div>
              <div className="text-gray-600">Total Siswa</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-green-600 mb-2">86</div>
              <div className="text-gray-600">Guru & Staff</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-purple-600 mb-2">36</div>
              <div className="text-gray-600">Kelas</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-orange-600 mb-2">45+</div>
              <div className="text-gray-600">Prestasi</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Kepala Sekolah & Wakil</h2>
          <p className="text-center text-gray-600 mb-12">Tim kepemimpinan yang berpengalaman dan dedikasi</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {member.image}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nilai-Nilai Kami</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600"/>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Kolaborasi</h3>
              <p className="text-gray-600">Bekerja sama untuk mencapai tujuan bersama</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600"/>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">Selalu berusaha memberikan yang terbaik</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600"/>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Integritas</h3>
              <p className="text-gray-600">Jujur dan bertanggung jawab dalam segala hal</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Bergabung dengan Kami!</h2>
          <p className="text-blue-100 mb-8 text-lg">
            PPDB Tahun Ajaran 2026/2027 sudah dibuka. Daftar sekarang!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-all"
            >
              Daftar Sekarang
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-all"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold mb-4">SMP Negeri 1</h3>
            <p className="text-gray-400">Jl. Pendidikan No. 123<br/>Kota Pendidikan, Indonesia</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Kontak</h3>
            <p className="text-gray-400">Telp: (021) 123-4567<br/>Email: info@smpn1.sch.id</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Jam Operasional</h3>
            <p className="text-gray-400">Senin - Jumat: 07:00 - 15:00<br/>Sabtu: 07:00 - 12:00</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">Dibuat oleh <span className="text-blue-400 font-semibold">ION Network</span></p>
        </div>
      </footer>
    </div>
  );
}
