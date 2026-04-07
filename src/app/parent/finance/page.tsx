'use client';
import { Wallet, CreditCard, Download, AlertCircle, CheckCircle } from 'lucide-react';

export default function ParentFinance() {
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

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Lunas': return 'bg-green-100 text-green-700';
      case 'Belum Dibayar': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Keuangan</h1>
        <p className="text-sm sm:text-base text-gray-600">Monitoring SPP dan tagihan lainnya untuk anak-anak Anda.</p>
      </div>

      {/* Payment Alert */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex items-start space-x-4">
          <div className="p-2 sm:p-3 bg-red-100 rounded-lg shrink-0">
            <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-red-900 mb-2">Tagihan Belum Dibayar</h3>
            <p className="text-red-700 mb-4 text-sm">Anda memiliki 2 tagihan yang belum dibayar dengan total {formatRupiah(300000)}</p>
            <button className="px-4 py-2 sm:px-6 sm:py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all text-sm sm:text-base">
              Bayar Sekarang
            </button>
          </div>
        </div>
      </div>

      {/* SPP History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 sm:mb-8">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Riwayat SPP</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Bulan</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Siswa</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Jumlah</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sppHistory.map((spp, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-sm">{spp.month}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{spp.child}</td>
                  <td className="py-3 px-4 font-medium text-sm">{formatRupiah(spp.amount)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(spp.status)}`}>
                      {spp.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {spp.status === 'Lunas' && spp.receipt ? (
                      <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700">
                        <Download className="w-3 h-3" /> Download
                      </button>
                    ) : (
                      <button className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                        Bayar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Other Fees */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Tagihan Lainnya</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Jenis Tagihan</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Siswa</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Jumlah</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {otherFees.map((fee, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-sm">{fee.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{fee.child}</td>
                  <td className="py-3 px-4 font-medium text-sm">{formatRupiah(fee.amount)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(fee.status)}`}>
                      {fee.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {fee.status === 'Lunas' ? (
                      <span className="text-green-600 text-sm flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Lunas
                      </span>
                    ) : (
                      <button className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                        Bayar
                      </button>
                    )}
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
