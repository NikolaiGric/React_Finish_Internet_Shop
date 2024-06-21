import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Создание контекста для корзины
const CartContext = createContext();

// Компонент-провайдер для управления состоянием корзины
export const CartProvider = ({ children }) => {
  // Инициализация состояния корзины с использованием локального хранилища
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Эффект для сохранения состояния корзины в локальное хранилище при изменении
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Функция для добавления продукта в корзину
  const addToCart = (product) => {
    const productWithId = { ...product, cartId: uuidv4() };
    setCart((prevCart) => [...prevCart, productWithId]);
  };

  // Функция для удаления продукта из корзины по идентификатору
  const removeFromCart = (cartId) => {
    setCart((prevCart) => prevCart.filter(product => product.cartId !== cartId));
  };

  // Функция для очистки корзины
  const clearCart = () => {
    setCart([]);
  };

  // Предоставление состояния корзины и функций управления через контекст
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Хук для использования состояния корзины в других компонентах
export const useCart = () => {
  return useContext(CartContext);
};
