import React from 'react';
import logo from '../components/Assets/logo.png'; // импорт логотипа
import github from '../components/Assets/github.png'; // импорт иконки GitHub
import telegram from '../components/Assets/telegram.png'; // импорт иконки Telegram
import vk from '../components/Assets/vk.png'; // импорт иконки VK
import '../styles/Footer.css'; // импорт стилей для футера

function Footer() {
  return (
    <div className='footer'>
      {/* Блок с логотипом и названием */}
      <div className='foot-logo'>
        <img src={logo} alt="Логотип" />
        <p>Наценочка</p>
      </div>
      {/* Блок с контактной информацией */}
      <div className="contact-info">
        <p>+7 (XXX) XXX-XX-XX</p>
        <p>support@example.com</p>
      </div>
      {/* Блок с социальными иконками и ссылками */}
      <div className="social-icons">
        <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer">
          <img src={github} alt="GitHub" />
        </a>
        <a href="https://telegram.me/yourtelegram" target="_blank" rel="noopener noreferrer">
          <img src={telegram} alt="Telegram" />
        </a>
        <a href="https://vk.com/yourvk" target="_blank" rel="noopener noreferrer">
          <img src={vk} alt="VK" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
