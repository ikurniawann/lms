'use client';

import { useState } from 'react';
import { 
  Wallet, CreditCard, Download, AlertCircle, CheckCircle, X, 
  ChevronRight, Copy, QrCode, Building2, Smartphone, Clock
} from 'lucide-react';

interface SPPBill {
  id: string;
  month: string;
  year: number;
  amount: number;
  dueDate: string;
  child: string;
  childClass: string;
  selected: boolean;
}

interface PaymentMethod {
  id: string;
  name: string;
  type: 'transfer' | 'qris';
  icon: string;
  details?: {
    bankName?: string;
    accountNumber?: string;
    accountName?: string;
    instructions?: string[];
  };
}

export default function ParentFinance() {
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [showSPPModal, setShowSPPModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showQRISModal, setShowQRISModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [paymentStep, setPaymentStep] = useState<1 | 2>(1);
  const [processingPayment, setProcessingPayment] = useState(false);

  const [sppBills, setSppBills] = useState<SPPBill[]>([
    { id: 'SPP-2026-03', month: 'Maret', year: 2026, amount: 150000, dueDate: '10 Mar 2026', child: 'Ahmad Rizki', childClass: 'Kelas 10A', selected: false },
    { id: 'SPP-2026-02', month: 'Februari', year: 2026, amount: 150000, dueDate: '10 Feb 2026', child: 'Ahmad Rizki', childClass: 'Kelas 10A', selected: false },
    { id: 'SPP-2026-01', month: 'Januari', year: 2026, amount: 150000, dueDate: '10 Jan 2026', child: 'Ahmad Rizki', childClass: 'Kelas 10A', selected: false },
    { id: 'SPP-2026-03-2', month: 'Maret', year: 2026, amount: 150000, dueDate: '10 Mar 2026', child: 'Siti Nurhaliza', childClass: 'Kelas 8B', selected: false },
    { id: 'SPP-2026-02-2', month: 'Februari', year: 2026, amount: 150000, dueDate: '10 Feb 2026', child: 'Siti Nurhaliza', childClass: 'Kelas 8B', selected: false },
  ]);

  const [sppHistory] = useState([
    { month: 'Jan 2026', amount: 150000, status: 'Lunas', paidDate: '03 Jan 2026', child: 'Ahmad Rizki', receipt: 'RCP-2026-01-001' },
    { month: 'Feb 2026', amount: 150000, status: 'Lunas', paidDate: '05 Feb 2026', child: 'Ahmad Rizki', receipt: 'RCP-2026-02-001' },
    { month: 'Feb 2026', amount: 150000, status: 'Lunas', paidDate: '05 Feb 2026', child: 'Siti Nurhaliza', receipt: 'RCP-2026-02-002' },
    { month: 'Mar 2026', amount: 150000, status: 'Lunas', paidDate: '08 Mar 2026', child: 'Siti Nurhaliza', receipt: 'RCP-2026-03-002' },
  ]);

  const [otherFees] = useState([
    { name: 'Uang Praktikum', amount: 200000, status: 'Belum Dibayar', dueDate: '15 Apr 2026', child: 'Ahmad Rizki' },
    { name: 'Uang Kegiatan', amount: 100000, status: 'Lunas', paidDate: '10 Jan 2026', child: 'Ahmad Rizki' },
    { name: 'Uang Buku', amount: 350000, status: 'Lunas', paidDate: '15 Jan 2026', child: 'Siti Nurhaliza' },
  ]);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'bca',
      name: 'Transfer Bank BCA',
      type: 'transfer',
      icon: '🏦',
      details: {
        bankName: 'BCA',
        accountNumber: '1234567890',
        accountName: 'Yayasan Pendidikan Islam',
        instructions: ['Login ke aplikasi BCA Mobile/Internet Banking', 'Pilih menu Transfer', 'Masukkan nomor rekening di atas', 'Konfirmasi pembayaran']
      }
    },
    {
      id: 'mandiri',
      name: 'Transfer Bank Mandiri',
      type: 'transfer',
      icon: '🏦',
      details: {
        bankName: 'Mandiri',
        accountNumber: '9876543210',
        accountName: 'Yayasan Pendidikan Islam',
        instructions: ['Login ke aplikasi Livin\' by Mandiri', 'Pilih menu Transfer', 'Masukkan nomor rekening di atas', 'Konfirmasi pembayaran']
      }
    },
    {
      id: 'bni',
      name: 'Transfer Bank BNI',
      type: 'transfer',
      icon: '🏦',
      details: {
        bankName: 'BNI',
        accountNumber: '1122334455',
        accountName: 'Yayasan Pendidikan Islam',
        instructions: ['Login ke aplikasi BNI Mobile Banking', 'Pilih menu Transfer', 'Masukkan nomor rekening di atas', 'Konfirmasi pembayaran']
      }
    },
    {
      id: 'qris',
      name: 'QRIS',
      type: 'qris',
      icon: '📱',
    }
  ];

  // Get unpaid bills
  const unpaidBills = sppBills.filter(bill => {
    const isPaid = sppHistory.some(h => 
      h.child === bill.child && h.month.includes(bill.month.substring(0, 3))
    );
    return !isPaid;
  });

  const totalUnpaid = unpaidBills.reduce((sum, bill) => sum + bill.amount, 0);
  const unpaidCount = unpaidBills.length;

  const selectedBills = sppBills.filter(b => b.selected);
  const totalSelected = selectedBills.reduce((sum, b) => sum + b.amount, 0);

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

  const toggleBillSelection = (id: string) => {
    setSppBills(prev => prev.map(bill => 
      bill.id === id ? { ...bill, selected: !bill.selected } : bill
    ));
  };

  const handlePayNow = () => {
    setShowSPPModal(true);
  };

  const handleProceedToPayment = () => {
    if (selectedBills.length === 0) {
      setNotification({ message: 'Pilih minimal 1 bulan SPP yang akan dibayar', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    setShowSPPModal(false);
    setShowPaymentModal(true);
    setPaymentStep(1);
  };

  const handleSelectMethod = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setPaymentStep(2);
  };

  const handleConfirmPayment = () => {
    setProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessingPayment(false);
      
      if (selectedMethod?.type === 'qris') {
        setShowPaymentModal(false);
        setShowQRISModal(true);
      } else {
        setShowPaymentModal(false);
        setShowTransferModal(true);
      }
    }, 1000);
  };

  const handleCopyAccount = (text: string) => {
    navigator.clipboard.writeText(text);
    setNotification({ message: 'Nomor rekening disalin!', type: 'success' });
    setTimeout(() => setNotification(null), 2000);
  };

  const closeAllModals = () => {
    setShowSPPModal(false);
    setShowPaymentModal(false);
    setShowQRISModal(false);
    setShowTransferModal(false);
    setSelectedMethod(null);
    setPaymentStep(1);
    setSppBills(prev => prev.map(b => ({ ...b, selected: false })));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-[70] flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {/* SPP Selection Modal */}
      {showSPPModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Pembayaran SPP</h2>
                  <p className="text-sm text-gray-500">Pilih bulan SPP yang ingin dibayar</p>
                </div>
                <button onClick={() => setShowSPPModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {unpaidCount > 0 ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 mb-4">Anda memiliki <strong className="text-red-600">{unpaidCount} bulan</strong> SPP yang belum dibayar:</p>
                  
                  {unpaidBills.map((bill) => (
                    <label
                      key={bill.id}
                      className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        bill.selected 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={bill.selected}
                        onChange={() => toggleBillSelection(bill.id)}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">SPP {bill.month} {bill.year}</p>
                            <p className="text-sm text-gray-500">{bill.child} - {bill.childClass}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">{formatRupiah(bill.amount)}</p>
                            <p className="text-xs text-red-500">Jatuh tempo: {bill.dueDate}</p>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-gray-600">Semua SPP sudah dibayar! 🎉</p>
                </div>
              )}
            </div>

            {unpaidCount > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-600">Total yang harus dibayar:</p>
                  <p className="text-2xl font-bold text-gray-900">{formatRupiah(totalSelected)}</p>
                </div>
                
                <button
                  onClick={handleProceedToPayment}
                  disabled={selectedBills.length === 0}
                  className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                    selectedBills.length > 0
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Lanjutkan Pembayaran
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Payment Method Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Metode Pembayaran</h2>
                  <p className="text-sm text-gray-500">Pilih cara pembayaran yang Anda inginkan</p>
                </div>
                <button onClick={() => setShowPaymentModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {paymentStep === 1 ? (
                <div className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-blue-700">Total Pembayaran:</p>
                    <p className="text-2xl font-bold text-blue-900">{formatRupiah(totalSelected)}</p>
                    <p className="text-xs text-blue-600 mt-1">{selectedBills.length} bulan SPP dipilih</p>
                  </div>

                  <p className="text-sm font-medium text-gray-700 mb-3">Transfer Bank:</p>
                  
                  {paymentMethods.filter(m => m.type === 'transfer').map((method) => (
                    <button
                      key={method.id}
                      onClick={() => handleSelectMethod(method)}
                      className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{method.name}</p>
                        <p className="text-sm text-gray-500">Transfer manual dengan verifikasi</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  ))}

                  <p className="text-sm font-medium text-gray-700 mb-3 mt-4">E-Wallet / QRIS:</p>
                  
                  {paymentMethods.filter(m => m.type === 'qris').map((method) => (
                    <button
                      key={method.id}
                      onClick={() => handleSelectMethod(method)}
                      className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all text-left"
                    >
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{method.name}</p>
                        <p className="text-sm text-gray-500">Scan dengan aplikasi e-wallet</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  ))}
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => setPaymentStep(1)}
                    className="text-sm text-gray-500 hover:text-gray-700 mb-4 flex items-center gap-1"
                  >
                    ← Kembali
                  </button>

                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-gray-600">Metode yang dipilih:</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-2xl">{selectedMethod?.icon}</span>
                      <span className="font-semibold text-gray-900">{selectedMethod?.name}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <p className="text-sm text-blue-700">Total yang harus dibayar:</p>
                    <p className="text-2xl font-bold text-blue-900">{formatRupiah(totalSelected)}</p>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">Instruksi Pembayaran</p>
                        <p className="text-sm text-yellow-700 mt-1">
                          Klik "Bayar Sekarang" untuk melihat detail pembayaran. Pastikan transfer sesuai nominal agar mudah diverifikasi.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmPayment}
                    disabled={processingPayment}
                    className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    {processingPayment ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      <>
                        Bayar Sekarang
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Transfer Bank Modal */}
      {showTransferModal && selectedMethod?.type === 'transfer' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Detail Transfer</h2>
                <button onClick={() => setShowTransferModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-700">Total Transfer:</p>
                <p className="text-3xl font-bold text-blue-900">{formatRupiah(totalSelected)}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Bank</p>
                  <p className="font-semibold text-gray-900">{selectedMethod.details?.bankName}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Nomor Rekening</p>
                      <p className="font-semibold text-gray-900 text-lg">{selectedMethod.details?.accountNumber}</p>
                    </div>
                    <button
                      onClick={() => handleCopyAccount(selectedMethod.details?.accountNumber || '')}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Atas Nama</p>
                  <p className="font-semibold text-gray-900">{selectedMethod.details?.accountName}</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
                <p className="text-sm font-medium text-yellow-800 mb-2">Cara Pembayaran:</p>
                <ol className="text-sm text-yellow-700 list-decimal list-inside space-y-1">
                  {selectedMethod.details?.instructions?.map((instruction, idx) => (
                    <li key={idx}>{instruction}</li>
                  ))}
                </ol>
              </div>

              <button
                onClick={closeAllModals}
                className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
              >
                Saya Sudah Transfer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QRIS Modal */}
      {showQRISModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Pembayaran QRIS</h2>
                <button onClick={() => setShowQRISModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 text-center">
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-700">Total Pembayaran:</p>
                <p className="text-3xl font-bold text-blue-900">{formatRupiah(totalSelected)}</p>
              </div>

              <div className="bg-gray-100 p-8 rounded-xl mb-6 flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="w-48 h-48 text-gray-800 mx-auto" />
                  <p className="text-xs text-gray-500 mt-4">QR Code Dummy - Scan dengan aplikasi e-wallet</p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-sm font-medium text-gray-700">Cara Pembayaran:</p>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Smartphone className="w-5 h-5" />
                  <span>Buka aplikasi e-wallet (GoPay, OVO, DANA, ShopeePay, dll)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <QrCode className="w-5 h-5" />
                  <span>Pilih menu Scan/Pay dan arahkan ke QR code di atas</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5" />
                  <span>Konfirmasi pembayaran di aplikasi</span>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
                <div className="flex items-center gap-2 text-yellow-700">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">QR berlaku selama 1 jam</span>
                </div>
              </div>

              <button
                onClick={closeAllModals}
                className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
              >
                Saya Sudah Bayar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Keuangan</h1>
        <p className="text-sm sm:text-base text-gray-600">Monitoring SPP dan tagihan lainnya untuk anak-anak Anda.</p>
      </div>

      {/* Payment Alert */}
      {unpaidCount > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-start space-x-4">
            <div className="p-2 sm:p-3 bg-red-100 rounded-lg shrink-0">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-red-900 mb-2">Tagihan Belum Dibayar</h3>
              <p className="text-red-700 mb-4 text-sm">
                Anda memiliki <strong>{unpaidCount} bulan SPP</strong> yang belum dibayar dengan total <strong>{formatRupiah(totalUnpaid)}</strong>
              </p>
              <button 
                onClick={handlePayNow}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all text-sm sm:text-base"
              >
                Bayar Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{formatRupiah(150000)}</div>
          <div className="text-sm text-gray-600">SPP Bulanan</div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1">{unpaidCount}</div>
          <div className="text-sm text-gray-600">Belum Dibayar</div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">4</div>
          <div className="text-sm text-gray-600">Sudah Lunas</div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{formatRupiah(totalUnpaid)}</div>
          <div className="text-sm text-gray-600">Total Tunggakan</div>
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
                      <button 
                        onClick={handlePayNow}
                        className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                      >
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
                      <button 
                        onClick={handlePayNow}
                        className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                      >
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
