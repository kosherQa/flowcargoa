import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Users, 
  Newspaper, 
  LogOut, 
  Plus, 
  Trash2,
  CheckCircle,
  Truck,
  Clock,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Типы данных с обновленными цветами статусов
const STATUSES = {
  PROCESSING: { value: 'processing', label: 'В обработке', icon: Clock, bg: 'bg-slate-100', text: 'text-slate-700' },
  SHIPPING: { value: 'shipping', label: 'В пути', icon: Truck, bg: 'bg-amber-100', text: 'text-amber-700' },
  DELIVERED: { value: 'delivered', label: 'Доставлен', icon: CheckCircle, bg: 'bg-green-100', text: 'text-green-700' }
};

// Дефолтные данные
const DEFAULT_ORDERS = [
  { id: 1, orderNumber: 'ORD-001', customer: 'Иван Петров', amount: '15 800 ₽', status: 'processing', date: '2024-01-15' },
  { id: 2, orderNumber: 'ORD-002', customer: 'Мария Сидорова', amount: '23 400 ₽', status: 'shipping', date: '2024-01-16' },
  { id: 3, orderNumber: 'ORD-003', customer: 'Алексей Иванов', amount: '9 200 ₽', status: 'delivered', date: '2024-01-14' }
];

const DEFAULT_USERS = [
  { id: 1, name: 'Иван Петров', email: 'ivan@example.com', role: 'Администратор' },
  { id: 2, name: 'Мария Сидорова', email: 'maria@example.com', role: 'Менеджер' }
];

const DEFAULT_NEWS = [
  { id: 1, title: 'Новый маршрут доставки', content: 'Мы запустили новый маршрут доставки в регионы Сибири', date: '2024-01-10' },
  { id: 2, title: 'Скидки на международные перевозки', content: 'Акция действует до конца месяца', date: '2024-01-12' }
];

// Компонент кастомного селекта статуса (улучшенная версия)
const StatusSelect = ({ orderId, currentStatus, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentStatusObj = STATUSES[currentStatus.toUpperCase()];
  const CurrentIcon = currentStatusObj?.icon || Clock;

  const handleSelect = (statusValue) => {
    onStatusChange(orderId, statusValue);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:shadow-md whitespace-nowrap ${currentStatusObj?.bg} ${currentStatusObj?.text}`}
      >
        <CurrentIcon size={14} />
        <span>{currentStatusObj?.label || currentStatus}</span>
        <ChevronDown 
          size={14} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop для закрытия при клике вне */}
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Выпадающее меню */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 mt-2 min-w-[160px] bg-white rounded-lg shadow-xl border border-slate-200 z-50 overflow-hidden"
            >
              {Object.values(STATUSES).map((status) => {
                const Icon = status.icon;
                const isActive = currentStatus === status.value;
                
                return (
                  <button
                    key={status.value}
                    onClick={() => handleSelect(status.value)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-slate-50 whitespace-nowrap ${
                      isActive ? 'bg-slate-50 font-semibold' : ''
                    }`}
                  >
                    <Icon size={14} className={status.text} />
                    <span className="flex-1 text-left">{status.label}</span>
                    {isActive && (
                      <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [news, setNews] = useState([]);
  const [showAddNews, setShowAddNews] = useState(false);
  const [newNews, setNewNews] = useState({ title: '', content: '' });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Проверка авторизации
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  // Инициализация данных
  useEffect(() => {
    const initializeData = () => {
      const storedOrders = localStorage.getItem('orders');
      if (!storedOrders) {
        localStorage.setItem('orders', JSON.stringify(DEFAULT_ORDERS));
        setOrders(DEFAULT_ORDERS);
      } else {
        setOrders(JSON.parse(storedOrders));
      }

      const storedUsers = localStorage.getItem('users');
      if (!storedUsers) {
        localStorage.setItem('users', JSON.stringify(DEFAULT_USERS));
        setUsers(DEFAULT_USERS);
      } else {
        setUsers(JSON.parse(storedUsers));
      }

      const storedNews = localStorage.getItem('news');
      if (!storedNews) {
        localStorage.setItem('news', JSON.stringify(DEFAULT_NEWS));
        setNews(DEFAULT_NEWS);
      } else {
        setNews(JSON.parse(storedNews));
      }
    };

    initializeData();
  }, []);

  // Обновление статуса заказа
  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  // CRUD для новостей
  const addNews = () => {
    if (!newNews.title.trim() || !newNews.content.trim()) {
      alert('Пожалуйста, заполните заголовок и текст новости');
      return;
    }

    const newsItem = {
      id: Date.now(),
      title: newNews.title,
      content: newNews.content,
      date: new Date().toISOString().split('T')[0]
    };
    const updatedNews = [newsItem, ...news];
    setNews(updatedNews);
    localStorage.setItem('news', JSON.stringify(updatedNews));
    setNewNews({ title: '', content: '' });
    setShowAddNews(false);
  };

  const deleteNews = (newsId) => {
    if (window.confirm('Вы уверены, что хотите удалить эту новость?')) {
      const updatedNews = news.filter(item => item.id !== newsId);
      setNews(updatedNews);
      localStorage.setItem('news', JSON.stringify(updatedNews));
    }
  };

  // Выход из системы
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  // Компонент таблицы заказов (десктоп)
  const OrdersTableDesktop = () => (
    <div className="hidden md:block bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-slate-200 bg-slate-50">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900">Список заказов</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">№ заказа</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Клиент</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Сумма</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Дата</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Статус</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm font-medium text-slate-900">{order.orderNumber}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-slate-600">{order.customer}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm font-semibold text-slate-900">{order.amount}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-slate-600">{order.date}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  <StatusSelect 
                    orderId={order.id}
                    currentStatus={order.status}
                    onStatusChange={updateOrderStatus}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Компонент карточек заказов (мобильный)
  const OrdersCardsMobile = () => (
    <div className="md:hidden space-y-3">
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <div className="text-xs text-slate-500 mb-1">№ заказа</div>
              <div className="text-sm font-semibold text-slate-900">{order.orderNumber}</div>
            </div>
            <div className="flex-1 text-right">
              <div className="text-xs text-slate-500 mb-1">Клиент</div>
              <div className="text-sm font-medium text-slate-700 truncate">{order.customer}</div>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-3 border-t border-slate-100">
            <div>
              <div className="text-xs text-slate-500 mb-1">Сумма</div>
              <div className="text-sm font-bold text-slate-900">{order.amount}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Дата</div>
              <div className="text-sm text-slate-600">{order.date}</div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="text-xs text-slate-500 mb-2">Статус</div>
            <StatusSelect 
              orderId={order.id}
              currentStatus={order.status}
              onStatusChange={updateOrderStatus}
            />
          </div>
        </div>
      ))}
    </div>
  );

  // Компонент таблицы пользователей (десктоп)
  const UsersTableDesktop = () => (
    <div className="hidden md:block bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-slate-200 bg-slate-50">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900">Список пользователей</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Имя</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Роль</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm font-medium text-slate-900">{user.name}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-slate-600 break-all">{user.email}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Компонент карточек пользователей (мобильный)
  const UsersCardsMobile = () => (
    <div className="md:hidden space-y-3">
      {users.map((user) => (
        <div key={user.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="space-y-2">
            <div>
              <div className="text-xs text-slate-500 mb-1">Имя</div>
              <div className="text-sm font-semibold text-slate-900">{user.name}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Email</div>
              <div className="text-sm text-slate-600 break-all">{user.email}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Роль</div>
              <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                {user.role}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Компонент новостей
  const NewsTab = () => (
    <div className="space-y-4">
      {/* Кнопка добавления */}
      {!showAddNews ? (
        <button
          onClick={() => setShowAddNews(true)}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 text-sm font-semibold"
        >
          <Plus size={18} />
          Добавить новость
        </button>
      ) : (
        <AnimatePresence>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl w-[95%] max-w-lg p-4"
            >
              <h3 className="text-base font-semibold text-slate-900 mb-3">Добавить новость</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Заголовок"
                  value={newNews.title}
                  onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <textarea
                  placeholder="Текст новости"
                  rows={4}
                  value={newNews.content}
                  onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <div className="flex gap-2">
                  <button
                    onClick={addNews}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-semibold"
                  >
                    Сохранить
                  </button>
                  <button
                    onClick={() => setShowAddNews(false)}
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all text-sm"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
      )}

      {/* Список новостей */}
      <div className="space-y-3">
        {news.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-slate-900 mb-2 break-words">{item.title}</h3>
                <p className="text-xs text-slate-600 mb-2 break-words leading-relaxed">{item.content}</p>
                <p className="text-xs text-slate-400">{item.date}</p>
              </div>
              <button
                onClick={() => deleteNews(item.id)}
                className="text-red-500 hover:text-red-700 transition-colors p-1 flex-shrink-0"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {news.length === 0 && (
          <div className="text-center py-8 bg-white rounded-xl border border-slate-200">
            <Newspaper size={36} className="mx-auto text-slate-300 mb-2" />
            <p className="text-slate-500 text-sm">Новостей пока нет</p>
          </div>
        )}
      </div>
    </div>
  );

  // Bottom Navigation для мобильных
  const BottomNavigation = () => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-40">
      <div className="flex justify-around py-2">
        {[
          { id: 'orders', label: 'Заказы', icon: Package },
          { id: 'users', label: 'Пользователи', icon: Users },
          { id: 'news', label: 'Новости', icon: Newspaper }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsMobileMenuOpen(false);
              }}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'text-blue-600'
                  : 'text-slate-500'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-red-500"
        >
          <LogOut size={20} />
          <span className="text-xs font-medium">Выйти</span>
        </button>
      </div>
    </div>
  );

  // Sidebar для десктопа
  const Sidebar = () => (
    <div className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col fixed h-full z-30">
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Package size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">FlowCargo</h2>
            <p className="text-[10px] text-slate-500">Панель управления</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-3 space-y-1">
        {[
          { id: 'orders', label: 'Заказы', icon: Package },
          { id: 'users', label: 'Пользователи', icon: Users },
          { id: 'news', label: 'Новости', icon: Newspaper }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-3 border-t border-slate-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-all text-sm"
        >
          <LogOut size={16} />
          <span>Выход</span>
        </button>
      </div>
    </div>
  );

  // Mobile Header
  const MobileHeader = () => (
    <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-40">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <Package size={18} />
          </div>
          <span className="text-base font-bold text-slate-900">FlowCargo</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          <Menu size={24} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <MobileHeader />
      <Sidebar />
      <BottomNavigation />
      
      <main className="md:ml-64 pb-20 md:pb-0 pt-14 md:pt-0">
        <div className="p-4 sm:p-6 md:p-8">
          <div className="mb-4 sm:mb-6 md:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
              {activeTab === 'orders' && 'Управление заказами'}
              {activeTab === 'users' && 'Управление пользователями'}
              {activeTab === 'news' && 'Управление новостями'}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {activeTab === 'orders' && 'Просмотр и изменение статусов заказов'}
              {activeTab === 'users' && 'Список зарегистрированных пользователей'}
              {activeTab === 'news' && 'Создание и управление новостями'}
            </p>
          </div>
          
          {activeTab === 'orders' && (
            <>
              <OrdersTableDesktop />
              <OrdersCardsMobile />
            </>
          )}
          {activeTab === 'users' && (
            <>
              <UsersTableDesktop />
              <UsersCardsMobile />
            </>
          )}
          {activeTab === 'news' && <NewsTab />}
        </div>
      </main>
    </div>
  );
}