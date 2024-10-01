import AccountLayout from "@/components/AccountLayout";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrdersPage() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		axios.get("/api/orders").then((response) => {
			setOrders(response.data);
			setLoading(false);
		});
	}, []);

	return (
		<AccountLayout title="Order history">
			<table className="orders">
				<thead>
					<tr>
						<td>Date</td>
						<td>Paid</td>
						<td className="hidden sm:table-cell">Recipient</td>
						<td>Products</td>
					</tr>
				</thead>
				<tbody>
					{loading ? (
						<Spinner />
					) : (
						orders.length > 0 &&
						orders.map((order) => (
							<tr key={order._id}>
								<td>{new Date(order.createdAt).toLocaleString()}</td>
								<td className={order.paid ? "text-green-700" : "text-red-500"}>
									{order.paid ? "YES" : "NO"}
								</td>
								<td className="hidden sm:table-cell">
									{order.name}, {order.email}
								</td>
								<td>
									{order.line_items.map((item) => (
										<>
											<i className="text-gray-700 underline">
												{item.price_data.product_data.name} x {item.quantity}{" "}
												<br />
											</i>
										</>
									))}
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</AccountLayout>
	);
}
