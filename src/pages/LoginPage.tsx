import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, ArrowLeft, Mail, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Проверка данных
    if (email === 'test@gmail.com' && password === '1234') {
      // Сохраняем в localStorage
      localStorage.setItem('isLoggedIn', 'true');
      // Перенаправляем на dashboard
      navigate('/dashboard');
    } else {
      // Показываем ошибку
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
              <Globe size={24} className="sm:w-7 sm:h-7" />
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Flow<span className="text-blue-600">Cargo</span>
            </span>
          </Link>
        </div>
        <h2 className="mt-6 sm:mt-8 text-center text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          С возвращением
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          Или{' '}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
            создайте новый аккаунт
          </a>
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white py-6 sm:py-10 px-5 sm:px-6 md:px-12 shadow-lg sm:shadow-xl sm:shadow-slate-200/50 rounded-2xl sm:rounded-3xl border border-slate-100">
          <form className="space-y-5 sm:space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Электронная почта
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                Пароль
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Отображение ошибки */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-sm">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded-md"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs sm:text-sm text-slate-600">
                  Запомнить меня
                </label>
              </div>

              <div className="text-xs sm:text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  Забыли пароль?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 sm:py-4 px-4 border border-transparent rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300"
              >
                <span className="absolute left-4 inset-y-0 flex items-center transition-transform group-hover:translate-x-1">
                  <Lock size={18} className="opacity-80" />
                </span>
                Войти
              </button>
            </div>
          </form>

          <div className="mt-6 sm:mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100" />
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-2 bg-white text-slate-400">Или продолжить через</span>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-3">
              <button className="w-full inline-flex justify-center items-center py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl sm:rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm font-medium text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
                Google
              </button>
              <button className="w-full inline-flex justify-center items-center py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl sm:rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm font-medium text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
                Microsoft
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-6 sm:mt-8 text-center">
        <Link to="/" className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-700 transition-all hover:gap-3">
          <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
          На главную
        </Link>
      </div>
    </div>
  );
}