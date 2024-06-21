import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Импорт хука useParams для получения параметров из URL
import axios from 'axios'; // Импорт Axios для работы с HTTP-запросами
import { motion } from 'framer-motion'; // Импорт компонента motion из Framer Motion для анимаций
import { useCart } from '../components/CartContext'; // Импорт контекста корзины
import { useFavourites } from '../components/Favourites'; // Импорт контекста избранного
import '../styles/Product.css'; // Импорт стилей для компонента Product

const Product = () => {
  const { productId } = useParams(); // Получение параметра productId из URL с помощью хука useParams
  const [product, setProduct] = useState(null); // Состояние для хранения данных о продукте
  const [showNotification, setShowNotification] = useState(false); // Состояние для отображения уведомления
  const [notificationMessage, setNotificationMessage] = useState(''); // Состояние для текста уведомления
  const { addToCart } = useCart(); // Использование метода addToCart из контекста корзины
  const { favourites, addToFavourites, removeFromFavourites } = useFavourites(); // Использование методов из контекста избранного

  // Получение данных о продукте с сервера по его ID при загрузке компонента
  useEffect(() => {
    axios.get(`http://localhost:3001/products/${productId}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [productId]); // Зависимость useEffect от параметра productId

  // Вывод сообщения о загрузке, пока продукт не загружен
  if (!product) {
    return <div>Загрузка...</div>;
  }

  // Проверка, является ли текущий продукт избранным
  const isFavourite = Array.isArray(favourites) && favourites.some((fav) => fav.id === product.id);

  // Функция для показа уведомления с заданным сообщением
  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      setNotificationMessage('');
    }, 2000); // Установка таймера на скрытие уведомления через 2 секунды
  };

  // Обработчик добавления продукта в корзину
  const handleAddToCart = () => {
    addToCart(product);
    showNotificationMessage('Товар добавлен в корзину!');
  };

  // Обработчик добавления/удаления продукта из избранного
  const handleToggleFavourite = () => {
    if (isFavourite) {
      removeFromFavourites(product.id);
      showNotificationMessage('Товар удален из избранного!');
    } else {
      addToFavourites(product);
      showNotificationMessage('Товар добавлен в избранное!');
    }
  };

  // Возвращение разметки компонента Product с использованием анимаций и контекстов
  return (
    <div className="product-container">
      <motion.div className="product-image-container"
        initial={{ opacity: 0 }} // Начальное значение прозрачности
        animate={{ opacity: 1 }} // Анимация появления
        transition={{ duration: 0.5 }} // Время анимации
      >
        <img src={product.image} alt={product.name} className="product-image" />
      </motion.div>
      <div className="product-details">
        <h2>{product.name}</h2>
        <p className="product-price">{product.price}</p>
        <p>{product.description}</p>
        <div className="product-buttons">
          {/* Кнопка добавления в корзину с анимацией */}
          <motion.button className="button blue"
            whileHover={{ scale: 1.05 }} // Анимация масштабирования при наведении
            whileTap={{ scale: 0.95 }} // Анимация масштабирования при нажатии
            onClick={handleAddToCart} // Обработчик клика
          >
            Добавить в корзину
          </motion.button>
          {/* Кнопка добавления/удаления из избранного с анимацией */}
          {isFavourite ? (
            <motion.button className="button blue"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleFavourite}
            >
              Удалить из избранного
            </motion.button>
          ) : (
            <motion.button className="button blue"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleFavourite}
            >
              Добавить в избранное
            </motion.button>
          )}
        </div>
      </div>
      {/* Анимированное уведомление */}
      {showNotification && (
        <motion.div className="notification"
          initial={{ opacity: 0, y: 100 }} // Начальное значение прозрачности и положения
          animate={{ opacity: 1, y: 0 }} // Анимация появления и движения
          exit={{ opacity: 0, y: 100 }} // Анимация скрытия
          transition={{ duration: 0.5 }} // Время анимации
        >
          {notificationMessage}
        </motion.div>
      )}
    </div>
  );
};

export default Product; // Экспорт компонента Product
