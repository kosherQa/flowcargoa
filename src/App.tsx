import { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronRight, LogIn, Shield, Clock, MapPin, LayoutDashboard, Truck, Plane, Train, User, Phone, Package as PackageIcon, Send, CheckCircle as CheckCircleIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function HomePage({ toggleMenu, isMenuOpen, navLinks, isAuth }: { toggleMenu: () => void, isMenuOpen: boolean, navLinks: any[], isAuth: boolean }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    cargoType: ''
  });

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRequest = {
      id: Date.now(),
      name: formData.name,
      contact: formData.contact,
      cargoType: formData.cargoType,
      date: new Date().toISOString().split('T')[0],
      status: 'Новая заявка'
    };
    
    const existingRequests = localStorage.getItem('flowcargo_requests');
    let requests = [];
    
    if (existingRequests) {
      requests = JSON.parse(existingRequests);
    }
    
    requests.unshift(newRequest);
    localStorage.setItem('flowcargo_requests', JSON.stringify(requests));
    
    console.log('Заявка сохранена:', newRequest);
    
    setFormSubmitted(true);
    
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', contact: '', cargoType: '' });
    }, 5000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const routes = [
    { from: 'Шэньчжэнь', to: 'Москва', duration: '15-20 дней', type: 'Авто', icon: Truck, color: 'text-blue-600' },
    { from: 'Гуанчжоу', to: 'Алматы', duration: '12-18 дней', type: 'Авто', icon: Truck, color: 'text-blue-600' },
    { from: 'Пекин', to: 'Минск', duration: '18-25 дней', type: 'ЖД', icon: Train, color: 'text-green-600' },
    { from: 'Шанхай', to: 'Санкт-Петербург', duration: '20-28 дней', type: 'ЖД', icon: Train, color: 'text-green-600' },
    { from: 'Гонконг', to: 'Новосибирск', duration: '5-7 дней', type: 'Авиа', icon: Plane, color: 'text-purple-600' },
    { from: 'Нинбо', to: 'Екатеринбург', duration: '25-35 дней', type: 'Море', icon: PackageIcon, color: 'text-cyan-600' }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <div className="w-7 h-7 sm:w-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <Globe size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </div>
              <span className="text-sm sm:text-base md:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap">
                Flow<span className="text-blue-600">Cargo</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-4 lg:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href.substring(1))}
                  className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link 
                to={isAuth ? "/dashboard" : "/login"}
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-full transition-all whitespace-nowrap"
              >
                {isAuth ? <LayoutDashboard size={16} /> : <LogIn size={16} />}
                <span>{isAuth ? "В админку" : "Личный кабинет"}</span>
              </Link>

              <button
                onClick={toggleMenu}
                className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Меню"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-64 bg-white shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full p-5">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-base font-bold">Меню</span>
                  <button onClick={toggleMenu} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href.substring(1))}
                      className="flex items-center justify-between p-3 text-base font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all cursor-pointer"
                    >
                      {link.name}
                      <ChevronRight size={18} className="text-slate-300" />
                    </a>
                  ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-slate-100">
                  <Link 
                    to={isAuth ? "/dashboard" : "/login"}
                    onClick={toggleMenu}
                    className="w-full flex items-center justify-center gap-2 p-3 text-base font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all"
                  >
                    {isAuth ? <LayoutDashboard size={18} /> : <LogIn size={18} />}
                    {isAuth ? "В админку" : "Личный кабинет"}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="pt-14 sm:pt-16 md:pt-20">
        <section className="px-4 pt-8 pb-12 sm:pt-12 sm:pb-16 md:pt-20 md:pb-20 max-w-7xl mx-auto">
          <div className="text-center space-y-4 sm:space-y-6 md:space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <span className="inline-block px-3 py-1 mb-3 sm:mb-4 md:mb-6 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full">
                Лидер глобальной логистики
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Доставка из <br />
                <span className="text-blue-600">Китая</span>
              </h1>
              <p className="mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed px-2">
                Профессиональные логистические решения для вашего бизнеса. Надежно, быстро, под ключ.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button onClick={(e) => handleSmoothScroll(e, 'callback')} className="w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg shadow-blue-200 transition-all cursor-pointer">
                Оставить заявку
              </button>
              <button onClick={(e) => handleSmoothScroll(e, 'routes')} className="w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-bold text-slate-700 bg-white border-2 border-slate-200 hover:border-slate-300 rounded-2xl transition-all cursor-pointer">
                Маршруты
              </button>
            </motion.div>
          </div>
        </section>

        <section id="about" className="px-4 py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 mb-3 md:mb-4">
                FlowCargo — ваш надежный партнер в логистике
              </h2>
              <div className="w-16 sm:w-20 md:w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} className="text-center mb-8 md:mb-10">
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base md:text-lg">
                  Мы специализируемся на оперативной доставке грузов из Китая. Наша миссия — сделать международную торговлю простой и доступной для каждого бизнеса. Мы берем на себя все этапы: от забора груза у поставщика до двери вашего склада.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                <div className="text-center p-4 sm:p-5 md:p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <Clock className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-1 md:mb-2">10 лет на рынке</h3>
                  <p className="text-xs md:text-sm text-slate-500">Опыт и экспертиза, проверенная тысячами успешных перевозок</p>
                </div>
                <div className="text-center p-4 sm:p-5 md:p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <MapPin className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-1 md:mb-2">Собственные склады в Шэньчжэне</h3>
                  <p className="text-xs md:text-sm text-slate-500">Консолидация и хранение грузов перед отправкой</p>
                </div>
                <div className="text-center p-4 sm:p-5 md:p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <Shield className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-1 md:mb-2">Прозрачное отслеживание</h3>
                  <p className="text-xs md:text-sm text-slate-500">Полный контроль над грузом на каждом этапе доставки</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="routes" className="px-4 py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 mb-3 md:mb-4">
                Популярные <span className="text-blue-600">направления</span>
              </h2>
              <div className="w-16 sm:w-20 md:w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">Доставляем грузы по самым востребованным маршрутам из Китая</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {routes.map((route, index) => {
                const Icon = route.icon;
                return (
                  <motion.div key={`${route.from}-${route.to}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="bg-slate-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 hover:shadow-lg transition-all border border-slate-100 hover:border-blue-200">
                    <div className="flex items-start justify-between mb-2 md:mb-3">
                      <div className="flex-1">
                        <div className="text-xs text-slate-500 mb-1">Маршрут</div>
                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 break-words">{route.from} → {route.to}</h3>
                      </div>
                      <div className={`${route.color} bg-white p-1.5 sm:p-2 rounded-xl shadow-sm flex-shrink-0 ml-2`}>
                        <Icon size={16} className="sm:w-5 sm:h-5 md:w-5 md:h-5" />
                      </div>
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-slate-500">Срок доставки:</span>
                        <span className="font-semibold text-slate-900">{route.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-slate-500">Тип транспорта:</span>
                        <span className="font-medium text-slate-700">{route.type}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="callback" className="px-4 py-12 sm:py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">Оставить заявку на расчет</h3>
                <p className="text-blue-100 text-xs sm:text-sm md:text-base">Мы свяжемся с вами в течение 15 минут</p>
              </div>
              
              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit} className="p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4 md:space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1 md:mb-2">Ваше имя</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User size={16} className="sm:w-4 sm:h-4" />
                      </div>
                      <input id="name" name="name" type="text" required value={formData.name} onChange={handleInputChange} className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm" placeholder="Иван Петров" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact" className="block text-sm font-semibold text-slate-700 mb-1 md:mb-2">Телефон или Telegram</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Phone size={16} className="sm:w-4 sm:h-4" />
                      </div>
                      <input id="contact" name="contact" type="text" required value={formData.contact} onChange={handleInputChange} className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm" placeholder="+7 (999) 123-45-67 или @username" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cargoType" className="block text-sm font-semibold text-slate-700 mb-1 md:mb-2">Тип груза</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <PackageIcon size={16} className="sm:w-4 sm:h-4" />
                      </div>
                      <select id="cargoType" name="cargoType" required value={formData.cargoType} onChange={handleInputChange} className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm appearance-none cursor-pointer">
                        <option value="">Выберите тип груза</option>
                        <option value="Электроника">Электроника</option>
                        <option value="Одежда">Одежда и обувь</option>
                        <option value="Оборудование">Оборудование</option>
                        <option value="Автозапчасти">Автозапчасти</option>
                        <option value="Мебель">Мебель</option>
                        <option value="Продукты">Продукты</option>
                        <option value="Другое">Другое</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 md:py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98] text-sm">
                    <Send size={16} className="sm:w-4 sm:h-4" />
                    Получить расчет стоимости
                  </button>
                </form>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-6 sm:p-8 md:p-12 text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <CheckCircleIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2 md:mb-3">Заявка отправлена! 🎉</h3>
                  <p className="text-sm sm:text-base text-slate-600">Менеджер свяжется с вами и создаст заказ в системе.</p>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2">Ожидайте звонка в ближайшее время.</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsAuth(loggedIn);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const navLinks = [
    { name: 'О компании', href: '#about' },
    { name: 'Маршруты', href: '#routes' },
    { name: 'Оставить заявку', href: '#callback' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} navLinks={navLinks} isAuth={isAuth} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}