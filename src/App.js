import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Shop from './pages/Shop.jsx';
import Catalog from './pages/Catalog.jsx';
import Cart from './pages/Cart.jsx';
import Order from './pages/Order.jsx';
import Favourites from './pages/Favourites.jsx';
import Product from './pages/Product.jsx';
import { CartProvider } from './components/CartContext.js';
import { FavouritesProvider } from './components/Favourites.js'; 

function App() {
  return (
    // Обертка CartProvider и FavouritesProvider для предоставления контекста данных
    <CartProvider>
      <FavouritesProvider>
        <BrowserRouter>
          {/* Верхнее меню навигации */}
          <Navbar />
          <Routes>
            {/* Маршрут для главной страницы */}
            <Route path='/' element={<Shop />} />
            {/* Маршрут для страницы каталога */}
            <Route path='/Catalog' element={<Catalog />} />
            {/* Маршрут для корзины */}
            <Route path='/Cart' element={<Cart />} />
            {/* Маршрут для оформления заказа */}
            <Route path='/Order' element={<Order />} />
            {/* Маршрут для избранных товаров */}
            <Route path='/Favourites' element={<Favourites />} />
            {/* Маршрут для страницы продукта */}
            <Route path='/product/:productId' element={<Product />} />
          </Routes>
          {/* Нижнее меню футера */}
          <Footer />
        </BrowserRouter>
      </FavouritesProvider>
    </CartProvider>
  );
}

export default App;
