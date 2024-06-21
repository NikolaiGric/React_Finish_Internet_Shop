import React, { createContext, useContext, useState, useEffect } from 'react';

// Создание контекста для избранных товаров
const Favourites = createContext();

// Компонент-провайдер для управления избранными товарами
export const FavouritesProvider = ({ children }) => {
  // Инициализация состояния избранных товаров с использованием локального хранилища
  const [favourites, setFavourites] = useState(() => {
    const savedFavourites = localStorage.getItem('favourites');
    return Array.isArray(JSON.parse(savedFavourites)) ? JSON.parse(savedFavourites) : [];
  });

  // Эффект для сохранения состояния избранных товаров в локальное хранилище при изменении
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  // Функция для добавления товара в избранное
  const addToFavourites = (product) => {
    if (!favourites.some((fav) => fav.id === product.id)) {
      setFavourites([...favourites, product]);
    }
  };

  // Функция для удаления товара из избранного по его идентификатору
  const removeFromFavourites = (productId) => {
    const updatedFavourites = favourites.filter((fav) => fav.id !== productId);
    setFavourites(updatedFavourites);
  };

  // Предоставление состояния избранных товаров и функций управления через контекст
  return (
    <Favourites.Provider value={{ favourites, addToFavourites, removeFromFavourites }}>
      {children}
    </Favourites.Provider>
  );
};

// Хук для использования состояния избранных товаров в других компонентах
export const useFavourites = () => {
  return useContext(Favourites);
};
