import React, { useState, useEffect } from 'react'; // Импорт React и его хуков (useState, useEffect)
import { Link } from 'react-router-dom'; // Импорт компонента Link из react-router-dom для создания ссылок
import { motion } from 'framer-motion'; // Импорт компонента motion из Framer Motion для анимаций
import { useFavourites } from '../components/Favourites'; // Импорт пользовательского хука useFavourites для работы с избранными товарами
import { useCart } from '../components/CartContext'; // Импорт пользовательского хука useCart для работы с корзиной
import '../styles/Favourites.css'; // Импорт стилей для компонента Favourites

const Favourites = () => {
  const { favourites, removeFromFavourites } = useFavourites(); // Доступ к состоянию избранных товаров и функции для удаления избранного
  const { addToCart } = useCart(); // Доступ к функции для добавления товара в корзину из пользовательского контекста CartContext

  const [showNotification, setShowNotification] = useState(false); // Состояние для отображения уведомления
  const [notificationMessage, setNotificationMessage] = useState(''); // Сообщение уведомления

  // Эффект для скрытия уведомления через 2 секунды после его появления
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
      setNotificationMessage('');
    }, 2000); // Задержка 2000 мс (2 секунды)
    return () => clearTimeout(timer); // Очистка таймера при размонтировании компонента
  }, [showNotification]); // Зависимость только от showNotification

  // Функция для добавления товара в корзину
  const handleAddToCart = (fav) => {
    addToCart(fav); // Вызов функции добавления товара в корзину
    setNotificationMessage('Товар добавлен в корзину!'); // Установка сообщения уведомления
    setShowNotification(true); // Показ уведомления
  };

  // Функция для удаления товара из избранного
  const handleRemoveFromFavourites = (id) => {
    removeFromFavourites(id); // Вызов функции удаления товара из избранного
    setNotificationMessage('Товар удален из избранного!'); // Установка сообщения уведомления
    setShowNotification(true); // Показ уведомления
  };

  // Рендеринг компонента Favourites с отображением избранных товаров и уведомлений
  return (
    <div className="favourites-container">
      <h2>Избранное</h2>
      {/* Отображение списка избранных товаров или сообщение об их отсутствии */}
      {favourites.length > 0 ? (
        favourites.map((fav) => (
          <motion.div className="favourite-item" key={fav.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Ссылка на страницу продукта */}
            <Link to={`/product/${fav.id}`}>
              <img src={fav.image} alt={fav.name} className="favourite-item-image" />
            </Link>
            {/* Детали избранного товара */}
            <div className="favourite-item-details">
              <h3>{fav.name}</h3>
              <p>{fav.price}</p>
              {/* Группа кнопок для добавления в корзину и удаления из избранного */}
              <div className="button-group">
                <button className="cart-button" onClick={() => handleAddToCart(fav)}>
                  Добавить в корзину
                </button>
                <button className="remove-button" onClick={() => handleRemoveFromFavourites(fav.id)}>
                  Удалить из избранного
                </button>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <p className="empty-message">Избранных товаров нет</p>
      )}
      {/* Анимированное уведомление */}
      {showNotification && (
        <motion.div className="notification"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          {notificationMessage}
        </motion.div>
      )}
    </div>
  );
};

export default Favourites; // Экспорт компонента Favourites
