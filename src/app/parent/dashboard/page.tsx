'use client';

import { useState } from 'react';
import { 
  Users, TrendingUp, Calendar, Wallet, BookOpen, Bell, X, Eye, 
  GraduationCap, Clock, FileText, CheckCircle, ChevronRight, Phone, Mail, Globe, LogOut
} from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/i18n';

interface Child {
  id: number;
  name: string;
  class: string;
  nis: string;
  photo: string;
  avgGrade: number;
  attendance: number;
  rank: number;
  teacher: string;
  phone: string;
  email: string;
}

export default function ParentDashboard() {
  const { locale, t, toggleLanguage } = useTranslation();
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [showChildModal, setShowChildModal] = useState(false);

  const children: Child[] = [
    { 
      id: 1, name: 'Ahmad Rizki', class: '10A', nis: '2024001', photo: 'AR',
      avgGrade: 88.5, attendance: 96, rank: 5,
      teacher: 'Budi Santoso, S.Pd', phone: '0812-3456-7890', email: 'ahmad.rizki@email.com'
    },
    { 
      id: 2, name: 'Siti Nurhaliza', class: '8B', nis: '2022045', photo: 'SN',
      avgGrade: 91.2, attendance: 98, rank: 3,
      teacher: 'Dewi Lestari, S.Pd', phone: '0812-3456-7891', email: 'siti.nurhaliza@email.com'
    },
  ];

  const statsCards = [
    { title: t('parent.stats.totalChildren'), value: '2', icon: Users, color: 'blue' },
    { title: t('parent.stats.averageGrade'), value: '89.9', icon: TrendingUp, color: 'green' },
    { title: t('parent.stats.attendance'), value: '97%', icon: Calendar, color: 'purple' },
    { title: t('parent.stats.pendingBills'), value: 'Rp 450K', icon: Wallet, color: 'orange' },
  ];

  const handleChildClick = (child: Child) => {
    setSelectedChild(child);
    setShowChildModal(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Child Detail Modal */}
      {showChildModal && selectedChild && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold border-2 border-white/30">
                    {selectedChild.photo}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedChild.name}</h2>
                    <p className="text-white/80">{t('parent.child.class')} {selectedChild.class} • NIS: {selectedChild.nis}</p>
                  </div>
                </div>
                <button onClick={() => setShowChildModal(false)} className="p-2 hover:bg-white/20 rounded-lg text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-xl text-center">
                  <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-700">{selectedChild.avgGrade}</p>
                  <p className="text-sm text-green-600">{t('parent.child.averageGrade')}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-700">{selectedChild.attendance}%</p>
                  <p className="text-sm text-blue-600">{t('parent.child.attendance')}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl text-center">
                  <GraduationCap className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-700">#{selectedChild.rank}</p>
                  <p className="text-sm text-purple-600">{t('parent.child.rank')}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">{t('parent.child.contactInfo')}</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-gray-500" /><span className="text-sm text-gray-600">{selectedChild.phone}</span></div>
                  <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-gray-500" /><span className="text-sm text-gray-600">{selectedChild.email}</span></div>
                  <div className="flex items-center gap-3"><Users className="w-4 h-4 text-gray-500" /><span className="text-sm text-gray-600">{t('parent.child.homeroomTeacher')}: {selectedChild.teacher}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t('parent.welcome')}</h1>
            <p className="text-sm sm:text-base text-gray-600">{t('parent.subtitle')}</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleLanguage} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{locale === 'id' ? 'EN' : 'ID'}</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">{t('common.logout')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-lg ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600' : stat.color === 'green' ? 'bg-green-50 text-green-600' : stat.color === 'purple' ? 'bg-purple-50 text-purple-600' : 'bg-orange-50 text-orange-600'}`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-600">{stat.title}</div>
            </div>
          );
        })}
      </div>

      {/* Children Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {children.map((child) => (
          <div key={child.id} onClick={() => handleChildClick(child)} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all group">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold">
                {child.photo}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{child.name}</h3>
                  <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                </div>
                <p className="text-sm text-gray-500">{t('parent.child.class')} {child.class}</p>
                <p className="text-xs text-gray-400">NIS: {child.nis}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{child.avgGrade}</div>
                <div className="text-xs text-gray-500">{t('parent.child.average')}</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{child.attendance}%</div>
                <div className="text-xs text-gray-500">{t('parent.child.attendance')}</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">#{child.rank}</div>
                <div className="text-xs text-gray-500">{t('parent.child.rank')}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
