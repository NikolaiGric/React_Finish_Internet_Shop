import React, { useEffect, useState } from 'react'; // Импорт React и его хуков (useEffect, useState)
import { useCart } from '../components/CartContext'; // Импорт пользовательского хука useCart для работы с состоянием корзины
import { Link } from 'react-router-dom'; // Импорт компонента Link из react-router-dom для создания ссылок
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // Импорт компонентов CSSTransition и TransitionGroup из react-transition-group для анимаций
import '../styles/Cart.css'; // Импорт стилей для компонента Cart

const Cart = () => {
  const { cart, removeFromCart } = useCart(); // Доступ к состоянию корзины и функции для удаления товара из корзины
  const [total, setTotal] = useState(0); // Состояние для хранения общей стоимости товаров в корзине

  // Эффект для вычисления общей стоимости корзины при изменении состояния cart
  useEffect(() => {
    const calculatedTotal = cart.reduce((acc, product) => acc + parseFloat(product.price), 0); // Вычисление общей стоимости
    setTotal(calculatedTotal.toFixed(2)); // Установка общей стоимости с округлением до двух знаков после запятой
  }, [cart]); // Зависимость от состояния cart

  // Обработчик для удаления товара из корзины
  const handleRemove = (cartId) => {
    removeFromCart(cartId); // Вызов функции для удаления товара из корзины
  };

  // Рендеринг компонента Cart с отображением содержимого корзины, общей стоимости и кнопки оформления заказа
  return (
    <div className="cart-container">
      <h2>Корзина</h2>
      {/* Проверка наличия товаров в корзине */}
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <TransitionGroup className="cart-items">
          {/* Отображение каждого товара в корзине с анимацией при добавлении и удалении */}
          {cart.map((product) => (
            <CSSTransition key={product.cartId} timeout={500} classNames="item">
              <div className="cart-item">
                <img src={product.image} alt={product.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
                  {/* Кнопка для удаления товара из корзины */}
                  <button onClick={() => handleRemove(product.cartId)}>Удалить из корзины</button>
                </div>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
      {/* Отображение общей стоимости корзины */}
      <div className="cart-total">
        Общая стоимость: {total} руб.
      </div>
      {/* Ссылка на страницу оформления заказа */}
      <Link to="/order" className="checkout-button">Оформить заказ</Link>
    </div>
  );
};

export default Cart; // Экспорт компонента Cart
