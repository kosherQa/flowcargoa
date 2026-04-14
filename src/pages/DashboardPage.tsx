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
  ChevronDown,
  MapPin,
  Box,
  User,
  Inbox,
  Phone,
  Mail,
  UserPlus,
  PlusCircle
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
  { id: 1, orderNumber: 'ORD-001', customer: 'Иван Петров', amount: '15 800 ₽', status: 'processing', date: '2024-01-15', destination: 'Москва', cargoType: 'Электроника' },
  { id: 2, orderNumber: 'ORD-002', customer: 'Мария Сидорова', amount: '23 400 ₽', status: 'shipping', date: '2024-01-16', destination: 'Алматы', cargoType: 'Одежда' },
  { id: 3, orderNumber: 'ORD-003', customer: 'Алексей Иванов', amount: '9 200 ₽', status: 'delivered', date: '2024-01-14', destination: 'Минск', cargoType: 'Оборудование' }
];

const DEFAULT_USERS = [
  { id: 1, name: 'Иван Петров', email: 'ivan@example.com', phone: '+7 (999) 123-45-67', role: 'Администратор' },
  { id: 2, name: 'Мария Сидорова', email: 'maria@example.com', phone: '+7 (999) 234-56-78', role: 'Менеджер' }
];

const DEFAULT_NEWS = [
  { id: 1, title: 'Новый маршрут доставки', content: 'Мы запустили новый маршрут доставки в регионы Сибири', date: '2024-01-10' },
  { id: 2, title: 'Скидки на международные перевозки', content: 'Акция действует до конца месяца', date: '2024-01-12' }
];

// Дефолтные заявки
const DEFAULT_REQUESTS = [
  { id: '1', name: 'Анна Смирнова', contact: '+7 (999) 111-22-33', cargoType: 'Оборудование', date: '20.03.2024', status: 'Новая заявка' },
  { id: '2', name: 'Дмитрий Козлов', contact: 'dmitry@example.com', cargoType: 'Электроника', date: '19.03.2024', status: 'Новая заявка' },
  { id: '3', name: 'Елена Попова', contact: '+7 (999) 444-55-66', cargoType: 'Одежда и обувь', date: '18.03.2024', status: 'Новая заявка' }
];

// Компонент модального окна для добавления пользователя
const AddUserModal = ({ isOpen, onClose, onAddUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    onAddUser(formData);
    setFormData({ name: '', email: '', phone: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <h3 className="text-xl font-bold text-white">Добавить клиента</h3>
          <p className="text-blue-100 text-sm">Заполните информацию о клиенте</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              ФИО Клиента
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User size={18} />
              </div>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Иванов Иван Иванович"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="client@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Телефон
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Phone size={18} />
              </div>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="+7 (999) 123-45-67"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all"
            >
              Сохранить
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-medium"
            >
              Отмена
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// Компонент кастомного селекта статуса
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
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
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

// Компонент модального окна для создания заказа
const CreateOrderModal = ({ isOpen, onClose, onSave, users }) => {
  const [formData, setFormData] = useState({
    customer: '',
    destination: '',
    cargoType: '',
    status: 'processing'
  });

  const destinations = ['Москва', 'Санкт-Петербург', 'Алматы', 'Минск', 'Киев', 'Ташкент', 'Баку', 'Ереван'];
  const cargoTypes = ['Электроника', 'Одежда', 'Обувь', 'Оборудование', 'Автозапчасти', 'Мебель', 'Продукты', 'Другое'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customer || !formData.destination || !formData.cargoType) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    onSave(formData);
    setFormData({ customer: '', destination: '', cargoType: '', status: 'processing' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <h3 className="text-xl font-bold text-white">Новый заказ</h3>
          <p className="text-blue-100 text-sm">Заполните информацию о заказе</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Имя клиента
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User size={18} />
              </div>
              <select
                required
                value={formData.customer}
                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
              >
                <option value="">Выберите клиента</option>
                {users.map((user) => (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Пункт назначения
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <MapPin size={18} />
              </div>
              <select
                required
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
              >
                <option value="">Выберите город</option>
                {destinations.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Тип груза
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Box size={18} />
              </div>
              <select
                required
                value={formData.cargoType}
                onChange={(e) => setFormData({ ...formData, cargoType: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
              >
                <option value="">Выберите тип груза</option>
                {cargoTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Статус
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Clock size={18} />
              </div>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
              >
                {Object.values(STATUSES).map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all"
            >
              Сохранить
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-medium"
            >
              Отмена
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [news, setNews] = useState([]);
  const [requests, setRequests] = useState([]);
  const [showAddNews, setShowAddNews] = useState(false);
  const [newNews, setNewNews] = useState({ title: '', content: '' });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateOrderModalOpen, setIsCreateOrderModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Состояния для модального окна новой заявки
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [newRequestForm, setNewRequestForm] = useState({ 
    customerName: '', 
    contact: '', 
    cargoType: 'Одежда и обувь' 
  });

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

      const storedRequests = localStorage.getItem('flowcargo_requests');
      if (!storedRequests) {
        localStorage.setItem('flowcargo_requests', JSON.stringify(DEFAULT_REQUESTS));
        setRequests(DEFAULT_REQUESTS);
      } else {
        setRequests(JSON.parse(storedRequests));
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

  // Создание нового заказа
  const createOrder = (orderData) => {
    const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
    const orderNumber = `ORD-${String(newId).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];
    const amount = '0 ₽';
    
    const newOrder = {
      id: newId,
      orderNumber: orderNumber,
      customer: orderData.customer,
      amount: amount,
      status: orderData.status,
      date: today,
      destination: orderData.destination,
      cargoType: orderData.cargoType
    };
    
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  // Добавление нового пользователя
  const addUser = (userData) => {
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = {
      id: newId,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: 'Клиент'
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  // Функция создания заявки
  const handleCreateRequest = (e) => {
    e.preventDefault();
    
    const newRequest = { 
      id: Date.now().toString(), 
      name: newRequestForm.customerName, 
      contact: newRequestForm.contact, 
      cargoType: newRequestForm.cargoType, 
      date: new Date().toLocaleDateString('ru-RU'), 
      status: 'Новая заявка' 
    };
    
    const existingRequests = JSON.parse(localStorage.getItem('flowcargo_requests') || '[]');
    const updatedRequests = [newRequest, ...existingRequests];
    
    localStorage.setItem('flowcargo_requests', JSON.stringify(updatedRequests));
    setRequests(updatedRequests);
    setIsRequestModalOpen(false);
    setNewRequestForm({ customerName: '', contact: '', cargoType: 'Одежда и обувь' });
  };

  // Удаление заявки
  const deleteRequest = (requestId) => {
    if (window.confirm('Вы уверены, что хотите удалить эту заявку?')) {
      const updatedRequests = requests.filter(req => req.id !== requestId);
      setRequests(updatedRequests);
      localStorage.setItem('flowcargo_requests', JSON.stringify(updatedRequests));
    }
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

  // Фильтрованные заказы
  const filteredOrders = selectedUser 
    ? orders.filter(order => order.customer === selectedUser.name)
    : orders;

  // Количество новых заявок
  const newRequestsCount = requests.length;

  // Компонент таблицы заявок (десктоп) с кнопкой создания
  const RequestsTableDesktop = () => (
    <div className="hidden md:block bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900">Список заявок</h3>
        <button
          onClick={() => setIsRequestModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors"
        >
          <PlusCircle size={16} />
          Создать заявку
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Клиент</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Контакт</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Тип груза</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Дата</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm font-medium text-slate-900">{request.name}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-slate-600">{request.contact}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-slate-600">{request.cargoType}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-slate-600">{request.date}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  <button
                    onClick={() => deleteRequest(request.id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && (
          <div className="text-center py-8">
            <Inbox size={48} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500">Нет заявок для отображения</p>
          </div>
        )}
      </div>
    </div>
  );

  // Компонент карточек заявок (мобильный) с кнопкой создания
  const RequestsCardsMobile = () => (
    <div className="md:hidden space-y-3">
      <button
        onClick={() => setIsRequestModalOpen(true)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-semibold mb-3"
      >
        <PlusCircle size={18} />
        Создать заявку
      </button>
      
      {requests.map((request) => (
        <div key={request.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <div className="text-xs text-slate-500 mb-1">Клиент</div>
              <div className="text-sm font-semibold text-slate-900">{request.name}</div>
            </div>
            <button
              onClick={() => deleteRequest(request.id)}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <Trash2 size={18} />
            </button>
          </div>
          
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div>
              <div className="text-xs text-slate-500 mb-1">Контакт</div>
              <div className="text-sm text-slate-600 break-all">{request.contact}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Тип груза</div>
              <div className="text-sm text-slate-600">{request.cargoType}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Дата</div>
              <div className="text-sm text-slate-600">{request.date}</div>
            </div>
          </div>
        </div>
      ))}
      {requests.length === 0 && (
        <div className="text-center py-8 bg-white rounded-xl border border-slate-200">
          <Inbox size={36} className="mx-auto text-slate-300 mb-2" />
          <p className="text-slate-500 text-sm">Нет заявок для отображения</p>
        </div>
      )}
    </div>
  );

  // Компонент таблицы заказов (десктоп)
  const OrdersTableDesktop = () => (
    <div className="hidden md:block bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">
            {selectedUser ? `Заказы клиента: ${selectedUser.name}` : 'Список заказов'}
          </h3>
          {selectedUser && (
            <button
              onClick={() => setSelectedUser(null)}
              className="text-xs text-blue-600 hover:text-blue-700 mt-1 inline-flex items-center gap-1"
            >
              Показать все заказы
            </button>
          )}
        </div>
        <button
          onClick={() => setIsCreateOrderModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium"
        >
          <Plus size={16} />
          Новый заказ
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">№ заказа</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Клиент</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Назначение</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Тип груза</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Дата</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Статус</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm font-medium text-slate-900">{order.orderNumber}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-slate-600">{order.customer}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-slate-600">{order.destination || '-'}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-slate-600">{order.cargoType || '-'}</td>
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
        {filteredOrders.length === 0 && (
          <div className="text-center py-8">
            <Package size={48} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500">Нет заказов для отображения</p>
          </div>
        )}
      </div>
    </div>
  );

  // Компонент карточек заказов (мобильный)
  const OrdersCardsMobile = () => (
    <div className="md:hidden space-y-3">
      {selectedUser && (
        <button
          onClick={() => setSelectedUser(null)}
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mb-2"
        >
          Показать все заказы
        </button>
      )}
      
      <button
        onClick={() => setIsCreateOrderModalOpen(true)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-semibold mb-3"
      >
        <Plus size={18} />
        Новый заказ
      </button>
      
      {filteredOrders.map((order) => (
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
          
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
            <div>
              <div className="text-xs text-slate-500 mb-1">Назначение</div>
              <div className="text-sm text-slate-600">{order.destination || '-'}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Тип груза</div>
              <div className="text-sm text-slate-600">{order.cargoType || '-'}</div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-slate-100">
            <div>
              <div className="text-xs text-slate-500 mb-1">Дата</div>
              <div className="text-sm text-slate-600">{order.date}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Статус</div>
              <StatusSelect 
                orderId={order.id}
                currentStatus={order.status}
                onStatusChange={updateOrderStatus}
              />
            </div>
          </div>
        </div>
      ))}
      {filteredOrders.length === 0 && (
        <div className="text-center py-8 bg-white rounded-xl border border-slate-200">
          <Package size={36} className="mx-auto text-slate-300 mb-2" />
          <p className="text-slate-500 text-sm">Нет заказов для отображения</p>
        </div>
      )}
    </div>
  );

  // Компонент таблицы пользователей (десктоп) с кнопкой добавления
  const UsersTableDesktop = () => (
    <div className="hidden md:block bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">Список пользователей</h3>
          <p className="text-xs text-slate-500 mt-1">Нажмите на имя пользователя, чтобы увидеть его заказы</p>
        </div>
        <button
          onClick={() => setIsAddUserModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium"
        >
          <UserPlus size={16} />
          Добавить клиента
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Имя</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Телефон</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Роль</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {users.map((user) => (
              <tr 
                key={user.id} 
                onClick={() => {
                  setActiveTab('orders');
                  setSelectedUser(user);
                }}
                className="hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                  {user.name}
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-slate-600 break-all">{user.email}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-slate-600">{user.phone || '-'}</td>
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

  // Компонент карточек пользователей (мобильный) с кнопкой добавления
  const UsersCardsMobile = () => (
    <div className="md:hidden space-y-3">
      <button
        onClick={() => setIsAddUserModalOpen(true)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-semibold mb-3"
      >
        <UserPlus size={18} />
        Добавить клиента
      </button>
      
      <p className="text-xs text-slate-500 mb-2 text-center">Нажмите на пользователя, чтобы увидеть его заказы</p>
      {users.map((user) => (
        <div 
          key={user.id} 
          onClick={() => {
            setActiveTab('orders');
            setSelectedUser(user);
          }}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
        >
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
              <div className="text-xs text-slate-500 mb-1">Телефон</div>
              <div className="text-sm text-slate-600">{user.phone || '-'}</div>
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
          { id: 'requests', label: 'Заявки', icon: Inbox, badge: newRequestsCount },
          { id: 'news', label: 'Новости', icon: Newspaper }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id !== 'orders') setSelectedUser(null);
                setIsMobileMenuOpen(false);
              }}
              className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all"
            >
              <div className="relative">
                <Icon size={20} className={isActive ? 'text-blue-600' : 'text-slate-500'} />
                {tab.badge > 0 && !isActive && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
                {tab.label}
              </span>
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
  const Sidebar = () => {
    const menuItems = [
      { id: 'orders', label: 'Заказы', icon: Package },
      { id: 'users', label: 'Пользователи', icon: Users },
      { id: 'requests', label: 'Заявки', icon: Inbox, badge: newRequestsCount },
      { id: 'news', label: 'Новости', icon: Newspaper }
    ];

    return (
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
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id !== 'orders') setSelectedUser(null);
                }}
                className="relative w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm group"
              >
                <Icon size={16} className={isActive ? 'text-blue-600' : 'text-slate-500'} />
                <span className={isActive ? 'text-blue-600 font-semibold' : 'text-slate-600'}>
                  {item.label}
                </span>
                {item.badge > 0 && !isActive && (
                  <span className="absolute right-2 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
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
  };

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
      
      <CreateOrderModal 
        isOpen={isCreateOrderModalOpen}
        onClose={() => setIsCreateOrderModalOpen(false)}
        onSave={createOrder}
        users={users}
      />
      
      <AddUserModal 
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onAddUser={addUser}
      />
      
      {/* Модальное окно создания заявки */}
      <AnimatePresence>
        {isRequestModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <h3 className="text-xl font-bold text-white">Создать заявку</h3>
                <p className="text-blue-100 text-sm">Заполните информацию о клиенте</p>
              </div>

              <form onSubmit={handleCreateRequest} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Имя клиента
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      required
                      value={newRequestForm.customerName}
                      onChange={(e) => setNewRequestForm({ ...newRequestForm, customerName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Иван Петров"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Контакт (телефон/email)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Phone size={18} />
                    </div>
                    <input
                      type="text"
                      required
                      value={newRequestForm.contact}
                      onChange={(e) => setNewRequestForm({ ...newRequestForm, contact: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="+7 (999) 123-45-67 или email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Тип груза
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Package size={18} />
                    </div>
                    <select
                      required
                      value={newRequestForm.cargoType}
                      onChange={(e) => setNewRequestForm({ ...newRequestForm, cargoType: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="Электроника">Электроника</option>
                      <option value="Одежда и обувь">Одежда и обувь</option>
                      <option value="Оборудование">Оборудование</option>
                      <option value="Автозапчасти">Автозапчасти</option>
                      <option value="Мебель">Мебель</option>
                      <option value="Другое">Другое</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all"
                  >
                    Создать
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsRequestModalOpen(false);
                      setNewRequestForm({ customerName: '', contact: '', cargoType: 'Одежда и обувь' });
                    }}
                    className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-medium"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <main className="md:ml-64 pb-20 md:pb-0 pt-14 md:pt-0">
        <div className="p-4 sm:p-6 md:p-8">
          <div className="mb-4 sm:mb-6 md:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
              {activeTab === 'orders' && 'Управление заказами'}
              {activeTab === 'users' && 'Управление пользователями'}
              {activeTab === 'requests' && 'Управление заявками'}
              {activeTab === 'news' && 'Управление новостями'}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {activeTab === 'orders' && (selectedUser 
                ? `Просмотр заказов клиента: ${selectedUser.name}` 
                : 'Просмотр, создание и изменение статусов заказов')}
              {activeTab === 'users' && 'Список зарегистрированных пользователей. Нажмите на имя для просмотра заказов'}
              {activeTab === 'requests' && 'Просмотр и управление заявками от клиентов'}
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
          {activeTab === 'requests' && (
            <>
              <RequestsTableDesktop />
              <RequestsCardsMobile />
            </>
          )}
          {activeTab === 'news' && <NewsTab />}
        </div>
      </main>
    </div>
  );
}