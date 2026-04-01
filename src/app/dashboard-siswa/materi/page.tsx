'use client';
import { BookOpen, Download, FileText, Video, Search } from 'lucide-react';

export default function MateriPage() {
  const materials = [
    { id: 1, title: 'Aljabar Linear', subject: 'Matematika', type: 'PDF', size: '2.4 MB', uploaded: '2 hari lalu', teacher: 'Budi Santoso, S.Pd' },
    { id: 2, title: 'Geometri Dasar', subject: 'Matematika', type: 'PPT', size: '5.1 MB', uploaded: '3 hari lalu', teacher: 'Budi Santoso, S.Pd' },
    { id: 3, title: 'Sistem Pencernaan', subject: 'IPA', type: 'PDF', size: '3.8 MB', uploaded: '5 hari lalu', teacher: 'Siti Aminah, S.Pd' },
    { id: 4, title: 'Teks Eksposisi', subject: 'Bahasa Indonesia', type: 'PDF', size: '2.1 MB', uploaded: '1 minggu lalu', teacher: 'Dewi Lestari, S.Pd' },
    { id: 5, title: 'Simple Present Tense', subject: 'Bahasa Inggris', type: 'Video', size: '45.2 MB', uploaded: '1 minggu lalu', teacher: 'Ahmad Fauzi, S.Pd' },
  ];

  const statsCards = [
    { title: 'Total Materi', value: '45', color: 'blue' },
    { title: 'Materi Baru', value: '8', color: 'green' },
    { title: 'Video', value: '12', color: 'purple' },
    { title: 'Dokumen', value: '33', color: 'orange' },
  ];

  const getFileColor = (type: string) => {
    switch (type) {
      case 'PDF': return 'bg-red-100 text-red-600';
      case 'PPT': return 'bg-orange-100 text-orange-600';
      case 'Video': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'Video': return <Video className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Materi Pembelajaran</h1>
        <p className="text-sm sm:text-base text-gray-600">Download dan pelajari materi pembelajaran.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {statsCards.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.title}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            placeholder="Cari materi..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Materials Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Daftar Materi</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Judul</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mapel</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tipe</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Ukuran</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Guru</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((m) => (
                <tr key={m.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getFileColor(m.type)}`}>
                      {getFileIcon(m.type)}
                    </div>
                    <span className="font-medium text-sm text-gray-900">{m.title}</span>
                  </td>
                  <td className="py-3 px-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{m.subject}</span></td>
                  <td className="py-3 px-4 text-sm text-gray-600">{m.type}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{m.size}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{m.teacher}</td>
                  <td className="py-3 px-4">
                    <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors">
                      <Download className="w-3 h-3" /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
