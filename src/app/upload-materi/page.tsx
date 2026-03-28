'use client';

import { useState } from 'react';
import {
  Upload, FileText, X, CheckCircle, AlertCircle, Trash2, Eye, Download
, Menu, X } from 'lucide-react';

export default function UploadMateri() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, title: 'Aljabar Linear.pdf', class: '7A', subject: 'Matematika', uploaded: '2 jam lalu', size: '2.4 MB', downloads: 28 },
    { id: 2, title: 'Geometri Dasar.pptx', class: '7B', subject: 'Matematika', uploaded: '5 jam lalu', size: '5.1 MB', downloads: 25 },
    { id: 3, title: 'Sistem Pencernaan.pdf', class: '8A', subject: 'IPA', uploaded: '1 hari lalu', size: '3.8 MB', downloads: 30 },
  ]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload
    console.log('Files dropped:', e.dataTransfer.files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log('Files selected:', files);
      // Upload files
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 border-gray-200 lg:translate-x-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">LMS Guru</span>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          <a href="/dashboard-guru" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <Upload className="w-5 h-5" />
            <span className="font-medium text-sm">Dashboard</span>
          </a>
          <a href="/upload-materi" className="flex items-center space-x-3 px-4 py-3 bg-green-50 text-green-700 rounded-lg transition-all border border-green-200">
            <Upload className="w-5 h-5" />
            <span className="font-medium text-sm">Upload Materi</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="h-full px-4 sm:px-6 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Upload Materi</h1>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload Materi Pembelajaran</h1>
            <p className="text-gray-600">Upload materi dalam format PDF, PPT, DOC, atau video untuk siswa.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upload Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upload Box */}
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Upload File Baru</h3>
                
                <div
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                    dragActive
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 hover:border-green-500'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Drag & drop file di sini
                  </h4>
                  <p className="text-gray-600 mb-4">atau</p>
                  <label className="inline-block">
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      accept=".pdf,.ppt,.pptx,.doc,.docx,.mp4,.avi"
                      onChange={handleFileChange}
                    />
                    <span className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all cursor-pointer inline-block">
                      Pilih File
                    </span>
                  </label>
                  <p className="text-sm text-gray-500 mt-4">
                    Format yang didukung: PDF, PPT, PPTX, DOC, DOCX, MP4, AVI
                    <br />
                    Max size: 50 MB per file
                  </p>
                </div>

                {/* Upload Form */}
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Judul Materi
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Aljabar Linear - Bab 1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mata Pelajaran
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option>Pilih Mapel</option>
                        <option>Matematika</option>
                        <option>IPA</option>
                        <option>Bahasa Indonesia</option>
                        <option>Bahasa Inggris</option>
                        <option>IPS</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kelas
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option>Pilih Kelas</option>
                        <option>7A</option>
                        <option>7B</option>
                        <option>8A</option>
                        <option>8B</option>
                        <option>9A</option>
                        <option>9B</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deskripsi
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Deskripsi materi..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <button
                    disabled={uploading}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {uploading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Mengupload...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        <span>Upload Materi</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Uploaded Files */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
                <div className="flex items-center justify-between mb-6">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg lg:hidden">
                <Menu className="w-6 h-6" />
              </button>
                  <h3 className="text-lg font-bold text-gray-900">Materi Terupload</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    {uploadedFiles.length} files
                  </span>
                </div>

                <div className="space-y-4">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-green-200 transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900 text-sm truncate">{file.title}</div>
                            <div className="text-xs text-gray-500">Kelas {file.class} • {file.subject}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span>{file.size}</span>
                        <span>{file.downloads} downloads</span>
                        <span>{file.uploaded}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>Lihat</span>
                        </button>
                        <button className="flex-1 px-3 py-2 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-all flex items-center justify-center space-x-1">
                          <Download className="w-3 h-3" />
                          <span>Download</span>
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
