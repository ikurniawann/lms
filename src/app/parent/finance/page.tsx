'use client';
import { Wallet, CreditCard, Download, AlertCircle, CheckCircle } from 'lucide-react';

export default function ParentFinance() {
  const children = [
    { name: 'Ahmad Rizki', class: '8A', nis: '2024001' },
    { name: 'Siti Nurhaliza', class: '6B', nis: '2022045' },
  ];

  const sppHistory = [
    { month: 'Mar 2026', amount: 150000, status: 'Belum Dibayar', dueDate: '10 Mar 2026', child: 'Ahmad Rizki' },
    { month: 'Feb 2026', amount: 150000, status: 'Lunas', paidDate: '05 Feb 2026', child: 'Ahmad Rizki', receipt: 'RCP-2026-02-001' },
    { month: 'Jan 2026', amount: 150000, status: 'Lunas', paidDate: '03 Jan 2026', child: 'Ahmad Rizki', receipt: 'RCP-2026-01-001' },
    { month: 'Mar 2026', amount: 150000, status: 'Lunas', paidDate: '08 Mar 2026', child: 'Siti Nurhaliza', receipt: 'RCP-2026-03-002' },
    { month: 'Feb 2026', amount: 150000, status: 'Lunas', paidDate: '05 Feb 2026', child: 'Siti Nurhaliza', receipt: 'RCP-2026-02-002' },
  ];

  const otherFees = [
    { name: 'Uang Praktikum', amount: 200000, status: 'Belum Dibayar', dueDate: '15 Apr 2026', child: 'Ahmad Rizki' },
    { name: 'Uang Kegiatan', amount: 100000, status: 'Lunas', paidDate: '10 Jan 2026', child: 'Ahmad Rizki' },
    { name: 'Uang Buku', amount: 350000, status: 'Lunas', paidDate: '15 Jan 2026', child: 'Siti Nurhaliza' },
  ];

  const statsCards = [
    { title: 'Total Tagihan', value: 'Rp 300K', icon: Wallet, color: 'blue' },
    { title: 'Sudah Dibayar', value: 'Rp 1.25M', icon: CheckCircle, color: 'green' },
    { title: 'Belum Dibayar', value: 'Rp 300K', icon: AlertCircle, color: 'orange' },
    { title: 'Total Transaksi', value: '12', icon: CreditCard, color: 'purple' },
  ];

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Lunas': return 'bg-green-100 text-green-700';
      case 'Belum Dibayar': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed w-64 bg-white border-r">
        <div className="h-16 px-6 flex items-center">
          <Wallet className="w-6 h-6 text-blue-600"/>
          <span className="ml-2 font-bold">Parent Portal</span>
        </div>
        <nav className="p-4 space-y-1">
          <a href="/parent/dashboard" className="block px-4 py-3 hover:bg-gray-50">Dashboard</a>
          <a href="/parent/academic" className="block px-4 py-3 hover:bg-gray-50">Akademik</a>
          <a href="/parent/attendance" className="block px-4 py-3 hover:bg-gray-50">Absensi</a>
          <a href="/parent/finance" className="block px-4 py-3 bg-blue-50 text-blue-700">Keuangan</a>
        </nav>
      </aside>

      <div className="ml-64">
        <header className="h-16 bg-white border-b px-6 flex items-center">
          <h1 className="text-xl font-bold">Keuangan</h1>
        </header>
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Tagihan & Pembayaran</h1>
            <p className="text-gray-600">Monitoring SPP dan tagihan lainnya untuk anak-anak Anda.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {statsCards.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </div>
            ))}
          </div>

          {/* Payment Alert */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600"/>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-red-900 mb-2">Tagihan Belum Dibayar</h3>
                <p className="text-red-700 mb-4">Anda memiliki 2 tagihan yang belum dibayar dengan total {formatRupiah(300000)}</p>
                <button className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all">
                  Bayar Sekarang
                </button>
              </div>
            </div>
          </div>

          {/* SPP History */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
            <div className="p-6 border-b">
              <h3 className="font-bold">Riwayat SPP</h3>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4">Bulan</th>
                  <th className="text-left p-4">Siswa</th>
                  <th className="text-left p-4">Jumlah</th>
                  <th className="text-left p-4">Jatuh Tempo</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Tanggal Bayar</th>
                  <th className="text-left p-4">Kwitansi</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sppHistory.map((spp, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{spp.month}</td>
                    <td className="p-4 text-sm">
                      <div className="font-medium">{spp.child}</div>
                    </td>
                    <td className="p-4 font-medium">{formatRupiah(spp.amount)}</td>
                    <td className="p-4 text-sm text-gray-600">{spp.dueDate}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(spp.status)}`}>
                        {spp.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{spp.paidDate || '-'}</td>
                    <td className="p-4 text-sm font-mono text-gray-600">{spp.receipt || '-'}</td>
                    <td className="p-4">
                      {spp.status === 'Lunas' && spp.receipt && (
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700">
                          <Download className="w-3 h-3"/> Download
                        </button>
                      )}
                      {spp.status === 'Belum Dibayar' && (
                        <button className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                          Bayar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Other Fees */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="font-bold">Tagihan Lainnya</h3>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4">Jenis Tagihan</th>
                  <th className="text-left p-4">Siswa</th>
                  <th className="text-left p-4">Jumlah</th>
                  <th className="text-left p-4">Jatuh Tempo</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {otherFees.map((fee, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{fee.name}</td>
                    <td className="p-4 text-sm">{fee.child}</td>
                    <td className="p-4 font-medium">{formatRupiah(fee.amount)}</td>
                    <td className="p-4 text-sm text-gray-600">{fee.dueDate}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(fee.status)}`}>
                        {fee.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {fee.status === 'Lunas' ? (
                        <span className="text-green-600 text-sm flex items-center gap-1">
                          <CheckCircle className="w-4 h-4"/> Lunas
                        </span>
                      ) : (
                        <button className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                          Bayar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
