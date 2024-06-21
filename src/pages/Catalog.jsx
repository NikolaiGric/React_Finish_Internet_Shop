import axios from 'axios'; // Импорт Axios для работы с HTTP-запросами
import React, { useEffect, useState } from 'react'; // Импорт React и его хуков (useEffect, useState)
import '../styles/Catalog.css'; // Импорт стилей для компонента Catalog
import { Link } from 'react-router-dom'; // Импорт компонента Link из react-router-dom для создания ссылок
import { motion } from 'framer-motion'; // Импорт компонента motion из Framer Motion для анимаций

const Catalog = () => {
  const [data, setData] = useState([]); // Состояние для хранения данных о продуктах
  const [searchTerm, setSearchTerm] = useState(''); // Состояние для хранения строки поиска
  const [categoryFilter, setCategoryFilter] = useState(''); // Состояние для хранения выбранной категории

  // Загрузка данных о продуктах с сервера при монтировании компонента
  useEffect(() => {
    axios.get('http://localhost:3001/products/')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  // Обработчик изменения строки поиска
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Обработчик изменения фильтра по категориям
  const handleCategoryFilter = (event) => {
    setCategoryFilter(event.target.value);
  };

  // Фильтрация данных на основе поискового запроса и выбранной категории
  const filteredData = data
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) && // Поиск по имени (регистронезависимый)
      (categoryFilter ? item.category === categoryFilter : true) // Фильтр по категории
    );

  // Получение уникальных категорий для отображения в селекте
  const uniqueCategories = [...new Set(data.map(item => item.category))];

  // Возвращение разметки компонента Catalog с использованием фильтрации данных и анимаций
  return (
    <div className="container2">
      <div className="info">
        <p>
          <b>Все товары для покупки:</b>
        </p>
        {/* Поле для ввода строки поиска */}
        <div className="shopcategory-search">
          <input 
            type="text" 
            placeholder="Поиск" 
            value={searchTerm} 
            onChange={handleSearch} 
          />
        </div>
        {/* Выбор категории товаров */}
        <div className="shopcategory-sort">
          <select onChange={handleCategoryFilter}>
            <option value="">Все категории</option>
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Контейнер с анимированными товарами */}
      <motion.div className="items"
        initial={{ opacity: 0 }} // Начальное значение прозрачности
        animate={{ opacity: 1 }} // Анимация появления
        transition={{ duration: 0.5 }} // Время анимации
      >
        {/* Отображение отфильтрованных товаров */}
        {filteredData.map((d, i) => (
          <motion.div
            className="item"
            key={i}
            whileHover={{ scale: 1.05 }} // Анимация масштабирования при наведении
          >
            {/* Ссылка на страницу продукта */}
            <Link to={`/product/${d.id}`}>
              <img src={d.image} alt={d.name} className="item-image" />
            </Link>
            {/* Детали продукта */}
            <div className="item-details">
              <p className="item-name">{d.name}</p>
              <pre className="item-price">{d.price}</pre>
              <p className="item-category">{d.category}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Catalog; // Экспорт компонента Catalog
