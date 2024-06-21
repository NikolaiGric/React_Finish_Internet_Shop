import React, { useState } from 'react';
import '../styles/Navbar.css';
import { motion } from 'framer-motion'; // Импорт компонента анимации из Framer Motion
import logo from '../components/Assets/logo.png'; // Импорт логотипа
import { Link } from 'react-router-dom'; // Импорт компонента Link для навигации

export default function Navbar() {
  const [menu, setMenu] = useState("main"); // Состояние для активного пункта меню

  return (
    <div className='navbar'>
      {/* Логотип и название компании */}
      <div className='nav-logo'>
        <img src={logo} alt="Логотип" />
        <p>Наценочка</p>
      </div>
      {/* Меню навигации */}
      <ul className='nav-menu'>
        {/* Пункт меню "Главная" */}
        <li onClick={() => { setMenu("main") }}>
          <Link to='/'>Главная</Link>
          {/* Анимированная полоса под активным пунктом меню */}
          {menu === "main" && (
            <motion.hr
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.5 }}
            />
          )}
        </li>
        {/* Пункт меню "Каталог" */}
        <li onClick={() => { setMenu("catalog") }}>
          <Link to='/catalog'>Каталог</Link>
          {/* Анимированная полоса под активным пунктом меню */}
          {menu === "catalog" && (
            <motion.hr
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.5 }}
            />
          )}
        </li>
        {/* Пункт меню "Избранное" */}
        <li onClick={() => { setMenu("favourites") }}>
          <Link to='/favourites'>Избранное</Link>
          {/* Анимированная полоса под активным пунктом меню */}
          {menu === "favourites" && (
            <motion.hr
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.5 }}
            />
          )}
        </li>
        {/* Пункт меню "Корзина" */}
        <li onClick={() => { setMenu("cart") }}>
          <Link to='/cart'>Корзина</Link>
          {/* Анимированная полоса под активным пунктом меню */}
          {menu === "cart" && (
            <motion.hr
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.5 }}
            />
          )}
        </li>
      </ul>
    </div>
  );
}
