import { useState } from 'react';
import { Menu, X, Globe, ChevronRight, LogIn, Shield, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function HomePage({ toggleMenu, isMenuOpen, navLinks }: { toggleMenu: () => void, isMenuOpen: boolean, navLinks: any[] }) {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <Globe size={20} className="sm:w-6 sm:h-6" />
              </div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                Flow<span className="text-blue-600">Cargo</span>
              </span>
            </Link>

            {/* Desktop Navigation - только "О компании" */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop Actions - только "Личный кабинет" */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex items-center gap-2 lg:gap-3">
                <Link 
                  to="/login"
                  className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-1.5 lg:py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-full transition-all"
                >
                  <LogIn size={16} />
                  <span className="hidden sm:inline">Личный кабинет</span>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Меню"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm md:hidden"
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs bg-white shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full p-5 sm:p-6">
                <div className="flex justify-between items-center mb-8 sm:mb-10">
                  <span className="text-lg font-bold">Меню</span>
                  <button
                    onClick={toggleMenu}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={toggleMenu}
                      className="flex items-center justify-between p-3 sm:p-4 text-base sm:text-lg font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
                    >
                      {link.name}
                      <ChevronRight size={20} className="text-slate-300" />
                    </a>
                  ))}
                </nav>

                <div className="mt-auto pt-8 sm:pt-10 border-t border-slate-100">
                  <Link 
                    to="/login"
                    onClick={toggleMenu}
                    className="w-full flex items-center justify-center gap-2 p-3 sm:p-4 text-base font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all"
                  >
                    <LogIn size={20} />
                    Личный кабинет
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 max-w-7xl mx-auto">
          <div className="text-center space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 mb-4 sm:mb-6 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full">
                Лидер глобальной логистики
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Доставка из <br />
                <span className="text-blue-600">Китая</span>
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed px-4">
                Профессиональные логистические решения для вашего бизнеса. Надежно, быстро, под ключ.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4"
            >
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-xl shadow-blue-200 transition-all">
                Оставить заявку
              </button>
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-slate-700 bg-white border-2 border-slate-200 hover:border-slate-300 rounded-2xl transition-all">
                Маршруты
              </button>
            </motion.div>
          </div>
        </section>

        {/* About Us Section - возвращена */}
        <section id="about" className="py-16 sm:py-20 px-4 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                FlowCargo — ваш надежный партнер в логистике
              </h2>
              <div className="w-20 sm:w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center mb-10"
              >
                <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                  Мы специализируемся на оперативной доставке грузов из Китая. Наша миссия — сделать 
                  международную торговлю простой и доступной для каждого бизнеса. Мы берем на себя 
                  все этапы: от забора груза у поставщика до двери вашего склада.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
              >
                {/* Преимущество 1 */}
                <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">10 лет на рынке</h3>
                  <p className="text-sm text-slate-500">
                    Опыт и экспертиза, проверенная тысячами успешных перевозок
                  </p>
                </div>

                {/* Преимущество 2 */}
                <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Собственные склады в Шэньчжэне</h3>
                  <p className="text-sm text-slate-500">
                    Консолидация и хранение грузов перед отправкой
                  </p>
                </div>

                {/* Преимущество 3 */}
                <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Прозрачное отслеживание</h3>
                  <p className="text-sm text-slate-500">
                    Полный контроль над грузом на каждом этапе доставки
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Упрощенная навигация - только "О компании"
  const navLinks = [
    { name: 'О компании', href: '#about' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} navLinks={navLinks} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}