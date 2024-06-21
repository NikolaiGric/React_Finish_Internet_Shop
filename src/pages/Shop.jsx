import React, { useState, useEffect } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import '../styles/Shop.css';

const Shop = () => {
  const [data, setData] = useState([]); // Состояние для хранения данных о продуктах
  const [isSent, setIsSent] = useState(false); // Состояние для отображения успешной отправки формы

  // Использование хуков React Hook Form для управления формой
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  // Функция обработки отправки формы
  const onSubmit = (formData) => {
    const serviceID = 'service_2qb06pt'; // ID сервиса EmailJS
    const templateID = 'template_rgucbwm'; // ID шаблона EmailJS
    const userID = '3fV7Il-fJl_LZ8vLG'; // ID пользователя EmailJS

    // Отправка данных формы через EmailJS
    emailjs.send(serviceID, templateID, formData, userID)
      .then((result) => {
        console.log(result.text);
        setIsSent(true); // Устанавливаем состояние успешной отправки формы
        reset(); // Сбрасываем значения формы
      }, (error) => {
        console.log(error.text);
        alert('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте снова.');
      });
  };

  // Загрузка данных о продуктах с сервера при монтировании компонента
  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  // Рендеринг компонента магазина
  return (
    <div className="container1">
      <div className="inform">
        <p>
          <strong>Наценочка — Ваш надёжный партнёр в мире покупок!</strong>
          <br /><br />
          Добро пожаловать в Наценочку — место, где качество встречается с доступностью. Наш магазин создан для тех, кто ценит время, комфорт и широкий ассортимент товаров. Мы предлагаем вам тщательно отобранные продукты, которые удовлетворят вкусы даже самых требовательных покупателей.
          <br /><br />
          <strong>О нас:</strong>
          <br />
          В Наценочке мы верим, что покупка должна быть легкой и приятной. Наш ассортимент включает в себя всё необходимое для повседневной жизни: от свежих продуктов питания до товаров для дома и уюта. Мы гордимся нашим вниманием к качеству и стремимся предоставлять нашим клиентам только лучшие товары.
          <br /><br />
          <strong>Почему выбирают нас:</strong>
          <br />
          Широкий ассортимент: В нашем магазине вы найдёте всё, что нужно для полноценной и комфортной жизни.
          <br />
          Высокое качество: Мы тщательно выбираем поставщиков и следим за качеством каждого продукта.
          <br />
          Доступные цены: Мы предлагаем конкурентные цены, чтобы каждый мог позволить себе лучшие товары.
          <br />
          Удобный сервис: Наша команда всегда готова помочь вам с выбором и ответить на все вопросы.
          <br />
          <br />
          <i>Для подробного просмотра товара нажмите на картинку</i>
          <br />
          <br />
          <b>Лучшие товары:</b>
        </p>
      </div>
      <div className="items">
        {/* Отображение списка продуктов */}
        {data.map((d, i) => (
          <motion.div
            className="item"
            key={i}
            whileHover={{ scale: 1.05 }} // Анимация масштабирования при наведении
          >
            {/* Ссылка на страницу продукта */}
            <Link to={`/product/${d.id}`}>
              <img src={d.image} alt={d.name} className="item-image" />
            </Link>
            {/* Информация о продукте */}
            <div className="item-details">
              <p className="item-name">{d.name}</p>
              <pre className="item-price">{d.price}</pre>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Форма для связи с командой магазина */}
      <div className="contact-form">
        <h2>Связаться с нами:</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            name="name"
            {...register('name', { required: 'Пожалуйста, введите ваше имя' })}
          />
          {errors.name && <p>{errors.name.message}</p>}
          <label htmlFor="email">Электронная почта:</label>
          <input
            type="email"
            id="email"
            name="email"
            {...register('email', { required: 'Пожалуйста, введите вашу электронную почту' })}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <label htmlFor="message">Сообщение:</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            {...register('message', { required: 'Пожалуйста, введите ваше сообщение' })}
          />
          {errors.message && <p>{errors.message.message}</p>}
          {/* Кнопка отправки формы с анимацией */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }} // Анимация масштабирования при наведении
          >
            {isSubmitting ? 'Отправка...' : 'Отправить'}
          </motion.button>
        </form>
        {/* Уведомление об успешной отправке формы */}
        {isSent && (
          <motion.div
            className="notification"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p>Сообщение успешно отправлено!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Shop;
