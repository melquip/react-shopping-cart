import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

// Contexts
import ProductContext from './contexts/ProductContext';
import CartContext from './contexts/CartContext';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
	const [products] = useLocalStorage('contextapi_products', data);
	const [cart, setCart] = useLocalStorage('contextapi_cart', []);

	const addItem = item => {
		setCart([...cart.filter(cartitem => cartitem.id !== item.id), item]);
	};

	const removeItem = id => e => {
		setCart([...cart.filter(item => item.id !== id)]);
	}

	return (
		<ProductContext.Provider value={{ products, addItem, removeItem }} >
			<CartContext.Provider value={{ cart }} >
				<div className="App">
					<Navigation />

					{/* Routes */}
					<Route
						exact
						path="/"
						component={Products}
					/>

					<Route
						path="/cart"
						component={ShoppingCart}
					/>
				</div>
			</CartContext.Provider>
		</ProductContext.Provider>
	);
}

export default App;
