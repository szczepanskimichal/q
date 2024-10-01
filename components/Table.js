import { useContext } from "react";
import { CartContext } from "./hooks/CartContext";
import Link from "next/link";

export default function Table({ products, cartProducts }) {
	const { removeProduct, addProduct, clearCart } = useContext(CartContext);

	let total = 0;
	for (const productId of cartProducts) {
		const price = products.find((p) => p._id === productId)?.price || 0;
		total += price;
	}

	return (
		<table>
			<thead>
				<tr>
					<td>Product name</td>
					<td>Quantity</td>
					<td>Price</td>
				</tr>
			</thead>
			<tbody>
				{products.map((product) => (
					<tr key={product._id} className="border-t-2">
						<td className="h-[140px] sm:h-[150px] mb-2 rounded-lg flex flex-col justify-center gap-1">
							<Link href={"/products/" + product._id}>
								<img
									src={product.images[0]}
									className="bg-white max-h-[80px] sm:max-w-[100px] sm:max-h-[100px] border rounded-lg p-2"
								/>
							</Link>
							{product.title}
						</td>
						<td>
							<div className="flex items-center gap-3">
								<button
									onClick={() => removeProduct(product._id)}
									className="bg-gray-200 hover:bg-gray-300 py-1"
								>
									-
								</button>
								{cartProducts.filter((id) => id === product._id).length}
								<button
									onClick={() => addProduct(product._id)}
									className="bg-gray-200 hover:bg-gray-300 py-1"
								>
									+
								</button>
							</div>
						</td>
						<td>${product.price}</td>
					</tr>
				))}
				<tr className="sticky bottom-0 bg-gray-100 border-t-2 border-gray-400 font-semibold">
					<td>
						<div
							onClick={() => clearCart()}
							className="p-0 hover:text-gray-500 cursor-pointer inline-flex"
						>
							Clear Cart
						</div>
					</td>
					<td className="flex justify-end">Total:</td>
					<td>${total}</td>
				</tr>
			</tbody>
		</table>
	);
}
