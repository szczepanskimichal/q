"use client";

import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
	const [cartProducts, setCartProducts] = useState([]);
	const [isInitalized, setIsInitalized] = useState(false);

	useEffect(() => {
		if (localStorage && localStorage.getItem("cart")) {
			setCartProducts(JSON.parse(localStorage.getItem("cart")));
		}
		setIsInitalized(true);
	}, []);

	useEffect(() => {
		if (isInitalized) {
			localStorage.setItem("cart", JSON.stringify(cartProducts));
		}
	}, [cartProducts, isInitalized]);

	function addProduct(productId) {
		setCartProducts((prev) => [...prev, productId]);
		toast.success("Item added to cart!");
	}

	function removeProduct(productId) {
		setCartProducts((prev) => {
			const position = prev.indexOf(productId);
			if (position !== -1) {
				return prev.filter((value, index) => index !== position);
			}
			return prev;
		});
		toast.error("Item removed from the cart.");
	}

	function clearCart() {
		setCartProducts([]);
	}

	return (
		<CartContext.Provider
			value={{
				cartProducts,
				setCartProducts,
				addProduct,
				removeProduct,
				clearCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}
