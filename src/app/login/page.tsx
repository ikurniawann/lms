'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen, Mail, Lock, Eye, EyeOff, ArrowLeft, Globe } from 'lucide-react';
import { useTranslation } from '@/i18n';

export default function LoginPage() {
  const { locale, t, toggleLanguage } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const demoUsers: Record<string, { password: string; role: string; redirect: string }> = {
    'admin@smpn1.sch.id': { password: 'password', role: 'admin', redirect: '/dashboard' },
    'guru@smpn1.sch.id': { password: 'password', role: 'guru', redirect: '/dashboard-guru' },
    'siswa@smpn1.sch.id': { password: 'password', role: 'siswa', redirect: '/dashboard-siswa' },
    'parent@smpn1.sch.id': { password: 'password', role: 'parent', redirect: '/parent/dashboard' },
  };

  const handleQuickLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password');
    setLoading(true);
    setError('');

    const user = demoUsers[demoEmail];
    if (user) {
      await new Promise(resolve => setTimeout(resolve, 300));
      router.push(user.redirect);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const user = demoUsers[email];
    
    if (!user || user.password !== password) {
      setError(t('login.errorLogin'));
      setLoading(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    router.push(user.redirect);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Back Button & Language Switcher */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">{t('common.backToHome')}</span>
          </Link>
          <button onClick={toggleLanguage} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">{locale === 'id' ? 'EN' : 'ID'}</span>
          </button>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('login.title')}</h1>
            <p className="text-gray-600">{t('login.subtitle')}</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">{t('login.email')}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('login.emailPlaceholder')}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">{t('login.password')}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('login.passwordPlaceholder')}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span className="text-sm text-gray-600">{t('login.rememberMe')}</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline font-medium">{t('login.forgotPassword')}</Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/30"
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>{t('common.loading')}</span>
                </span>
              ) : (
                t('login.submit')
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">{t('common.or')}</span>
            </div>
          </div>

          {/* Demo Accounts */}
          <div className="space-y-3">
            <p className="text-xs text-gray-500 text-center mb-2">{t('login.demoAccounts')}</p>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => handleQuickLogin('admin@smpn1.sch.id')} className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-all text-left cursor-pointer group">
                <div className="text-xs font-medium text-blue-900 mb-1 group-hover:text-blue-800">👨‍💼 {t('login.admin')}</div>
                <div className="text-xs text-blue-700">admin@smpn1.sch.id</div>
                <div className="text-[10px] text-blue-500 mt-1">{t('login.clickToLogin')}</div>
              </button>
              <button type="button" onClick={() => handleQuickLogin('guru@smpn1.sch.id')} className="p-3 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-all text-left cursor-pointer group">
                <div className="text-xs font-medium text-green-900 mb-1 group-hover:text-green-800">👨‍🏫 {t('login.teacher')}</div>
                <div className="text-xs text-green-700">guru@smpn1.sch.id</div>
                <div className="text-[10px] text-green-500 mt-1">{t('login.clickToLogin')}</div>
              </button>
              <button type="button" onClick={() => handleQuickLogin('siswa@smpn1.sch.id')} className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-all text-left cursor-pointer group">
                <div className="text-xs font-medium text-purple-900 mb-1 group-hover:text-purple-800">👨‍🎓 {t('login.student')}</div>
                <div className="text-xs text-purple-700">siswa@smpn1.sch.id</div>
                <div className="text-[10px] text-purple-500 mt-1">{t('login.clickToLogin')}</div>
              </button>
              <button type="button" onClick={() => handleQuickLogin('parent@smpn1.sch.id')} className="p-3 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 transition-all text-left cursor-pointer group">
                <div className="text-xs font-medium text-orange-900 mb-1 group-hover:text-orange-800">👨‍👩‍👦 {t('login.parent')}</div>
                <div className="text-xs text-orange-700">parent@smpn1.sch.id</div>
                <div className="text-[10px] text-orange-500 mt-1">{t('login.clickToLogin')}</div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            {t('login.noAccount')}{' '}
            <Link href="/register" className="text-blue-600 hover:underline font-medium">{t('login.contactAdmin')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
