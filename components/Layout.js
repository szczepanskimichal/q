import { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";

export default function Layout({ children }) {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		fetchCategories();
	}, []);

	function fetchCategories() {
		axios.get("/api/categories").then((response) => {
			setCategories(response.data);
		});
	}
	return (
		<div className="flex flex-col min-h-[100vh] bg-gray-300">
			<Header categories={categories} />
			<div className="min-h-screen sm:pt-[80px] flex justify-center">
				<div className="w-full">{children}</div>
			</div>
		</div>
	);
}
