import React, { useState } from 'react'; // Импорт React и его хуков (useState)
import { useForm } from 'react-hook-form'; // Импорт хука useForm из библиотеки react-hook-form для работы с формами
import ReCAPTCHA from 'react-google-recaptcha'; // Импорт компонента ReCAPTCHA из библиотеки react-google-recaptcha для добавления CAPTCHA
import emailjs from '@emailjs/browser'; // Импорт модуля emailjs для отправки электронных писем
import { useCart } from '../components/CartContext'; // Импорт пользовательского хука useCart для доступа к состоянию корзины
import '../styles/Order.css'; // Импорт стилей для компонента Order

const Order = () => {
  const { register, handleSubmit, formState: { errors } } = useForm(); // Инициализация хука useForm для управления состоянием формы
  const [recaptchaVerified, setRecaptchaVerified] = useState(false); // Состояние для хранения статуса верификации ReCAPTCHA
  const [message, setMessage] = useState(''); // Состояние для отображения сообщений пользователю
  const { cart, clearCart } = useCart(); // Доступ к состоянию корзины и функции для очистки корзины

  // Функция для форматирования элементов корзины в текстовый вид
  const formatCartItems = (cart) => {
    return cart.map(item => `${item.name} - ${item.price} руб.`).join('\n');
  };

  // Функция, вызываемая при отправке формы
  const onSubmit = (data) => {
    if (recaptchaVerified) { // Проверка, что пользователь успешно прошел ReCAPTCHA
      const orderData = {
        address: data.address,
        name: data.name,
        paymentMethod: data.paymentMethod,
        cart: formatCartItems(cart),
        orderTime: new Date().toLocaleString()
      };

      console.log(orderData); // Вывод информации о заказе в консоль для отладки

      // Отправка данных заказа на указанный email через emailjs
      emailjs.send('service_2qb06pt', 'template_xte1ijq', orderData, '3fV7Il-fJl_LZ8vLG')
        .then(() => {
          setMessage('Ваш заказ успешно оформлен и отправлен на почту.');
          clearCart();  // Очистка корзины после успешного оформления заказа
        })
        .catch((error) => {
          console.error('Ошибка при отправке заказа:', error);
          setMessage('Произошла ошибка при оформлении заказа. Попробуйте снова.');
        });
    } else {
      setMessage('Подтвердите, что вы не робот.'); // Сообщение, если пользователь не прошел ReCAPTCHA
    }
  };

  // Обработчик изменения ReCAPTCHA
  const handleRecaptcha = (value) => {
    setRecaptchaVerified(!!value); // Установка состояния recaptchaVerified в зависимости от значения value (true/false)
  };

  // Рендеринг компонента Order с формой для оформления заказа и сообщениями для пользователя
  return (
    <div className="checkout-container">
      <h2>Оформление заказа</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Адрес почты</label>
          <input
            type="email"
            {...register('address', { required: true })}
          />
          {errors.address && <span className="error">Поле обязательно для заполнения</span>}
        </div>
        <div className="form-group">
          <label>ФИО</label>
          <input
            type="text"
            {...register('name', { required: true })}
          />
          {errors.name && <span className="error">Поле обязательно для заполнения</span>}
        </div>
        <div className="form-group">
          <label>Способ оплаты</label>
          <select
            {...register('paymentMethod', { required: true })}
          >
            <option value="">Выберите способ оплаты</option>
            <option value="card">Карта</option>
            <option value="cash">Наличные</option>
          </select>
          {errors.paymentMethod && <span className="error">Выберите способ оплаты</span>}
        </div>
        <div className="form-group">
          <ReCAPTCHA
            sitekey="6Lez0f0pAAAAAJDk63Zj_Q4R2F6QvLGqrEmp_7ec" // Ключ сайта для ReCAPTCHA
            onChange={handleRecaptcha} // Обработчик изменения ReCAPTCHA
          />
        </div>
        <button type="submit">Подтвердить заказ</button>
      </form>
      {message && <p className="message">{message}</p>} {/* Отображение сообщений пользователю */}
    </div>
  );
};

export default Order; // Экспорт компонента Order
